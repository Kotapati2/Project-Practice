import { useState } from "react";
/* ── Role access maps ─────────────────────────────────────────────────── */
export const PRIMARY_ROLES = ["school-user", "meo", "deo", "primary-head", "super-admin", "state-admin", "auditor"];
export const INTERMEDIATE_ROLES = ["inter-college", "dieo", "inter-state", "super-admin", "state-admin", "auditor"];
export const UNIVERSITY_ROLES = ["uni-college", "uni-user", "vc", "state-higher", "super-admin", "state-admin", "auditor"];
/* ── Sample data ──────────────────────────────────────────────────────── */
const SCHOOLS = [
    { code: "SCH-001", name: "ZPHS Kondapur", mgmt: "Government", village: "Kondapur", mandal: "Serilingampally", district: "Rangareddy", students: 842, status: "Active" },
    { code: "SCH-002", name: "Govt. HS Malakpet", mgmt: "Government", village: "Malakpet", mandal: "Hyderabad", district: "Hyderabad", students: 1124, status: "Active" },
    { code: "SCH-003", name: "Municipal HS Ameerpet", mgmt: "Municipal", village: "Ameerpet", mandal: "Hyderabad", district: "Hyderabad", students: 534, status: "Active" },
    { code: "SCH-004", name: "Aided HS Begumpet", mgmt: "Private Aided", village: "Begumpet", mandal: "Secunderabad", district: "Hyderabad", students: 678, status: "Inactive" },
    { code: "SCH-005", name: "ZPHS Uppal", mgmt: "Government", village: "Uppal", mandal: "LB Nagar", district: "Rangareddy", students: 912, status: "Active" },
    { code: "SCH-006", name: "Govt. PS Kothapet", mgmt: "Government", village: "Kothapet", mandal: "LB Nagar", district: "Rangareddy", students: 348, status: "Active" },
];
const COLLEGES = [
    { code: "COL-001", name: "Govt. Jr. College, Hyderabad", type: "Government", streams: "MPC, BiPC, CEC, HEC", district: "Hyderabad", city: "Hyderabad", students: 1248, status: "Active" },
    { code: "COL-002", name: "Narayana Jr. College", type: "Private", streams: "MPC, BiPC", district: "Rangareddy", city: "Kondapur", students: 2480, status: "Active" },
    { code: "COL-003", name: "St. Francis Jr. College", type: "Private Aided", streams: "CEC, HEC, MPC", district: "Hyderabad", city: "Secunderabad", students: 840, status: "Active" },
    { code: "COL-004", name: "Govt. Jr. College, Malakpet", type: "Government", streams: "MPC, BiPC", district: "Hyderabad", city: "Malakpet", students: 680, status: "Inactive" },
    { code: "COL-005", name: "Srichaitanya Jr. College", type: "Private", streams: "MPC, BiPC", district: "Rangareddy", city: "Miyapur", students: 3100, status: "Active" },
    { code: "COL-006", name: "Govt. Jr. College, Warangal", type: "Government", streams: "MPC, BiPC, CEC", district: "Warangal", city: "Warangal", students: 920, status: "Active" },
];
const UNIVERSITIES = [
    { code: "UNI-001", name: "Osmania University", type: "Central", city: "Hyderabad", colleges: 98, students: 18432, naac: "A+", status: "Active" },
    { code: "UNI-002", name: "JNTU Hyderabad", type: "State Technical", city: "Hyderabad", colleges: 214, students: 14280, naac: "A", status: "Active" },
    { code: "UNI-003", name: "University of Hyderabad", type: "Central", city: "Hyderabad", colleges: 12, students: 8420, naac: "A+", status: "Active" },
    { code: "UNI-004", name: "Telangana University", type: "State", city: "Nizamabad", colleges: 68, students: 6840, naac: "B+", status: "Active" },
    { code: "UNI-005", name: "Palamuru University", type: "State", city: "Mahbubnagar", colleges: 54, students: 5120, naac: "B", status: "Active" },
    { code: "UNI-006", name: "Kakatiya University", type: "State", city: "Warangal", colleges: 87, students: 9840, naac: "A", status: "Active" },
];
const PRIMARY_TREE = [
    { id: "state", label: "Telangana (State)", level: 0 },
    { id: "region-1", label: "Hyderabad Region", level: 1 },
    { id: "zonal-1", label: "Hyderabad Zonal", level: 2 },
    { id: "dist-1", label: "Hyderabad District", level: 3 },
    { id: "mandal-1", label: "Hyderabad Mandal", level: 4 },
    { id: "mandal-2", label: "Secunderabad Mandal", level: 4 },
    { id: "dist-2", label: "Rangareddy District", level: 3 },
    { id: "mandal-3", label: "Serilingampally Mandal", level: 4 },
    { id: "region-2", label: "Warangal Region", level: 1 },
];
/* ── Shared helpers ───────────────────────────────────────────────────── */
function StatusBadge({ status }) {
    const cls = status === "Active"
        ? "bg-green-100 text-green-800 border border-green-300"
        : "bg-gray-100 text-gray-600 border border-gray-300";
    return <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${cls}`}>{status}</span>;
}
function ActionBtn({ label, onClick }) {
    return (<button onClick={onClick} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7] transition-colors">
      {label}
    </button>);
}
/* ── Detail modal ─────────────────────────────────────────────────────── */
function DetailModal({ title, fields, onClose, onEdit, editMode, }) {
    return (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[520px] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">{title}</h2>
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
              {editMode && !["Code", "Status", "NAAC Grade"].includes(label) ? (<input defaultValue={value} className="w-full border border-[#c8d6e8] rounded px-2 py-1.5 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298]"/>) : (<div className="text-sm text-[#1a2636] font-medium">{value}</div>)}
            </div>))}
        </div>
        <div className="px-5 py-4 border-t border-[#c8d6e8] flex justify-end">
          <button onClick={onClose} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Close</button>
        </div>
      </div>
    </div>);
}
/* ── Add form modal ───────────────────────────────────────────────────── */
function AddModal({ title, fields, onClose }) {
    return (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[460px]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Add {title}</h2>
          <button onClick={onClose} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
        </div>
        <div className="p-5 space-y-3">
          {fields.map((f) => (<div key={f}>
              <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">{f}</label>
              {f.toLowerCase().includes("type") || f.toLowerCase().includes("mgmt") || f.toLowerCase().includes("district") || f.toLowerCase().includes("status") || f.toLowerCase().includes("stream") ? (<select className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
                  <option>Select {f}</option>
                </select>) : (<input placeholder={`Enter ${f}`} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white"/>)}
            </div>))}
        </div>
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-[#c8d6e8]">
          <button onClick={onClose} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
          <button onClick={onClose} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137]">Save</button>
        </div>
      </div>
    </div>);
}
/* ── Primary Education tab ────────────────────────────────────────────── */
function PrimaryTab({ role, onNavigate }) {
    const [selectedNode, setSelectedNode] = useState("dist-1");
    const [detail, setDetail] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [search, setSearch] = useState("");
    const isReadOnly = role.id === "auditor";
    const filtered = SCHOOLS.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.district.toLowerCase().includes(search.toLowerCase()));
    return (<div className="flex gap-4">
      {/* Hierarchy tree */}
      <div className="w-64 flex-shrink-0 bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Hierarchy</h2>
          {!isReadOnly && (<button className="text-xs text-[#2a5298] border border-[#c8d6e8] px-2 py-1 rounded-sm hover:bg-[#f0f3f8]">+ Add</button>)}
        </div>
        <div className="p-2">
          {PRIMARY_TREE.map((node) => (<button key={node.id} onClick={() => setSelectedNode(node.id)} className={`w-full text-left text-xs py-2 rounded transition-colors flex items-center gap-1.5 ${selectedNode === node.id ? "bg-[#e8eef7] text-[#1a3a5c] font-semibold" : "text-[#4a6080] hover:bg-[#f5f7fb]"}`} style={{ paddingLeft: `${node.level * 14 + 8}px` }}>
              {node.level > 0 && <span className="text-[#c8d6e8]">└</span>}
              <span className="truncate">{node.label}</span>
            </button>))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 space-y-4">
        {/* Selected node info */}
        <div className="bg-white border border-[#c8d6e8] rounded-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#0d2137]">Hyderabad District</h2>
            {!isReadOnly && (<div className="flex gap-2">
                <button className="text-xs border border-[#c8d6e8] text-[#2a5298] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Edit</button>
                <button className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Deactivate</button>
              </div>)}
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs">
            {[
            { label: "Code", value: "DIST-HYD" },
            { label: "Region", value: "Hyderabad Region" },
            { label: "Status", value: "Active" },
            { label: "Mandals", value: "16" },
            { label: "Schools", value: "247" },
            { label: "Students", value: "1,28,431" },
        ].map((f) => (<div key={f.label}>
                <div className="text-[#4a6080] mb-0.5 uppercase tracking-wide text-[10px] font-semibold">{f.label}</div>
                <div className="text-[#1a2636] font-medium">{f.value}</div>
              </div>))}
          </div>
        </div>

        {/* Schools list */}
        <div className="bg-white border border-[#c8d6e8] rounded-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
            <h2 className="text-sm font-semibold text-[#0d2137]">Schools</h2>
            {!isReadOnly && (<button onClick={() => setShowAdd(true)} className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137] transition-colors">
                + Add School
              </button>)}
          </div>
          <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2 flex-wrap">
            {["Management", "Status", "Mandal"].map((f) => (<select key={f} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
                <option>All {f}s</option>
              </select>))}
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search schools…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1 min-w-[160px]"/>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#f5f7fb]">
                <tr>
                  {["Code", "School Name", "Management", "Village/Town", "Mandal", "Students", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{h}</th>))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3f8]">
                {filtered.map((s) => (<tr key={s.code} className="hover:bg-[#f8fafd] transition-colors cursor-pointer" onClick={() => setDetail(s)}>
                    <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{s.code}</td>
                    <td className="px-3 py-2.5 font-medium text-[#1a2636]">{s.name}</td>
                    <td className="px-3 py-2.5 text-[#4a6080]">{s.mgmt}</td>
                    <td className="px-3 py-2.5 text-[#4a6080]">{s.village}</td>
                    <td className="px-3 py-2.5 text-[#4a6080]">{s.mandal}</td>
                    <td className="px-3 py-2.5 text-[#1a2636] font-mono">{s.students.toLocaleString()}</td>
                    <td className="px-3 py-2.5"><StatusBadge status={s.status}/></td>
                    <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1">
                        <ActionBtn label="View" onClick={() => setDetail(s)}/>
                        {!isReadOnly && <ActionBtn label="Edit" onClick={() => { setDetail(s); setEditMode(true); }}/>}
                        <ActionBtn label="Students" onClick={() => onNavigate("students/list")}/>
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {detail && (<DetailModal title={detail.name} editMode={editMode} onEdit={() => setEditMode((e) => !e)} onClose={() => { setDetail(null); setEditMode(false); }} fields={[
                { label: "Code", value: detail.code },
                { label: "School Name", value: detail.name },
                { label: "Management Type", value: detail.mgmt },
                { label: "Village / Town", value: detail.village },
                { label: "Mandal", value: detail.mandal },
                { label: "District", value: detail.district },
                { label: "Total Students", value: detail.students.toLocaleString() },
                { label: "Status", value: detail.status },
            ]}/>)}
      {showAdd && (<AddModal title="School" onClose={() => setShowAdd(false)} fields={["School Name", "Management Type", "Village / Town", "Mandal", "District", "Status"]}/>)}
    </div>);
}
/* ── Intermediate Education tab ───────────────────────────────────────── */
function IntermediateTab({ role, onNavigate }) {
    const [detail, setDetail] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const isReadOnly = role.id === "auditor";
    const filtered = COLLEGES.filter((c) => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.district.toLowerCase().includes(search.toLowerCase());
        const matchType = typeFilter === "All" || c.type === typeFilter;
        return matchSearch && matchType;
    });
    const STATS = [
        { label: "Total Colleges", value: "1,842", color: "text-[#1a3a5c]", bg: "bg-blue-50 border-blue-100" },
        { label: "Government", value: "842", color: "text-[#1a6b3a]", bg: "bg-green-50 border-green-100" },
        { label: "Private Aided", value: "380", color: "text-[#b45309]", bg: "bg-amber-50 border-amber-100" },
        { label: "Private Unaided", value: "620", color: "text-[#4a6080]", bg: "bg-slate-50 border-slate-100" },
    ];
    return (<div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      {/* Colleges table */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Intermediate Colleges</h2>
          {!isReadOnly && (<button onClick={() => setShowAdd(true)} className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137] transition-colors">
              + Add College
            </button>)}
        </div>
        <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2 flex-wrap">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
            {["All", "Government", "Private", "Private Aided"].map((o) => <option key={o}>{o}</option>)}
          </select>
          {["District", "Status"].map((f) => (<select key={f} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
              <option>All {f}s</option>
            </select>))}
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search colleges…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1 min-w-[160px]"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Code", "College Name", "Type", "Streams", "City", "District", "Students", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((c) => (<tr key={c.code} className="hover:bg-[#f8fafd] transition-colors cursor-pointer" onClick={() => setDetail(c)}>
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{c.code}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{c.name}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{c.type}</td>
                  <td className="px-3 py-2.5 text-[#4a6080] max-w-[120px] truncate">{c.streams}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{c.city}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{c.district}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{c.students.toLocaleString()}</td>
                  <td className="px-3 py-2.5"><StatusBadge status={c.status}/></td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <ActionBtn label="View" onClick={() => setDetail(c)}/>
                      {!isReadOnly && <ActionBtn label="Edit" onClick={() => { setDetail(c); setEditMode(true); }}/>}
                      <ActionBtn label="Students" onClick={() => onNavigate("students/list")}/>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (<DetailModal title={detail.name} editMode={editMode} onEdit={() => setEditMode((e) => !e)} onClose={() => { setDetail(null); setEditMode(false); }} fields={[
                { label: "Code", value: detail.code },
                { label: "College Name", value: detail.name },
                { label: "Type", value: detail.type },
                { label: "Streams Offered", value: detail.streams },
                { label: "City", value: detail.city },
                { label: "District", value: detail.district },
                { label: "Total Students", value: detail.students.toLocaleString() },
                { label: "Status", value: detail.status },
            ]}/>)}
      {showAdd && (<AddModal title="College" onClose={() => setShowAdd(false)} fields={["College Name", "Management Type", "Streams", "City", "District", "Status"]}/>)}
    </div>);
}
/* ── University Education tab ─────────────────────────────────────────── */
function UniversityTab({ role, onNavigate }) {
    const [detail, setDetail] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const isReadOnly = role.id === "auditor";
    const filtered = UNIVERSITIES.filter((u) => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase());
        const matchType = typeFilter === "All" || u.type === typeFilter;
        return matchSearch && matchType;
    });
    const STATS = [
        { label: "Universities", value: "28", color: "text-[#1a3a5c]", bg: "bg-blue-50 border-blue-100" },
        { label: "Total Colleges", value: "1,124", color: "text-[#1a6b3a]", bg: "bg-green-50 border-green-100" },
        { label: "HE Students", value: "8,42,183", color: "text-[#b45309]", bg: "bg-amber-50 border-amber-100" },
        { label: "NAAC A+ / A", value: "12", color: "text-[#4a6080]", bg: "bg-slate-50 border-slate-100" },
    ];
    return (<div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      {/* Universities table */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Universities</h2>
          {!isReadOnly && (<button onClick={() => setShowAdd(true)} className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137] transition-colors">
              + Add University
            </button>)}
        </div>
        <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2 flex-wrap">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
            {["All", "Central", "State", "State Technical"].map((o) => <option key={o}>{o}</option>)}
          </select>
          {["City", "Status"].map((f) => (<select key={f} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
              <option>All {f}s</option>
            </select>))}
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search universities…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1 min-w-[160px]"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Code", "University Name", "Type", "City", "Affiliated Colleges", "Students", "NAAC", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((u) => (<tr key={u.code} className="hover:bg-[#f8fafd] transition-colors cursor-pointer" onClick={() => setDetail(u)}>
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{u.code}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{u.name}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{u.type}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{u.city}</td>
                  <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{u.colleges}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{u.students.toLocaleString()}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border ${u.naac === "A+" ? "bg-green-100 text-green-800 border-green-300" :
                u.naac === "A" ? "bg-blue-100 text-blue-800 border-blue-200" :
                    "bg-gray-100 text-gray-600 border-gray-200"}`}>{u.naac}</span>
                  </td>
                  <td className="px-3 py-2.5"><StatusBadge status={u.status}/></td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <ActionBtn label="View" onClick={() => setDetail(u)}/>
                      {!isReadOnly && <ActionBtn label="Edit" onClick={() => { setDetail(u); setEditMode(true); }}/>}
                      <ActionBtn label="Colleges" onClick={() => onNavigate("colleges")}/>
                      <ActionBtn label="Students" onClick={() => onNavigate("students/list")}/>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (<DetailModal title={detail.name} editMode={editMode} onEdit={() => setEditMode((e) => !e)} onClose={() => { setDetail(null); setEditMode(false); }} fields={[
                { label: "Code", value: detail.code },
                { label: "University Name", value: detail.name },
                { label: "Type", value: detail.type },
                { label: "City", value: detail.city },
                { label: "Affiliated Colleges", value: String(detail.colleges) },
                { label: "Total Students", value: detail.students.toLocaleString() },
                { label: "NAAC Grade", value: detail.naac },
                { label: "Status", value: detail.status },
            ]}/>)}
      {showAdd && (<AddModal title="University" onClose={() => setShowAdd(false)} fields={["University Name", "Type", "City", "Status"]}/>)}
    </div>);
}
/* ── Access Denied ────────────────────────────────────────────────────── */
function AccessDenied({ level }) {
    return (<div className="flex flex-col items-center justify-center py-20">
      <div className="text-5xl mb-4">🔒</div>
      <h2 className="text-lg font-bold text-[#0d2137] mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
        Access Restricted
      </h2>
      <p className="text-sm text-[#4a6080] text-center max-w-sm">
        Your role does not have permission to access <strong>{level}</strong> education records. Contact your system administrator if you believe this is an error.
      </p>
    </div>);
}
export default function Education({ role, initialTab = 0, onNavigate }) {
    const canPrimary = PRIMARY_ROLES.includes(role.id);
    const canInter = INTERMEDIATE_ROLES.includes(role.id);
    const canUni = UNIVERSITY_ROLES.includes(role.id);
    const TAB_DEF = [
        { label: "Primary Education", allowed: canPrimary },
        { label: "Intermediate Education", allowed: canInter },
        { label: "University Education", allowed: canUni },
    ];
    const visibleTabs = TAB_DEF.filter((t) => t.allowed);
    // Find first allowed tab that matches initialTab, or first allowed overall
    const computeStart = () => {
        if (TAB_DEF[initialTab]?.allowed)
            return initialTab;
        const first = TAB_DEF.findIndex((t) => t.allowed);
        return first >= 0 ? first : 0;
    };
    const [tab, setTab] = useState(computeStart);
    // Check if the initialTab level is accessible at all
    const requestedLevelName = ["Primary Education", "Intermediate Education", "University Education"][initialTab];
    const requestedAllowed = TAB_DEF[initialTab]?.allowed ?? false;
    // If user navigated to a specific level they can't access, show denied
    if (!requestedAllowed && initialTab > 0) {
        return (<div className="p-6">
        <h1 className="text-xl font-bold text-[#0d2137] mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>Education Management</h1>
        <AccessDenied level={requestedLevelName}/>
      </div>);
    }
    return (<div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Education Management</h1>
          <p className="text-sm text-[#4a6080] mt-0.5">
            {visibleTabs.map((t) => t.label).join(" · ")}
          </p>
        </div>
      </div>

      {/* Level tabs — only show tabs this role can see */}
      {visibleTabs.length > 1 && (<div className="flex gap-0 mb-5 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden w-fit">
          {TAB_DEF.map((t, i) => t.allowed ? (<button key={t.label} onClick={() => setTab(i)} className={`px-5 py-2.5 text-sm font-semibold transition-colors border-r border-[#c8d6e8] last:border-0 ${tab === i ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
                {t.label}
              </button>) : null)}
        </div>)}

      {/* Tab content */}
      {tab === 0 && canPrimary && <PrimaryTab role={role} onNavigate={onNavigate}/>}
      {tab === 1 && canInter && <IntermediateTab role={role} onNavigate={onNavigate}/>}
      {tab === 2 && canUni && <UniversityTab role={role} onNavigate={onNavigate}/>}
    </div>);
}
