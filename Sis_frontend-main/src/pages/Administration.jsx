import { useState } from "react";
const ADMIN_TABS = ["Users", "Roles & Permissions", "Organization", "Audit Logs", "System Configuration"];
const USERS = [
    { id: "USR-001", name: "Rajesh Kumar", role: "DEO", org: "Ernakulam District", location: "Ernakulam", status: "Active", lastLogin: "10 Sep 2026 09:14" },
    { id: "USR-002", name: "Meena Lakshmi", role: "School User", org: "ZPHS Kondapur", location: "Rangareddy", status: "Active", lastLogin: "10 Sep 2026 08:47" },
    { id: "USR-003", name: "Arif Hussain", role: "MEO", org: "Serilingampally Mandal", location: "Rangareddy", status: "Active", lastLogin: "09 Sep 2026 16:30" },
    { id: "USR-004", name: "Sunitha Reddy", role: "Primary Education Head", org: "State Education Dept.", location: "Hyderabad", status: "Inactive", lastLogin: "01 Sep 2026" },
    { id: "USR-005", name: "Venkata Rao P.", role: "Auditor", org: "State Audit Authority", location: "Hyderabad", status: "Active", lastLogin: "08 Sep 2026 11:22" },
];
const AUDIT_LOGS = [
    { dt: "10 Sep 2026 09:47", user: "Rajesh Kumar", module: "Students", action: "Approve", record: "APP-2026-0887", status: "Success" },
    { dt: "10 Sep 2026 09:14", user: "Meena Lakshmi", module: "Students", action: "Create", record: "STU-2026-00148", status: "Success" },
    { dt: "09 Sep 2026 16:45", user: "Arif Hussain", module: "Approvals", action: "Send Back", record: "APP-2026-0882", status: "Success" },
    { dt: "09 Sep 2026 15:30", user: "System", module: "Authentication", action: "Login Failed", record: "Unknown user", status: "Failed" },
    { dt: "09 Sep 2026 14:22", user: "Venkata Rao P.", module: "Reports", action: "Export PDF", record: "RPT-2026-0234", status: "Success" },
];
const ROLES_LIST = [
    { name: "School User", module: "Primary", users: 1247 },
    { name: "MEO", module: "Primary", users: 184 },
    { name: "DEO", module: "Primary", users: 33 },
    { name: "Primary Education Head", module: "Primary", users: 1 },
    { name: "Intermediate College User", module: "Intermediate", users: 372 },
    { name: "DIEO", module: "Intermediate", users: 33 },
    { name: "Intermediate State Authority", module: "Intermediate", users: 2 },
    { name: "University College User", module: "University", users: 158 },
    { name: "University User", module: "University", users: 14 },
    { name: "Vice-Chancellor", module: "University", users: 14 },
    { name: "State Higher Education Authority", module: "University", users: 3 },
    { name: "Super Administrator", module: "System", users: 2 },
    { name: "State System Administrator", module: "System", users: 4 },
    { name: "Auditor", module: "System", users: 8 },
];
const PERMS = [
    { action: "View", students: true, attendance: true, docs: true, approvals: true, reports: true, masters: true, users: false, audit: false },
    { action: "Create", students: true, attendance: true, docs: true, approvals: false, reports: false, masters: true, users: false, audit: false },
    { action: "Edit", students: true, attendance: true, docs: true, approvals: false, reports: false, masters: true, users: false, audit: false },
    { action: "Approve", students: false, attendance: false, docs: true, approvals: true, reports: false, masters: false, users: false, audit: false },
    { action: "Deactivate", students: false, attendance: false, docs: false, approvals: false, reports: false, masters: true, users: true, audit: false },
];
const SYS_SECTIONS = [
    { label: "Academic Year", desc: "Configure current and upcoming academic years", icon: "📅" },
    { label: "Application Settings", desc: "General system behavior, defaults, and limits", icon: "⚙️" },
    { label: "Security", desc: "Password policy, session timeout, 2FA settings", icon: "🔐" },
    { label: "Notifications", desc: "Email/SMS templates and trigger configurations", icon: "🔔" },
    { label: "File Upload Settings", desc: "Allowed types, max file size, storage settings", icon: "📎" },
    { label: "Workflow Settings", desc: "Approval chain, escalation, and SLA rules", icon: "🔄" },
    { label: "Integration Settings", desc: "External API keys, endpoints, and sync config", icon: "🔗" },
];
const CONFIG_FIELDS = {
    "Academic Year": [
        { label: "Current Academic Year", type: "text", value: "2026–27" },
        { label: "Start Date", type: "date", value: "2026-06-01" },
        { label: "End Date", type: "date", value: "2027-03-31" },
        { label: "Registration Open", type: "select", value: "Yes" },
    ],
    "Application Settings": [
        { label: "Application Name", type: "text", value: "State SIS Portal" },
        { label: "Max File Upload (MB)", type: "text", value: "10" },
        { label: "Session Timeout (min)", type: "text", value: "30" },
        { label: "Maintenance Mode", type: "select", value: "Off" },
    ],
    "Security": [
        { label: "Min Password Length", type: "text", value: "8" },
        { label: "Password Expiry (days)", type: "text", value: "90" },
        { label: "Max Login Attempts", type: "text", value: "5" },
        { label: "Two-Factor Auth", type: "select", value: "Optional" },
    ],
    "Notifications": [
        { label: "Email Notifications", type: "select", value: "Enabled" },
        { label: "SMS Notifications", type: "select", value: "Enabled" },
        { label: "Admin Email", type: "text", value: "admin@state.edu.in" },
        { label: "SMTP Host", type: "text", value: "smtp.state.gov.in" },
    ],
    "File Upload Settings": [
        { label: "Allowed Types", type: "text", value: "pdf,jpg,png,docx" },
        { label: "Max Size (MB)", type: "text", value: "10" },
        { label: "Storage Provider", type: "select", value: "State Cloud" },
        { label: "Virus Scan", type: "select", value: "Enabled" },
    ],
    "Workflow Settings": [
        { label: "Approval Levels", type: "text", value: "3" },
        { label: "SLA – Approval (hrs)", type: "text", value: "48" },
        { label: "Escalation (hrs)", type: "text", value: "72" },
        { label: "Auto-Reject After (days)", type: "text", value: "7" },
    ],
    "Integration Settings": [
        { label: "Aadhaar API Endpoint", type: "text", value: "https://auth.uidai.gov.in/api" },
        { label: "Bank Verification API", type: "text", value: "https://npci.gov.in/verify" },
        { label: "CBSE API Key", type: "text", value: "••••••••••••" },
        { label: "DigiLocker Enabled", type: "select", value: "Yes" },
    ],
};
function Modal({ title, onClose, children }) {
    return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[480px] max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">{title}</h2>
          <button onClick={onClose} className="text-[#4a6080] hover:text-[#1a3a5c] text-lg leading-none">✕</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>);
}
function Field({ label, type = "text", defaultValue = "", options = [] }) {
    return (<div>
      <label className="block text-xs font-medium text-[#4a6080] mb-1">{label}</label>
      {type === "select" ? (<select defaultValue={defaultValue} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white">
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>) : (<input type={type} defaultValue={defaultValue} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white"/>)}
    </div>);
}
export default function Administration() {
    const [tab, setTab] = useState(0);
    const [selectedRole, setSelectedRole] = useState("School User");
    const [showAddUser, setShowAddUser] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [deactivateUser, setDeactivateUser] = useState(null);
    const [resetPwUser, setResetPwUser] = useState(null);
    const [configSection, setConfigSection] = useState(null);
    const [savedConfig, setSavedConfig] = useState(false);
    const [savedUser, setSavedUser] = useState(false);
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Administration</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">Manage users, roles, permissions, audit logs, and system configuration.</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-0 mb-5 bg-white border border-[#c8d6e8] rounded-sm overflow-x-auto w-fit">
        {ADMIN_TABS.map((t, i) => (<button key={t} onClick={() => setTab(i)} className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors border-r border-[#c8d6e8] last:border-0 ${tab === i ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
            {t}
          </button>))}
      </div>

      {/* USERS */}
      {tab === 0 && (<div className="bg-white border border-[#c8d6e8] rounded-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
            <h2 className="text-sm font-semibold text-[#0d2137]">User Management</h2>
            <button onClick={() => setShowAddUser(true)} className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137]">+ Add User</button>
          </div>
          <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2">
            <input placeholder="Search users…" className="border border-[#c8d6e8] rounded px-3 py-2 text-sm w-64 focus:outline-none focus:border-[#2a5298] bg-white"/>
            <select className="border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none bg-white">
              <option>All Roles</option>
              {ROLES_LIST.map((r) => <option key={r.name}>{r.name}</option>)}
            </select>
            <select className="border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none bg-white">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#f5f7fb]">
                <tr>
                  {["User ID", "Name", "Role", "Organization", "Location", "Status", "Last Login", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{h}</th>))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3f8]">
                {USERS.map((u) => (<tr key={u.id} className="hover:bg-[#f8fafd]">
                    <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{u.id}</td>
                    <td className="px-3 py-2.5 font-medium text-[#1a2636]">{u.name}</td>
                    <td className="px-3 py-2.5 text-[#4a6080]">{u.role}</td>
                    <td className="px-3 py-2.5 text-[#4a6080] max-w-[120px] truncate">{u.org}</td>
                    <td className="px-3 py-2.5 text-[#4a6080]">{u.location}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${u.status === "Active" ? "bg-green-100 text-green-800 border border-green-300" : "bg-gray-100 text-gray-600 border border-gray-300"}`}>{u.status}</span>
                    </td>
                    <td className="px-3 py-2.5 text-[#4a6080]">{u.lastLogin}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1">
                        <button onClick={() => setEditUser(u)} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Edit</button>
                        <button onClick={() => setResetPwUser(u)} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Reset PW</button>
                        <button onClick={() => setDeactivateUser(u)} className={`text-[10px] border px-2 py-0.5 rounded-sm ${u.status === "Active" ? "border-red-200 text-red-600 hover:bg-red-50" : "border-green-200 text-green-700 hover:bg-green-50"}`}>{u.status === "Active" ? "Deactivate" : "Activate"}</button>
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>)}

      {/* ROLES & PERMISSIONS */}
      {tab === 1 && (<div className="flex gap-4">
          <div className="w-56 flex-shrink-0 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden">
            <div className="px-3 py-2.5 border-b border-[#c8d6e8]">
              <span className="text-xs font-semibold text-[#4a6080] uppercase tracking-wide">System Roles</span>
            </div>
            {ROLES_LIST.map((r) => (<button key={r.name} onClick={() => setSelectedRole(r.name)} className={`w-full text-left px-3 py-2 text-xs border-b border-[#f0f3f8] last:border-0 transition-colors
                  ${selectedRole === r.name ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f5f7fb]"}`}>
                <div className="font-medium">{r.name}</div>
                <div className={`text-[10px] mt-0.5 ${selectedRole === r.name ? "text-white/60" : "text-[#a0b0c8]"}`}>{r.module} · {r.users} users</div>
              </button>))}
          </div>

          <div className="flex-1">
            <div className="bg-white border border-[#c8d6e8] rounded-sm">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
                <div>
                  <h2 className="text-sm font-semibold text-[#0d2137]">{selectedRole}</h2>
                  <p className="text-xs text-[#4a6080] mt-0.5">Permission matrix — check to grant access</p>
                </div>
                <button className="bg-[#e07b1a] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#c56b12]">Save Permissions</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-[#f5f7fb]">
                    <tr>
                      <th className="text-left px-4 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">Action</th>
                      {["Students", "Attendance", "Documents", "Approvals", "Reports", "Masters", "Users", "Audit"].map((m) => (<th key={m} className="text-center px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{m}</th>))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0f3f8]">
                    {PERMS.map((p) => (<tr key={p.action} className="hover:bg-[#f8fafd]">
                        <td className="px-4 py-3 font-medium text-[#1a2636]">{p.action}</td>
                        {[p.students, p.attendance, p.docs, p.approvals, p.reports, p.masters, p.users, p.audit].map((v, i) => (<td key={i} className="text-center px-3 py-3">
                            <input type="checkbox" defaultChecked={v} className="accent-[#1a3a5c] w-3.5 h-3.5"/>
                          </td>))}
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>)}

      {/* AUDIT LOGS */}
      {tab === 3 && (<div className="bg-white border border-[#c8d6e8] rounded-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
            <h2 className="text-sm font-semibold text-[#0d2137]">Audit Logs</h2>
            <button className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1.5 rounded-sm hover:bg-[#f0f3f8]">Export</button>
          </div>
          <div className="px-4 py-3 border-b border-[#f0f3f8] flex flex-wrap gap-2">
            {["Date From", "Date To"].map((lbl) => (<input key={lbl} type="date" placeholder={lbl} className="border border-[#c8d6e8] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2a5298] bg-white"/>))}
            {["User", "Module", "Action"].map((f) => (<select key={f} className="border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none bg-white">
                <option>All {f}s</option>
              </select>))}
            <button className="bg-[#1a3a5c] text-white text-xs font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137]">Filter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#f5f7fb]">
                <tr>
                  {["Date / Time", "User", "Module", "Action", "Record", "Status"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{h}</th>))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3f8]">
                {AUDIT_LOGS.map((log, i) => (<tr key={i} className="hover:bg-[#f8fafd] cursor-pointer">
                    <td className="px-3 py-2.5 font-mono text-[11px] text-[#4a6080]">{log.dt}</td>
                    <td className="px-3 py-2.5 text-[#1a2636] font-medium">{log.user}</td>
                    <td className="px-3 py-2.5 text-[#4a6080]">{log.module}</td>
                    <td className="px-3 py-2.5 text-[#1a2636]">{log.action}</td>
                    <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{log.record}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${log.status === "Success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>{log.status}</span>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>)}

      {/* SYSTEM CONFIG */}
      {tab === 4 && (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SYS_SECTIONS.map((s) => (<button key={s.label} onClick={() => setConfigSection(s.label)} className="bg-white border border-[#c8d6e8] rounded-sm p-5 flex items-start gap-4 hover:shadow-sm hover:border-[#2a5298] transition-all cursor-pointer text-left w-full">
              <span className="text-2xl flex-shrink-0">{s.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#0d2137] mb-1">{s.label}</div>
                <div className="text-xs text-[#4a6080]">{s.desc}</div>
              </div>
              <span className="text-[#c8d6e8] text-sm mt-1">›</span>
            </button>))}
        </div>)}

      {/* Roles Save banner */}
      {tab === 1 && (<div className="mt-3 flex justify-end">
          <button className="bg-[#e07b1a] text-white text-xs font-semibold px-4 py-2 rounded-sm hover:bg-[#c56b12]">Save All Permission Changes</button>
        </div>)}

      {/* ORGANIZATION */}
      {tab === 2 && (<div className="bg-white border border-[#c8d6e8] rounded-sm p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-[#0d2137] mb-1">Organization Hierarchy</h2>
              <p className="text-xs text-[#4a6080]">Visual tree of the state's education organization structure.</p>
            </div>
          </div>
          <div className="font-mono text-xs text-[#1a2636] bg-[#f5f7fb] border border-[#e8eef7] rounded-sm p-5 leading-7">
            <div className="text-[#2a5298] font-bold">State</div>
            <div className="ml-4 text-[#1a2636]">├── <span className="text-[#1a3a5c] font-medium">District</span></div>
            <div className="ml-8 text-[#4a6080]">├── Mandal</div>
            <div className="ml-12 text-[#a0b0c8]">└── Schools</div>
            <div className="ml-8 text-[#4a6080]">└── Colleges</div>
            <div className="ml-4 text-[#1a2636]">└── <span className="text-[#1a3a5c] font-medium">Universities</span></div>
            <div className="ml-8 text-[#4a6080]">└── Colleges</div>
          </div>
        </div>)}

      {/* ADD USER MODAL */}
      {showAddUser && (<Modal title="Add New User" onClose={() => setShowAddUser(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name"/>
              <Field label="Last Name"/>
            </div>
            <Field label="Username"/>
            <Field label="Email" type="email"/>
            <Field label="Mobile"/>
            <Field label="Role" type="select" options={ROLES_LIST.map((r) => r.name)}/>
            <Field label="Organization"/>
            <Field label="Location"/>
            <Field label="Status" type="select" options={["Active", "Inactive"]}/>
            <div className="flex gap-2 pt-2 justify-end border-t border-[#f0f3f8]">
              <button onClick={() => setShowAddUser(false)} className="text-xs border border-[#c8d6e8] text-[#4a6080] px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
              <button onClick={() => { setSavedUser(true); setShowAddUser(false); setTimeout(() => setSavedUser(false), 2500); }} className="text-xs bg-[#1a3a5c] text-white px-4 py-2 rounded-sm hover:bg-[#0d2137]">Create User</button>
            </div>
          </div>
        </Modal>)}

      {/* EDIT USER MODAL */}
      {editUser && (<Modal title={`Edit User — ${editUser.name}`} onClose={() => setEditUser(null)}>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#f5f7fb] rounded-sm border border-[#e8eef7]">
              <div className="w-9 h-9 rounded-full bg-[#1a3a5c] flex items-center justify-center text-white text-sm font-bold">
                {editUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="text-xs font-semibold text-[#1a2636]">{editUser.name}</div>
                <div className="text-[10px] text-[#4a6080] font-mono">{editUser.id}</div>
              </div>
            </div>
            <Field label="Full Name" defaultValue={editUser.name}/>
            <Field label="Role" type="select" defaultValue={editUser.role} options={ROLES_LIST.map((r) => r.name)}/>
            <Field label="Organization" defaultValue={editUser.org}/>
            <Field label="Location" defaultValue={editUser.location}/>
            <Field label="Status" type="select" defaultValue={editUser.status} options={["Active", "Inactive"]}/>
            <div className="flex gap-2 pt-2 justify-end border-t border-[#f0f3f8]">
              <button onClick={() => setEditUser(null)} className="text-xs border border-[#c8d6e8] text-[#4a6080] px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
              <button onClick={() => { setSavedUser(true); setEditUser(null); setTimeout(() => setSavedUser(false), 2500); }} className="text-xs bg-[#1a3a5c] text-white px-4 py-2 rounded-sm hover:bg-[#0d2137]">Save Changes</button>
            </div>
          </div>
        </Modal>)}

      {/* RESET PASSWORD MODAL */}
      {resetPwUser && (<Modal title={`Reset Password — ${resetPwUser.name}`} onClose={() => setResetPwUser(null)}>
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-800">
              A temporary password will be sent to the user's registered email. They will be prompted to change it on next login.
            </div>
            <div className="p-3 bg-[#f5f7fb] rounded-sm border border-[#e8eef7] text-xs text-[#4a6080]">
              <div className="font-medium text-[#1a2636] mb-1">{resetPwUser.name}</div>
              <div className="font-mono text-[10px]">{resetPwUser.id} · {resetPwUser.org}</div>
            </div>
            <Field label="New Temporary Password" defaultValue="TempPass@2026"/>
            <div className="flex gap-2 pt-2 justify-end border-t border-[#f0f3f8]">
              <button onClick={() => setResetPwUser(null)} className="text-xs border border-[#c8d6e8] text-[#4a6080] px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
              <button onClick={() => { setSavedUser(true); setResetPwUser(null); setTimeout(() => setSavedUser(false), 2500); }} className="text-xs bg-[#e07b1a] text-white px-4 py-2 rounded-sm hover:bg-[#c56b12]">Send Reset Link</button>
            </div>
          </div>
        </Modal>)}

      {/* DEACTIVATE / ACTIVATE MODAL */}
      {deactivateUser && (<Modal title={deactivateUser.status === "Active" ? "Deactivate User" : "Activate User"} onClose={() => setDeactivateUser(null)}>
          <div className="space-y-4">
            <div className={`p-3 rounded-sm border text-xs ${deactivateUser.status === "Active" ? "bg-red-50 border-red-200 text-red-800" : "bg-green-50 border-green-200 text-green-800"}`}>
              {deactivateUser.status === "Active"
                ? "This user will lose access immediately. All active sessions will be terminated."
                : "This user will regain access with their previous role and permissions."}
            </div>
            <div className="p-3 bg-[#f5f7fb] rounded-sm border border-[#e8eef7] text-xs text-[#4a6080]">
              <div className="font-medium text-[#1a2636] mb-1">{deactivateUser.name}</div>
              <div className="font-mono text-[10px]">{deactivateUser.id} · {deactivateUser.role}</div>
            </div>
            <Field label="Reason"/>
            <div className="flex gap-2 pt-2 justify-end border-t border-[#f0f3f8]">
              <button onClick={() => setDeactivateUser(null)} className="text-xs border border-[#c8d6e8] text-[#4a6080] px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
              <button onClick={() => { setSavedUser(true); setDeactivateUser(null); setTimeout(() => setSavedUser(false), 2500); }} className={`text-xs text-white px-4 py-2 rounded-sm ${deactivateUser.status === "Active" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}>
                {deactivateUser.status === "Active" ? "Confirm Deactivate" : "Confirm Activate"}
              </button>
            </div>
          </div>
        </Modal>)}

      {/* SYSTEM CONFIG SECTION MODAL */}
      {configSection && (<Modal title={`${SYS_SECTIONS.find((s) => s.label === configSection)?.icon} ${configSection}`} onClose={() => { setConfigSection(null); setSavedConfig(false); }}>
          <div className="space-y-3">
            {(CONFIG_FIELDS[configSection] ?? []).map((f) => (<div key={f.label}>
                <label className="block text-xs font-medium text-[#4a6080] mb-1">{f.label}</label>
                {f.type === "select" ? (<select defaultValue={f.value} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white">
                    {["Yes", "No"].includes(f.value) ? ["Yes", "No"].map((o) => <option key={o}>{o}</option>) :
                        ["Enabled", "Disabled"].includes(f.value) ? ["Enabled", "Disabled"].map((o) => <option key={o}>{o}</option>) :
                            ["Optional", "Required"].includes(f.value) ? ["Optional", "Required"].map((o) => <option key={o}>{o}</option>) :
                                ["Off", "On"].includes(f.value) ? ["Off", "On"].map((o) => <option key={o}>{o}</option>) :
                                    ["State Cloud", "AWS S3", "Azure Blob"].map((o) => <option key={o}>{o}</option>)}
                  </select>) : (<input type={f.type} defaultValue={f.value} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white"/>)}
              </div>))}
            {savedConfig && <div className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-sm">✓ Settings saved successfully.</div>}
            <div className="flex gap-2 pt-2 justify-end border-t border-[#f0f3f8]">
              <button onClick={() => { setConfigSection(null); setSavedConfig(false); }} className="text-xs border border-[#c8d6e8] text-[#4a6080] px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Close</button>
              <button onClick={() => setSavedConfig(true)} className="text-xs bg-[#1a3a5c] text-white px-4 py-2 rounded-sm hover:bg-[#0d2137]">Save Settings</button>
            </div>
          </div>
        </Modal>)}

      {/* Toast */}
      {savedUser && (<div className="fixed bottom-5 right-5 z-50 bg-[#1a3a5c] text-white text-xs font-semibold px-4 py-2.5 rounded-sm shadow-lg">
          ✓ Changes saved successfully
        </div>)}
    </div>);
}
