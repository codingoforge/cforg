"use client";
import { ArrowRight } from "lucide-react";

const STEPS = [
  { num: "01", title: "Discover", desc: "We understand your idea, business model, and what needs to be built first." },
  { num: "02", title: "Plan", desc: "We map features, scope, timeline, and the best technical path." },
  { num: "03", title: "Build", desc: "We design and develop the product with regular visibility and feedback." },
  { num: "04", title: "Launch", desc: "We deploy the final product and support the transition into live usage." },
];

const NoiseBg = () => (
  <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.03] z-0" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise-proc">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise-proc)" />
  </svg>
);

export default function Process() {
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

        .timeline-line {
          position: absolute;
          left: 36px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, rgba(138,180,255,0.4), rgba(124,92,255,0.4), rgba(138,180,255,0.1));
          box-shadow: 0 0 12px rgba(138,180,255,0.15), 0 0 30px rgba(124,92,255,0.1);
        }

        .step-node {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 28px;
          padding: 28px 0;
        }

        .step-number {
          position: relative;
          z-index: 2;
          width: 74px;
          height: 74px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Space Mono', monospace;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #0d2040, #070f1d);
          border: 1px solid rgba(138,180,255,0.2);
          box-shadow: 0 0 20px rgba(138,180,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
        }
        .step-node:hover .step-number {
          border-color: rgba(138,180,255,0.5);
          box-shadow: 0 0 30px rgba(138,180,255,0.2), 0 0 60px rgba(124,92,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
          transform: scale(1.05);
        }

        .step-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 90px;
          height: 90px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(138,180,255,0.12), transparent 70%);
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .step-node:hover .step-glow {
          background: radial-gradient(circle, rgba(138,180,255,0.25), transparent 70%);
        }

        .step-content {
          flex: 1;
          padding-top: 16px;
          transition: transform 0.3s;
        }
        .step-node:hover .step-content {
          transform: translateX(4px);
        }

        .step-title {
          font-size: 28px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .step-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          max-width: 480px;
        }

        .step-arrow {
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
        }
        .step-node:hover .step-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        .connector-glow {
          position: absolute;
          left: 33px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #8ab4ff;
          box-shadow: 0 0 12px rgba(138,180,255,0.6), 0 0 24px rgba(138,180,255,0.2);
          z-index: 2;
        }
        .connector-glow.top { top: 35px; }
        .connector-glow.bottom { bottom: 35px; }
      `}</style>

      <NoiseBg />

      <section className="relative min-h-[60vh] flex flex-col justify-center pt-16 overflow-hidden"
        style={{
          backgroundImage: "url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-4xl mx-auto px-6 py-24 w-full">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/80">
                Our Process
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-medium text-center 
                bg-gradient-to-r from-white via-blue-100 to-blue-400 
                bg-clip-text text-transparent leading-[1.1]">
              Every Step Curated
              <br />
              To Your Needs
            </h1>

            <p className="fade-up delay-3 text-white/76 text-lg leading-relaxed max-w-xl text-center mx-auto mt-6">
              A structured flow from discovery to launch.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6 w-full">
          <div className="relative max-w-2xl mx-auto">
            <div className="timeline-line" />
            <div className="connector-glow top" />
            <div className="connector-glow bottom" />

            {STEPS.map((step) => (
              <div key={step.num} className="step-node">
                <div className="step-number">
                  {step.num}
                  <div className="step-glow" />
                </div>
                <div className="step-content">
                  <div className="flex items-center gap-3">
                    <h2 className="step-title">{step.title}</h2>
                    <ArrowRight size={18} className="step-arrow" style={{ color: "rgba(138,180,255,0.5)" }} />
                  </div>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
