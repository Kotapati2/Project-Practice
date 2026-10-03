import { useState } from "react";
const DISTRICTS = [
    { code: "DIST-HYD", name: "Hyderabad", region: "Hyderabad", mandals: 16, schools: 247, colleges: 42, students: 128431, deo: "K. Ramesh Babu", status: "Active" },
    { code: "DIST-RNG", name: "Rangareddy", region: "Hyderabad", mandals: 27, schools: 384, colleges: 58, students: 198246, deo: "S. Padmavathi", status: "Active" },
    { code: "DIST-WAR", name: "Warangal Urban", region: "Warangal", mandals: 18, schools: 218, colleges: 31, students: 94382, deo: "M. Venkat Rao", status: "Active" },
    { code: "DIST-KAR", name: "Karimnagar", region: "Karimnagar", mandals: 23, schools: 310, colleges: 44, students: 132840, deo: "T. Srinivas", status: "Active" },
    { code: "DIST-NIZ", name: "Nizamabad", region: "Nizamabad", mandals: 20, schools: 268, colleges: 36, students: 107560, deo: "B. Laxmi Devi", status: "Active" },
    { code: "DIST-ADL", name: "Adilabad", region: "Adilabad", mandals: 14, schools: 196, colleges: 24, students: 68432, deo: "Ch. Ravi Kumar", status: "Active" },
];
const MANDALS = [
    { code: "MND-001", name: "Hyderabad Mandal", district: "Hyderabad", meo: "P. Suresh", schools: 34, teachers: 124, students: 18432, status: "Active" },
    { code: "MND-002", name: "Secunderabad Mandal", district: "Hyderabad", meo: "A. Kavitha", schools: 28, teachers: 98, students: 14280, status: "Active" },
    { code: "MND-003", name: "Serilingampally Mandal", district: "Rangareddy", meo: "R. Narayana Rao", schools: 42, teachers: 156, students: 22841, status: "Active" },
    { code: "MND-004", name: "LB Nagar Mandal", district: "Rangareddy", meo: "D. Usha Rani", schools: 38, teachers: 142, students: 19840, status: "Active" },
    { code: "MND-005", name: "Kukatpally Mandal", district: "Rangareddy", meo: "V. Mohan Rao", schools: 29, teachers: 108, students: 15620, status: "Active" },
    { code: "MND-006", name: "Warangal Urban Mandal", district: "Warangal Urban", meo: "K. Nirmala", schools: 22, teachers: 84, students: 11380, status: "Active" },
    { code: "MND-007", name: "Hanamkonda Mandal", district: "Warangal Urban", meo: "S. Ravi Shankar", schools: 19, teachers: 72, students: 9840, status: "Active" },
    { code: "MND-008", name: "Karimnagar Mandal", district: "Karimnagar", meo: "T. Bhavani", schools: 26, teachers: 96, students: 13240, status: "Active" },
];
const LOCATION_TREE = [
    { id: "state", label: "Telangana (State)", level: 0, children: ["reg-hyd", "reg-war"] },
    { id: "reg-hyd", label: "Hyderabad Region", level: 1, children: ["dist-hyd", "dist-rng"] },
    { id: "dist-hyd", label: "Hyderabad District", level: 2, children: ["mnd-hyd", "mnd-sec"] },
    { id: "mnd-hyd", label: "Hyderabad Mandal", level: 3, children: [] },
    { id: "mnd-sec", label: "Secunderabad Mandal", level: 3, children: [] },
    { id: "dist-rng", label: "Rangareddy District", level: 2, children: ["mnd-slg"] },
    { id: "mnd-slg", label: "Serilingampally Mandal", level: 3, children: [] },
    { id: "reg-war", label: "Warangal Region", level: 1, children: ["dist-war"] },
    { id: "dist-war", label: "Warangal Urban District", level: 2, children: ["mnd-war"] },
    { id: "mnd-war", label: "Warangal Urban Mandal", level: 3, children: [] },
];
function StatusBadge({ status }) {
    return (<span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${status === "Active" ? "bg-green-100 text-green-800 border border-green-300" : "bg-gray-100 text-gray-600 border border-gray-300"}`}>
      {status}
    </span>);
}
function DistrictsTab() {
    const [search, setSearch] = useState("");
    const [detail, setDetail] = useState(null);
    const filtered = DISTRICTS.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.region.toLowerCase().includes(search.toLowerCase()));
    return (<div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
            { label: "Total Districts", value: DISTRICTS.length, bg: "bg-blue-50 border-blue-100", color: "text-[#1a3a5c]" },
            { label: "Total Mandals", value: DISTRICTS.reduce((s, d) => s + d.mandals, 0), bg: "bg-green-50 border-green-100", color: "text-[#1a6b3a]" },
            { label: "Total Schools", value: DISTRICTS.reduce((s, d) => s + d.schools, 0).toLocaleString(), bg: "bg-amber-50 border-amber-100", color: "text-[#b45309]" },
            { label: "Total Students", value: DISTRICTS.reduce((s, d) => s + d.students, 0).toLocaleString(), bg: "bg-slate-50 border-slate-100", color: "text-[#4a6080]" },
        ].map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Districts</h2>
          <button className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137]">+ Add District</button>
        </div>
        <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2">
          <select className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none bg-white">
            <option>All Regions</option>
            <option>Hyderabad</option>
            <option>Warangal</option>
            <option>Karimnagar</option>
          </select>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search districts…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Code", "District Name", "Region", "Mandals", "Schools", "Colleges", "Students", "DEO", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((d) => (<tr key={d.code} className="hover:bg-[#f8fafd] transition-colors cursor-pointer" onClick={() => setDetail(d)}>
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{d.code}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{d.name}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{d.region}</td>
                  <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{d.mandals}</td>
                  <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{d.schools}</td>
                  <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{d.colleges}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{d.students.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{d.deo}</td>
                  <td className="px-3 py-2.5"><StatusBadge status={d.status}/></td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button onClick={() => setDetail(d)} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
                      <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Edit</button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[500px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">District — {detail.name}</h2>
              <button onClick={() => setDetail(null)} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: "District Code", value: detail.code },
                { label: "District Name", value: detail.name },
                { label: "Region", value: detail.region },
                { label: "DEO Officer", value: detail.deo },
                { label: "Mandals", value: String(detail.mandals) },
                { label: "Schools", value: String(detail.schools) },
                { label: "Colleges", value: String(detail.colleges) },
                { label: "Total Students", value: detail.students.toLocaleString() },
                { label: "Status", value: detail.status },
            ].map(({ label, value }) => (<div key={label}>
                  <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</div>
                  <div className="text-sm text-[#1a2636] font-medium">{value}</div>
                </div>))}
            </div>
            <div className="flex justify-end px-5 py-4 border-t border-[#c8d6e8]">
              <button onClick={() => setDetail(null)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Close</button>
            </div>
          </div>
        </div>)}
    </div>);
}
function MandalsTab() {
    const [search, setSearch] = useState("");
    const [distFilter, setDistFilter] = useState("All");
    const [detail, setDetail] = useState(null);
    const districts = [...new Set(MANDALS.map((m) => m.district))];
    const filtered = MANDALS.filter((m) => {
        const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.meo.toLowerCase().includes(search.toLowerCase());
        const matchDist = distFilter === "All" || m.district === distFilter;
        return matchSearch && matchDist;
    });
    return (<div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
            { label: "Total Mandals", value: MANDALS.length, bg: "bg-blue-50 border-blue-100", color: "text-[#1a3a5c]" },
            { label: "Total Schools", value: MANDALS.reduce((s, m) => s + m.schools, 0), bg: "bg-green-50 border-green-100", color: "text-[#1a6b3a]" },
            { label: "Total Teachers", value: MANDALS.reduce((s, m) => s + m.teachers, 0), bg: "bg-amber-50 border-amber-100", color: "text-[#b45309]" },
            { label: "Total Students", value: MANDALS.reduce((s, m) => s + m.students, 0).toLocaleString(), bg: "bg-slate-50 border-slate-100", color: "text-[#4a6080]" },
        ].map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Mandals</h2>
          <button className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137]">+ Add Mandal</button>
        </div>
        <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2">
          <select value={distFilter} onChange={(e) => setDistFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none bg-white">
            <option value="All">All Districts</option>
            {districts.map((d) => <option key={d}>{d}</option>)}
          </select>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search mandals, MEO…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Code", "Mandal Name", "District", "MEO Officer", "Schools", "Teachers", "Students", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((m) => (<tr key={m.code} className="hover:bg-[#f8fafd] transition-colors cursor-pointer" onClick={() => setDetail(m)}>
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{m.code}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{m.name}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{m.district}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{m.meo}</td>
                  <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{m.schools}</td>
                  <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{m.teachers}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{m.students.toLocaleString()}</td>
                  <td className="px-3 py-2.5"><StatusBadge status={m.status}/></td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button onClick={() => setDetail(m)} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
                      <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Edit</button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[480px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">Mandal — {detail.name}</h2>
              <button onClick={() => setDetail(null)} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: "Mandal Code", value: detail.code },
                { label: "Mandal Name", value: detail.name },
                { label: "District", value: detail.district },
                { label: "MEO Officer", value: detail.meo },
                { label: "Schools", value: String(detail.schools) },
                { label: "Teachers", value: String(detail.teachers) },
                { label: "Students", value: detail.students.toLocaleString() },
                { label: "Status", value: detail.status },
            ].map(({ label, value }) => (<div key={label}>
                  <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</div>
                  <div className="text-sm text-[#1a2636] font-medium">{value}</div>
                </div>))}
            </div>
            <div className="flex justify-end px-5 py-4 border-t border-[#c8d6e8]">
              <button onClick={() => setDetail(null)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Close</button>
            </div>
          </div>
        </div>)}
    </div>);
}
function LocationTab() {
    const [selected, setSelected] = useState("state");
    const selectedNode = LOCATION_TREE.find((n) => n.id === selected) ?? LOCATION_TREE[0];
    return (<div className="flex gap-4">
      <div className="w-64 flex-shrink-0 bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Hierarchy</h2>
          <button className="text-xs text-[#2a5298] border border-[#c8d6e8] px-2 py-1 rounded-sm hover:bg-[#f0f3f8]">+ Add</button>
        </div>
        <div className="p-2">
          {LOCATION_TREE.map((node) => (<button key={node.id} onClick={() => setSelected(node.id)} className={`w-full text-left text-xs py-2 rounded transition-colors flex items-center gap-1.5 ${selected === node.id ? "bg-[#e8eef7] text-[#1a3a5c] font-semibold" : "text-[#4a6080] hover:bg-[#f5f7fb]"}`} style={{ paddingLeft: `${node.level * 14 + 8}px` }}>
              {node.level > 0 && <span className="text-[#c8d6e8]">└</span>}
              <span className="truncate">{node.label}</span>
            </button>))}
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="bg-white border border-[#c8d6e8] rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#0d2137]">{selectedNode.label}</h2>
              <p className="text-xs text-[#4a6080] mt-0.5">Level {selectedNode.level}: {["State", "Region", "District", "Mandal"][selectedNode.level] ?? "Village"}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-xs border border-[#c8d6e8] text-[#2a5298] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Edit</button>
              <button className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Deactivate</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs">
            {[
            { label: "Code", value: selectedNode.id.toUpperCase() },
            { label: "Level", value: ["State", "Region", "District", "Mandal"][selectedNode.level] ?? "Village" },
            { label: "Status", value: "Active" },
            { label: "Child Units", value: String(selectedNode.children.length) },
            { label: "Last Updated", value: "12-Sep-2026" },
            { label: "Data Source", value: "Census 2011" },
        ].map(({ label, value }) => (<div key={label}>
                <div className="text-[#4a6080] mb-0.5 uppercase tracking-wide text-[10px] font-semibold">{label}</div>
                <div className="text-[#1a2636] font-medium">{value}</div>
              </div>))}
          </div>
        </div>

        <div className="bg-white border border-[#c8d6e8] rounded-sm p-4">
          <h3 className="text-xs font-semibold text-[#0d2137] mb-3">Add Child Location</h3>
          <div className="flex gap-2">
            <input placeholder="Enter name" className="border border-[#c8d6e8] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1"/>
            <input placeholder="Enter code" className="border border-[#c8d6e8] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#2a5298] bg-white w-32"/>
            <button className="bg-[#1a3a5c] text-white text-xs font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137]">Add</button>
          </div>
        </div>
      </div>
    </div>);
}
const TITLES = {
    mandals: { title: "Mandal Management", desc: "View and manage mandals, MEO assignments, and school mapping" },
    districts: { title: "District Management", desc: "Manage district-level hierarchy, DEO offices, and data" },
    location: { title: "Location Hierarchy", desc: "State → Region → District → Mandal → Village master data" },
};
const TAB_ORDER = [
    { id: "districts", label: "Districts" },
    { id: "mandals", label: "Mandals" },
    { id: "location", label: "Location Hierarchy" },
];
export default function GeographyPage({ route }) {
    const [activeTab, setActiveTab] = useState(route);
    const info = TITLES[activeTab];
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>{info.title}</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">{info.desc}</p>
      </div>

      <div className="flex gap-0 mb-5 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden w-fit">
        {TAB_ORDER.map((t) => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-5 py-2.5 text-sm font-semibold transition-colors border-r border-[#c8d6e8] last:border-0 ${activeTab === t.id ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
            {t.label}
          </button>))}
      </div>

      {activeTab === "districts" && <DistrictsTab />}
      {activeTab === "mandals" && <MandalsTab />}
      {activeTab === "location" && <LocationTab />}
    </div>);
}
