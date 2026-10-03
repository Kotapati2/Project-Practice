import { useState } from "react";
const ISSUES = [
    { id: "DQ-001", entity: "Student", field: "Aadhaar Number", severity: "High", count: 312, description: "Missing Aadhaar in enrolled students", status: "Open" },
    { id: "DQ-002", entity: "Student", field: "Date of Birth", severity: "High", count: 87, description: "Duplicate DOB + Name combination detected", status: "In Progress" },
    { id: "DQ-003", entity: "School", field: "DISE Code", severity: "Medium", count: 14, description: "DISE code not matching national repository", status: "Open" },
    { id: "DQ-004", entity: "Teacher", field: "Employee ID", severity: "High", count: 23, description: "Duplicate employee IDs across mandals", status: "Open" },
    { id: "DQ-005", entity: "Student", field: "Caste Certificate", severity: "Medium", count: 540, description: "Caste certificate document not uploaded", status: "Open" },
    { id: "DQ-006", entity: "College", field: "Affiliation Code", severity: "Medium", count: 6, description: "Invalid affiliation code for intermediate colleges", status: "Resolved" },
    { id: "DQ-007", entity: "Student", field: "Mobile Number", severity: "Low", count: 1842, description: "Mobile number missing for parent/guardian contact", status: "Open" },
    { id: "DQ-008", entity: "Teacher", field: "Qualification", severity: "Low", count: 45, description: "Qualification details incomplete", status: "In Progress" },
    { id: "DQ-009", entity: "School", field: "Geo-coordinates", severity: "Low", count: 38, description: "GPS coordinates not entered for school location", status: "Open" },
    { id: "DQ-010", entity: "Student", field: "Bank Account", severity: "Medium", count: 234, description: "Bank account missing for scholarship-eligible students", status: "Open" },
];
const SEV_CLS = {
    High: "bg-red-100 text-red-800 border border-red-300",
    Medium: "bg-amber-100 text-amber-800 border border-amber-300",
    Low: "bg-blue-100 text-blue-800 border border-blue-200",
};
const STATUS_CLS = {
    Open: "bg-red-100 text-red-800 border border-red-300",
    "In Progress": "bg-amber-100 text-amber-800 border border-amber-300",
    Resolved: "bg-green-100 text-green-800 border border-green-300",
};
export default function DataQualityPage() {
    const [severityFilter, setSeverityFilter] = useState("All");
    const [entityFilter, setEntityFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);
    const filtered = ISSUES.filter((i) => {
        const matchSev = severityFilter === "All" || i.severity === severityFilter;
        const matchEnt = entityFilter === "All" || i.entity === entityFilter;
        const matchSt = statusFilter === "All" || i.status === statusFilter;
        const matchSearch = i.description.toLowerCase().includes(search.toLowerCase()) || i.entity.toLowerCase().includes(search.toLowerCase()) || i.field.toLowerCase().includes(search.toLowerCase());
        return matchSev && matchEnt && matchSt && matchSearch;
    });
    const total = ISSUES.reduce((s, i) => s + i.count, 0);
    const highCount = ISSUES.filter((i) => i.severity === "High").reduce((s, i) => s + i.count, 0);
    const openCount = ISSUES.filter((i) => i.status === "Open").length;
    const resolvedCount = ISSUES.filter((i) => i.status === "Resolved").length;
    const STATS = [
        { label: "Total Records with Issues", value: total.toLocaleString(), bg: "bg-red-50 border-red-100", color: "text-red-700" },
        { label: "High Severity", value: highCount.toLocaleString(), bg: "bg-orange-50 border-orange-100", color: "text-orange-700" },
        { label: "Open Issues", value: String(openCount), bg: "bg-amber-50 border-amber-100", color: "text-amber-700" },
        { label: "Resolved", value: String(resolvedCount), bg: "bg-green-50 border-green-100", color: "text-green-700" },
    ];
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Data Quality Management</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">Identify and resolve data inconsistencies, duplicates, and missing fields</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {STATS.map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      {/* Completion bar */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#0d2137]">Overall Data Completeness</span>
          <span className="text-xs font-bold text-[#1a3a5c]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>83.4%</span>
        </div>
        <div className="h-2.5 bg-[#e8eef7] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#1a3a5c] to-[#2a5298] rounded-full" style={{ width: "83.4%" }}/>
        </div>
        <div className="flex gap-4 mt-2 text-[10px] text-[#4a6080]">
          <span>Students: <strong className="text-[#1a2636]">86.2%</strong></span>
          <span>Teachers: <strong className="text-[#1a2636]">91.4%</strong></span>
          <span>Schools: <strong className="text-[#1a2636]">94.7%</strong></span>
          <span>Colleges: <strong className="text-[#1a2636]">88.9%</strong></span>
        </div>
      </div>

      {/* Issues table */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Active Issues</h2>
          <button className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137] transition-colors">
            Export Report
          </button>
        </div>
        <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2 flex-wrap">
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
            {["All", "High", "Medium", "Low"].map((o) => <option key={o}>{o === "All" ? "All Severities" : o}</option>)}
          </select>
          <select value={entityFilter} onChange={(e) => setEntityFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
            {["All", "Student", "Teacher", "School", "College"].map((o) => <option key={o}>{o === "All" ? "All Entities" : o}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
            {["All", "Open", "In Progress", "Resolved"].map((o) => <option key={o}>{o === "All" ? "All Statuses" : o}</option>)}
          </select>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search issues…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1 min-w-[160px]"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Issue ID", "Entity", "Field", "Description", "Affected Count", "Severity", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((issue) => (<tr key={issue.id} className="hover:bg-[#f8fafd] transition-colors cursor-pointer" onClick={() => setSelected(issue)}>
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{issue.id}</td>
                  <td className="px-3 py-2.5 text-[#1a2636] font-medium">{issue.entity}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{issue.field}</td>
                  <td className="px-3 py-2.5 text-[#4a6080] max-w-[220px] truncate">{issue.description}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636] font-bold">{issue.count.toLocaleString()}</td>
                  <td className="px-3 py-2.5"><span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${SEV_CLS[issue.severity]}`}>{issue.severity}</span></td>
                  <td className="px-3 py-2.5"><span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${STATUS_CLS[issue.status]}`}>{issue.status}</span></td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
                      {issue.status !== "Resolved" && (<button className="text-[10px] border border-[#c8d6e8] text-[#1a6b3a] px-2 py-0.5 rounded-sm hover:bg-green-50">Resolve</button>)}
                    </div>
                  </td>
                </tr>))}
              {filtered.length === 0 && (<tr><td colSpan={8} className="px-3 py-8 text-center text-[#4a6080] text-xs">No issues found for selected filters.</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-[#f0f3f8] flex items-center justify-between">
          <span className="text-xs text-[#4a6080]">Showing {filtered.length} of {ISSUES.length} issues</span>
          <div className="flex gap-1">
            <button className="border border-[#c8d6e8] text-[#4a6080] text-xs px-2.5 py-1 rounded-sm hover:bg-[#f0f3f8]">← Prev</button>
            <button className="border border-[#c8d6e8] bg-[#1a3a5c] text-white text-xs px-2.5 py-1 rounded-sm">1</button>
            <button className="border border-[#c8d6e8] text-[#4a6080] text-xs px-2.5 py-1 rounded-sm hover:bg-[#f0f3f8]">Next →</button>
          </div>
        </div>
      </div>

      {/* Issue detail modal */}
      {selected && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[480px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">Issue — {selected.id}</h2>
              <button onClick={() => setSelected(null)} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-2">
                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${SEV_CLS[selected.severity]}`}>{selected.severity} Severity</span>
                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${STATUS_CLS[selected.status]}`}>{selected.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                { label: "Entity Type", value: selected.entity },
                { label: "Affected Field", value: selected.field },
                { label: "Affected Records", value: selected.count.toLocaleString() },
                { label: "Issue ID", value: selected.id },
            ].map(({ label, value }) => (<div key={label}>
                    <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</div>
                    <div className="text-sm text-[#1a2636] font-medium">{value}</div>
                  </div>))}
              </div>
              <div>
                <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-1">Description</div>
                <div className="text-sm text-[#1a2636] bg-[#f5f7fb] rounded p-3">{selected.description}</div>
              </div>
              <div>
                <label className="block text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-1">Resolution Notes</label>
                <textarea rows={3} placeholder="Add resolution notes…" className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white resize-none"/>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-[#c8d6e8]">
              <button onClick={() => setSelected(null)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Close</button>
              {selected.status !== "Resolved" && (<button onClick={() => setSelected(null)} className="bg-[#1a6b3a] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#155830]">Mark Resolved</button>)}
            </div>
          </div>
        </div>)}
    </div>);
}
