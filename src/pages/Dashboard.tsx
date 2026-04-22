import { useUser, useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, CreditCard, Settings,
  Bell, TrendingUp, Clock, CheckCircle2, ChevronRight,
  Star, RefreshCw, AlertCircle, User, Shield, Building2,
  ExternalLink, Receipt, Wallet, MessageSquare, ChevronDown,
  Package, Truck, CheckCheck, FileText, Zap, Send,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type UserData = {
  clerkId: string;
  role?: string;
  orgId?: string;
};

type TrackingPhase = "requested" | "accepted" | "in_development" | "shipped" | "delivered";

type PhaseComment = {
  phase: TrackingPhase;
  text: string;
  author: string;
  date: string;
};

type Project = {
  _id: string;
  name: string;
  description?: string;
  status: "active" | "completed" | "pending" | "paused";
  progress: number;
  dueDate?: string;
  tech?: string[];
  trackingPhase?: TrackingPhase;
  phaseComments?: PhaseComment[];
};

type Payment = {
  _id: string;
  projectName: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  invoice?: string;
};

type NavItem = "Dashboard" | "Projects" | "Payments" | "Settings";

// ─── Status configs ───────────────────────────────────────────────────────────

const statusConfig = {
  active:    { label: "Active",    color: "text-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
  completed: { label: "Completed", color: "text-blue-400",    bg: "bg-blue-400/10",    dot: "bg-blue-400"    },
  pending:   { label: "Pending",   color: "text-amber-400",   bg: "bg-amber-400/10",   dot: "bg-amber-400"   },
  paused:    { label: "Paused",    color: "text-zinc-400",    bg: "bg-zinc-400/10",    dot: "bg-zinc-400"    },
};

const payStatusConfig = {
  paid:    { label: "Paid",    color: "text-emerald-400", bg: "bg-emerald-400/10" },
  pending: { label: "Pending", color: "text-amber-400",   bg: "bg-amber-400/10"   },
  overdue: { label: "Overdue", color: "text-red-400",     bg: "bg-red-400/10"     },
};

// ─── Tracking phases config ────────────────────────────────────────────────────

const PHASES: { id: TrackingPhase; label: string; icon: any; desc: string; color: string; glow: string }[] = [
  {
    id: "requested",
    label: "Requested",
    icon: FileText,
    desc: "Project request received",
    color: "text-slate-400",
    glow: "shadow-slate-500/40",
  },
  {
    id: "accepted",
    label: "Accepted",
    icon: CheckCheck,
    desc: "Reviewed & accepted",
    color: "text-blue-400",
    glow: "shadow-blue-500/40",
  },
  {
    id: "in_development",
    label: "In Development",
    icon: Zap,
    desc: "Actively being built",
    color: "text-violet-400",
    glow: "shadow-violet-500/40",
  },
  {
    id: "shipped",
    label: "Shipped",
    icon: Truck,
    desc: "Deployed & under review",
    color: "text-amber-400",
    glow: "shadow-amber-500/40",
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: Package,
    desc: "Project complete",
    color: "text-emerald-400",
    glow: "shadow-emerald-500/40",
  },
];

const phaseIndex = (p?: TrackingPhase) => PHASES.findIndex((ph) => ph.id === p);

// ─── Small helpers ────────────────────────────────────────────────────────────

function EmptyState({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl bg-white/4 border border-white/6 flex items-center justify-center mb-4">
        <Icon size={20} className="text-white/20" />
      </div>
      <p className="text-sm font-medium text-white/40 mb-1">{title}</p>
      <p className="text-xs text-white/20">{subtitle}</p>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="p-6 space-y-3">
      {[1, 2, 3].map(i => <div key={i} className="h-14 bg-white/4 rounded-lg animate-pulse" />)}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, bg, delta }: any) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon size={16} className={color} />
        </div>
        <span className="text-[11px] text-white/25 bg-white/[0.04] px-2 py-0.5 rounded-full">{delta}</span>
      </div>
      <p className="text-3xl font-bold text-white/90 mb-1">{value}</p>
      <p className="text-xs text-white/35">{label}</p>
    </div>
  );
}

// ─── Project Tracking Bar ─────────────────────────────────────────────────────

