import { useState } from "react";
import emailjs from "@emailjs/browser";
import { X } from "lucide-react";

interface PitchModalProps {
  onClose: () => void;
  initialIdea?: string;
}

export default function PitchModal({ onClose, initialIdea = "" }: PitchModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    startup: "",
    idea: initialIdea,
    stage: "Idea",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.startup) return;
    setStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          email: form.email,
          startup: form.startup,
          idea: form.idea,
          stage: form.stage,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-label="Pitch your idea"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/[0.08]"
        style={{ background: "linear-gradient(160deg, #0d2040 0%, #070f1d 100%)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }} />

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] relative z-10">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#8ab4ff]" style={{ fontFamily: "'Space Mono',monospace" }}>
            pitch_intake
          </span>
          <button aria-label="Close enquiry" onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/[0.08] transition-colors" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <X size={13} className="text-white/40" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5 relative z-10">
          <div>
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pitch Your Idea</h2>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Fill in the details and we'll get back to you.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-1" style={{ color: "#8ab4ff", fontFamily: "'Space Mono',monospace" }}>Full Name</label>
              <input
                className="w-full rounded-xl px-3 py-2.5 text-sm placeholder-white/20 focus:outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest mb-1" style={{ color: "#8ab4ff", fontFamily: "'Space Mono',monospace" }}>Email</label>
              <input
                className="w-full rounded-xl px-3 py-2.5 text-sm placeholder-white/20 focus:outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] uppercase tracking-widest mb-1" style={{ color: "#8ab4ff", fontFamily: "'Space Mono',monospace" }}>Startup / Project Name</label>
              <input
                className="w-full rounded-xl px-3 py-2.5 text-sm placeholder-white/20 focus:outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                placeholder="Your startup or project"
                value={form.startup}
                onChange={(e) => setForm({ ...form, startup: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] uppercase tracking-widest mb-1" style={{ color: "#8ab4ff", fontFamily: "'Space Mono',monospace" }}>Describe Your Idea</label>
              <textarea
                className="w-full rounded-xl px-3 py-2.5 text-sm placeholder-white/20 focus:outline-none transition-all resize-none h-24"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                placeholder="Tell us about what you want to build..."
                value={form.idea}
                onChange={(e) => setForm({ ...form, idea: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] uppercase tracking-widest mb-1" style={{ color: "#8ab4ff", fontFamily: "'Space Mono',monospace" }}>Stage</label>
              <div className="relative">
                <select
                  className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-all appearance-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", paddingRight: "2rem" }}
                  value={form.stage}
                  onChange={(e) => setForm({ ...form, stage: e.target.value })}
                >
                  <option value="Idea">Idea</option>
                  <option value="Validated">Validated</option>
                  <option value="Building">Building</option>
                  <option value="Scaling">Scaling</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === "sending" || status === "sent"}
            className="w-full text-white font-black py-3.5 rounded-full uppercase text-[13px] tracking-[0.07em] transition-all hover:opacity-92 hover:-translate-y-0.5 disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#8ab4ff 0%,#5b8def 50%,#7c5cff 100%)", boxShadow: "0 0 28px rgba(138,180,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Submitted ✓" : "Submit & Confirm →"}
          </button>

          {status === "sent" && (
            <p className="text-center text-xs text-emerald-400" style={{ fontFamily: "'Space Mono',monospace" }}>
              Message sent to codingoforge@gmail.com
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-xs text-red-400" style={{ fontFamily: "'Space Mono',monospace" }}>
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
