"use client";

const NoiseBg = () => (
  <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.03] z-0" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise-abt">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise-abt)" />
  </svg>
);

export default function About() {
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

      <section className="relative min-h-screen flex flex-col pt-16 pb-32 overflow-hidden"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-5xl mx-auto px-6 w-full flex flex-col items-center pt-24">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="px-5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-white/80">
              About Us
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-medium text-center max-w-4xl mx-auto
              bg-gradient-to-r from-white via-blue-100 to-blue-400 
              bg-clip-text text-transparent leading-[1.15] tracking-[0.01em]">
            Built for Product Clarity
            <br />
            and Fast Execution
          </h1>

          <p className="text-white/72 text-lg leading-[1.8] text-center max-w-2xl mx-auto mt-10">
            CodingoForge is a product-focused software studio for startups and growing businesses. We help turn ideas into structured web applications with a strong design and delivery mindset.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 w-full mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-bold text-[#8ab4ff] mb-4 uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
                Our Mission
              </p>
              <p className="text-white/72 text-base leading-[1.8]">
                We believe great software starts with understanding the problem. Every product we build is driven by real user needs, clean architecture, and practical execution. Our mission is to help startups and growing businesses ship high-quality web applications without the complexity and overhead of traditional development.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#8ab4ff] mb-4 uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
                Our Vision
              </p>
              <p className="text-white/72 text-base leading-[1.8]">
                We envision a world where every great idea gets the technical execution it deserves. By combining modern design, AI-powered workflows, and lean development practices, we aim to make custom software accessible, predictable, and impactful for businesses of every size.
              </p>
            </div>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 w-full mt-24">
          <div className="w-full max-w-2xl mx-auto">
            <div className="relative rounded-3xl p-8 md:p-10 border" style={{
              background: "linear-gradient(160deg, #0d2040 0%, #070f1d 100%)",
              borderColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
            }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center shrink-0 text-xl font-black" style={{
                  background: "linear-gradient(135deg, #1a3355, #0d2040)",
                  border: "2px solid rgba(138,180,255,0.25)",
                  boxShadow: "0 0 24px rgba(138,180,255,0.15)",
                  fontFamily: "'Space Mono', monospace",
                  color: "#dbeafe",
                  letterSpacing: "0.02em",
                }}>
                  GU
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-black text-white">Gaurav Uniyal</h3>
                  <p className="text-sm text-[#8ab4ff] mt-1" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Founder · Software Engineer and Product Builder
                  </p>
                  <p className="text-sm text-white/75 mt-4 leading-relaxed">
                    Gaurav leads CodingoForge with a focus on practical product development, clean execution, and scalable software systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
