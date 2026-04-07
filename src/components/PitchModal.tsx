import { useState } from "react";

type Step = "form" | "analyzing" | "approved" | "payment" | "tracking";

interface FormData {
  name: string;
  email: string;
  startup: string;
  idea: string;
  stage: string;
  budget: string;
}

export default function PitchModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<FormData>({
    name: "", email: "", startup: "", idea: "", stage: "Idea", budget: "< $5K",
  });

  const [refId] = useState(() =>
    "CF-" + Math.random().toString(36).slice(2, 8).toUpperCase()
  );

  const [progress, setProgress] = useState(0);

  const handleSubmit = () => {
    setStep("analyzing");
    let p = 0;

    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => setStep("approved"), 500);
      }
      setProgress(Math.min(p, 100));
    }, 300);
  };

  const overlay = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm";
  const card = "relative w-full max-w-lg bg-[#0d0d0d] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl";

  return (
    <div className={overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={card}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
          <span className="font-mono text-xs text-[#ff6b35] tracking-widest uppercase">
            {step === "form" && "// pitch_intake.exe"}
            {step === "analyzing" && "// analyzing_idea..."}
            {step === "approved" && "// idea_approved ✓"}
            {step === "payment" && "// secure_payment"}
            {step === "tracking" && "// tracking_dashboard"}
          </span>

          <button onClick={onClose} className="text-[#555] hover:text-white text-lg">
            ✕
          </button>
        </div>

        <div className="p-6">

          {/* FORM */}
          {step === "form" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Pitch Your Idea</h2>
                <p className="text-[#666] text-sm mt-1">
                  Fill in the details. We'll analyze and get back within 24h.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "name", label: "Full Name", placeholder: "Jane Doe", col: 1 },
                  { key: "email", label: "Email", placeholder: "jane@startup.com", col: 1 },
                  { key: "startup", label: "Startup / Project Name", placeholder: "AcmeCorp", col: 2 },
                ].map(({ key, label, placeholder, col }) => (
                  <div key={key} className={col === 2 ? "col-span-2" : ""}>
                    <label className="block text-[#888] text-xs mb-1 font-mono uppercase tracking-wider">
                      {label}
                    </label>
                    <input
                      value={form[key as keyof FormData]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      placeholder={placeholder}
                      className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                ))}
              </div>

              <textarea
                value={form.idea}
                onChange={(e) => setForm({ ...form, idea: e.target.value })}
                placeholder="Describe your idea..."
                className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white text-sm"
              />

              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.email || !form.idea}
                className="w-full bg-[#ff6b35] text-white font-black py-3 rounded-xl"
              >
                Submit & Confirm →
              </button>
            </div>
          )}

          {/* ANALYZING */}
          {step === "analyzing" && (
            <div className="space-y-4">
              <h2 className="text-white font-bold">Analyzing...</h2>
              <div className="h-2 bg-[#1e1e1e] rounded">
                <div className="h-full bg-[#ff6b35]" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* APPROVED */}
          {step === "approved" && (
            <div className="text-center space-y-4">
              <h2 className="text-green-400 font-bold">Approved ✓</h2>
              <button
                onClick={() => setStep("payment")}
                className="bg-[#ff6b35] px-4 py-2 rounded"
              >
                Continue →
              </button>
            </div>
          )}

          {/* PAYMENT */}
          {step === "payment" && (
            <div className="text-center space-y-4">
              <h2>Payment</h2>
              <button
                onClick={() => setStep("tracking")}
                className="bg-[#ff6b35] px-4 py-2 rounded"
              >
                Pay →
              </button>
            </div>
          )}

          {/* TRACKING */}
          {step === "tracking" && (
            <div className="text-center space-y-4">
              <h2 className="text-xl">🚀 Started</h2>
              <p className="text-[#888]">{refId}</p>
              <button onClick={onClose} className="bg-[#333] px-4 py-2 rounded">
                Close
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}