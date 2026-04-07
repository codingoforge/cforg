"use client";
import { useState,  useRef } from "react";

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

const SERVICES = [
  {
    icon: "⚡",
    title: "MVP in 4 Weeks",
    desc: "From raw idea to launchable product. We cut the fat and build what matters.",
    tag: "MOST POPULAR",
  },
  {
    icon: "🎯",
    title: "Pitch Decks",
    desc: "Investor-ready decks that tell your story with data-backed confidence.",
    tag: null,
  },
  {
    icon: "🔬",
    title: "Prototype Sprint",
    desc: "Clickable, testable prototypes in 72 hours. Validate before you build.",
    tag: "FAST TRACK",
  },
  {
    icon: "🚀",
    title: "Launch Package",
    desc: "End-to-end: MVP + landing page + analytics + onboarding flow.",
    tag: null,
  },
  {
    icon: "🧠",
    title: "Tech Strategy",
    desc: "Architecture decisions, stack recommendations, scalability roadmaps.",
    tag: null,
  },
  {
    icon: "♻️",
    title: "Rebuild & Rescue",
    desc: "Inherited a broken product? We audit, fix, and future-proof it.",
    tag: "RESCUE",
  },
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

  const overlay = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm";
  const card = "relative w-full max-w-lg bg-[#0d0d0d] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl";

  return (
    <div className={overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={card}>
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
          <span className="font-mono text-xs text-[#ff6b35] tracking-widest uppercase">
            {step === "form" && "// pitch_intake.exe"}
            {step === "analyzing" && "// analyzing_idea..."}
            {step === "approved" && "// idea_approved ✓"}
            {step === "payment" && "// secure_payment"}
            {step === "tracking" && "// tracking_dashboard"}
          </span>
          <button onClick={onClose} className="text-[#555] hover:text-white transition-colors text-lg">✕</button>
        </div>

        <div className="p-6">
          {/* ── FORM STEP ── */}
          {step === "form" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Pitch Your Idea</h2>
                <p className="text-[#666] text-sm mt-1">Fill in the details. We'll analyze and get back within 24h.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "name", label: "Full Name", placeholder: "Jane Doe", col: 1 },
                  { key: "email", label: "Email", placeholder: "jane@startup.com", col: 1 },
                  { key: "startup", label: "Startup / Project Name", placeholder: "AcmeCorp", col: 2 },
                ].map(({ key, label, placeholder, col }) => (
                  <div key={key} className={col === 2 ? "col-span-2" : ""}>
                    <label className="block text-[#888] text-xs mb-1 font-mono uppercase tracking-wider">{label}</label>
                    <input
                      value={form[key as keyof FormData]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#ff6b35] transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[#888] text-xs mb-1 font-mono uppercase tracking-wider">Idea Brief</label>
                <textarea
                  value={form.idea}
                  onChange={(e) => setForm({ ...form, idea: e.target.value })}
                  placeholder="Describe what you're building, who it's for, and the problem it solves..."
                  rows={3}
                  className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#ff6b35] transition-colors resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#888] text-xs mb-1 font-mono uppercase tracking-wider">Stage</label>
                  <select
                    value={form.stage}
                    onChange={(e) => setForm({ ...form, stage: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#ff6b35] transition-colors"
                  >
                    {["Idea", "Validated", "Pre-Revenue", "Early Revenue"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#888] text-xs mb-1 font-mono uppercase tracking-wider">Budget</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#ff6b35] transition-colors"
                  >
                    {["< $5K", "$5K–$15K", "$15K–$30K", "$30K+"].map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.email || !form.idea}
                className="w-full bg-[#ff6b35] hover:bg-[#ff8255] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-3 rounded-xl transition-all text-sm tracking-wide uppercase"
              >
                Submit & Confirm →
              </button>
            </div>
          )}

          {/* ── ANALYZING STEP ── */}
          {step === "analyzing" && (
            <div className="py-6 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Analyzing Your Idea</h2>
                <p className="text-[#666] text-sm mt-1">Our AI + team is reviewing scope, feasibility, and market fit.</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Idea clarity & scope", done: progress > 25 },
                  { label: "Technical feasibility", done: progress > 50 },
                  { label: "Market viability check", done: progress > 75 },
                  { label: "Budget alignment", done: progress > 90 },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition-all ${done ? "border-[#ff6b35] bg-[#ff6b35] text-white" : "border-[#333]"}`}>
                      {done ? "✓" : ""}
                    </div>
                    <span className={`text-sm transition-colors ${done ? "text-white" : "text-[#555]"}`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#555] font-mono">
                  <span>PROGRESS</span><span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff6b35] to-[#ff3d00] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── APPROVED STEP ── */}
          {step === "approved" && (
            <div className="py-2 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-lg">✓</div>
                <div>
                  <h2 className="text-xl font-black text-white">Idea Approved!</h2>
                  <p className="text-[#666] text-xs">Your concept has depth. Here's your proposal.</p>
                </div>
              </div>
              <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#888]">Project</span>
                  <span className="text-white font-semibold">{form.startup || "Your MVP"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888]">Scope</span>
                  <span className="text-white font-semibold">Full MVP + Launch Kit</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888]">Timeline</span>
                  <span className="text-white font-semibold">4 Weeks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888]">Sprints</span>
                  <span className="text-white font-semibold">4 × Weekly Reviews</span>
                </div>
                <div className="border-t border-[#2a2a2a] pt-3 flex justify-between">
                  <span className="text-[#888] font-mono text-sm uppercase tracking-wide">Total</span>
                  <span className="text-[#ff6b35] font-black text-xl">$12,400</span>
                </div>
              </div>
              <button
                onClick={() => setStep("payment")}
                className="w-full bg-[#ff6b35] hover:bg-[#ff8255] text-white font-black py-3 rounded-xl transition-all text-sm tracking-wide uppercase"
              >
                Proceed to Payment →
              </button>
            </div>
          )}

          {/* ── PAYMENT STEP ── */}
          {step === "payment" && (
            <div className="py-2 space-y-5">
              <div>
                <h2 className="text-2xl font-black text-white">Secure Payment</h2>
                <p className="text-[#666] text-sm mt-1">50% upfront · 50% on delivery. Milestone-based.</p>
              </div>
              <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#888]">Due Now (50%)</span>
                  <span className="text-white font-bold">$6,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888]">On Delivery</span>
                  <span className="text-[#555]">$6,200</span>
                </div>
              </div>
              <div className="space-y-3">
                <input placeholder="Card Number  •••• •••• •••• ••••" className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#ff6b35] transition-colors" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM / YY" className="bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#ff6b35] transition-colors" />
                  <input placeholder="CVV" className="bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#ff6b35] transition-colors" />
                </div>
              </div>
              <button
                onClick={() => setStep("tracking")}
                className="w-full bg-[#ff6b35] hover:bg-[#ff8255] text-white font-black py-3 rounded-xl transition-all text-sm tracking-wide uppercase"
              >
                Pay $6,200 & Start Building →
              </button>
            </div>
          )}

          {/* ── TRACKING STEP ── */}
          {step === "tracking" && (
            <div className="py-2 space-y-5">
              <div className="text-center space-y-2">
                <div className="text-4xl">🚀</div>
                <h2 className="text-2xl font-black text-white">You're In!</h2>
                <p className="text-[#666] text-sm">Your build has officially kicked off.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#ff6b35]/30 rounded-xl p-4 text-center">
                <p className="text-[#888] text-xs font-mono uppercase tracking-widest mb-1">Reference ID</p>
                <p className="text-[#ff6b35] font-mono font-black text-2xl tracking-widest">{refId}</p>
                <p className="text-[#555] text-xs mt-1">Use this to track your project status</p>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Kickoff Call", date: "Apr 10", status: "upcoming" },
                  { label: "Sprint 1 Review", date: "Apr 17", status: "scheduled" },
                  { label: "Sprint 2 Review", date: "Apr 24", status: "scheduled" },
                  { label: "Beta Delivery", date: "May 1", status: "scheduled" },
                  { label: "Final Launch", date: "May 8", status: "scheduled" },
                ].map(({ label, date, status }) => (
                  <div key={label} className="flex items-center justify-between text-sm py-2 border-b border-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${status === "upcoming" ? "bg-[#ff6b35] animate-pulse" : "bg-[#333]"}`} />
                      <span className="text-[#ccc]">{label}</span>
                    </div>
                    <span className="text-[#555] font-mono">{date}</span>
                  </div>
                ))}
              </div>
              <button onClick={onClose} className="w-full bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white font-bold py-3 rounded-xl transition-all text-sm">
                Close & Track Later
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CodingoForgeHomepage() {
  const [modalOpen, setModalOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);


  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;900&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #ff6b35; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }
        .marquee-track { animation: marquee 28s linear infinite; }
        .spin-slow { animation: spin-slow 12s linear infinite; }
        .card-hover { transition: transform 0.3s ease, border-color 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); border-color: #ff6b35 !important; }
        .step-line::after { content:''; position:absolute; left:50%; top:100%; width:1px; height:2rem; background: linear-gradient(to bottom, #ff6b35, transparent); transform:translateX(-50%); }
      `}</style>

      <NoiseBg />

   
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(#ff6b35 1px, transparent 1px), linear-gradient(90deg, #ff6b35 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff6b35]/8 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="fade-up delay-1 inline-flex items-center gap-2 bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff6b35] px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] animate-pulse" />
              MVP Studio · Est. 2025
            </div>
            <h1 className="fade-up delay-2 text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight">
              We Build<br />
              <span className="text-[#ff6b35]">MVPs That</span><br />
              Ship Fast.
            </h1>
            <p className="fade-up delay-3 text-[#888] text-lg leading-relaxed max-w-md">
              From zero to funded. We turn founder ideas into launchable products — designed for traction, built for scale.
            </p>
            <div className="fade-up delay-4 flex flex-wrap gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="group bg-[#ff6b35] hover:bg-[#ff8255] text-white font-black px-8 py-4 rounded-xl transition-all text-sm uppercase tracking-wide shadow-lg shadow-[#ff6b35]/20"
              >
                Pitch Your Idea <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
              </button>
              <a href="#process" className="border border-[#2a2a2a] hover:border-[#ff6b35]/50 text-[#888] hover:text-white font-bold px-8 py-4 rounded-xl transition-all text-sm uppercase tracking-wide">
                See How It Works
              </a>
            </div>
          </div>

          {/* Floating card */}
          <div className="fade-up delay-3 relative hidden lg:block">
            <div className="relative bg-[#0d0d0d] border border-[#2a2a2a] rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-[#555] text-xs font-mono">project_tracker.cf</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#888]">Project</span>
                  <span className="text-white font-semibold">AcmeMVP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#888]">Ref ID</span>
                  <span className="text-[#ff6b35] font-mono">CF-K9X3R1</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#888]">Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />Sprint 2 Active</span>
                </div>
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-[#666] font-mono">
                    <span>BUILD PROGRESS</span><span>60%</span>
                  </div>
                  <div className="h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-gradient-to-r from-[#ff6b35] to-[#ff3d00] rounded-full" />
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  {["✓ Kickoff Call", "✓ Design Sprint", "⟳ Engineering Sprint", "◦ Beta Testing", "◦ Launch"].map((s) => (
                    <div key={s} className={`text-xs font-mono ${s.startsWith("✓") ? "text-emerald-400" : s.startsWith("⟳") ? "text-[#ff6b35]" : "text-[#444]"}`}>{s}</div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#ff6b35] text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
              LIVE BUILD
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
      <div className="border-y border-[#1a1a1a] py-4 overflow-hidden bg-[#0a0a0a]">
        <div className="marquee-track flex gap-8 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-8">
              {["MVP Development", "Pitch Decks", "Rapid Prototyping", "Tech Strategy", "Launch Packages", "4-Week Delivery", "Startup Studio", "Founder-First"].map((t) => (
                <span key={t} className="text-[#333] text-sm font-mono uppercase tracking-widest">
                  {t} <span className="text-[#ff6b35] mx-3">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ val, label }) => (
          <div key={label} className="text-center space-y-1">
            <div className="text-4xl md:text-5xl font-black text-white">{val}</div>
            <div className="text-[#666] text-sm font-mono uppercase tracking-widest">{label}</div>
          </div>
        ))}
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[#ff6b35] font-mono text-xs uppercase tracking-widest mb-2">// what_we_build</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Our Services</h2>
          </div>
          <p className="text-[#666] text-sm max-w-xs leading-relaxed">Everything a startup needs to go from slide deck to market-ready product.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(({ icon, title, desc, tag }) => (
            <div key={title} className="card-hover relative bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-6 space-y-3">
              {tag && (
                <div className="absolute top-4 right-4 bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff6b35] text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-widest">{tag}</div>
              )}
              <div className="text-3xl">{icon}</div>
              <h3 className="font-black text-lg text-white">{title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────────────── */}
      <section id="process" className="bg-[#0a0a0a] border-y border-[#1a1a1a] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="text-[#ff6b35] font-mono text-xs uppercase tracking-widest mb-3">// how_it_works</p>
            <h2 className="text-4xl md:text-5xl font-black">From Idea to Launch</h2>
            <p className="text-[#666] mt-3 text-sm max-w-sm mx-auto">A streamlined, transparent process built for founders who move fast.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="relative bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-6 space-y-3 card-hover">
                <div className="text-[#ff6b35] font-mono font-black text-xs">{num}</div>
                <h3 className="font-black text-lg">{title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative bg-[#0d0d0d] border border-[#2a2a2a] rounded-2xl p-12 md:p-16 overflow-hidden text-center">
          {/* bg glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b35]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative space-y-6">
            <p className="text-[#ff6b35] font-mono text-xs uppercase tracking-widest">// ready_to_ship</p>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Your MVP is<br /><span className="text-[#ff6b35]">4 Weeks Away.</span>
            </h2>
            <p className="text-[#888] text-lg max-w-md mx-auto">
              Stop overthinking. Start building. Pitch your idea today and get a fixed-price proposal in 24 hours.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-block bg-[#ff6b35] hover:bg-[#ff8255] text-white font-black px-10 py-4 rounded-xl transition-all text-sm uppercase tracking-wide shadow-xl shadow-[#ff6b35]/20"
            >
              Pitch Your Idea — It's Free →
            </button>
            <p className="text-[#444] text-xs">No commitment. We only proceed if your idea is approved.</p>
          </div>
        </div>
      </section>

      {/* ── MODAL ───────────────────────────────────────────────────────────── */}
      {modalOpen && <PitchModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}