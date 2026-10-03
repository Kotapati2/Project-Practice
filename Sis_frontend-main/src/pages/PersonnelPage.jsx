import { useState } from "react";
const TEACHERS = [
    { id: "TCH-001", name: "K. Srinivas Reddy", school: "ZPHS Kondapur", subjects: "Mathematics, Science", qual: "B.Ed, M.Sc", joining: "12-06-2014", status: "Active", type: "teacher" },
    { id: "TCH-002", name: "P. Lakshmi Devi", school: "Govt. HS Malakpet", subjects: "Telugu, Hindi", qual: "B.Ed, M.A (Telugu)", joining: "03-08-2010", status: "Active", type: "teacher" },
    { id: "TCH-003", name: "Mohammed Ghouse", school: "ZPHS Uppal", subjects: "Social Studies", qual: "B.Ed, M.A (History)", joining: "15-07-2017", status: "Active", type: "teacher" },
    { id: "TCH-004", name: "S. Annapurna", school: "Govt. HS Malakpet", subjects: "English", qual: "B.Ed, M.A (Eng)", joining: "21-03-2008", status: "On Leave", type: "teacher" },
    { id: "TCH-005", name: "R. Venkateswara Rao", school: "Aided HS Begumpet", subjects: "Physical Education", qual: "BPEd, MPEd", joining: "10-01-2016", status: "Active", type: "teacher" },
    { id: "TCH-006", name: "T. Padmavathi", school: "Govt. PS Kothapet", subjects: "Mathematics", qual: "D.Ed, B.A", joining: "06-09-2012", status: "Active", type: "teacher" },
];
const LECTURERS = [
    { id: "LEC-001", name: "Dr. A. Subrahmanyam", school: "Govt. Jr. College, Hyderabad", subjects: "Physics, Mathematics", qual: "M.Sc, Ph.D", joining: "01-07-2009", status: "Active", type: "lecturer" },
    { id: "LEC-002", name: "Mrs. B. Sarada", school: "Narayana Jr. College", subjects: "Chemistry, Biology", qual: "M.Sc, B.Ed", joining: "14-08-2013", status: "Active", type: "lecturer" },
    { id: "LEC-003", name: "Ch. Venkat Rao", school: "St. Francis Jr. College", subjects: "Commerce, Economics", qual: "M.Com, B.Ed", joining: "22-06-2011", status: "Active", type: "lecturer" },
    { id: "LEC-004", name: "Dr. N. Bhavani", school: "Govt. Jr. College, Malakpet", subjects: "Botany, Zoology", qual: "M.Sc, Ph.D", joining: "05-01-2015", status: "On Leave", type: "lecturer" },
    { id: "LEC-005", name: "P. Satyanarayana", school: "Srichaitanya Jr. College", subjects: "Mathematics, Physics", qual: "M.Sc, NET", joining: "18-07-2018", status: "Active", type: "lecturer" },
    { id: "LEC-006", name: "K. Meenakshi", school: "Govt. Jr. College, Warangal", subjects: "Hindi, English", qual: "M.A, B.Ed", joining: "29-06-2007", status: "Active", type: "lecturer" },
];
const FACULTY = [
    { id: "FAC-001", name: "Prof. D. Ramachandran", school: "Osmania University", subjects: "Computer Science", qual: "Ph.D (CS)", joining: "01-08-2002", status: "Active", type: "faculty" },
    { id: "FAC-002", name: "Dr. S. Kamala Devi", school: "JNTU Hyderabad", subjects: "Electronics & Comm.", qual: "Ph.D (ECE)", joining: "16-07-2006", status: "Active", type: "faculty" },
    { id: "FAC-003", name: "Prof. M. Ibrahim Ali", school: "University of Hyderabad", subjects: "Economics", qual: "Ph.D (Economics), UGC-NET", joining: "10-09-2001", status: "Active", type: "faculty" },
    { id: "FAC-004", name: "Dr. L. Vasudha Rani", school: "Telangana University", subjects: "Biotechnology", qual: "Ph.D (Biotech)", joining: "04-12-2010", status: "On Leave", type: "faculty" },
    { id: "FAC-005", name: "Prof. G. Siva Prasad", school: "Kakatiya University", subjects: "Civil Engineering", qual: "Ph.D (CE), FIE", joining: "03-03-2004", status: "Active", type: "faculty" },
    { id: "FAC-006", name: "Dr. V. Anitha Kumari", school: "Osmania University", subjects: "Chemistry", qual: "Ph.D (Chemistry)", joining: "22-11-2008", status: "Active", type: "faculty" },
];
const STATUS_CLS = {
    Active: "bg-green-100 text-green-800 border border-green-300",
    "On Leave": "bg-amber-100 text-amber-800 border border-amber-300",
    Inactive: "bg-gray-100 text-gray-600 border border-gray-300",
};
function StatusBadge({ status }) {
    return <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${STATUS_CLS[status] ?? STATUS_CLS.Inactive}`}>{status}</span>;
}
function PersonnelModal({ person, editMode, onEdit, onClose, }) {
    const typeLabel = person.type === "faculty" ? "Faculty" : person.type === "lecturer" ? "Lecturer" : "Teacher";
    const instLabel = person.type === "faculty" ? "University" : person.type === "lecturer" ? "College" : "School";
    const subLabel = person.type === "faculty" ? "Department / Subject" : "Subjects Taught";
    const fields = [
        { label: "Employee ID", value: person.id },
        { label: "Full Name", value: person.name },
        { label: instLabel, value: person.school },
        { label: subLabel, value: person.subjects },
        { label: "Qualification", value: person.qual },
        { label: "Joining Date", value: person.joining },
        { label: "Status", value: person.status },
    ];
    return (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[500px]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">{typeLabel} — {person.name}</h2>
          <div className="flex gap-2">
            <button onClick={onEdit} className="text-xs border border-[#c8d6e8] text-[#2a5298] px-3 py-1 rounded-sm hover:bg-[#e8eef7]">
              {editMode ? "Save" : "Edit"}
            </button>
            <button onClick={onClose} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
          </div>
        </div>
        <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4">
          {fields.map(({ label, value }) => (<div key={label}>
              <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</div>
              {editMode && !["Employee ID", "Status"].includes(label) ? (<input defaultValue={value} className="w-full border border-[#c8d6e8] rounded px-2 py-1.5 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298]"/>) : (<div className="text-sm text-[#1a2636] font-medium">{value}</div>)}
            </div>))}
        </div>
        <div className="flex justify-end px-5 py-4 border-t border-[#c8d6e8]">
          <button onClick={onClose} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Close</button>
        </div>
      </div>
    </div>);
}
function AddPersonnelModal({ typeLabel, onClose }) {
    const instLabel = typeLabel === "Faculty" ? "University" : typeLabel === "Lecturer" ? "College" : "School";
    return (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[460px]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Add {typeLabel}</h2>
          <button onClick={onClose} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
        </div>
        <div className="p-5 space-y-3">
          {["Full Name", instLabel, "Subjects / Department", "Qualification", "Joining Date"].map((f) => (<div key={f}>
              <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">{f}</label>
              {[instLabel, "Subjects / Department"].includes(f) ? (<select className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
                  <option>Select {f}</option>
                </select>) : (<input type={f === "Joining Date" ? "date" : "text"} placeholder={`Enter ${f}`} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white"/>)}
            </div>))}
        </div>
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-[#c8d6e8]">
          <button onClick={onClose} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
          <button onClick={onClose} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137]">Save</button>
        </div>
      </div>
    </div>);
}
function PersonnelTable({ data, typeLabel, instLabel, isReadOnly, }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [detail, setDetail] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const filtered = data.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.school.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search);
        const matchStatus = statusFilter === "All" || p.status === statusFilter;
        return matchSearch && matchStatus;
    });
    const stats = [
        { label: `Total ${typeLabel}s`, value: data.length, bg: "bg-blue-50 border-blue-100", color: "text-[#1a3a5c]" },
        { label: "Active", value: data.filter((p) => p.status === "Active").length, bg: "bg-green-50 border-green-100", color: "text-[#1a6b3a]" },
        { label: "On Leave", value: data.filter((p) => p.status === "On Leave").length, bg: "bg-amber-50 border-amber-100", color: "text-[#b45309]" },
        { label: "Inactive", value: data.filter((p) => p.status === "Inactive").length, bg: "bg-slate-50 border-slate-100", color: "text-[#4a6080]" },
    ];
    return (<div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">{typeLabel} Records</h2>
          {!isReadOnly && (<button onClick={() => setShowAdd(true)} className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137] transition-colors">
              + Add {typeLabel}
            </button>)}
        </div>
        <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2 flex-wrap">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
            {["All", "Active", "On Leave", "Inactive"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <select className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
            <option>All {instLabel}s</option>
          </select>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search by name, ID, ${instLabel.toLowerCase()}…`} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1 min-w-[200px]"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["ID", "Name", instLabel, "Subjects / Department", "Qualification", "Joining Date", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((p) => (<tr key={p.id} className="hover:bg-[#f8fafd] transition-colors cursor-pointer" onClick={() => setDetail(p)}>
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px] whitespace-nowrap">{p.id}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636] whitespace-nowrap">{p.name}</td>
                  <td className="px-3 py-2.5 text-[#4a6080] max-w-[160px] truncate">{p.school}</td>
                  <td className="px-3 py-2.5 text-[#4a6080] max-w-[140px] truncate">{p.subjects}</td>
                  <td className="px-3 py-2.5 text-[#4a6080] whitespace-nowrap">{p.qual}</td>
                  <td className="px-3 py-2.5 text-[#4a6080] font-mono whitespace-nowrap">{p.joining}</td>
                  <td className="px-3 py-2.5"><StatusBadge status={p.status}/></td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button onClick={() => setDetail(p)} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
                      {!isReadOnly && (<button onClick={() => { setDetail(p); setEditMode(true); }} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Edit</button>)}
                    </div>
                  </td>
                </tr>))}
              {filtered.length === 0 && (<tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-[#4a6080] text-xs">No records found.</td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-[#f0f3f8] flex items-center justify-between">
          <span className="text-xs text-[#4a6080]">Showing {filtered.length} of {data.length} records</span>
          <div className="flex gap-1">
            <button className="border border-[#c8d6e8] text-[#4a6080] text-xs px-2.5 py-1 rounded-sm hover:bg-[#f0f3f8]">← Prev</button>
            <button className="border border-[#c8d6e8] bg-[#1a3a5c] text-white text-xs px-2.5 py-1 rounded-sm">1</button>
            <button className="border border-[#c8d6e8] text-[#4a6080] text-xs px-2.5 py-1 rounded-sm hover:bg-[#f0f3f8]">2</button>
            <button className="border border-[#c8d6e8] text-[#4a6080] text-xs px-2.5 py-1 rounded-sm hover:bg-[#f0f3f8]">Next →</button>
          </div>
        </div>
      </div>

      {detail && (<PersonnelModal person={detail} editMode={editMode} onEdit={() => setEditMode((e) => !e)} onClose={() => { setDetail(null); setEditMode(false); }}/>)}
      {showAdd && <AddPersonnelModal typeLabel={typeLabel} onClose={() => setShowAdd(false)}/>}
    </div>);
}
export default function PersonnelPage({ route, role }) {
    const isReadOnly = role.id === "auditor";
    const canTeachers = ["school-user", "meo", "deo", "primary-head", "super-admin", "state-admin", "auditor"].includes(role.id);
    const canLecturers = ["inter-college", "dieo", "inter-state", "super-admin", "state-admin", "auditor"].includes(role.id);
    const canFaculty = ["uni-user", "vc", "state-higher", "super-admin", "state-admin", "auditor"].includes(role.id);
    const tabs = [
        { id: "teachers", label: "Teachers", allowed: canTeachers },
        { id: "lecturers", label: "Lecturers", allowed: canLecturers },
        { id: "faculty", label: "Faculty", allowed: canFaculty },
    ].filter((t) => t.allowed);
    const startTab = tabs.find((t) => t.id === route)?.id ?? tabs[0]?.id ?? "teachers";
    const [activeTab, setActiveTab] = useState(startTab);
    const titleMap = {
        teachers: "Teachers",
        lecturers: "Lecturers",
        faculty: "Faculty",
    };
    return (<div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Personnel Management</h1>
          <p className="text-sm text-[#4a6080] mt-0.5">Manage teaching staff across institutions</p>
        </div>
        <div className="flex gap-2 text-xs text-[#4a6080]">
          <span className="bg-[#e8eef7] border border-[#c8d6e8] px-3 py-1.5 rounded-sm">AY 2025–26</span>
        </div>
      </div>

      {tabs.length > 1 && (<div className="flex gap-0 mb-5 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden w-fit">
          {tabs.map((t) => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-5 py-2.5 text-sm font-semibold transition-colors border-r border-[#c8d6e8] last:border-0 ${activeTab === t.id ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
              {t.label}
            </button>))}
        </div>)}

      {activeTab === "teachers" && canTeachers && (<PersonnelTable data={TEACHERS} typeLabel="Teacher" instLabel="School" isReadOnly={isReadOnly}/>)}
      {activeTab === "lecturers" && canLecturers && (<PersonnelTable data={LECTURERS} typeLabel="Lecturer" instLabel="College" isReadOnly={isReadOnly}/>)}
      {activeTab === "faculty" && canFaculty && (<PersonnelTable data={FACULTY} typeLabel="Faculty" instLabel="University" isReadOnly={isReadOnly}/>)}
    </div>);
}
