import { useState } from "react";
import { ROLES } from "./data/navConfig";
import Shell from "./components/Shell";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Education, { INTERMEDIATE_ROLES, UNIVERSITY_ROLES } from "./pages/Education";
import Approvals from "./pages/Approvals";
import Masters from "./pages/Masters";
import Administration from "./pages/Administration";
import AttendancePage from "./pages/Attendance";
import ClassesPage from "./pages/Classes";
import DocumentsPage from "./pages/Documents";
import ReportsPage from "./pages/Reports";
import ProfilePage from "./pages/Profile";
import PersonnelPage from "./pages/PersonnelPage";
import DataQualityPage from "./pages/DataQualityPage";
import GeographyPage from "./pages/GeographyPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AcademicsPage from "./pages/AcademicsPage";
import BankPage from "./pages/BankPage";
import SystemMonitorPage from "./pages/SystemMonitorPage";
import GenericPage from "./pages/GenericPage";
function RoleSwitcher({ onSelect, onClose }) {
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border border-[#c8d6e8] rounded shadow-xl w-[520px] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
          <div>
            <h2 className="text-base font-semibold text-[#0d2137]">Switch Role</h2>
            <p className="text-xs text-[#4a6080] mt-0.5">Select a role to preview its navigation and permissions</p>
          </div>
          <button onClick={onClose} className="text-[#4a6080] hover:text-[#1a3a5c] text-lg leading-none">✕</button>
        </div>
        <div className="p-4 grid grid-cols-2 gap-2">
          {ROLES.map((r) => (<button key={r.id} onClick={() => { onSelect(r.id); onClose(); }} className="text-left px-4 py-3 border border-[#c8d6e8] rounded-sm hover:bg-[#f0f3f8] hover:border-[#2a5298] transition-colors group">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-[#1a3a5c] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  {r.initials}
                </div>
                <span className="text-xs font-semibold text-[#1a2636] group-hover:text-[#1a3a5c]">{r.label}</span>
              </div>
              <div className="text-[10px] text-[#4a6080] truncate pl-8">{r.org}</div>
            </button>))}
        </div>
      </div>
    </div>);
}
function PageContent({ page, role, onNavigate, }) {
    const base = page.split("/")[0];
    const sub = page.includes("/") ? page.split("/").slice(1).join("/") : undefined;
    if (base === "dashboard")
        return <Dashboard role={role} onNavigate={onNavigate}/>;
    if (base === "students")
        return <Students subPage={sub} onNavigate={onNavigate} role={role}/>;
    // Education top-level institution lists
    if (["education", "schools", "colleges", "universities"].includes(base)) {
        const interRoutes = ["colleges"];
        const uniRoutes = ["universities"];
        let initialTab = 0;
        if (interRoutes.includes(base))
            initialTab = 1;
        else if (uniRoutes.includes(base)) {
            initialTab = INTERMEDIATE_ROLES.includes(role.id) && !UNIVERSITY_ROLES.includes(role.id) ? 1 : 2;
        }
        return <Education role={role} initialTab={initialTab} onNavigate={onNavigate}/>;
    }
    // Personnel management
    if (base === "teachers")
        return <PersonnelPage route="teachers" role={role}/>;
    if (base === "lecturers")
        return <PersonnelPage route="lecturers" role={role}/>;
    if (base === "faculty")
        return <PersonnelPage route="faculty" role={role}/>;
    // Academic sub-entities
    if (["departments", "programs", "courses", "sections", "enrollment", "academics", "examination"].includes(base))
        return <AcademicsPage route={base} role={role}/>;
    // Data quality
    if (base === "data-quality")
        return <DataQualityPage />;
    // Geography
    if (["mandals", "districts", "location"].includes(base))
        return <GeographyPage route={base}/>;
    // Analytics
    if (["analytics", "kpis", "comparison", "performance"].includes(base))
        return <AnalyticsPage route={base}/>;
    // Bank
    if (base === "bank")
        return <BankPage />;
    // System monitoring
    if (["system-usage", "records", "user-activity"].includes(base))
        return <SystemMonitorPage route={base}/>;
    if (base === "approvals")
        return <Approvals onNavigate={onNavigate}/>;
    if (base === "masters")
        return <Masters />;
    if (["users", "roles", "organization", "audit", "system-config", "integrations", "administration"].includes(base))
        return <Administration />;
    if (base === "attendance")
        return <AttendancePage />;
    if (base === "classes")
        return <ClassesPage />;
    if (base === "documents")
        return <DocumentsPage role={role}/>;
    if (base === "reports")
        return <ReportsPage role={role}/>;
    if (base === "profile")
        return <ProfilePage role={role}/>;
    // Catch-all generic page
    const title = page.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return <GenericPage title={title} description="This section is under active development." icon="🔧"/>;
}
export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [roleId, setRoleId] = useState("deo");
    const [page, setPage] = useState("dashboard");
    const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
    const role = ROLES.find((r) => r.id === roleId) ?? ROLES[2];
    if (!loggedIn) {
        return <Login onLogin={(rid) => { setRoleId(rid); setLoggedIn(true); }}/>;
    }
    return (<>
      <Shell role={role} activePage={page} onNavigate={setPage} onRoleChange={() => setShowRoleSwitcher(true)} breadcrumbs={undefined}>
        <PageContent page={page} role={role} onNavigate={setPage}/>
      </Shell>

      {showRoleSwitcher && (<RoleSwitcher onSelect={(rid) => { setRoleId(rid); setPage("dashboard"); }} onClose={() => setShowRoleSwitcher(false)}/>)}
    </>);
}
