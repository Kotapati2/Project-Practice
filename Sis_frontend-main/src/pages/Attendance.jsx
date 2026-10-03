import { useState } from "react";
const SECTIONS = ["All Sections", "Class 5-A", "Class 5-B", "Class 6-A", "Class 6-B", "Class 7-A", "Class 8-A", "Class 9-A", "Class 10-A"];
const STUDENTS_ATT = [
    { id: "STU-00142", name: "Arjun Ramakrishna", class: "Class 5", section: "Class 5-A", roll: "01" },
    { id: "STU-00143", name: "Priya Suresh", class: "Class 8", section: "Class 8-A", roll: "12" },
    { id: "STU-00144", name: "Mohammed Irfan", class: "Class 7", section: "Class 7-A", roll: "08" },
    { id: "STU-00145", name: "Kavitha Devi B.", class: "Class 6", section: "Class 6-B", roll: "03" },
    { id: "STU-00146", name: "Ravi Teja G.", class: "Class 10", section: "Class 10-A", roll: "22" },
    { id: "STU-00147", name: "Shalini Varma", class: "Class 9", section: "Class 9-A", roll: "17" },
    { id: "STU-00148", name: "Kiran Kumar P.", class: "Class 5", section: "Class 5-B", roll: "05" },
    { id: "STU-00149", name: "Deepa Reddy", class: "Class 6", section: "Class 6-A", roll: "09" },
    { id: "STU-00150", name: "Sandeep Naik", class: "Class 7", section: "Class 7-A", roll: "14" },
    { id: "STU-00151", name: "Lakshmi Prasad", class: "Class 5", section: "Class 5-A", roll: "02" },
];
export default function AttendancePage() {
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);
    const [section, setSection] = useState("All Sections");
    const [attendance, setAttendance] = useState(Object.fromEntries(STUDENTS_ATT.map((s) => [s.id, "P"])));
    const [saved, setSaved] = useState(false);
    const filtered = section === "All Sections" ? STUDENTS_ATT : STUDENTS_ATT.filter((s) => s.section === section);
    const counts = {
        P: filtered.filter((s) => attendance[s.id] === "P").length,
        A: filtered.filter((s) => attendance[s.id] === "A").length,
        L: filtered.filter((s) => attendance[s.id] === "L").length,
    };
    function mark(id, status) {
        setAttendance((prev) => ({ ...prev, [id]: status }));
    }
    function markAll(status) {
        const upd = {};
        filtered.forEach((s) => { upd[s.id] = status; });
        setAttendance((prev) => ({ ...prev, ...upd }));
    }
    function save() {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }
    return (<div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Attendance</h1>
          <p className="text-sm text-[#4a6080] mt-0.5">Mark and track daily student attendance by section.</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs bg-green-100 text-green-800 border border-green-300 px-3 py-1.5 rounded-sm font-semibold">✓ Saved</span>}
          <button onClick={save} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137] transition-colors">
            Save Attendance
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm p-4 mb-4 flex flex-wrap items-center gap-3">
        <div>
          <label className="block text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white"/>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)} className="border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white">
            {SECTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {["P", "A", "L"].map((s) => (<button key={s} onClick={() => markAll(s)} className={`text-xs font-semibold px-3 py-1.5 rounded-sm border transition-colors ${s === "P" ? "border-green-300 text-green-800 hover:bg-green-50" :
                s === "A" ? "border-red-300 text-red-700 hover:bg-red-50" :
                    "border-amber-300 text-amber-800 hover:bg-amber-50"}`}>
              Mark All {s === "P" ? "Present" : s === "A" ? "Absent" : "Leave"}
            </button>))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
            { label: "Total", value: filtered.length, color: "text-[#1a3a5c]", bg: "bg-blue-50 border-[#c8d6e8]" },
            { label: "Present", value: counts.P, color: "text-green-800", bg: "bg-green-50 border-green-200" },
            { label: "Absent", value: counts.A, color: "text-red-700", bg: "bg-red-50 border-red-200" },
            { label: "On Leave", value: counts.L, color: "text-amber-800", bg: "bg-amber-50 border-amber-200" },
        ].map((c) => (<div key={c.label} className={`border rounded-sm p-4 ${c.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{c.label}</div>
            <div className={`text-2xl font-bold ${c.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{c.value}</div>
          </div>))}
      </div>

      {/* Attendance table */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="px-4 py-3 border-b border-[#c8d6e8] flex items-center justify-between">
          <span className="text-sm font-semibold text-[#0d2137]">
            {section} <span className="text-[#4a6080] font-normal text-xs ml-1">— {date}</span>
          </span>
          <div className="flex items-center gap-2">
            <button className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1.5 rounded-sm hover:bg-[#f0f3f8]">Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Roll No.", "Student ID", "Name", "Class / Section", "Present", "Absent", "Leave", "Remarks"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[#4a6080] font-semibold uppercase tracking-wide text-[10px] border-b border-[#e8eef7]">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((s) => {
            const status = attendance[s.id];
            return (<tr key={s.id} className="hover:bg-[#f8fafd] transition-colors">
                    <td className="px-3 py-2.5 font-mono text-[#4a6080]">{s.roll}</td>
                    <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{s.id}</td>
                    <td className="px-3 py-2.5 font-medium text-[#1a2636]">{s.name}</td>
                    <td className="px-3 py-2.5 text-[#4a6080]">{s.section}</td>
                    {["P", "A", "L"].map((opt) => (<td key={opt} className="px-3 py-2.5">
                        <button onClick={() => mark(s.id, opt)} className={`w-8 h-8 rounded-sm text-xs font-bold border transition-colors ${status === opt
                        ? opt === "P" ? "bg-green-500 text-white border-green-500"
                            : opt === "A" ? "bg-red-500 text-white border-red-500"
                                : "bg-amber-400 text-white border-amber-400"
                        : "border-[#c8d6e8] text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
                          {opt}
                        </button>
                      </td>))}
                    <td className="px-3 py-2.5">
                      <input placeholder="—" className="border border-[#e8eef7] rounded px-2 py-1 text-xs w-28 focus:outline-none focus:border-[#2a5298] bg-white"/>
                    </td>
                  </tr>);
        })}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
