import { useState } from "react";
const CLASSES_DATA = [
    { id: "CLS-001", name: "Class 5", teacher: "K. Ramaiah", sections: 2, students: 84, strength: 42 },
    { id: "CLS-002", name: "Class 6", teacher: "P. Latha", sections: 2, students: 78, strength: 39 },
    { id: "CLS-003", name: "Class 7", teacher: "B. Venkatesh", sections: 1, students: 38, strength: 38 },
    { id: "CLS-004", name: "Class 8", teacher: "S. Anitha", sections: 1, students: 41, strength: 41 },
    { id: "CLS-005", name: "Class 9", teacher: "M. Prasad", sections: 1, students: 36, strength: 36 },
    { id: "CLS-006", name: "Class 10", teacher: "R. Kumari", sections: 1, students: 44, strength: 44 },
];
const SECTIONS_DATA = [
    { id: "SEC-001", section: "5-A", class: "Class 5", classTeacher: "K. Ramaiah", students: 42, capacity: 45 },
    { id: "SEC-002", section: "5-B", class: "Class 5", classTeacher: "T. Sudha", students: 42, capacity: 45 },
    { id: "SEC-003", section: "6-A", class: "Class 6", classTeacher: "P. Latha", students: 40, capacity: 45 },
    { id: "SEC-004", section: "6-B", class: "Class 6", classTeacher: "N. Rao", students: 38, capacity: 45 },
    { id: "SEC-005", section: "7-A", class: "Class 7", classTeacher: "B. Venkatesh", students: 38, capacity: 45 },
    { id: "SEC-006", section: "8-A", class: "Class 8", classTeacher: "S. Anitha", students: 41, capacity: 45 },
    { id: "SEC-007", section: "9-A", class: "Class 9", classTeacher: "M. Prasad", students: 36, capacity: 45 },
    { id: "SEC-008", section: "10-A", class: "Class 10", classTeacher: "R. Kumari", students: 44, capacity: 45 },
];
export default function ClassesPage() {
    const [tab, setTab] = useState("classes");
    const [showForm, setShowForm] = useState(false);
    return (<div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Classes & Sections</h1>
          <p className="text-sm text-[#4a6080] mt-0.5">Manage class configurations, sections, and teacher assignments.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137] transition-colors">
          + Add {tab === "classes" ? "Class" : "Section"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
            { label: "Total Classes", value: "6", color: "text-[#1a3a5c]", bg: "bg-blue-50 border-[#c8d6e8]" },
            { label: "Total Sections", value: "8", color: "text-[#1a3a5c]", bg: "bg-blue-50 border-[#c8d6e8]" },
            { label: "Total Students", value: "321", color: "text-green-800", bg: "bg-green-50 border-green-200" },
            { label: "Avg. Strength", value: "40", color: "text-[#4a6080]", bg: "bg-slate-50 border-[#c8d6e8]" },
        ].map((c) => (<div key={c.label} className={`border rounded-sm p-4 ${c.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{c.label}</div>
            <div className={`text-2xl font-bold ${c.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{c.value}</div>
          </div>))}
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm border-b-0">
        <div className="flex">
          {["classes", "sections"].map((t) => (<button key={t} onClick={() => setTab(t)} className={`px-5 py-2.5 text-xs font-semibold capitalize border-b-2 transition-colors ${tab === t ? "border-[#1a3a5c] text-[#1a3a5c]" : "border-transparent text-[#4a6080] hover:text-[#1a3a5c]"}`}>
              {t === "classes" ? "Classes" : "Sections"}
            </button>))}
        </div>
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm rounded-tl-none overflow-hidden">
        {tab === "classes" ? (<table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Class ID", "Class Name", "Sections", "Students", "Avg. Strength", "Actions"].map((h) => (<th key={h} className="text-left px-4 py-2.5 text-[#4a6080] font-semibold uppercase tracking-wide text-[10px] border-b border-[#e8eef7]">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {CLASSES_DATA.map((c) => (<tr key={c.id} className="hover:bg-[#f8fafd] transition-colors">
                  <td className="px-4 py-3 font-mono text-[#2a5298] text-[11px]">{c.id}</td>
                  <td className="px-4 py-3 font-semibold text-[#1a2636]">{c.name}</td>
                  <td className="px-4 py-3 text-center text-[#1a2636] font-mono">{c.sections}</td>
                  <td className="px-4 py-3 text-center text-[#1a2636] font-mono">{c.students}</td>
                  <td className="px-4 py-3 text-center text-[#4a6080] font-mono">{c.strength}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {["View", "Edit", "Sections"].map((a) => (<button key={a} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7] transition-colors">{a}</button>))}
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>) : (<table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Section ID", "Section", "Class", "Students", "Capacity", "Fill %", "Actions"].map((h) => (<th key={h} className="text-left px-4 py-2.5 text-[#4a6080] font-semibold uppercase tracking-wide text-[10px] border-b border-[#e8eef7]">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {SECTIONS_DATA.map((s) => {
                const pct = Math.round((s.students / s.capacity) * 100);
                return (<tr key={s.id} className="hover:bg-[#f8fafd] transition-colors">
                    <td className="px-4 py-3 font-mono text-[#2a5298] text-[11px]">{s.id}</td>
                    <td className="px-4 py-3 font-semibold text-[#1a2636]">{s.section}</td>
                    <td className="px-4 py-3 text-[#4a6080]">{s.class}</td>
                    <td className="px-4 py-3 text-center font-mono text-[#1a2636]">{s.students}</td>
                    <td className="px-4 py-3 text-center font-mono text-[#4a6080]">{s.capacity}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#e8eef7] rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${pct >= 90 ? "bg-red-400" : pct >= 75 ? "bg-amber-400" : "bg-green-400"}`} style={{ width: `${pct}%` }}/>
                        </div>
                        <span className="text-[10px] font-mono text-[#4a6080]">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {["View", "Edit"].map((a) => (<button key={a} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7] transition-colors">{a}</button>))}
                      </div>
                    </td>
                  </tr>);
            })}
            </tbody>
          </table>)}
      </div>

      {/* Add form modal */}
      {showForm && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[440px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">Add {tab === "classes" ? "Class" : "Section"}</h2>
              <button onClick={() => setShowForm(false)} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
            </div>
            <div className="p-5 space-y-3">
              {tab === "classes" ? (<>
                  <FormField label="Class Name" placeholder="e.g. Class 11"/>
                  <FormField label="Academic Year" type="select"/>
                </>) : (<>
                  <FormField label="Class" type="select"/>
                  <FormField label="Section Name" placeholder="e.g. A, B, C"/>
                  <FormField label="Capacity" placeholder="Max students"/>
                </>)}
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-[#c8d6e8]">
              <button onClick={() => setShowForm(false)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
              <button onClick={() => setShowForm(false)} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137]">Save</button>
            </div>
          </div>
        </div>)}
    </div>);
}
function FormField({ label, placeholder, type = "text" }) {
    return (<div>
      <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">{label}</label>
      {type === "select" ? (<select className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
          <option>Select {label}</option>
        </select>) : (<input type={type} placeholder={placeholder} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white"/>)}
    </div>);
}
