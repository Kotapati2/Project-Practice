import { useState } from "react";
const CATEGORIES = ["All", "Identity", "Academic", "Address", "Income", "Bank", "Photo", "Other"];
const DOCS = [
    { id: "DOC-001", name: "Birth Certificate", student: "Arjun Ramakrishna", sid: "STU-2026-00142", category: "Identity", status: "Verified", uploaded: "01 Aug 2026", size: "245 KB" },
    { id: "DOC-002", name: "Aadhaar Card", student: "Arjun Ramakrishna", sid: "STU-2026-00142", category: "Identity", status: "Verified", uploaded: "01 Aug 2026", size: "189 KB" },
    { id: "DOC-003", name: "Caste Certificate", student: "Priya Suresh", sid: "STU-2026-00143", category: "Identity", status: "Pending", uploaded: "03 Aug 2026", size: "312 KB" },
    { id: "DOC-004", name: "Income Certificate", student: "Mohammed Irfan", sid: "STU-2026-00144", category: "Income", status: "Rejected", uploaded: "05 Aug 2026", size: "198 KB" },
    { id: "DOC-005", name: "Transfer Certificate", student: "Kavitha Devi B.", sid: "STU-2026-00145", category: "Academic", status: "Verified", uploaded: "07 Aug 2026", size: "521 KB" },
    { id: "DOC-006", name: "Bank Passbook", student: "Ravi Teja G.", sid: "STU-2026-00146", category: "Bank", status: "Pending", uploaded: "10 Aug 2026", size: "287 KB" },
    { id: "DOC-007", name: "Passport Photo", student: "Shalini Varma", sid: "STU-2026-00147", category: "Photo", status: "Verified", uploaded: "12 Aug 2026", size: "62 KB" },
    { id: "DOC-008", name: "Address Proof", student: "Kiran Kumar P.", sid: "STU-2026-00148", category: "Address", status: "Pending", uploaded: "15 Aug 2026", size: "409 KB" },
];
const STATUS_STYLES = {
    Verified: "bg-green-100 text-green-800 border border-green-300",
    Pending: "bg-amber-100 text-amber-800 border border-amber-300",
    Rejected: "bg-red-100 text-red-800 border border-red-300",
};
export default function DocumentsPage({ role }) {
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [showUpload, setShowUpload] = useState(false);
    const availableDocs = role?.id === "inter-college"
        ? DOCS.filter((document) => ["STU-2026-00144", "STU-2026-00147"].includes(document.sid))
        : role?.id === "uni-college"
            ? DOCS.filter((document) => ["STU-2026-00145", "STU-2026-00148"].includes(document.sid))
            : DOCS;
    const filtered = availableDocs.filter((d) => {
        const matchCat = category === "All" || d.category === category;
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.student.toLowerCase().includes(search.toLowerCase()) ||
            d.sid.includes(search);
        return matchCat && matchSearch;
    });
    const counts = {
        total: availableDocs.length,
        verified: availableDocs.filter((d) => d.status === "Verified").length,
        pending: availableDocs.filter((d) => d.status === "Pending").length,
        rejected: availableDocs.filter((d) => d.status === "Rejected").length,
    };
    return (<div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Documents</h1>
          <p className="text-sm text-[#4a6080] mt-0.5">Upload, verify, and manage student documents.</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137] transition-colors">
          + Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
            { label: "Total", value: counts.total, color: "text-[#1a3a5c]", bg: "bg-blue-50 border-[#c8d6e8]" },
            { label: "Verified", value: counts.verified, color: "text-green-800", bg: "bg-green-50 border-green-200" },
            { label: "Pending", value: counts.pending, color: "text-amber-800", bg: "bg-amber-50 border-amber-200" },
            { label: "Rejected", value: counts.rejected, color: "text-red-700", bg: "bg-red-50 border-red-200" },
        ].map((c) => (<div key={c.label} className={`border rounded-sm p-4 ${c.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{c.label}</div>
            <div className={`text-2xl font-bold ${c.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{c.value}</div>
          </div>))}
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((cat) => (<button key={cat} onClick={() => setCategory(cat)} className={`text-xs font-semibold px-3 py-1.5 rounded-sm border transition-colors ${category === cat
                ? "bg-[#1a3a5c] text-white border-[#1a3a5c]"
                : "border-[#c8d6e8] text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
            {cat}
          </button>))}
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by document name, student…" className="ml-auto border border-[#c8d6e8] rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white w-56"/>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <span className="text-sm font-semibold text-[#0d2137]">
            Documents <span className="text-[#4a6080] font-normal text-xs ml-1">({filtered.length} records)</span>
          </span>
          <div className="flex gap-2">
            <button className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1.5 rounded-sm hover:bg-[#f0f3f8]">Bulk Download</button>
            <button className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1.5 rounded-sm hover:bg-[#f0f3f8]">Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Doc ID", "Document Name", "Student", "Student ID", "Category", "Status", "Uploaded", "Size", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[#4a6080] font-semibold uppercase tracking-wide text-[10px] border-b border-[#e8eef7]">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((d) => (<tr key={d.id} className="hover:bg-[#f8fafd] transition-colors">
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{d.id}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{d.name}</td>
                  <td className="px-3 py-2.5 text-[#1a2636]">{d.student}</td>
                  <td className="px-3 py-2.5 font-mono text-[#4a6080] text-[11px]">{d.sid}</td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] bg-[#e8eef7] text-[#1a3a5c] border border-[#c8d6e8] px-2 py-0.5 rounded-sm font-semibold">{d.category}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${STATUS_STYLES[d.status]}`}>{d.status}</span>
                  </td>
                  <td className="px-3 py-2.5 text-[#4a6080] font-mono text-[11px]">{d.uploaded}</td>
                  <td className="px-3 py-2.5 text-[#4a6080] font-mono text-[11px]">{d.size}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1">
                      {["View", "Verify", "Download"].map((a) => (<button key={a} className={`text-[10px] border px-2 py-0.5 rounded-sm transition-colors ${a === "Verify"
                    ? "border-[#2a5298] text-[#2a5298] hover:bg-[#e8eef7]"
                    : "border-[#c8d6e8] text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
                          {a}
                        </button>))}
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload modal */}
      {showUpload && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[480px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">Upload Document</h2>
              <button onClick={() => setShowUpload(false)} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: "Student", type: "select" },
                { label: "Document Type", type: "select" },
                { label: "Category", type: "select" },
                { label: "Document Number", placeholder: "Reference / cert. number" },
            ].map((f) => (<div key={f.label}>
                  <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">{f.label}</label>
                  {f.type === "select" ? (<select className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
                      <option>Select {f.label}</option>
                    </select>) : (<input placeholder={f.placeholder} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white"/>)}
                </div>))}
              <div>
                <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">File</label>
                <div className="border-2 border-dashed border-[#c8d6e8] rounded px-6 py-8 text-center text-sm text-[#4a6080] hover:bg-[#f8fafd] cursor-pointer transition-colors">
                  <div className="text-2xl mb-2">📎</div>
                  Click or drag file here to upload
                  <div className="text-[10px] mt-1 text-[#8090a8]">PDF, JPG, PNG — max 5 MB</div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-[#c8d6e8]">
              <button onClick={() => setShowUpload(false)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
              <button onClick={() => setShowUpload(false)} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137]">Upload</button>
            </div>
          </div>
        </div>)}
    </div>);
}
