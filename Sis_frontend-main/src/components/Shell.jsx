import { useState } from "react";
export default function Shell({ role, activePage, onNavigate, onRoleChange, children, breadcrumbs }) {
    const [collapsed, setCollapsed] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [notifOpen, setNotifOpen] = useState(false);
    const activeBase = activePage.split("/")[0];
    function renderNavItem(item, depth = 0) {
        const isActive = activePage === item.id || activePage.startsWith(item.id + "/");
        const isExpanded = expanded === item.id;
        const hasChildren = item.children && item.children.length > 0;
        return (<div key={item.id}>
        <button onClick={() => {
                if (hasChildren) {
                    setExpanded(isExpanded ? null : item.id);
                }
                else {
                    onNavigate(item.id);
                }
            }} title={collapsed ? item.label : undefined} className={`w-full flex items-center gap-2.5 text-left transition-colors text-sm group
            ${depth > 0 ? "pl-9 pr-3 py-1.5 text-xs" : "px-3 py-2"}
            ${isActive
                ? "bg-[#1a3a5c] text-white border-l-2 border-[#e07b1a]"
                : "text-white/65 hover:bg-[#1a3a5c]/50 hover:text-white border-l-2 border-transparent"}`}>
          {depth === 0 && (<span className={`text-base flex-shrink-0 w-5 text-center transition-opacity ${collapsed ? "opacity-100" : ""}`}>
              {item.icon}
            </span>)}
          {depth === 0 && !collapsed && (<span className="flex-1 truncate font-medium leading-none">{item.label}</span>)}
          {depth > 0 && <span className="flex-1 truncate">{item.label}</span>}
          {!collapsed && item.badge && (<span className="bg-[#e07b1a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {item.badge}
            </span>)}
          {!collapsed && hasChildren && depth === 0 && (<span className="text-white/40 text-[10px] ml-auto">{isExpanded ? "▴" : "▾"}</span>)}
        </button>
        {!collapsed && hasChildren && isExpanded && (<div className="bg-[#091726]">
            {item.children.map((child) => renderNavItem(child, depth + 1))}
          </div>)}
      </div>);
    }
    const pageTitle = (() => {
        function findLabel(items, id) {
            for (const item of items) {
                if (item.id === id)
                    return item.label;
                if (item.children) {
                    const found = findLabel(item.children, id);
                    if (found)
                        return found;
                }
            }
            return null;
        }
        return findLabel(role.nav, activePage) ?? activePage.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    })();
    return (<div className="flex flex-col h-full bg-[#f0f3f8]" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 h-14 bg-[#0d2137] border-b border-[#162e47] flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => setCollapsed((p) => !p)} className="text-white/60 hover:text-white w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors flex-shrink-0">
            ☰
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#e07b1a] flex items-center justify-center text-white text-[11px] font-bold tracking-tight">
              SIS
            </div>
            <div>
              <div className="text-white font-semibold text-sm leading-none">Student Information System</div>
              <div className="text-white/40 text-[10px] mt-0.5 leading-none">Government of State</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1.5 ml-3 pl-3 border-l border-white/15">
            <span className="text-white/40 text-xs">AY</span>
            <select className="bg-[#1a3a5c] text-white text-xs border border-white/20 rounded px-2 py-1 focus:outline-none focus:border-[#e07b1a] cursor-pointer">
              <option>2025–26</option>
              <option>2024–25</option>
              <option>2023–24</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setNotifOpen((p) => !p)} className="relative text-white/60 hover:text-white w-9 h-9 flex items-center justify-center rounded hover:bg-white/10 transition-colors">
              <span className="text-lg">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e07b1a] rounded-full border border-[#0d2137]"/>
            </button>
            {notifOpen && (<div className="absolute right-0 top-11 w-80 bg-white border border-[#c8d6e8] rounded shadow-lg z-50">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#e8eef7]">
                  <span className="text-sm font-semibold text-[#0d2137]">Notifications</span>
                  <button className="text-xs text-[#2a5298]">Mark all read</button>
                </div>
                {[
                { dot: "#e07b1a", text: "Student application #12345 submitted for verification", time: "2m ago" },
                { dot: "#2a5298", text: "Approval request from ZPHS Kondapur pending review", time: "1h ago" },
                { dot: "#1a6b3a", text: "Q2 data census deadline: 30 Sep 2026", time: "2h ago" },
                { dot: "#4a6080", text: "System maintenance window: 14 Sep 02:00 IST", time: "1d ago" },
            ].map((n, i) => (<div key={i} className="flex gap-3 px-4 py-3 hover:bg-[#f8fafd] cursor-pointer border-b border-[#f0f3f8] last:border-0">
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: n.dot }}/>
                    <div>
                      <p className="text-xs text-[#1a2636] leading-snug">{n.text}</p>
                      <p className="text-[10px] text-[#4a6080] mt-1">{n.time}</p>
                    </div>
                  </div>))}
                <div className="px-4 py-2.5 text-center">
                  <button className="text-xs text-[#2a5298] hover:text-[#e07b1a]">View all notifications</button>
                </div>
              </div>)}
          </div>

          <button className="text-white/60 hover:text-white w-9 h-9 flex items-center justify-center rounded hover:bg-white/10 transition-colors text-sm font-bold">
            ?
          </button>

          {/* Role switcher + user */}
          <div className="flex items-center gap-2 ml-1 pl-2 border-l border-white/15">
            <div className="w-7 h-7 rounded-full bg-[#2a5298] flex items-center justify-center text-white text-xs font-semibold">
              {role.initials}
            </div>
            <div className="hidden md:block">
              <div className="text-white text-xs font-medium leading-none">{role.label}</div>
              <div className="text-white/40 text-[10px] mt-0.5 leading-none truncate max-w-[140px]">{role.org}</div>
            </div>
            <button onClick={onRoleChange} className="text-[#e07b1a] text-[10px] border border-[#e07b1a]/40 rounded px-1.5 py-0.5 hover:bg-[#e07b1a]/10 transition-colors ml-1 flex-shrink-0" title="Switch Role">
              Switch
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className={`${collapsed ? "w-12" : "w-56"} flex-shrink-0 bg-[#0d2137] border-r border-[#162e47] flex flex-col transition-all duration-200 overflow-hidden z-10`}>
          <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin">
            {role.nav.map((item) => renderNavItem(item))}
          </nav>
          {!collapsed && (<div className="p-3 border-t border-[#162e47]">
              <div className="text-white/20 text-[10px] text-center">v2.4.1 · © 2026 Dept. of Education</div>
            </div>)}
        </aside>

        {/* MAIN */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Breadcrumb bar */}
          <div className="bg-white border-b border-[#c8d6e8] px-5 py-2 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-1 text-xs text-[#4a6080]">
              <button onClick={() => onNavigate("dashboard")} className="hover:text-[#2a5298]">Home</button>
              {(breadcrumbs ?? [pageTitle]).map((crumb, i, arr) => (<span key={i} className="flex items-center gap-1">
                  <span>›</span>
                  <span className={i === arr.length - 1 ? "text-[#1a3a5c] font-medium" : ""}>{crumb}</span>
                </span>))}
            </div>
            <div className="text-xs text-[#4a6080]">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>

          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Click away for notif */}
      {notifOpen && (<div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)}/>)}
    </div>);
}
