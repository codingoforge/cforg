"use client";
import { useRef } from "react";
import PitchModal from "../components/PitchModal";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "⚡", title: "MVP in 4 Weeks", desc: "From raw idea to launchable product. We cut the fat and build what matters.", tag: "MOST POPULAR" },
  { icon: "🎯", title: "Pitch Decks", desc: "Investor-ready decks that tell your story with data-backed confidence.", tag: null },
  { icon: "🔬", title: "Prototype Sprint", desc: "Clickable, testable prototypes in 72 hours. Validate before you build.", tag: "FAST TRACK" },
  { icon: "🚀", title: "Launch Package", desc: "End-to-end: MVP + landing page + analytics + onboarding flow.", tag: null },
  { icon: "🧠", title: "Tech Strategy", desc: "Architecture decisions, stack recommendations, scalability roadmaps.", tag: null },
  { icon: "♻️", title: "Rebuild & Rescue", desc: "Inherited a broken product? We audit, fix, and future-proof it.", tag: "RESCUE" },
];

const STEPS = [
  { num: "01", title: "Pitch Your Idea", desc: "Submit your concept through our structured intake form." },
  { num: "02", title: "We Analyze", desc: "Our team evaluates feasibility, scope, and market fit within 24h." },
  { num: "03", title: "Get a Quote", desc: "Approved ideas receive a transparent, fixed-price proposal." },
  { num: "04", title: "Pay & Confirm", desc: "Secure your slot with a milestone-based payment structure." },
  { num: "05", title: "Track Progress", desc: "Real-time updates, sprint reviews, and delivery timelines." },
  { num: "06", title: "Launch", desc: "Ship your MVP to the world with our go-live support." },
];

const STATS = [
  { val: "20+", label: "MVPs Launched" },
  { val: "4wk", label: "Avg. Delivery" },
  { val: "30+", label: "Reviews" },
  { val: "94%", label: "Client Retention" },
];

const MARQUEE_ITEMS = [
  "MVP Development", "Pitch Decks", "Rapid Prototyping",
  "Tech Strategy", "Launch Packages", "4-Week Delivery",
  "Startup Studio", "Founder-First",
];

// ─── Noise SVG Background ─────────────────────────────────────────────────────
const NoiseBg = () => (
  <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.03] z-0" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

