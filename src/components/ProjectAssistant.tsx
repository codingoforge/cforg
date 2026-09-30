import { useEffect, useRef, useState } from "react";
import { ArrowUp, LoaderCircle, Sparkles } from "lucide-react";

type Brief = {
  title: string; summary: string; solution: string;
  features: string[]; mvp: string[]; questions: string[];
};
const examples = [
  { label: "AI CRM", text: "I run a small service business and need a CRM to track leads, follow-ups and customer conversations. Help me define a practical first version." },
  { label: "Warehouse", text: "We manage stock in two warehouses using spreadsheets. We need inventory tracking, low-stock alerts and a simple dispatch workflow for our team." },
  { label: "Launch an MVP", text: "I want to launch a booking platform where customers find local professionals, book appointments and track their bookings. What should the MVP include?" },
];
function isBrief(value: unknown): value is Brief {
  if (!value || typeof value !== "object") return false;
  const b = value as Record<string, unknown>;
  return ["title", "summary", "solution"].every(k => typeof b[k] === "string" && b[k].length > 0)
    && ["features", "mvp", "questions"].every(k => Array.isArray(b[k]) && b[k].length > 0 && b[k].every(x => typeof x === "string"));
}
function formatBrief(idea: string, brief: Brief) {
  return `My idea:\n${idea}\n\nAI draft — for team review\n${brief.title}\n${brief.summary}\n\nRecommended solution: ${brief.solution}\n\nSuggested features:\n${brief.features.map(x => `• ${x}`).join("\n")}\n\nMVP scope:\n${brief.mvp.map(x => `• ${x}`).join("\n")}\n\nQuestions to clarify:\n${brief.questions.map(x => `• ${x}`).join("\n")}`;
}
export default function ProjectAssistant({ onUseBrief }: { onUseBrief: (idea: string) => void }) {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<{ idea: string; brief: Brief } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  useEffect(() => () => controller.current?.abort(), []);

  async function generate(event: React.FormEvent) {
    event.preventDefault();
    if (controller.current) return;
    const submitted = idea.trim();
    if (submitted.length < 20 || submitted.length > 3000) {
      setError("Tell us a little more: use 20–3,000 characters to describe your problem and who will use the solution.");
      input.current?.focus(); return;
    }
    const api = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
    if (!api) { setError("The assistant is not connected yet. You can send your idea to our team below."); return; }
    const request = new AbortController();
    controller.current = request;
    const timeout = window.setTimeout(() => request.abort(), 90000);
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch(`${api}/api/ai/brief`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: submitted }), signal: request.signal,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message || "The assistant is temporarily unavailable. Please try again.");
      if (!isBrief(data?.brief)) throw new Error("The assistant returned an incomplete brief. Please try again.");
      setResult({ idea: submitted, brief: data.brief });
    } catch (cause) {
      if (!request.signal.aborted) setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
      else setError("This is taking longer than expected. Please try again or send your idea to the team.");
    } finally { window.clearTimeout(timeout); controller.current = null; setLoading(false); }
  }
  function updateIdea(value: string) { setIdea(value); setResult(null); setError(""); }
  return (
    <div className="w-full max-w-2xl text-left">
      <div className="relative bg-[#0b1628] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles size={20} className="text-blue-300 shrink-0" />
          <h2 className="text-xl font-bold text-white">AI-Powered Project Planner</h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-5">Describe your business challenge. Get a clear starting point for your website, app, CRM, ERP or MVP.</p>
        <form onSubmit={generate}>
          <label htmlFor="project-idea" className="block text-sm font-medium text-blue-200 mb-2">What would you like to build?</label>
          <div className="bg-[#0a1424] border border-white/15 rounded-xl p-3 flex items-end gap-3 focus-within:border-blue-300">
            <textarea ref={input} id="project-idea" value={idea} disabled={loading} maxLength={3000} rows={4}
              aria-describedby="idea-help idea-count" aria-invalid={!!error}
              onChange={e => updateIdea(e.target.value)}
              placeholder="For example: We track warehouse stock in spreadsheets and need real-time inventory, alerts and dispatch tracking."
              className="min-w-0 flex-1 bg-transparent outline-none text-white text-sm placeholder:text-slate-500 resize-y leading-relaxed disabled:opacity-70" />
            <button type="submit" disabled={loading} aria-label={loading ? "Creating your brief" : "Generate project brief"}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-200">
              {loading ? <LoaderCircle size={20} className="animate-spin" /> : <ArrowUp size={20} />}
            </button>
          </div>
          <div className="flex justify-between gap-3 mt-2 text-xs text-slate-400">
            <p id="idea-help">Include the problem, users and must-have features.</p><span id="idea-count">{idea.length}/3000</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {examples.map(example => <button key={example.label} type="button" disabled={loading}
              onClick={() => { updateIdea(example.text); input.current?.focus(); }}
              className="text-xs px-3 py-2 rounded-full border border-blue-300/20 bg-blue-300/10 text-blue-100 hover:bg-blue-300/20 disabled:opacity-50">Try: {example.label}</button>)}
          </div>
          <p className="mt-4 text-xs text-slate-400">Your description is sent to Google Gemini to create the brief. Please leave out passwords and confidential customer information.</p>
        </form>
        {loading && <p role="status" className="mt-5 text-sm text-blue-200">Turning your idea into a clear plan… The first request may take a little longer.</p>}
        {error && <div role="alert" className="mt-5 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">{error}</div>}
        {result && <section aria-label="Your project brief" aria-live="polite" className="mt-6 border-t border-white/10 pt-6 space-y-5">
          <div><p className="text-xs uppercase tracking-wider text-blue-300 mb-2">Your starting point · AI draft</p><h3 className="text-xl font-bold">{result.brief.title}</h3><p className="text-sm text-slate-300 leading-relaxed mt-2">{result.brief.summary}</p></div>
          <p className="text-sm"><span className="text-slate-400">Recommended solution: </span>{result.brief.solution}</p>
          {([{ title: "Suggested features", items: result.brief.features }, { title: "MVP scope", items: result.brief.mvp }, { title: "Questions to clarify", items: result.brief.questions }]).map(section => <div key={section.title}><h4 className="font-semibold text-blue-100 mb-2">{section.title}</h4><ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">{section.items.map((item, i) => <li key={i}>{item}</li>)}</ul></div>)}
          <p className="text-xs text-slate-400">A starting point for discussion, not a quote or delivery commitment. Review and edit the brief before sending it.</p>
          <button type="button" onClick={() => onUseBrief(formatBrief(result.idea, result.brief))} className="rounded-full bg-blue-500 hover:bg-blue-400 px-5 py-3 text-sm font-bold">Discuss this brief with Codingo Forge →</button>
        </section>}
        {!result && !loading && <button type="button" onClick={() => onUseBrief(idea)} className="mt-5 text-sm text-blue-200 underline underline-offset-4">Prefer to talk? Send your idea to our team</button>}
      </div>
    </div>
  );
}
