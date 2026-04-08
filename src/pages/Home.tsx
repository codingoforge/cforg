"use client";
import { useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = "form" | "analyzing" | "approved" | "payment" | "tracking";
interface FormData {
  name: string;
  email: string;
  startup: string;
  idea: string;
  stage: string;
  budget: string;
}

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

// ─── Modal ────────────────────────────────────────────────────────────────────
function PitchModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<FormData>({
    name: "", email: "", startup: "", idea: "", stage: "Idea", budget: "< $5K",
  });
  const [refId] = useState(() => "CF-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  const [progress, setProgress] = useState(0);

  const handleSubmit = () => {
    setStep("analyzing");
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => setStep("approved"), 500); }
      setProgress(Math.min(p, 100));
    }, 300);
  };

  const inputCls = "w-full bg-[#0a0a18] border border-[#1e1e3a] rounded-lg px-3 py-2 text-white text-sm placeholder-[#2a2a4a] focus:outline-none focus:border-[#7c5cfc] transition-colors";
  const selectCls = "w-full bg-[#0a0a18] border border-[#1e1e3a] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7c5cfc] transition-colors";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg bg-[#0d0d1a] border border-[#1e1e3a] rounded-2xl overflow-hidden shadow-2xl"
        style={{ boxShadow: "0 0 60px rgba(124,92,252,0.12)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a2e]">
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7c5cfc" }}>
            {step === "form" && "// pitch_intake.exe"}
            {step === "analyzing" && "// analyzing_idea..."}
            {step === "approved" && "// idea_approved ✓"}
            {step === "payment" && "// secure_payment"}
            {step === "tracking" && "// tracking_dashboard"}
          </span>
          <button onClick={onClose} className="text-[#333355] hover:text-white transition-colors text-lg leading-none">✕</button>
        </div>

        <div className="p-6">

          {/* ── FORM ── */}
          {step === "form" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Pitch Your Idea</h2>
                <p className="text-[#444466] text-sm mt-1">Fill in the details. We'll analyze and get back within 24h.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "name", label: "Full Name", placeholder: "Jane Doe", col: 1 },
                  { key: "email", label: "Email", placeholder: "jane@startup.com", col: 1 },
                  { key: "startup", label: "Startup / Project Name", placeholder: "AcmeCorp", col: 2 },
                ].map(({ key, label, placeholder, col }) => (
                  <div key={key} className={col === 2 ? "col-span-2" : ""}>
                    <label className="block text-[#444466] text-xs mb-1" style={{ fontFamily: "'Space Mono',monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</label>
                    <input value={form[key as keyof FormData]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className={inputCls} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[#444466] text-xs mb-1" style={{ fontFamily: "'Space Mono',monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>Idea Brief</label>
                <textarea value={form.idea} onChange={(e) => setForm({ ...form, idea: e.target.value })} placeholder="Describe what you're building, who it's for, and the problem it solves..." rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#444466] text-xs mb-1" style={{ fontFamily: "'Space Mono',monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>Stage</label>
                  <select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} className={selectCls}>
                    {["Idea", "Validated", "Pre-Revenue", "Early Revenue"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#444466] text-xs mb-1" style={{ fontFamily: "'Space Mono',monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>Budget</label>
                  <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={selectCls}>
                    {["< $5K", "$5K–$15K", "$15K–$30K", "$30K+"].map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={handleSubmit} disabled={!form.name || !form.email || !form.idea}
                className="w-full text-white font-black py-3 rounded-xl transition-all text-sm tracking-wide uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)", boxShadow: "0 0 24px rgba(124,92,252,0.3)" }}>
                Submit & Confirm →
              </button>
            </div>
          )}

          {/* ── ANALYZING ── */}
          {step === "analyzing" && (
            <div className="py-6 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Analyzing Your Idea</h2>
                <p className="text-[#444466] text-sm mt-1">Our AI + team is reviewing scope, feasibility, and market fit.</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Idea clarity & scope", done: progress > 25 },
                  { label: "Technical feasibility", done: progress > 50 },
                  { label: "Market viability check", done: progress > 75 },
                  { label: "Budget alignment", done: progress > 90 },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition-all ${done ? "text-white" : "border-[#1e1e3a]"}`}
                      style={done ? { border: "2px solid #7c5cfc", background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)" } : {}}>
                      {done ? "✓" : ""}
                    </div>
                    <span className={`text-sm transition-colors ${done ? "text-white" : "text-[#333355]"}`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#333355]" style={{ fontFamily: "'Space Mono',monospace" }}>
                  <span>PROGRESS</span><span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-[#0a0a18] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`, background: "linear-gradient(to right,#7c5cfc,#4f8ef7)" }} />
                </div>
              </div>
            </div>
          )}

          {/* ── APPROVED ── */}
          {step === "approved" && (
            <div className="py-2 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "rgba(124,92,252,0.15)", border: "1px solid rgba(124,92,252,0.3)", color: "#a78bfa" }}>✓</div>
                <div>
                  <h2 className="text-xl font-black text-white">Idea Approved!</h2>
                  <p className="text-[#444466] text-xs">Your concept has depth. Here's your proposal.</p>
                </div>
              </div>
              <div className="bg-[#0a0a18] border border-[#1e1e3a] rounded-xl p-4 space-y-3">
                {[
                  { label: "Project", val: form.startup || "Your MVP" },
                  { label: "Scope", val: "Full MVP + Launch Kit" },
                  { label: "Timeline", val: "4 Weeks" },
                  { label: "Sprints", val: "4 × Weekly Reviews" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-[#444466]">{label}</span>
                    <span className="text-white font-semibold">{val}</span>
                  </div>
                ))}
                <div className="border-t border-[#1e1e3a] pt-3 flex justify-between">
                  <span className="text-[#444466] text-sm uppercase tracking-wide" style={{ fontFamily: "'Space Mono',monospace", fontSize: 12 }}>Total</span>
                  <span className="font-black text-xl" style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$12,400</span>
                </div>
              </div>
              <button onClick={() => setStep("payment")}
                className="w-full text-white font-black py-3 rounded-xl transition-all text-sm tracking-wide uppercase"
                style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)", boxShadow: "0 0 24px rgba(124,92,252,0.3)" }}>
                Proceed to Payment →
              </button>
            </div>
          )}

          {/* ── PAYMENT ── */}
          {step === "payment" && (
            <div className="py-2 space-y-5">
              <div>
                <h2 className="text-2xl font-black text-white">Secure Payment</h2>
                <p className="text-[#444466] text-sm mt-1">50% upfront · 50% on delivery. Milestone-based.</p>
              </div>
              <div className="bg-[#0a0a18] border border-[#1e1e3a] rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-[#444466]">Due Now (50%)</span><span className="text-white font-bold">$6,200</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#444466]">On Delivery</span><span className="text-[#333355]">$6,200</span></div>
              </div>
              <div className="space-y-3">
                <input placeholder="Card Number  •••• •••• •••• ••••" className={inputCls} />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM / YY" className={inputCls} />
                  <input placeholder="CVV" className={inputCls} />
                </div>
              </div>
              <button onClick={() => setStep("tracking")}
                className="w-full text-white font-black py-3 rounded-xl transition-all text-sm tracking-wide uppercase"
                style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)", boxShadow: "0 0 24px rgba(124,92,252,0.3)" }}>
                Pay $6,200 & Start Building →
              </button>
            </div>
          )}

          {/* ── TRACKING ── */}
          {step === "tracking" && (
            <div className="py-2 space-y-5">
              <div className="text-center space-y-2">
                <div className="text-4xl">🚀</div>
                <h2 className="text-2xl font-black text-white">You're In!</h2>
                <p className="text-[#444466] text-sm">Your build has officially kicked off.</p>
              </div>
              <div className="bg-[#0a0a18] border rounded-xl p-4 text-center" style={{ borderColor: "rgba(124,92,252,0.25)" }}>
                <p className="text-[#444466] text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "'Space Mono',monospace" }}>Reference ID</p>
                <p className="font-mono font-black text-2xl tracking-widest" style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{refId}</p>
                <p className="text-[#333355] text-xs mt-1">Use this to track your project status</p>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Kickoff Call", date: "Apr 10", upcoming: true },
                  { label: "Sprint 1 Review", date: "Apr 17", upcoming: false },
                  { label: "Sprint 2 Review", date: "Apr 24", upcoming: false },
                  { label: "Beta Delivery", date: "May 1", upcoming: false },
                  { label: "Final Launch", date: "May 8", upcoming: false },
                ].map(({ label, date, upcoming }) => (
                  <div key={label} className="flex items-center justify-between text-sm py-2 border-b border-[#0f0f1e]">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${upcoming ? "animate-pulse" : "bg-[#1e1e3a]"}`}
                        style={upcoming ? { background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)" } : {}} />
                      <span className="text-[#ccc]">{label}</span>
                    </div>
                    <span className="text-[#333355]" style={{ fontFamily: "'Space Mono',monospace" }}>{date}</span>
                  </div>
                ))}
              </div>
              <button onClick={onClose} className="w-full bg-[#0f0f22] hover:bg-[#1a1a2e] text-white font-bold py-3 rounded-xl transition-all text-sm border border-[#1e1e3a]">
                Close & Track Later
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page (no Navbar / Footer — import separately) ───────────────────────
export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
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
        {/* Grid bg */}
        <div className="cf-grid-bg absolute inset-0 opacity-100" />

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(124,92,252,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
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
              <button onClick={() => setModalOpen(true)} className="btn-primary group">
                Pitch Your Idea <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </button>
              <a href="#process" className="btn-ghost">
                See How It Works
              </a>
            </div>
          </div>

          {/* Floating tracker card */}
          <div className="fade-up delay-3 relative hidden lg:block">
            <div className="relative bg-[#0d0d1a] border border-[#1e1e3a] rounded-2xl p-6 shadow-2xl"
              style={{ boxShadow: "0 0 60px rgba(124,92,252,0.1)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[#2a2a4a] text-xs" style={{ fontFamily: "'Space Mono',monospace" }}>project_tracker.cf</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Project", val: "AcmeMVP", valCls: "text-white font-semibold" },
                  { label: "Ref ID", val: "CF-K9X3R1", special: "gradient" },
                  { label: "Status", val: "Sprint 2 Active", special: "status" },
                ].map(({ label, val, valCls, special }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-[#444466]">{label}</span>
                    {special === "gradient" ? (
                      <span className="font-mono font-bold" style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{val}</span>
                    ) : special === "status" ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />{val}
                      </span>
                    ) : (
                      <span className={valCls}>{val}</span>
                    )}
                  </div>
                ))}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-[#2a2a4a]" style={{ fontFamily: "'Space Mono',monospace" }}>
                    <span>BUILD PROGRESS</span><span>60%</span>
                  </div>
                  <div className="h-2 bg-[#0a0a18] rounded-full overflow-hidden">
                    <div className="h-full w-[60%] rounded-full" style={{ background: "linear-gradient(to right,#7c5cfc,#4f8ef7)" }} />
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  {["✓ Kickoff Call", "✓ Design Sprint", "⟳ Engineering Sprint", "◦ Beta Testing", "◦ Launch"].map((s) => (
                    <div key={s} className="text-xs" style={{
                      fontFamily: "'Space Mono',monospace",
                      color: s.startsWith("✓") ? "#34d399" : s.startsWith("⟳") ? "#a78bfa" : "#1e1e3a",
                    }}>{s}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg"
              style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)" }}>
              LIVE BUILD
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
            <button onClick={() => setModalOpen(true)} className="btn-primary">
              Pitch Your Idea — It's Free →
            </button>
            <p className="text-[#1e1e3a] text-xs" style={{ fontFamily: "'Space Mono',monospace" }}>
              No commitment. We only proceed if your idea is approved.
            </p>
          </div>
        </div>
      </section>

      {/* ── MODAL ──────────────────────────────────────────────────────────────── */}
      {modalOpen && <PitchModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}