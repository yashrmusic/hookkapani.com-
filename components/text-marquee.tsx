'use client';

export function TextMarquee() {
    return (
        <section className="py-24 bg-black overflow-hidden border-y border-white/5">
            <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap overflow-visible">
                {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-6xl md:text-8xl font-bold opacity-10 tracking-tighter text-white select-none">
                        MATERIAL LOGIC • HONEST CONSTRUCTION • MECHANICAL TENSION •
                    </span>
                ))}
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
}
