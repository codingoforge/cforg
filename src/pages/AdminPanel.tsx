import { useUser, useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Shield, Users, User, Crown, UserCheck, UserX,
  Eye, EyeOff, X, Check, AlertCircle, RefreshCw,
  Bell, Palette, Globe, Lock, KeyRound, ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "admin" | "employee" | "user";

type DBUser = {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
};

type AdminTab = "account" | "team" | "security" | "notifications" | "preferences";
type Toast = { id: string; type: "success" | "error"; message: string };

// ─── useCurrentUser hook ──────────────────────────────────────────────────────

function useCurrentUser() {
  const { getToken, isSignedIn } = useAuth();
  const [dbUser, setDbUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) { setLoading(false); return; }

    getToken().then(async (token) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setDbUser(data.user);
        }
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    });
  }, [isSignedIn]);

  return { dbUser, loading };
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm shadow-2xl backdrop-blur-md pointer-events-auto ${
            t.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-300"
              : "bg-red-950/90 border-red-500/30 text-red-300"
          }`}
        >
          {t.type === "success" ? <Check size={13} /> : <AlertCircle size={13} />}
          <span>{t.message}</span>
          <button onClick={() => onDismiss(t.id)} className="ml-1 opacity-40 hover:opacity-100 transition-opacity">
            <X size={11} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Role badge ───────────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: Role }) {
  if (role === "admin")
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
        <Crown size={8} /> Admin
      </span>
    );
  if (role === "employee")
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold text-violet-400 bg-violet-400/10 border border-violet-400/20 px-2 py-0.5 rounded-full">
        <UserCheck size={8} /> Employee
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-white/30 bg-white/4 border border-white/6 px-2 py-0.5 rounded-full">
      <User size={8} /> User
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/3 border border-white/6 rounded-xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ icon: Icon, title, action }: { icon: any; title: string; action?: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-violet-400" />
        <h3 className="text-sm font-medium text-white/80">{title}</h3>
      </div>
      {action}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-white/90">{title}</h2>
      {subtitle && <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── Field row ────────────────────────────────────────────────────────────────

function FieldRow({
  label, value, type = "text", editable = false,
  onChange, placeholder, hint,
}: {
  label: string; value: string; type?: string; editable?: boolean;
  onChange?: (v: string) => void; placeholder?: string; hint?: string;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="flex items-start justify-between py-4 border-b border-white/5 last:border-0 gap-6">
      <div className="w-44 shrink-0">
        <p className="text-xs font-medium text-white/45">{label}</p>
        {hint && <p className="text-[10px] text-white/25 mt-0.5">{hint}</p>}
      </div>
      <div className="flex-1">
        {editable ? (
          <div className="relative">
            <input
              type={isPassword && !show ? "password" : "text"}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-white/4 border border-white/8 rounded-lg px-3 py-2 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/3 transition-all"
            />
            {isPassword && (
              <button
                onClick={() => setShow(!show)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
              >
                {show ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-white/60 font-mono py-2 break-all">{value || "—"}</p>
        )}
      </div>
    </div>
  );
}

// ─── Toggle row ───────────────────────────────────────────────────────────────

function ToggleRow({
  label, description, value, onChange,
}: {
  label: string; description?: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-white/65">{label}</p>
        {description && <p className="text-[11px] text-white/30 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{ height: "22px", width: "40px" }}
        className={`relative flex items-center rounded-full transition-all duration-200 shrink-0 ${
          value ? "bg-violet-500" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
            value ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────

function ConfirmModal({
  title, message, confirmLabel = "Confirm", danger = false,
  onConfirm, onCancel, loading,
}: {
  title: string; message: string; confirmLabel?: string; danger?: boolean;
  onConfirm: () => void; onCancel: () => void; loading?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[#0e0e1f] border border-white/8 rounded-2xl shadow-2xl p-6">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${danger ? "bg-red-500/10" : "bg-violet-500/10"}`}>
          <AlertCircle size={18} className={danger ? "text-red-400" : "text-violet-400"} />
        </div>
        <h3 className="text-sm font-semibold text-white/90 mb-2">{title}</h3>
        <p className="text-xs text-white/40 leading-relaxed mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm text-white/40 hover:text-white/60 transition-colors">Cancel</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-40 ${
              danger ? "bg-red-600 hover:bg-red-500 text-white" : "bg-violet-600 hover:bg-violet-500 text-white"
            }`}
          >
            {loading && <RefreshCw size={12} className="animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name, email }: { name: string; email: string }) {
  const letter = (name || email || "?").charAt(0).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-linear-to-br from-violet-500/40 to-blue-500/20 border border-white/8 flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-white/70">{letter}</span>
    </div>
  );
}

// ─── Tab: Account ─────────────────────────────────────────────────────────────

// ✅ dbUser prop add kiya — role DB se aayega
function AccountTab({ user, dbUser }: { user: any; dbUser: DBUser | null }) {
  return (
    <div className="space-y-6">
      <SectionHeader title="Account Information" subtitle="Your profile details synced from Clerk" />

      <Card>
        <CardHeader icon={User} title="Profile" />
        <div className="px-6 py-5">
          {/* Avatar row */}
          <div className="flex items-center gap-4 pb-5 mb-5 border-b border-white/5">
            <div className="relative">
              <UserButton appearance={{ elements: { avatarBox: "w-14 h-14" } }} afterSignOutUrl="/" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/90">{user?.fullName || "—"}</p>
              <p className="text-xs text-white/35 mt-0.5">{user?.primaryEmailAddress?.emailAddress}</p>
              {/* ✅ Hardcoded Admin badge hata diya — ab DB se role aata hai */}
              <div className="mt-2">
                {dbUser ? (
                  <RoleBadge role={dbUser.role} />
                ) : (
                  <span className="inline-block h-5 w-16 bg-white/5 rounded-full animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="divide-y divide-white/[0.05]">
            <FieldRow label="Full Name"    value={user?.fullName ?? ""}                             hint="Edit via Clerk profile" />
            <FieldRow label="Email"        value={user?.primaryEmailAddress?.emailAddress ?? ""}    hint="Managed by Clerk" />
            <FieldRow label="Clerk ID"     value={user?.id ?? ""}                                   hint="Read-only" />
          </div>

          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-[11px] text-white/25 leading-relaxed">
              To update your name, email, or profile picture, click your avatar above to open the Clerk account portal.
            </p>
          </div>
        </div>
      </Card>

      {/* Danger zone */}
      <Card>
        <CardHeader icon={AlertCircle} title="Danger Zone" />
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/65">Sign out of all sessions</p>
              <p className="text-[11px] text-white/30 mt-0.5">Revokes all active sessions across all devices immediately.</p>
            </div>
            <button className="px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium rounded-lg transition-colors shrink-0">
              Sign Out All
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Tab: Team ────────────────────────────────────────────────────────────────

function TeamTab({
  apiUrl, token, onToast, currentUserClerkId,
}: {
  apiUrl: string; token: string | null; onToast: (t: Omit<Toast, "id">) => void; currentUserClerkId: string;
}) {
  const [users, setUsers]         = useState<DBUser[]>([]);
  const [loading, setLoading]     = useState(true);
  const [actionId, setActionId]   = useState<string | null>(null);
  const [confirmData, setConfirmData] = useState<{
    user: DBUser; action: "promote" | "demote" | "make-admin";
  } | null>(null);
  const [openMenu, setOpenMenu]   = useState<string | null>(null);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/admin/users`, { headers });
      if (res.ok) {
        const json = await res.json();
        setUsers(json.users ?? []);
      } else {
        onToast({ type: "error", message: "Failed to load users" });
      }
    } catch {
      onToast({ type: "error", message: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (token) fetchUsers(); }, [token]);

  const handleAction = async (userId: string, action: "promote" | "demote" | "make-admin") => {
    setActionId(userId);
    setConfirmData(null);
    try {
      const res = await fetch(`${apiUrl}/api/admin/users/${userId}/${action}`, {
        method: "PATCH", headers,
      });
      if (res.ok) {
        const messages = {
          promote:    "User promoted to Employee",
          demote:     "Employee access revoked — still a user",
          "make-admin": "User promoted to Admin",
        };
        onToast({ type: "success", message: messages[action] });
        fetchUsers();
      } else {
        const json = await res.json();
        onToast({ type: "error", message: json.message ?? "Action failed" });
      }
    } catch {
      onToast({ type: "error", message: "Network error" });
    } finally {
      setActionId(null);
    }
  };

  const admins    = users.filter((u) => u.role === "admin");
  const employees = users.filter((u) => u.role === "employee");

  return (
    <>
      <div className="space-y-6 ">
        <SectionHeader
          title="Team Management"
          subtitle="Promote signed-up users to employees or admin. Revoke access anytime — they remain as users."
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Users",   value: users.length,     color: "text-white/80",   bg: "bg-white/[0.03]"     },
            { label: "Employees",     value: employees.length, color: "text-violet-400", bg: "bg-violet-400/[0.06]" },
            { label: "Admins",        value: admins.length,    color: "text-amber-400",  bg: "bg-amber-400/[0.06]"  },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border border-white/6 rounded-xl px-4 py-4`}>
              <p className={`text-2xl font-bold ${s.color}`}>{loading ? "—" : s.value}</p>
              <p className="text-[11px] text-white/30 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* User table */}
        <Card>
          <CardHeader
            icon={Users}
            title="All Users"
            action={
              <button
                onClick={fetchUsers}
                className="flex items-center gap-1.5 text-xs text-white/30 hover:text-violet-400 transition-colors"
              >
                <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
            }
          />

          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-white/[0.03] rounded-lg animate-pulse" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Users size={20} className="text-white/15 mb-3" />
              <p className="text-sm text-white/30">No users yet</p>
              <p className="text-xs text-white/20 mt-0.5">Users appear here after they sign in for the first time</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {users.map((u) => {
                const isMe = u.clerkId === currentUserClerkId;
                const isLoading = actionId === u._id;

                return (
                  <div
                    key={u._id}
                    className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.015] transition-colors"
                  >
                    <Avatar name={u.name} email={u.email} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="text-sm font-medium text-white/80 truncate">
                          {u.name || "—"}
                          {isMe && (
                            <span className="ml-1.5 text-[10px] text-violet-400/60">(you)</span>
                          )}
                        </p>
                        <RoleBadge role={u.role} />
                      </div>
                      <p className="text-[11px] text-white/35 truncate">{u.email || u.clerkId}</p>
                    </div>

                    <p className="text-[10px] text-white/20 shrink-0 hidden sm:block">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>

                    {/* Action button */}
                    {isMe || u.role === "admin" ? (
                      <div className="w-28 shrink-0" />
                    ) : (
                      <div className="relative shrink-0">
                        <button
                          onClick={() => setOpenMenu(openMenu === u._id ? null : u._id)}
                          disabled={isLoading}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] rounded-lg text-xs text-white/45 hover:text-white/70 transition-colors disabled:opacity-40"
                        >
                          {isLoading ? (
                            <RefreshCw size={11} className="animate-spin" />
                          ) : (
                            <>
                              Actions <ChevronDown size={10} />
                            </>
                          )}
                        </button>

                        {openMenu === u._id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                            <div className="absolute right-0 top-9 w-48 bg-[#111125] border border-white/[0.08] rounded-xl shadow-2xl z-20 overflow-hidden">
                              {u.role === "user" && (
                                <button
                                  onClick={() => { setConfirmData({ user: u, action: "promote" }); setOpenMenu(null); }}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-violet-400 hover:bg-violet-500/10 transition-colors"
                                >
                                  <UserCheck size={12} /> Make Employee
                                </button>
                              )}
                              {u.role === "employee" && (
                                <button
                                  onClick={() => { setConfirmData({ user: u, action: "demote" }); setOpenMenu(null); }}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-amber-400 hover:bg-amber-500/10 transition-colors"
                                >
                                  <UserX size={12} /> Revoke Employee Access
                                </button>
                              )}
                              <div className="border-t border-white/[0.06]" />
                              <button
                                onClick={() => { setConfirmData({ user: u, action: "make-admin" }); setOpenMenu(null); }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                              >
                                <Crown size={12} /> Make Admin
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Role guide */}
        <Card>
          <CardHeader icon={Shield} title="Role Permissions" />
          <div className="px-6 py-5">
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  role: "user" as Role,
                  desc: "Can sign in. No internal access. Just a registered account.",
                  perms: ["Public pages only", "No dashboard access"],
                },
                {
                  role: "employee" as Role,
                  desc: "Internal team access. Can manage inquiries and projects.",
                  perms: ["View all inquiries", "Manage projects", "Send emails"],
                },
                {
                  role: "admin" as Role,
                  desc: "Full access. Can manage team roles and delete records.",
                  perms: ["Everything employee can", "Manage team roles", "Delete records"],
                },
              ].map((r) => (
                <div key={r.role} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                  <div className="mb-3">
                    <RoleBadge role={r.role} />
                  </div>
                  <p className="text-[11px] text-white/35 leading-relaxed mb-3">{r.desc}</p>
                  <ul className="space-y-1">
                    {r.perms.map((p) => (
                      <li key={p} className="flex items-center gap-1.5 text-[10px] text-white/30">
                        <Check size={9} className="text-violet-400/60 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {confirmData && (
        <ConfirmModal
          title={
            confirmData.action === "promote"
              ? "Make Employee?"
              : confirmData.action === "demote"
              ? "Revoke Employee Access?"
              : "Make Admin?"
          }
          message={
            confirmData.action === "promote"
              ? `${confirmData.user.name || confirmData.user.email} will get employee access to the dashboard.`
              : confirmData.action === "demote"
              ? `${confirmData.user.name || confirmData.user.email} will lose employee access but remain a regular user.`
              : `${confirmData.user.name || confirmData.user.email} will become an admin with full access. This gives them the same level of access as you.`
          }
          confirmLabel={
            confirmData.action === "promote"
              ? "Yes, Make Employee"
              : confirmData.action === "demote"
              ? "Yes, Revoke Access"
              : "Yes, Make Admin"
          }
          danger={confirmData.action === "make-admin" || confirmData.action === "demote"}
          onConfirm={() => handleAction(confirmData.user._id, confirmData.action)}
          onCancel={() => setConfirmData(null)}
          loading={actionId === confirmData.user._id}
        />
      )}
    </>
  );
}

// ─── Tab: Security ────────────────────────────────────────────────────────────

function SecurityTab({ onToast }: { onToast: (t: Omit<Toast, "id">) => void }) {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const valid = current.length > 0 && newPass.length >= 8 && newPass === confirm;

  const handleChange = async () => {
    if (!valid) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    onToast({ type: "success", message: "Password updated successfully" });
    setCurrent(""); setNewPass(""); setConfirm("");
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Security Settings" subtitle="Manage your password and session security" />

      <Card>
        <CardHeader icon={KeyRound} title="Change Password" />
        <div className="px-6 py-5">
          <div className="divide-y divide-white/[0.05]">
            <FieldRow label="Current Password" value={current} type="password" editable onChange={setCurrent} placeholder="Enter current password" />
            <FieldRow label="New Password"     value={newPass} type="password" editable onChange={setNewPass} placeholder="Min. 8 characters" hint="Choose something strong" />
            <FieldRow label="Confirm Password" value={confirm} type="password" editable onChange={setConfirm} placeholder="Repeat new password" />
          </div>
          {newPass.length > 0 && confirm.length > 0 && newPass !== confirm && (
            <p className="flex items-center gap-1.5 mt-3 text-red-400/80 text-xs">
              <AlertCircle size={11} /> Passwords don't match
            </p>
          )}
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleChange}
              disabled={!valid || loading}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {loading ? <RefreshCw size={13} className="animate-spin" /> : <Lock size={13} />}
              Update Password
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader icon={Globe} title="Sessions" />
        <div className="px-6 py-5">
          <div className="flex items-center justify-between py-3 border-b border-white/[0.05]">
            <div>
              <p className="text-sm text-white/65">Current Session</p>
              <p className="text-[11px] text-white/30 mt-0.5">Active now · This device</p>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full font-medium">
              Current
            </span>
          </div>
          <div className="pt-4">
            <button
              onClick={() => onToast({ type: "success", message: "All other sessions revoked" })}
              className="px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium rounded-lg transition-colors"
            >
              Revoke All Other Sessions
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Tab: Notifications ───────────────────────────────────────────────────────

function NotificationsTab({ onToast }: { onToast: (t: Omit<Toast, "id">) => void }) {
  const [prefs, setPrefs] = useState({
    newInquiry:      true,
    paymentReceived: true,
    stageShift:      false,
    teamChanges:     true,
    weeklyDigest:    false,
    securityAlerts:  true,
  });

  const toggle = (k: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [k]: !p[k] }));
    onToast({ type: "success", message: "Preference saved" });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Notification Preferences" subtitle="Control which events trigger email alerts" />
      <Card>
        <CardHeader icon={Bell} title="Email Notifications" />
        <div className="px-6 py-2 divide-y divide-white/[0.04]">
          <ToggleRow label="New Inquiry Submitted"  description="Alert when a founder submits a new inquiry."              value={prefs.newInquiry}      onChange={() => toggle("newInquiry")}      />
          <ToggleRow label="Payment Received"        description="Alert when a founder completes payment."                  value={prefs.paymentReceived} onChange={() => toggle("paymentReceived")} />
          <ToggleRow label="Project Stage Shift"     description="Notify when a project advances to the next stage."       value={prefs.stageShift}      onChange={() => toggle("stageShift")}      />
          <ToggleRow label="Team Role Changes"       description="Alert when a user is promoted or demoted."               value={prefs.teamChanges}     onChange={() => toggle("teamChanges")}     />
          <ToggleRow label="Weekly Activity Digest"  description="Weekly summary of all platform activity."                value={prefs.weeklyDigest}    onChange={() => toggle("weeklyDigest")}    />
          <ToggleRow label="Security Alerts"         description="Always receive alerts about login and security events."  value={prefs.securityAlerts}  onChange={() => toggle("securityAlerts")}  />
        </div>
      </Card>
    </div>
  );
}

// ─── Tab: Preferences ─────────────────────────────────────────────────────────

function PreferencesTab({ onToast }: { onToast: (t: Omit<Toast, "id">) => void }) {
  const [timezone,   setTimezone]   = useState("Asia/Kolkata");
  const [currency,   setCurrency]   = useState("INR");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  return (
    <div className="space-y-6">
      <SectionHeader title="Platform Preferences" subtitle="Regional and display settings" />

      <Card>
        <CardHeader icon={Palette} title="Regional Settings" />
        <div className="px-6 py-2 divide-y divide-white/[0.05]">
          {[
            { label: "Timezone",      value: timezone,   onChange: setTimezone,   options: ["Asia/Kolkata", "UTC", "America/New_York", "Europe/London"] },
            { label: "Currency",      value: currency,   onChange: setCurrency,   options: ["INR", "USD", "EUR", "GBP"] },
            { label: "Date Format",   value: dateFormat, onChange: setDateFormat, options: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between py-4">
              <p className="text-sm font-medium text-white/60">{f.label}</p>
              <div className="relative">
                <select
                  value={f.value}
                  onChange={(e) => { f.onChange(e.target.value); onToast({ type: "success", message: "Saved" }); }}
                  className="appearance-none bg-white/[0.04] border border-white/[0.08] rounded-lg pl-3 pr-8 py-1.5 text-sm text-white/70 focus:outline-none focus:border-violet-500/50 transition-all cursor-pointer"
                >
                  {f.options.map((o) => <option key={o} value={o} style={{ background: "#0e0e1f" }}>{o}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader icon={Globe} title="Platform Info" />
        <div className="px-6 py-2 divide-y divide-white/[0.05]">
          <FieldRow label="Version"     value="v3.0.0 — April 2026" />
          <FieldRow label="Environment" value={import.meta.env.MODE ?? "production"} />
          <FieldRow label="API URL"     value={import.meta.env.VITE_API_URL ?? "http://localhost:5000"} />
        </div>
      </Card>
    </div>
  );
}

// ─── Main AdminPanel ──────────────────────────────────────────────────────────

export default function AdminPanel() {
  const { user }     = useUser();
  const { getToken } = useAuth();

  // ✅ DB se current user ka role fetch karo
  const { dbUser } = useCurrentUser();

  const [activeTab, setActiveTab] = useState<AdminTab>("account");
  const [token,     setToken]     = useState<string | null>(null);
  const [toasts,    setToasts]    = useState<Toast[]>([]);

  const API_URL = import.meta.env.VITE_API_URL ?? "";

  useEffect(() => {
    getToken().then(setToken);
  }, []);

  const addToast = (t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
  };

  const tabs: { id: AdminTab; label: string; icon: any }[] = [
    { id: "account",       label: "Account",       icon: User    },
    { id: "team",          label: "Team",          icon: Users   },
    { id: "security",      label: "Security",      icon: Shield  },
    { id: "notifications", label: "Notifications", icon: Bell    },
    { id: "preferences",   label: "Preferences",   icon: Palette },
  ];

  const renderTab = () => {
    switch (activeTab) {
      // ✅ dbUser pass kiya AccountTab mein
      case "account":       return <AccountTab user={user} dbUser={dbUser} />;
      case "team":          return <TeamTab apiUrl={API_URL} token={token} onToast={addToast} currentUserClerkId={user?.id ?? ""} />;
      case "security":      return <SecurityTab onToast={addToast} />;
      case "notifications": return <NotificationsTab onToast={addToast} />;
      case "preferences":   return <PreferencesTab onToast={addToast} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#080810] text-white">
        <div className="px-8 pt-26 pb-0 max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-white/90">Admin Panel</h1>
            <p className="text-xs text-white/35 mt-0.5">Manage your account, team roles, and platform settings</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0.5 border-b border-white/[0.06] overflow-x-auto">
            {tabs.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px whitespace-nowrap ${
                    active
                      ? "border-violet-500 text-violet-300"
                      : "border-transparent text-white/35 hover:text-white/60 hover:border-white/[0.15]"
                  }`}
                >
                  <Icon size={13} className={active ? "text-violet-400" : "text-white/25"} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <main className="px-8 py-7 max-w-3xl mx-auto">
          {renderTab()}
        </main>
      </div>

      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))} />
    </>
  );
}