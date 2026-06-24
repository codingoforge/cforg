"use client";

const NoiseBg = () => (
  <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.03] z-0" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise-career">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise-career)" />
  </svg>
);

export default function Career() {
  return (
    <div className="min-h-screen bg-[#060e1a] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060e1a; }
        ::-webkit-scrollbar-thumb { background: #8ab4ff; border-radius: 2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }
      `}</style>

      <NoiseBg />

      <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-4xl mx-auto px-6 py-24 w-full flex flex-col items-center text-center">
          <div className="px-5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-white/80 mb-8">
            Join Us
          </div>

          <h1 className="text-5xl md:text-7xl font-medium text-center max-w-4xl mx-auto
              bg-gradient-to-r from-white via-blue-100 to-blue-400 
              bg-clip-text text-transparent leading-[1.15] tracking-[0.01em]">
            Work With Us
          </h1>

          <div className="mt-16 p-10 rounded-2xl border text-center" style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
          }}>
            <p className="text-white/50 text-base leading-relaxed" style={{ fontFamily: "'Space Mono', monospace" }}>
              No opportunities available at the moment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