function ProjectTrackingBar({
  project,
  isAdmin,
  onPhaseChange,
  onAddComment,
}: {
  project: Project;
  isAdmin: boolean;
  onPhaseChange?: (projectId: string, phase: TrackingPhase) => void;
  onAddComment?: (projectId: string, phase: TrackingPhase, comment: string) => void;
}) {
  const currentIdx = phaseIndex(project.trackingPhase ?? "requested");
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentPhase, setCommentPhase] = useState<TrackingPhase>("in_development");
  const [showPhaseMenu, setShowPhaseMenu] = useState(false);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    onAddComment?.(project._id, commentPhase, commentText.trim());
    setCommentText("");
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Package size={13} className="text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">{project.name}</p>
            <p className="text-[10px] text-white/30">Project Tracking</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Admin phase changer */}
          {isAdmin && (
            <div className="relative">
              <button
                onClick={() => setShowPhaseMenu(!showPhaseMenu)}
                className="flex items-center gap-1.5 text-[11px] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-lg hover:bg-violet-500/15 transition-colors"
              >
                Update Phase <ChevronDown size={10} />
              </button>
              {showPhaseMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowPhaseMenu(false)} />
                  <div className="absolute right-0 top-8 w-48 bg-[#111125] border border-white/[0.08] rounded-xl shadow-2xl z-20 overflow-hidden">
                    {PHASES.map((ph) => (
                      <button
                        key={ph.id}
                        onClick={() => {
                          onPhaseChange?.(project._id, ph.id);
                          setShowPhaseMenu(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors hover:bg-white/[0.05] ${
                          project.trackingPhase === ph.id ? ph.color + " bg-white/[0.04]" : "text-white/50"
                        }`}
                      >
                        <ph.icon size={11} />
                        {ph.label}
                        {project.trackingPhase === ph.id && (
                          <span className="ml-auto text-[9px] opacity-60">current</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors"
          >
            <MessageSquare size={12} />
            <span>{(project.phaseComments ?? []).length}</span>
          </button>
        </div>
      </div>

      {/* Tracking bar */}
      <div className="px-6 py-6">
        <div className="relative">
          {/* Background connector line */}
          <div className="absolute top-5 left-5 right-5 h-[2px] bg-white/[0.06] rounded-full" />

          {/* Active connector line */}
          <div
            className="absolute top-5 left-5 h-[2px] rounded-full transition-all duration-700 ease-out"
            style={{
              width: currentIdx === 0 ? "0%" : `calc(${(currentIdx / (PHASES.length - 1)) * 100}% - 0px)`,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              boxShadow: "0 0 8px rgba(139,92,246,0.6)",
            }}
          />

          {/* Phase nodes */}
          <div className="relative flex justify-between">
            {PHASES.map((phase, idx) => {
              const isDone = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={phase.id} className="flex flex-col items-center gap-2.5" style={{ width: "20%" }}>
                  {/* Node */}
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative ${
                      isDone
                        ? "bg-violet-600 border-violet-500 shadow-lg shadow-violet-500/30"
                        : isCurrent
                        ? "bg-[#0c0c1a] border-violet-400 shadow-lg shadow-violet-400/50"
                        : "bg-[#0c0c1a] border-white/[0.1]"
                    }`}
                  >
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-violet-400/20" />
                    )}
                    <phase.icon
                      size={14}
                      className={
                        isDone
                          ? "text-white"
                          : isCurrent
                          ? phase.color
                          : "text-white/20"
                      }
                    />
                  </div>

                  {/* Label */}
                  <div className="text-center">
                    <p
                      className={`text-[11px] font-semibold leading-tight mb-0.5 ${
                        isDone || isCurrent ? "text-white/75" : "text-white/25"
                      }`}
                    >
                      {phase.label}
                    </p>
                    <p
                      className={`text-[9px] leading-tight hidden sm:block ${
                        isCurrent ? phase.color + " opacity-80" : "text-white/20"
                      }`}
                    >
                      {phase.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current phase callout */}
        {project.trackingPhase && (
          <div className="mt-5 flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.05] rounded-lg px-4 py-2.5">
            {(() => {
              const ph = PHASES[currentIdx];
              return (
                <>
                  <ph.icon size={13} className={ph.color} />
                  <p className="text-xs text-white/50">
                    Currently at{" "}
                    <span className={`font-semibold ${ph.color}`}>{ph.label}</span>
                    {" "}— {ph.desc}
                  </p>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Comments panel */}
      {showComments && (
        <div className="border-t border-white/[0.06] px-6 py-4">
          <p className="text-[11px] uppercase tracking-widest text-white/25 mb-3 font-medium">Phase Notes</p>

          {(project.phaseComments ?? []).length === 0 ? (
            <p className="text-xs text-white/25 py-3">No notes yet.</p>
          ) : (
            <div className="space-y-2.5 mb-4 max-h-48 overflow-y-auto">
              {(project.phaseComments ?? []).map((c, i) => {
                const ph = PHASES.find((p) => p.id === c.phase);
                return (
                  <div key={i} className="flex gap-3 bg-white/[0.02] rounded-lg px-3.5 py-2.5 border border-white/[0.04]">
                    <div className="mt-0.5">
                      {ph && <ph.icon size={11} className={ph.color} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-semibold text-white/50">{c.author}</span>
                        <span className="text-[9px] text-white/20">
                          {ph?.label} · {new Date(c.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <p className="text-xs text-white/55 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add comment — admin only */}
          {isAdmin && (
            <div className="space-y-2 pt-2 border-t border-white/[0.05]">
              <div className="flex gap-2">
                <select
                  value={commentPhase}
                  onChange={(e) => setCommentPhase(e.target.value as TrackingPhase)}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-[11px] text-white/50 focus:outline-none focus:border-violet-500/40 transition-all appearance-none"
                >
                  {PHASES.map((ph) => (
                    <option key={ph.id} value={ph.id} style={{ background: "#0e0e1f" }}>
                      {ph.label}
                    </option>
                  ))}
                </select>
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  placeholder="Add a note for the client…"
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white/70 placeholder-white/20 focus:outline-none focus:border-violet-500/40 transition-all"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-medium rounded-lg transition-colors"
                >
                  <Send size={11} /> Post
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Project rows (shared) ────────────────────────────────────────────────────

function ProjectRows({
  projects,
}: {
  projects: Project[];
  isAdmin: boolean;
  onPhaseChange?: (projectId: string, phase: TrackingPhase) => void;
  onAddComment?: (projectId: string, phase: TrackingPhase, comment: string) => void;
}) {
  return (
    <div className="divide-y divide-white/[0.04]">
      {projects.map((p) => {
        const s = statusConfig[p.status] ?? statusConfig.pending;
        return (
          <div key={p._id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0">
                <Star size={13} className="text-white/30 group-hover:text-violet-400 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/80 mb-1">{p.name}</p>
                {p.description && <p className="text-[11px] text-white/30 truncate mb-1">{p.description}</p>}
                <div className="flex gap-1.5 flex-wrap">
                  {(p.tech ?? []).map(t => (
                    <span key={t} className="text-[10px] text-white/30 bg-white/[0.04] px-1.5 py-0.5 rounded-md">{t}</span>
                  ))}
                </div>
              </div>
              <div className="w-28 shrink-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-white/30">Progress</span>
                  <span className="text-[10px] text-white/50">{p.progress ?? 0}%</span>
                </div>
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      p.status === "completed" ? "bg-blue-400" : p.status === "active" ? "bg-violet-500" : "bg-amber-400"
                    }`}
                    style={{ width: `${p.progress ?? 0}%` }}
                  />
                </div>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${s.bg} w-24 justify-center shrink-0`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                <span className={`text-[11px] font-medium ${s.color}`}>{s.label}</span>
              </div>
              {p.dueDate && (
                <div className="flex items-center gap-1.5 text-white/30 w-16 shrink-0">
                  <Clock size={11} />
                  <span className="text-[11px]">
                    {new Date(p.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function OverviewSection({
  projects,
  userData,
  loading,
  onPhaseChange,
  onAddComment,
}: {
  projects: Project[];
  userData: UserData | null;
  loading: boolean;
  onPhaseChange: (projectId: string, phase: TrackingPhase) => void;
  onAddComment: (projectId: string, phase: TrackingPhase, comment: string) => void;
}) {
  const isAdmin = userData?.role === "admin" || userData?.role === "employee";
  const active    = projects.filter(p => p.status === "active").length;
  const completed = projects.filter(p => p.status === "completed").length;

  // Pick the most recent active / pending project for the tracking showcase
  const featuredProject = projects.find(p => p.status === "active") ?? projects[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Projects" value={loading ? "—" : projects.length} icon={FolderKanban} color="text-violet-400"  bg="bg-violet-400/10"  delta="All time"    />
        <StatCard label="Active"         value={loading ? "—" : active}           icon={TrendingUp}   color="text-emerald-400" bg="bg-emerald-400/10" delta="In progress" />
        <StatCard label="Completed"      value={loading ? "—" : completed}        icon={CheckCircle2} color="text-blue-400"    bg="bg-blue-400/10"   delta="Delivered"   />
      </div>

      {/* Project Tracking */}
      {!loading && featuredProject && (
        <ProjectTrackingBar
          project={featuredProject}
          isAdmin={isAdmin}
          onPhaseChange={onPhaseChange}
          onAddComment={onAddComment}
        />
      )}
      {loading && (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
          <div className="space-y-3">
            <div className="h-4 w-40 bg-white/[0.05] rounded animate-pulse" />
            <div className="h-16 bg-white/[0.05] rounded-xl animate-pulse" />
          </div>
        </div>
      )}

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
          <FolderKanban size={15} className="text-violet-400" />
          <h2 className="text-sm font-medium text-white/80">Recent Projects</h2>
        </div>
        {loading ? <SkeletonRows /> : projects.length === 0
          ? <EmptyState icon={FolderKanban} title="No projects yet" subtitle="Your projects will appear here" />
          : <ProjectRows projects={projects.slice(0, 3)} isAdmin={isAdmin} onPhaseChange={onPhaseChange} onAddComment={onAddComment} />}
      </div>
    </div>
  );
}

function ProjectsSection({
  projects,
  loading,
  onRefresh,
  userData,
  onPhaseChange,
  onAddComment,
}: {
  projects: Project[];
  loading: boolean;
  onRefresh: () => void;
  userData: UserData | null;
  onPhaseChange: (projectId: string, phase: TrackingPhase) => void;
  onAddComment: (projectId: string, phase: TrackingPhase, comment: string) => void;
}) {
  const isAdmin = userData?.role === "admin" || userData?.role === "employee";
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = projects.find(p => p._id === selectedProjectId);

  return (
    <div className="space-y-5">
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderKanban size={15} className="text-violet-400" />
            <h2 className="text-sm font-medium text-white/80">All Projects</h2>
            {!loading && (
              <span className="text-[11px] text-white/25 bg-white/[0.04] px-2 py-0.5 rounded-full">{projects.length} total</span>
            )}
          </div>
          <button onClick={onRefresh} className="flex items-center gap-1.5 text-xs text-white/30 hover:text-violet-400 transition-colors">
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {loading ? <SkeletonRows /> : projects.length === 0
          ? <EmptyState icon={FolderKanban} title="No projects found" subtitle="Projects assigned to you will appear here" />
          : (
            <div className="divide-y divide-white/[0.04]">
              {projects.map((p) => {
                const s = statusConfig[p.status] ?? statusConfig.pending;
                const isSelected = selectedProjectId === p._id;
                return (
                  <div key={p._id}>
                    <div
                      onClick={() => setSelectedProjectId(isSelected ? null : p._id)}
                      className={`px-6 py-4 cursor-pointer transition-colors group ${isSelected ? "bg-violet-500/[0.07]" : "hover:bg-white/[0.02]"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-violet-500/20 border-violet-500/30" : "bg-white/[0.05] border-white/[0.06]"}`}>
                          <Star size={13} className={isSelected ? "text-violet-400" : "text-white/30 group-hover:text-violet-400 transition-colors"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white/80 mb-1">{p.name}</p>
                          {p.description && <p className="text-[11px] text-white/30 truncate mb-1">{p.description}</p>}
                          <div className="flex gap-1.5 flex-wrap">
                            {(p.tech ?? []).map(t => (
                              <span key={t} className="text-[10px] text-white/30 bg-white/[0.04] px-1.5 py-0.5 rounded-md">{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="w-28 shrink-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-white/30">Progress</span>
                            <span className="text-[10px] text-white/50">{p.progress ?? 0}%</span>
                          </div>
                          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${p.status === "completed" ? "bg-blue-400" : p.status === "active" ? "bg-violet-500" : "bg-amber-400"}`}
                              style={{ width: `${p.progress ?? 0}%` }}
                            />
                          </div>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${s.bg} w-24 justify-center shrink-0`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          <span className={`text-[11px] font-medium ${s.color}`}>{s.label}</span>
                        </div>
                        {p.dueDate && (
                          <div className="flex items-center gap-1.5 text-white/30 w-16 shrink-0">
                            <Clock size={11} />
                            <span className="text-[11px]">
                              {new Date(p.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                            </span>
                          </div>
                        )}
                        <ChevronDown
                          size={13}
                          className={`text-white/20 shrink-0 transition-transform duration-200 ${isSelected ? "rotate-180 text-violet-400" : ""}`}
                        />
                      </div>
                    </div>

                    {/* Inline tracking bar — expands on click */}
                    {isSelected && (
                      <div className="px-4 pb-4 bg-violet-500/[0.03]">
                        <ProjectTrackingBar
                          project={p}
                          isAdmin={isAdmin}
                          onPhaseChange={onPhaseChange}
                          onAddComment={onAddComment}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}

function PaymentsSection({ payments, loading, onRefresh }: { payments: Payment[]; loading: boolean; onRefresh: () => void }) {
  const totalPaid    = payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={15} className="text-emerald-400" />
            <span className="text-xs text-white/40">Total Paid</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">₹{totalPaid.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Receipt size={15} className="text-amber-400" />
            <span className="text-xs text-white/40">Pending</span>
          </div>
          <p className="text-2xl font-bold text-amber-400">₹{totalPending.toLocaleString("en-IN")}</p>
        </div>
      </div>
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard size={15} className="text-violet-400" />
            <h2 className="text-sm font-medium text-white/80">Payment History</h2>
          </div>
          <button onClick={onRefresh} className="flex items-center gap-1.5 text-xs text-white/30 hover:text-violet-400 transition-colors">
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
        {loading ? <SkeletonRows /> : payments.length === 0
          ? <EmptyState icon={CreditCard} title="No payments yet" subtitle="Your payment history will appear here" />
          : (
            <div className="divide-y divide-white/[0.04]">
              {payments.map(payment => {
                const s = payStatusConfig[payment.status];
                return (
                  <div key={payment._id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <Receipt size={13} className="text-white/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white/80">{payment.projectName}</p>
                      <p className="text-[11px] text-white/30">
                        {new Date(payment.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-white/80 shrink-0">₹{payment.amount.toLocaleString("en-IN")}</p>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${s.bg} shrink-0`}>
                      <span className={`text-[11px] font-medium ${s.color}`}>{s.label}</span>
                    </div>
                    {payment.invoice && (
                      <a href={payment.invoice} target="_blank" rel="noreferrer" className="text-white/20 hover:text-violet-400 transition-colors shrink-0">
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}

function SettingsSection({ userData, loading }: { userData: UserData | null; loading: boolean }) {
  return (
    <div className="space-y-6">
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-sm font-medium text-white/80 mb-4 flex items-center gap-2">
          <Settings size={14} className="text-violet-400" />
          Account Info
        </h2>
        {loading ? (
          <div className="space-y-2">
            {[70, 80, 60].map((w, i) => (
              <div key={i} className="h-4 bg-white/[0.05] rounded animate-pulse" style={{ width: `${w}%` }} />
            ))}
          </div>
        ) : userData ? (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Clerk ID",     value: userData.clerkId,        icon: User      },
              { label: "Role",         value: userData.role || "user", icon: Shield    },
              { label: "Organisation", value: userData.orgId || "N/A", icon: Building2 },
            ].map(item => (
              <div key={item.label} className="bg-white/[0.03] rounded-lg px-4 py-3 border border-white/[0.05]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <item.icon size={10} className="text-white/20" />
                  <p className="text-[10px] uppercase tracking-widest text-white/25">{item.label}</p>
                </div>
                <p className="text-sm text-white/70 font-mono truncate">{item.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-400/80">
            <AlertCircle size={14} />
            <p className="text-sm">Failed to load user data</p>
          </div>
        )}
      </div>
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
        <h2 className="text-sm font-medium text-white/80 mb-3 flex items-center gap-2">
          <Shield size={14} className="text-violet-400" /> Security
        </h2>
        <p className="text-xs text-white/30 leading-relaxed">
          Manage your password, connected accounts, and two-factor authentication through Clerk's account portal.
        </p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user }     = useUser();
  const { getToken } = useAuth();
  const navigate     = useNavigate();

  const [activeNav, setActiveNav] = useState<NavItem>("Dashboard");
  const [userData,  setUserData]  = useState<UserData | null>(null);
  const [projects,  setProjects]  = useState<Project[]>([]);
  const [payments,  setPayments]  = useState<Payment[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error("No auth token");

      const headers = { Authorization: `Bearer ${token}` };

      // User data
      const userRes = await fetch(`${API_URL}/api/users/me`, { headers });
      if (userRes.ok) {
        const userJson = await userRes.json();
        setUserData(userJson.user ?? userJson);
      }

      // Projects — graceful if route doesn't exist yet
      try {
        const projRes = await fetch(`${API_URL}/api/projects`, { headers });
        if (projRes.ok) {
          const projJson = await projRes.json();
          const raw: Project[] = Array.isArray(projJson) ? projJson : projJson.projects ?? [];
          // Seed trackingPhase to "requested" if missing
          setProjects(raw.map(p => ({ ...p, trackingPhase: p.trackingPhase ?? "requested", phaseComments: p.phaseComments ?? [] })));
        }
      } catch { /* route not set up yet */ }

      // Payments — graceful if route doesn't exist yet
      try {
        const payRes = await fetch(`${API_URL}/api/payments`, { headers });
        if (payRes.ok) {
          const payJson = await payRes.json();
          setPayments(Array.isArray(payJson) ? payJson : payJson.payments ?? []);
        }
      } catch { /* route not set up yet */ }

    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // ── Phase change (optimistic local + API) ──
  const handlePhaseChange = async (projectId: string, phase: TrackingPhase) => {
    setProjects(prev =>
      prev.map(p => p._id === projectId ? { ...p, trackingPhase: phase } : p)
    );
    try {
      const token = await getToken();
      await fetch(`${API_URL}/api/projects/${projectId}/phase`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ phase }),
      });
    } catch { /* optimistic update already applied */ }
  };

  // ── Add comment (optimistic local + API) ──
  const handleAddComment = async (projectId: string, phase: TrackingPhase, text: string) => {
    const newComment: PhaseComment = {
      phase,
      text,
      author: user?.firstName ?? "Admin",
      date: new Date().toISOString(),
    };
    setProjects(prev =>
      prev.map(p =>
        p._id === projectId
          ? { ...p, phaseComments: [...(p.phaseComments ?? []), newComment] }
          : p
      )
    );
    try {
      const token = await getToken();
      await fetch(`${API_URL}/api/projects/${projectId}/comments`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
    } catch { /* optimistic update already applied */ }
  };

  const navItems: { icon: any; label: NavItem }[] = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FolderKanban,    label: "Projects"  },
    { icon: CreditCard,      label: "Payments"  },
    { icon: Settings,        label: "Settings"  },
  ];

  const renderSection = () => {
    switch (activeNav) {
      case "Projects":
        return (
          <ProjectsSection
            projects={projects}
            loading={loading}
            onRefresh={fetchAll}
            userData={userData}
            onPhaseChange={handlePhaseChange}
            onAddComment={handleAddComment}
          />
        );
      case "Payments":
        return <PaymentsSection payments={payments} loading={loading} onRefresh={fetchAll} />;
      case "Settings":
        return <SettingsSection userData={userData} loading={loading} />;
      default:
        return (
          <OverviewSection
            projects={projects}
            userData={userData}
            loading={loading}
            onPhaseChange={handlePhaseChange}
            onAddComment={handleAddComment}
          />
        );
    }
  };

  return (
    <div className="flex bg-[#080810] text-white" style={{ minHeight: "100vh" }}>

      {/* ── Fixed sidebar ── */}
      <aside className="w-60 shrink-0 bg-[#0c0c1a] border-r border-white/[0.06] flex flex-col fixed top-0 left-0 h-screen z-20">

        {/* Logo → home */}
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity w-full text-left"
          >
            <img
              src="/logo.jpeg"
              alt="CodingoForge"
              className="w-8 h-8 rounded-full object-cover border border-violet-500/30 shrink-0"
            />
            <span className="text-sm font-semibold tracking-tight text-white/90">CodingoForge</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-white/25 px-2 mb-3 font-medium">Menu</p>
          {navItems.map(({ icon: Icon, label }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                  isActive
                    ? "bg-violet-500/15 text-violet-300 font-medium"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={15} className={isActive ? "text-violet-400" : "text-white/30 group-hover:text-white/50"} />
                {label}
                {isActive && <ChevronRight size={13} className="ml-auto text-violet-500/60" />}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} afterSignOutUrl="/" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/80 truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-[11px] text-white/30 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Content (sidebar offset) ── */}
      <div className="flex-1 flex flex-col ml-60">

        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-[#080810]/80 backdrop-blur-md border-b border-white/[0.06] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white/90">{activeNav}</h1>
            <p className="text-xs text-white/35 mt-0.5">Welcome back, {user?.firstName} 👋</p>
          </div>
          <div className="flex items-center gap-3">
            {error && (
              <div className="flex items-center gap-1.5 text-red-400/70 text-xs bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20">
                <AlertCircle size={12} /> {error}
              </div>
            )}
            <button
              onClick={fetchAll}
              title="Refresh data"
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] transition-colors"
            >
              <RefreshCw size={13} className={`text-white/50 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button className="relative w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] transition-colors">
              <Bell size={13} className="text-white/50" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-400" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}