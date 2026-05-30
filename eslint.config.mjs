import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'test-results/**',
      '_temp_layout.tsx',
      '_git_artworks_check.txt',
      'build*.txt',
      'dev*.txt',
      '*.log',
      'ocr*_results*.json',
      'output_frame.jpg',
    ],
  },
  ...nextVitals,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
    },
  },
];

export default config;
