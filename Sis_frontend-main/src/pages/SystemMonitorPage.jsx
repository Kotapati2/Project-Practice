import { useState } from "react";
/* ── System Usage Tab ───────────────────────────────────────────────── */
function SystemUsageTab() {
    const MODULES = [
        { name: "Students", icon: "👤", sessions: 12480, actions: 48240, errors: 12, uptime: "99.8%" },
        { name: "Education", icon: "🏫", sessions: 8420, actions: 31840, errors: 4, uptime: "99.9%" },
        { name: "Approvals", icon: "✅", sessions: 3240, actions: 14280, errors: 8, uptime: "99.7%" },
        { name: "Reports", icon: "📊", sessions: 4820, actions: 18640, errors: 2, uptime: "100%" },
        { name: "Administration", icon: "🔐", sessions: 1240, actions: 4820, errors: 1, uptime: "100%" },
        { name: "Masters", icon: "⚙️", sessions: 840, actions: 2480, errors: 3, uptime: "99.6%" },
    ];
    const HEALTH = [
        { label: "API Response (avg)", value: "142ms", good: true },
        { label: "DB Query (avg)", value: "38ms", good: true },
        { label: "Cache Hit Rate", value: "94.2%", good: true },
        { label: "Error Rate (24h)", value: "0.08%", good: true },
        { label: "CPU Utilisation", value: "34%", good: true },
        { label: "Memory Usage", value: "62%", good: true },
        { label: "Disk Usage", value: "48%", good: true },
        { label: "Active Sessions", value: "1,248", good: true },
    ];
    return (<div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
            { label: "Active Users (Now)", value: "1,248", bg: "bg-blue-50 border-blue-100", color: "text-[#1a3a5c]" },
            { label: "Today's Logins", value: "4,824", bg: "bg-green-50 border-green-100", color: "text-[#1a6b3a]" },
            { label: "Total Actions (24h)", value: "1,24,280", bg: "bg-amber-50 border-amber-100", color: "text-[#b45309]" },
            { label: "Errors (24h)", value: "30", bg: "bg-red-50 border-red-100", color: "text-red-700" },
        ].map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-[#c8d6e8] rounded-sm">
          <div className="px-4 py-3 border-b border-[#c8d6e8]">
            <h3 className="text-sm font-semibold text-[#0d2137]">Module Usage</h3>
          </div>
          <div className="divide-y divide-[#f0f3f8]">
            {MODULES.map((m) => {
            const maxSessions = Math.max(...MODULES.map((x) => x.sessions));
            const pct = (m.sessions / maxSessions) * 100;
            return (<div key={m.name} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{m.icon}</span>
                      <span className="text-xs font-medium text-[#1a2636]">{m.name}</span>
                    </div>
                    <span className="text-xs font-mono text-[#4a6080]">{m.sessions.toLocaleString()} sessions</span>
                  </div>
                  <div className="h-1.5 bg-[#e8eef7] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1a3a5c] rounded-full" style={{ width: `${pct}%` }}/>
                  </div>
                </div>);
        })}
          </div>
        </div>

        <div className="bg-white border border-[#c8d6e8] rounded-sm">
          <div className="px-4 py-3 border-b border-[#c8d6e8]">
            <h3 className="text-sm font-semibold text-[#0d2137]">System Health</h3>
          </div>
          <div className="grid grid-cols-2 gap-0 divide-y divide-[#f0f3f8]">
            {HEALTH.map((h) => (<div key={h.label} className="px-4 py-3 flex items-center justify-between border-r border-[#f0f3f8] odd:border-r">
                <span className="text-xs text-[#4a6080]">{h.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${h.good ? "bg-green-500" : "bg-red-500"}`}/>
                  <span className="text-xs font-mono font-bold text-[#1a2636]">{h.value}</span>
                </div>
              </div>))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="px-4 py-3 border-b border-[#c8d6e8]">
          <h3 className="text-sm font-semibold text-[#0d2137]">Module Detail</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Module", "Sessions", "Total Actions", "Errors", "Uptime"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {MODULES.map((m) => (<tr key={m.name} className="hover:bg-[#f8fafd]">
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{m.icon} {m.name}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{m.sessions.toLocaleString()}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{m.actions.toLocaleString()}</td>
                  <td className="px-3 py-2.5 font-mono text-red-600">{m.errors}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a6b3a] font-semibold">{m.uptime}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
/* ── Records Tab ────────────────────────────────────────────────────── */
function RecordsTab() {
    const RECORDS = [
        { id: "REC-2026-00001", type: "Student", action: "Registration", entity: "STU-2026-00142 — Arjun Ramakrishna", by: "School User (ZPHS Kondapur)", timestamp: "22-Sep-2026 09:14 IST" },
        { id: "REC-2026-00002", type: "Student", action: "Approval", entity: "STU-2026-00143 — Priya Suresh", by: "DEO (Ernakulam)", timestamp: "22-Sep-2026 10:32 IST" },
        { id: "REC-2026-00003", type: "Teacher", action: "Update", entity: "TCH-002 — P. Lakshmi Devi", by: "MEO (Mandal Edu. Officer)", timestamp: "21-Sep-2026 16:08 IST" },
        { id: "REC-2026-00004", type: "School", action: "Status Change", entity: "SCH-004 — Aided HS Begumpet → Inactive", by: "DEO (Ernakulam)", timestamp: "20-Sep-2026 14:22 IST" },
        { id: "REC-2026-00005", type: "User", action: "Password Reset", entity: "School User — ZPHS Uppal", by: "State Admin", timestamp: "19-Sep-2026 11:45 IST" },
        { id: "REC-2026-00006", type: "Student", action: "Document Upload", entity: "STU-2026-00144 — Mohammed Irfan", by: "School User (Govt Jr. College)", timestamp: "19-Sep-2026 09:30 IST" },
        { id: "REC-2026-00007", type: "College", action: "Registration", entity: "COL-007 — New Govt. Jr. College, Nalgonda", by: "DIEO (Dist. Officer)", timestamp: "18-Sep-2026 15:12 IST" },
        { id: "REC-2026-00008", type: "Approval", action: "Rejected", entity: "APP-2026-0231 — School data census", by: "Primary Education Head", timestamp: "17-Sep-2026 12:00 IST" },
    ];
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const filtered = RECORDS.filter((r) => {
        const matchSearch = r.entity.toLowerCase().includes(search.toLowerCase()) || r.by.toLowerCase().includes(search.toLowerCase()) || r.id.includes(search);
        const matchType = typeFilter === "All" || r.type === typeFilter;
        return matchSearch && matchType;
    });
    const TYPES = [...new Set(RECORDS.map((r) => r.type))];
    return (<div className="bg-white border border-[#c8d6e8] rounded-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
        <h2 className="text-sm font-semibold text-[#0d2137]">System Records (Read-only)</h2>
        <button className="text-xs border border-[#c8d6e8] text-[#2a5298] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Export CSV</button>
      </div>
      <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none bg-white">
          <option value="All">All Types</option>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search records, entities, users…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1"/>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-[#f5f7fb]">
            <tr>
              {["Record ID", "Entity Type", "Action", "Entity / Description", "Performed By", "Timestamp"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3f8]">
            {filtered.map((r) => (<tr key={r.id} className="hover:bg-[#f8fafd]">
                <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px] whitespace-nowrap">{r.id}</td>
                <td className="px-3 py-2.5">
                  <span className="bg-[#e8eef7] text-[#1a3a5c] text-[10px] font-semibold px-2 py-0.5 rounded-sm">{r.type}</span>
                </td>
                <td className="px-3 py-2.5 font-medium text-[#1a2636]">{r.action}</td>
                <td className="px-3 py-2.5 text-[#4a6080] max-w-[240px] truncate">{r.entity}</td>
                <td className="px-3 py-2.5 text-[#4a6080] max-w-[160px] truncate">{r.by}</td>
                <td className="px-3 py-2.5 font-mono text-[#4a6080] whitespace-nowrap text-[11px]">{r.timestamp}</td>
              </tr>))}
            {filtered.length === 0 && (<tr><td colSpan={6} className="px-3 py-8 text-center text-xs text-[#4a6080]">No records found.</td></tr>)}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-[#f0f3f8] flex items-center justify-between">
        <span className="text-xs text-[#4a6080]">Showing {filtered.length} of {RECORDS.length} records</span>
        <div className="flex gap-1">
          <button className="border border-[#c8d6e8] text-[#4a6080] text-xs px-2.5 py-1 rounded-sm hover:bg-[#f0f3f8]">← Prev</button>
          <button className="border border-[#c8d6e8] bg-[#1a3a5c] text-white text-xs px-2.5 py-1 rounded-sm">1</button>
          <button className="border border-[#c8d6e8] text-[#4a6080] text-xs px-2.5 py-1 rounded-sm hover:bg-[#f0f3f8]">Next →</button>
        </div>
      </div>
    </div>);
}
/* ── User Activity Tab ──────────────────────────────────────────────── */
function UserActivityTab() {
    const LOGS = [
        { session: "SES-924821", user: "K. Ramesh Babu", role: "DEO", ip: "192.168.1.42", login: "22-Sep-2026 08:42", logout: "22-Sep-2026 13:18", duration: "4h 36m", actions: 124, status: "Completed" },
        { session: "SES-924822", user: "P. Suresh", role: "MEO", ip: "10.0.0.84", login: "22-Sep-2026 09:12", logout: "Active", duration: "Ongoing", actions: 48, status: "Active" },
        { session: "SES-924823", user: "Rajiv S. (School User)", role: "School User", ip: "172.16.0.12", login: "22-Sep-2026 09:48", logout: "22-Sep-2026 11:30", duration: "1h 42m", actions: 32, status: "Completed" },
        { session: "SES-924820", user: "State Admin — NIC", role: "State Sys Admin", ip: "10.1.0.2", login: "21-Sep-2026 23:30", logout: "22-Sep-2026 01:12", duration: "1h 42m", actions: 68, status: "Completed" },
        { session: "SES-924819", user: "Auditor Ravi K.", role: "Auditor", ip: "192.168.2.10", login: "21-Sep-2026 14:00", logout: "21-Sep-2026 17:45", duration: "3h 45m", actions: 212, status: "Completed" },
        { session: "SES-924818", user: "Super Admin", role: "Super Admin", ip: "127.0.0.1", login: "21-Sep-2026 10:00", logout: "21-Sep-2026 12:30", duration: "2h 30m", actions: 94, status: "Completed" },
    ];
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const filtered = LOGS.filter((l) => {
        const matchSearch = l.user.toLowerCase().includes(search.toLowerCase()) || l.role.toLowerCase().includes(search.toLowerCase()) || l.session.includes(search);
        const matchStatus = statusFilter === "All" || l.status === statusFilter;
        return matchSearch && matchStatus;
    });
    return (<div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
            { label: "Active Sessions", value: String(LOGS.filter((l) => l.status === "Active").length), bg: "bg-green-50 border-green-100", color: "text-green-700" },
            { label: "Logins Today", value: "124", bg: "bg-blue-50 border-blue-100", color: "text-[#1a3a5c]" },
            { label: "Unique Users (7d)", value: "384", bg: "bg-amber-50 border-amber-100", color: "text-[#b45309]" },
            { label: "Avg Session Duration", value: "2h 48m", bg: "bg-slate-50 border-slate-100", color: "text-[#4a6080]" },
        ].map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Session Activity Log</h2>
          <button className="text-xs border border-[#c8d6e8] text-[#2a5298] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Export</button>
        </div>
        <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none bg-white">
            {["All", "Active", "Completed"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users, roles, sessions…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Session ID", "User", "Role", "IP Address", "Login Time", "Logout Time", "Duration", "Actions Taken", "Status"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((l) => (<tr key={l.session} className="hover:bg-[#f8fafd]">
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px] whitespace-nowrap">{l.session}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636] whitespace-nowrap">{l.user}</td>
                  <td className="px-3 py-2.5"><span className="bg-[#e8eef7] text-[#1a3a5c] text-[10px] font-semibold px-2 py-0.5 rounded-sm whitespace-nowrap">{l.role}</span></td>
                  <td className="px-3 py-2.5 font-mono text-[#4a6080]">{l.ip}</td>
                  <td className="px-3 py-2.5 font-mono text-[#4a6080] whitespace-nowrap text-[11px]">{l.login}</td>
                  <td className="px-3 py-2.5 font-mono text-[#4a6080] whitespace-nowrap text-[11px]">
                    {l.logout === "Active" ? <span className="text-green-600 font-semibold">● Active</span> : l.logout}
                  </td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{l.duration}</td>
                  <td className="px-3 py-2.5 text-center font-mono font-bold text-[#1a2636]">{l.actions}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold border ${l.status === "Active" ? "bg-green-100 text-green-800 border-green-300" : "bg-gray-100 text-gray-600 border-gray-300"}`}>{l.status}</span>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-[#f0f3f8]">
          <span className="text-xs text-[#4a6080]">Showing {filtered.length} of {LOGS.length} sessions</span>
        </div>
      </div>
    </div>);
}
const TITLES = {
    "system-usage": { title: "System Usage Monitor", desc: "Real-time platform metrics, module usage, and health indicators" },
    records: { title: "System Records", desc: "Read-only audit trail of all system events and entity changes" },
    "user-activity": { title: "User Activity", desc: "Session tracking, login history, and per-user action logs" },
};
const TABS = [
    { id: "system-usage", label: "System Usage" },
    { id: "records", label: "Records" },
    { id: "user-activity", label: "User Activity" },
];
export default function SystemMonitorPage({ route }) {
    const [activeTab, setActiveTab] = useState(route);
    const info = TITLES[activeTab];
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>{info.title}</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">{info.desc}</p>
      </div>

      <div className="flex gap-0 mb-5 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden w-fit">
        {TABS.map((t) => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-5 py-2.5 text-sm font-semibold transition-colors border-r border-[#c8d6e8] last:border-0 ${activeTab === t.id ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
            {t.label}
          </button>))}
      </div>

      {activeTab === "system-usage" && <SystemUsageTab />}
      {activeTab === "records" && <RecordsTab />}
      {activeTab === "user-activity" && <UserActivityTab />}
    </div>);
}
