import { useState, useEffect } from "react";

interface PitchModalProps {
  onClose: () => void;
}

export default function PitchModal({ onClose }: PitchModalProps) {

  const [currency, setCurrency] = useState("INR");
  const [convertedPrice, setConvertedPrice] = useState(12400);
  const [rate, setRate] = useState(1);
  const [budgetOptions, setBudgetOptions] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    startup: "",
    idea: "",
    stage: "Idea",
    budget: "",
  });

  const inputCls =
    "w-full bg-[#0a0a18] border border-[#1e1e3a] rounded-lg px-3 py-2 text-white text-sm placeholder-[#2a2a4a] focus:outline-none focus:border-[#7c5cfc] transition-colors";

  const selectCls =
    "w-full bg-[#0a0a18] border border-[#1e1e3a] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7c5cfc] transition-colors";

  const symbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "€";

  // 🔥 FETCH RATE
  useEffect(() => {
    if (currency === "INR") {
      setRate(1);
      setConvertedPrice(12400);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/currency/convert?amount=1&currency=${currency}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRate(data.amount);
          setConvertedPrice(parseFloat((12400 * data.amount).toFixed(2)));
        }
      })
      .catch(() => console.log("API error"));

  }, [currency]);

  // 🔥 DYNAMIC BUDGET
  useEffect(() => {
    const base = [
      { min: 0, max: 400000 },
      { min: 400000, max: 1200000 },
      { min: 1200000, max: 2500000 },
      { min: 2500000, max: null },
    ];

    const options = base.map(b => {
      if (b.max) {
        return `${Math.round(b.min * rate)} – ${Math.round(b.max * rate)}`;
      }
      return `${Math.round(b.min * rate)}+`;
    });

    setBudgetOptions(options);
    setForm(prev => ({ ...prev, budget: options[0] }));

  }, [rate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg bg-[#0d0d1a] border border-[#1e1e3a] rounded-2xl overflow-hidden shadow-2xl">

        {/* HEADER SAME */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a2e]">
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7c5cfc" }}>
            // pitch_intake.exe
          </span>
          <button onClick={onClose} className="text-[#333355] hover:text-white text-lg">✕</button>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-4">

          <div>
            <h2 className="text-2xl font-black text-white">Pitch Your Idea</h2>
            <p className="text-[#444466] text-sm mt-1">Fill in the details.</p>
          </div>

          {/* INPUTS */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "name", label: "Full Name" },
              { key: "email", label: "Email" },
              { key: "startup", label: "Startup / Project Name", col: 2 },
            ].map(({ key, label, col }) => (
              <div key={key} className={col === 2 ? "col-span-2" : ""}>
                <label className="text-xs text-[#444466]">{label}</label>
                <input
                  className={inputCls}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <textarea className={inputCls} placeholder="Idea" />

          {/* SELECTS */}
          <div className="grid grid-cols-3 gap-3">

            <select className={selectCls}>
              {["Idea", "Validated"].map(s => <option key={s}>{s}</option>)}
            </select>

            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={selectCls}>
              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
            </select>

            <select
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className={selectCls}
            >
              {budgetOptions.map((b, i) => (
                <option key={i}>
                  {symbol} {b}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE */}
          <div className="text-sm text-[#aaa]">
            Estimated:
            <span className="ml-2 text-white font-semibold">
              {symbol} {convertedPrice}
            </span>
          </div>

          <button className="w-full text-white font-black py-3 rounded-xl uppercase"
            style={{ background: "linear-gradient(135deg,#7c5cfc,#4f8ef7)" }}>
            Submit & Confirm →
          </button>

        </div>
      </div>
    </div>
  );
}