// ─── Props ────────────────────────────────────────────────────────────────────
interface HomeProps {
  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home({ modalOpen, onOpenModal, onCloseModal }: HomeProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="min-h-screen bg-[#07070f] text-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d1a; }
        ::-webkit-scrollbar-thumb { background: #7c5cfc; border-radius: 2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes glow-pulse { 0%,100% { opacity:0.5; } 50% { opacity:0.9; } }

        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }

        .marquee-track { animation: marquee 28s linear infinite; }

        .card-hover {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(124,92,252,0.5) !important;
          box-shadow: 0 8px 32px rgba(124,92,252,0.1);
        }

        .cf-grid-bg {
          background-image:
            linear-gradient(rgba(124,92,252,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,92,252,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .accent-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(124,92,252,0.1);
          border: 1px solid rgba(124,92,252,0.2);
          color: #a78bfa;
          padding: 6px 16px;
          border-radius: 100px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .accent-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          animation: glow-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .accent-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7c5cfc;
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c5cfc 0%, #4f8ef7 100%);
          color: #fff;
          font-weight: 900;
          padding: 14px 32px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 0 32px rgba(124,92,252,0.3);
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-2px); }

        .btn-ghost {
          background: transparent;
          color: #555580;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 12px;
          border: 1px solid #1e1e3a;
          cursor: pointer;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          transition: color 0.2s, border-color 0.2s;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: inline-block;
        }
        .btn-ghost:hover { color: #a78bfa; border-color: rgba(124,92,252,0.35); }

        .service-tag {
          position: absolute;
          top: 14px; right: 14px;
          background: rgba(124,92,252,0.12);
          border: 1px solid rgba(124,92,252,0.25);
          color: #a78bfa;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 100px;
        }

        .stat-val {
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .step-num {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          background: linear-gradient(135deg, #7c5cfc, #4f8ef7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #7c5cfc;
          margin-bottom: 12px;
        }
      `}</style>

      <NoiseBg />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
        <div className="cf-grid-bg absolute inset-0 opacity-100" />

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-150 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(124,92,252,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-100 h-100 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(79,142,247,0.07) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="accent-tag fade-up delay-1">
              <span className="accent-dot" />
              MVP Studio · Est. 2025
            </div>

            <h1 className="fade-up delay-2 text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight">
              We Build<br />
              <span style={{ background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                MVPs That
              </span><br />
              Ship Fast.
            </h1>

            <p className="fade-up delay-3 text-[#555580] text-lg leading-relaxed max-w-md">
              From zero to funded. We turn founder ideas into launchable products — designed for traction, built for scale.
            </p>

            <div className="fade-up delay-4 flex flex-wrap gap-4">
              <button onClick={onOpenModal} className="btn-primary group">
                Pitch Your Idea <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </button>
              <a href="#process" className="btn-ghost">
                See How It Works
              </a>
            </div>
          </div>

          {/* Prompt Box */}
          <div className="fade-up delay-3 relative hidden lg:block">
            <div className="relative bg-[#0d0d1a] border border-[#1e1e3a] rounded-2xl p-8 shadow-2xl"
              style={{ boxShadow: "0 0 60px rgba(124,92,252,0.1)" }}>

              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7c5cfc", marginBottom: "1.25rem" }}>
                // pitch_assistant.ai
              </p>

              <h3 className="text-2xl font-black text-white text-center tracking-tight mb-5">
                How can I help you today?
              </h3>

              <div className="bg-[#0a0a18] border border-[#1e1e3a] rounded-xl p-3 flex items-end gap-3 focus-within:border-[#7c5cfc] transition-colors">
                <textarea
                  placeholder="What's on your mind?"
                  rows={2}
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-[#2a2a4a] resize-none leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all hover:opacity-85"
                  style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)" }}
                  onClick={onOpenModal}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {["MVP in 4 weeks", "Pitch deck", "Prototype sprint", "Tech strategy"].map((chip) => (
                  <span key={chip}
                    className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all"
                    style={{ background: "rgba(124,92,252,0.08)", border: "1px solid rgba(124,92,252,0.18)", color: "#a78bfa", fontFamily: "'Space Mono',monospace", letterSpacing: "0.05em" }}
                    onClick={onOpenModal}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute -top-3 -right-3 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg"
              style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)" }}>
              AI-Powered
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────────────────────────────── */}
      <div className="border-y border-[#0f0f22] py-4 overflow-hidden bg-[#0a0a16]">
        <div className="marquee-track flex gap-8 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-8">
              {MARQUEE_ITEMS.map((t) => (
                <span key={t} className="text-[#1e1e3a] text-sm uppercase tracking-widest" style={{ fontFamily: "'Space Mono',monospace" }}>
                  {t} <span style={{ color: "#7c5cfc", margin: "0 12px" }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ──────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ val, label }) => (
          <div key={label} className="text-center space-y-1">
            <div className="stat-val">{val}</div>
            <div className="text-[#2a2a4a] text-sm uppercase tracking-widest" style={{ fontFamily: "'Space Mono',monospace" }}>{label}</div>
          </div>
        ))}
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────────── */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">// what_we_build</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Our Services</h2>
          </div>
          <p className="text-[#444466] text-sm max-w-xs leading-relaxed">
            Everything a startup needs to go from slide deck to market-ready product.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(({ icon, title, desc, tag }) => (
            <div key={title} className="card-hover relative bg-[#0d0d1a] border border-[#1a1a2e] rounded-xl p-6 space-y-3">
              {tag && <div className="service-tag">{tag}</div>}
              <div className="text-3xl">{icon}</div>
              <h3 className="font-black text-lg text-white">{title}</h3>
              <p className="text-[#444466] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────────────── */}
      <section id="process" className="bg-[#0a0a16] border-y border-[#0f0f22] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="section-eyebrow">// how_it_works</p>
            <h2 className="text-4xl md:text-5xl font-black">From Idea to Launch</h2>
            <p className="text-[#444466] mt-3 text-sm max-w-sm mx-auto">A streamlined, transparent process built for founders who move fast.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="card-hover relative bg-[#0d0d1a] border border-[#1a1a2e] rounded-xl p-6 space-y-3">
                <div className="step-num">{num}</div>
                <h3 className="font-black text-lg">{title}</h3>
                <p className="text-[#444466] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative bg-[#0d0d1a] border border-[#1e1e3a] rounded-2xl p-12 md:p-16 overflow-hidden text-center"
          style={{ boxShadow: "0 0 80px rgba(124,92,252,0.08)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(124,92,252,0.07) 0%, transparent 60%)" }} />
          <div className="relative space-y-6">
            <p className="section-eyebrow">// ready_to_ship</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Your MVP is<br />
              <span style={{ background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                4 Weeks Away.
              </span>
            </h2>
            <p className="text-[#555580] text-lg max-w-md mx-auto">
              Stop overthinking. Start building. Pitch your idea today and get a fixed-price proposal in 24 hours.
            </p>
            <button onClick={onOpenModal} className="btn-primary">
              Pitch Your Idea — It's Free →
            </button>
            <p className="text-[#1e1e3a] text-xs" style={{ fontFamily: "'Space Mono',monospace" }}>
              No commitment. We only proceed if your idea is approved.
            </p>
          </div>
        </div>
      </section>

      {/* ── MODAL — rendered here only when no App.tsx wrapper is present ── */}
      {modalOpen && <PitchModal onClose={onCloseModal} />}
    </div>
  );
}