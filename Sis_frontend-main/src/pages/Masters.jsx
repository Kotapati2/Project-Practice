import { useState } from "react";
const MASTER_ITEMS = [
    "Gender", "Blood Group", "Caste", "Religion", "Nationality",
    "Mother Tongue", "Education Level", "Year Level",
    "Medium of Instruction", "State", "Income", "Relationship",
    "Occupation", "Bank", "Skill Type", "Sports", "Other",
];
const SAMPLE_DATA = {
    Gender: [
        { id: "GEN-001", name: "Male", status: "Active" },
        { id: "GEN-002", name: "Female", status: "Active" },
        { id: "GEN-003", name: "Transgender", status: "Active" },
    ],
    "Blood Group": [
        { id: "BG-001", name: "A+", status: "Active" },
        { id: "BG-002", name: "A-", status: "Active" },
        { id: "BG-003", name: "B+", status: "Active" },
        { id: "BG-004", name: "B-", status: "Active" },
        { id: "BG-005", name: "O+", status: "Active" },
        { id: "BG-006", name: "O-", status: "Active" },
        { id: "BG-007", name: "AB+", status: "Active" },
        { id: "BG-008", name: "AB-", status: "Active" },
    ],
    Religion: [
        { id: "REL-001", name: "Hindu", status: "Active" },
        { id: "REL-002", name: "Muslim", status: "Active" },
        { id: "REL-003", name: "Christian", status: "Active" },
        { id: "REL-004", name: "Sikh", status: "Active" },
        { id: "REL-005", name: "Buddhist", status: "Active" },
    ],
    Occupation: [
        { id: "OCC-001", name: "Agriculture / Farming", status: "Active" },
        { id: "OCC-002", name: "Government Service", status: "Active" },
        { id: "OCC-003", name: "Private Service", status: "Active" },
        { id: "OCC-004", name: "Business / Self-employed", status: "Active" },
        { id: "OCC-005", name: "Daily Wage Labour", status: "Active" },
        { id: "OCC-006", name: "Retired", status: "Inactive" },
    ],
};
export default function Masters() {
    const [active, setActive] = useState("Gender");
    const [search, setSearch] = useState("");
    const [addMode, setAddMode] = useState(false);
    const rows = SAMPLE_DATA[active] ?? [
        { id: `${active.substring(0, 3).toUpperCase()}-001`, name: `Sample ${active} 1`, status: "Active" },
        { id: `${active.substring(0, 3).toUpperCase()}-002`, name: `Sample ${active} 2`, status: "Active" },
        { id: `${active.substring(0, 3).toUpperCase()}-003`, name: `Sample ${active} 3`, status: "Inactive" },
    ];
    const filtered = rows.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Master Management</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">Manage reference data used across all SIS modules.</p>
      </div>

      <div className="flex gap-4">
        {/* Left menu */}
        <div className="w-48 flex-shrink-0 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden">
          <div className="px-3 py-2.5 border-b border-[#c8d6e8]">
            <span className="text-xs font-semibold text-[#4a6080] uppercase tracking-wide">Reference Tables</span>
          </div>
          {MASTER_ITEMS.map((item) => (<button key={item} onClick={() => { setActive(item); setSearch(""); setAddMode(false); }} className={`w-full text-left px-4 py-2.5 text-xs transition-colors border-b border-[#f0f3f8] last:border-0 font-medium
                ${active === item ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f5f7fb] hover:text-[#1a2636]"}`}>
              {item}
            </button>))}
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white border border-[#c8d6e8] rounded-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">{active} Master</h2>
              <button onClick={() => setAddMode(true)} className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137] transition-colors">
                + Add {active}
              </button>
            </div>

            {addMode && (<div className="px-4 py-3 bg-[#f5f7fb] border-b border-[#c8d6e8] flex items-center gap-3">
                <input placeholder={`Enter ${active} name`} className="flex-1 border border-[#c8d6e8] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2a5298] bg-white" autoFocus/>
                <button onClick={() => setAddMode(false)} className="bg-[#e07b1a] text-white text-xs font-semibold px-4 py-2 rounded-sm hover:bg-[#c56b12]">
                  Save
                </button>
                <button onClick={() => setAddMode(false)} className="border border-[#c8d6e8] text-[#4a6080] text-xs px-3 py-2 rounded-sm hover:bg-[#f0f3f8]">
                  Cancel
                </button>
              </div>)}

            <div className="px-4 py-3 border-b border-[#f0f3f8]">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${active}…`} className="w-64 border border-[#c8d6e8] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2a5298] bg-white"/>
            </div>

            <table className="w-full text-xs">
              <thead className="bg-[#f5f7fb]">
                <tr>
                  {["ID", `${active} Name`, "Status", "Actions"].map((h) => (<th key={h} className="text-left px-4 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{h}</th>))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3f8]">
                {filtered.map((row) => (<tr key={row.id} className="hover:bg-[#f8fafd] transition-colors">
                    <td className="px-4 py-2.5 font-mono text-[#2a5298] text-[11px]">{row.id}</td>
                    <td className="px-4 py-2.5 font-medium text-[#1a2636]">{row.name}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${row.status === "Active" ? "bg-green-100 text-green-800 border border-green-300" : "bg-gray-100 text-gray-600 border border-gray-300"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex gap-1">
                        {["Edit", row.status === "Active" ? "Deactivate" : "Activate"].map((a) => (<button key={a} className={`text-[10px] border px-2 py-0.5 rounded-sm transition-colors ${a === "Deactivate" ? "border-red-200 text-red-700 hover:bg-red-50" : "border-[#c8d6e8] text-[#2a5298] hover:bg-[#e8eef7]"}`}>{a}</button>))}
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>

            {filtered.length === 0 && (<div className="px-4 py-8 text-center text-xs text-[#4a6080]">No records found for "{search}"</div>)}

            <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8eef7]">
              <span className="text-xs text-[#4a6080]">{filtered.length} records</span>
              <div className="flex gap-1">
                {["Export Excel", "Export PDF"].map((a) => (<button key={a} className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">{a}</button>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
