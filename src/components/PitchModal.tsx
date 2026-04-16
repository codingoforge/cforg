import { useState } from "react";
import emailjs from "@emailjs/browser";

interface PitchModalProps {
  onClose: () => void;
}

export default function PitchModal({ onClose }: PitchModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    startup: "",
    idea: "",
    stage: "Idea",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const inputCls =
    "w-full bg-[#0a0a18] border border-[#1e1e3a] rounded-xl px-3 py-2.5 text-white text-sm placeholder-[#2a2a4a] focus:outline-none focus:border-[#7c5cfc] transition-colors font-['DM_Sans']";

  const selectCls =
    "w-full bg-[#0a0a18] border border-[#1e1e3a] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#7c5cfc] transition-colors font-['DM_Sans'] appearance-none";

  const labelCls =
    "block text-[10px] text-[#444466] mb-1 uppercase tracking-widest font-['Space_Mono']";

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg bg-[#0d0d1a] border border-[#1e1e3a] rounded-2xl overflow-hidden shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a2e]">
          <span
            style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: "0.12em" }}
            className="text-[#7c5cfc] uppercase"
          >
            pitch_intake
          </span>
          <button onClick={onClose} className="text-[#333355] hover:text-white text-lg transition-colors">
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-2xl font-black text-white">Pitch Your Idea</h2>
            <p className="text-[#444466] text-sm mt-1">Fill in the details and we'll get back to you.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Full Name</label>
              <input
                className={inputCls}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input
                className={inputCls}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Startup / Project Name</label>
              <input
                className={inputCls}
                placeholder="Your startup or project"
                value={form.startup}
                onChange={(e) => setForm({ ...form, startup: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Describe Your Idea</label>
              <textarea
                className={`${inputCls} resize-none h-24`}
                placeholder="Tell us about what you want to build..."
                value={form.idea}
                onChange={(e) => setForm({ ...form, idea: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Stage</label>
              <select
                className={selectCls}
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23444466' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: "2rem",
                }}
              >
                <option>Idea</option>
                <option>Validated</option>
                <option>Building</option>
                <option>Scaling</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === "sending" || status === "sent"}
            className="w-full text-white font-black py-3.5 rounded-xl uppercase text-sm tracking-widest transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#8ab4ff 0%,#5b8def 50%,#7c5cff 100%)", boxShadow: "0 0 28px rgba(138,180,255,0.25)" }}
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Submitted ✓" : "Submit & Confirm →"}
          </button>

          {status === "sent" && (
            <p className="text-center text-xs text-green-400" style={{ fontFamily: "'Space Mono',monospace" }}>
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