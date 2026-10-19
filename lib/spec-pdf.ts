/**
 * Minimal, dependency-free PDF writer for artwork spec sheets.
 * Produces a valid single-page A4 PDF with a red studio bar, title and text lines.
 */

export interface PdfLine {
  text: string;
  size?: number;
  bold?: boolean;
  gapBefore?: number;
  color?: [number, number, number];
}

function escapePdfText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, '-');
}

export function buildSpecPdf(lines: PdfLine[]): Buffer {
  const parts: string[] = [];

  // Red top bar (brand #F00010)
  parts.push('0.941 0 0.063 rg');
  parts.push('0 792 595 50 re f');
  // Thin black footer rule
  parts.push('0.15 0.15 0.15 RG');
  parts.push('0.7 w');
  parts.push('56 64 m 539 64 l S');

  let y = 748;
  for (const line of lines) {
    const size = line.size ?? 11;
    y -= line.gapBefore ?? size * 0.7;
    const font = line.bold ? 'F2' : 'F1';
    const [r, g, b] = line.color ?? [0.1, 0.1, 0.1];
    parts.push(`${r} ${g} ${b} rg`);
    parts.push(`BT /${font} ${size} Tf 56 ${y.toFixed(1)} Td (${escapePdfText(line.text)}) Tj ET`);
    y -= size * 1.15;
  }

  const content = parts.join('\n');
  const contentBytes = Buffer.byteLength(content, 'latin1');

  const objects: string[] = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>',
    `<< /Length ${contentBytes} >>\nstream\n${content}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(pdf, 'latin1'));
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefStart = Buffer.byteLength(pdf, 'latin1');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, 'latin1');
}
