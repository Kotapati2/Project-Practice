import { useState } from "react";
const LOGIN_HISTORY = [
    { time: "21 Sep 2026, 09:02 AM", ip: "192.168.1.45", device: "Chrome / Windows", status: "Success" },
    { time: "20 Sep 2026, 03:15 PM", ip: "192.168.1.45", device: "Chrome / Windows", status: "Success" },
    { time: "19 Sep 2026, 08:47 AM", ip: "192.168.1.48", device: "Firefox / Windows", status: "Success" },
    { time: "18 Sep 2026, 11:30 AM", ip: "10.0.0.12", device: "Chrome / Windows", status: "Failed" },
    { time: "17 Sep 2026, 09:05 AM", ip: "192.168.1.45", device: "Chrome / Windows", status: "Success" },
];
export default function ProfilePage({ role }) {
    const [tab, setTab] = useState("info");
    const [editMode, setEditMode] = useState(false);
    const [showPwForm, setShowPwForm] = useState(false);
    const [saved, setSaved] = useState(false);
    function save() {
        setEditMode(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }
    const initials = role.initials;
    const name = role.label === "DEO" ? "Rajesh Kumar" :
        role.label === "MEO" ? "Mahesh Reddy" :
            role.label === "School User" ? "Suresh Babu" :
                role.label === "Super Administrator" ? "System Admin" : role.label;
    return (<div className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>My Profile</h1>
          <p className="text-sm text-[#4a6080] mt-0.5">Manage your personal information, role details, and security settings.</p>
        </div>
        {saved && <span className="text-xs bg-green-100 text-green-800 border border-green-300 px-3 py-1.5 rounded-sm font-semibold">✓ Changes saved</span>}
      </div>

      {/* Profile header card */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm p-5 mb-4 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#1a3a5c] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1">
          <h2 className="text-base font-bold text-[#0d2137]">{name}</h2>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1 text-xs text-[#4a6080]">
            <span>Role: <span className="font-semibold text-[#1a2636]">{role.label}</span></span>
            <span>Organisation: <span className="font-semibold text-[#1a2636]">{role.org}</span></span>
            <span>Employee ID: <span className="font-mono font-semibold text-[#2a5298]">EMP-{role.id.toUpperCase().replace(/-/g, "").slice(0, 6)}</span></span>
          </div>
        </div>
        <button onClick={() => setEditMode(!editMode)} className="text-sm font-semibold px-4 py-2 rounded-sm border transition-colors border-[#c8d6e8] text-[#2a5298] hover:bg-[#e8eef7]">
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm border-b-0">
        <div className="flex">
          {[["info", "Personal Info"], ["security", "Security"], ["history", "Login History"]].map(([key, label]) => (<button key={key} onClick={() => setTab(key)} className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors ${tab === key ? "border-[#1a3a5c] text-[#1a3a5c]" : "border-transparent text-[#4a6080] hover:text-[#1a3a5c]"}`}>
              {label}
            </button>))}
        </div>
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm rounded-tl-none p-6">
        {tab === "info" && (<div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-[#0d2137] mb-4 pb-2 border-b border-[#f0f3f8]">Personal Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                { label: "Full Name", value: name },
                { label: "Employee ID", value: `EMP-${role.id.toUpperCase().replace(/-/g, "").slice(0, 6)}` },
                { label: "Designation", value: role.label },
                { label: "Department", value: role.org },
                { label: "Email", value: `${role.id}@sis.gov.in` },
                { label: "Mobile", value: "98765 XXXXX" },
                { label: "Date of Joining", value: "01 Apr 2023" },
                { label: "District", value: "Rangareddy" },
                { label: "State", value: "Telangana" },
            ].map(({ label, value }) => (<div key={label}>
                    <label className="block text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{label}</label>
                    {editMode && !["Employee ID", "Designation", "Department", "Date of Joining"].includes(label) ? (<input defaultValue={value} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white"/>) : (<div className="text-sm text-[#1a2636] font-medium py-2">{value}</div>)}
                  </div>))}
              </div>
              {editMode && (<div className="mt-5 flex gap-2">
                  <button onClick={save} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137] transition-colors">Save Changes</button>
                  <button onClick={() => setEditMode(false)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
                </div>)}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0d2137] mb-4 pb-2 border-b border-[#f0f3f8]">Role & Permissions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                { label: "Role", value: role.label },
                { label: "Access Level", value: "Standard User" },
                { label: "Modules Accessible", value: `${role.nav?.length ?? 5}` },
                { label: "Last Role Change", value: "01 Apr 2023" },
            ].map(({ label, value }) => (<div key={label}>
                    <label className="block text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{label}</label>
                    <div className="text-sm text-[#1a2636] font-medium py-2">{value}</div>
                  </div>))}
              </div>
            </div>
          </div>)}

        {tab === "security" && (<div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-[#0d2137] mb-4 pb-2 border-b border-[#f0f3f8]">Change Password</h3>
              {!showPwForm ? (<button onClick={() => setShowPwForm(true)} className="text-sm font-semibold px-4 py-2 rounded-sm border border-[#c8d6e8] text-[#2a5298] hover:bg-[#e8eef7] transition-colors">
                  Change Password
                </button>) : (<div className="max-w-sm space-y-3">
                  {["Current Password", "New Password", "Confirm New Password"].map((lbl) => (<div key={lbl}>
                      <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">{lbl}</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white"/>
                    </div>))}
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => { setShowPwForm(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137] transition-colors">
                      Update Password
                    </button>
                    <button onClick={() => setShowPwForm(false)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
                  </div>
                </div>)}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0d2137] mb-4 pb-2 border-b border-[#f0f3f8]">Security Info</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                { label: "Last Password Change", value: "01 Jun 2026" },
                { label: "Password Expires", value: "01 Dec 2026" },
                { label: "Two-Factor Auth", value: "Not Enabled" },
                { label: "Active Sessions", value: "1" },
            ].map(({ label, value }) => (<div key={label}>
                    <label className="block text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{label}</label>
                    <div className="text-sm text-[#1a2636] font-medium py-2">{value}</div>
                  </div>))}
              </div>
            </div>
          </div>)}

        {tab === "history" && (<div>
            <h3 className="text-sm font-semibold text-[#0d2137] mb-4 pb-2 border-b border-[#f0f3f8]">Login History</h3>
            <table className="w-full text-xs">
              <thead className="bg-[#f5f7fb]">
                <tr>
                  {["Date & Time", "IP Address", "Device / Browser", "Status"].map((h) => (<th key={h} className="text-left px-4 py-2.5 text-[#4a6080] font-semibold uppercase tracking-wide text-[10px] border-b border-[#e8eef7]">{h}</th>))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3f8]">
                {LOGIN_HISTORY.map((l, i) => (<tr key={i} className="hover:bg-[#f8fafd]">
                    <td className="px-4 py-3 font-mono text-[11px] text-[#4a6080]">{l.time}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-[#1a2636]">{l.ip}</td>
                    <td className="px-4 py-3 text-[#4a6080]">{l.device}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm border ${l.status === "Success"
                    ? "bg-green-100 text-green-800 border-green-300"
                    : "bg-red-100 text-red-700 border-red-200"}`}>{l.status}</span>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>)}
      </div>
    </div>);
}
