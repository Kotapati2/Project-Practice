import { useState } from "react";
const BANKS = [
    { code: "BANK-001", name: "State Bank of India", abbr: "SBI", type: "Public Sector", branches: 142, headquarters: "Mumbai", status: "Active" },
    { code: "BANK-002", name: "Andhra Bank (Union Bank)", abbr: "UBI", type: "Public Sector", branches: 86, headquarters: "Hyderabad", status: "Active" },
    { code: "BANK-003", name: "Bank of Baroda", abbr: "BOB", type: "Public Sector", branches: 64, headquarters: "Vadodara", status: "Active" },
    { code: "BANK-004", name: "HDFC Bank", abbr: "HDFC", type: "Private Sector", branches: 98, headquarters: "Mumbai", status: "Active" },
    { code: "BANK-005", name: "ICICI Bank", abbr: "ICICI", type: "Private Sector", branches: 74, headquarters: "Mumbai", status: "Active" },
    { code: "BANK-006", name: "Telangana State Co-op Bank", abbr: "TSCB", type: "Co-operative", branches: 38, headquarters: "Hyderabad", status: "Active" },
];
const BRANCHES = [
    { ifsc: "SBIN0040156", bank: "SBI", branch: "Kondapur", district: "Rangareddy", address: "Plot 42, Kondapur Main Rd", pincode: "500084", micr: "500002103", status: "Active" },
    { ifsc: "SBIN0040162", bank: "SBI", branch: "Malakpet", district: "Hyderabad", address: "14-5-124, Malakpet Colony", pincode: "500024", micr: "500002108", status: "Active" },
    { ifsc: "UBIN0549024", bank: "UBI", branch: "Hyderabad Main", district: "Hyderabad", address: "Bank Street, Koti", pincode: "500001", micr: "500026002", status: "Active" },
    { ifsc: "HDFC0001924", bank: "HDFC", branch: "Banjara Hills", district: "Hyderabad", address: "Road No. 12, Banjara Hills", pincode: "500034", micr: "500240101", status: "Active" },
    { ifsc: "ICIC0001240", bank: "ICICI", branch: "Kukatpally", district: "Rangareddy", address: "KPHB Colony, Phase I", pincode: "500072", micr: "500229001", status: "Active" },
    { ifsc: "BARB0HYDER0", bank: "BOB", branch: "Hyderabad", district: "Hyderabad", address: "Abids, Bank Street", pincode: "500001", micr: "500012002", status: "Active" },
    { ifsc: "SBIN0040198", bank: "SBI", branch: "Warangal Main", district: "Warangal Urban", address: "Station Road, Warangal", pincode: "506002", micr: "506002001", status: "Active" },
    { ifsc: "TSCB0000001", bank: "TSCB", branch: "Hyderabad Head Office", district: "Hyderabad", address: "Somajiguda, Hyderabad", pincode: "500082", micr: "500094001", status: "Active" },
];
function StatusBadge({ s }) {
    return <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${s === "Active" ? "bg-green-100 text-green-800 border border-green-300" : "bg-gray-100 text-gray-600 border border-gray-300"}`}>{s}</span>;
}
function BanksTab() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [detail, setDetail] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const filtered = BANKS.filter((b) => {
        const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.abbr.toLowerCase().includes(search.toLowerCase());
        const matchType = typeFilter === "All" || b.type === typeFilter;
        return matchSearch && matchType;
    });
    return (<div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
            { label: "Total Banks", value: BANKS.length, bg: "bg-blue-50 border-blue-100", color: "text-[#1a3a5c]" },
            { label: "Public Sector", value: BANKS.filter((b) => b.type === "Public Sector").length, bg: "bg-green-50 border-green-100", color: "text-[#1a6b3a]" },
            { label: "Private Sector", value: BANKS.filter((b) => b.type === "Private Sector").length, bg: "bg-amber-50 border-amber-100", color: "text-[#b45309]" },
            { label: "Total Branches", value: BANKS.reduce((s, b) => s + b.branches, 0), bg: "bg-slate-50 border-slate-100", color: "text-[#4a6080]" },
        ].map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h2 className="text-sm font-semibold text-[#0d2137]">Banks</h2>
          <button onClick={() => setShowAdd(true)} className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137]">+ Add Bank</button>
        </div>
        <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none bg-white">
            {["All", "Public Sector", "Private Sector", "Co-operative"].map((o) => <option key={o}>{o}</option>)}
          </select>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, abbreviation…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Code", "Bank Name", "Abbreviation", "Type", "Branches", "Headquarters", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((b) => (<tr key={b.code} className="hover:bg-[#f8fafd] cursor-pointer" onClick={() => setDetail(b)}>
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{b.code}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{b.name}</td>
                  <td className="px-3 py-2.5 font-mono font-bold text-[#1a3a5c]">{b.abbr}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{b.type}</td>
                  <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{b.branches}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{b.headquarters}</td>
                  <td className="px-3 py-2.5"><StatusBadge s={b.status}/></td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button onClick={() => setDetail(b)} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
                      <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Edit</button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[460px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">{detail.name}</h2>
              <button onClick={() => setDetail(null)} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: "Bank Code", value: detail.code },
                { label: "Abbreviation", value: detail.abbr },
                { label: "Type", value: detail.type },
                { label: "Headquarters", value: detail.headquarters },
                { label: "Total Branches", value: String(detail.branches) },
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

      {showAdd && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[420px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">Add Bank</h2>
              <button onClick={() => setShowAdd(false)} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
            </div>
            <div className="p-5 space-y-3">
              {["Bank Name", "Abbreviation", "Type", "Headquarters"].map((f) => (<div key={f}>
                  <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">{f}</label>
                  {f === "Type" ? (<select className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
                      <option>Public Sector</option><option>Private Sector</option><option>Co-operative</option>
                    </select>) : (<input placeholder={`Enter ${f}`} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white"/>)}
                </div>))}
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-[#c8d6e8]">
              <button onClick={() => setShowAdd(false)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
              <button onClick={() => setShowAdd(false)} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137]">Save</button>
            </div>
          </div>
        </div>)}
    </div>);
}
function BranchesTab() {
    const [search, setSearch] = useState("");
    const [bankFilter, setBankFilter] = useState("All");
    const [detail, setDetail] = useState(null);
    const banks = [...new Set(BRANCHES.map((b) => b.bank))];
    const filtered = BRANCHES.filter((b) => {
        const matchSearch = b.ifsc.toLowerCase().includes(search.toLowerCase()) || b.branch.toLowerCase().includes(search.toLowerCase()) || b.district.toLowerCase().includes(search.toLowerCase());
        const matchBank = bankFilter === "All" || b.bank === bankFilter;
        return matchSearch && matchBank;
    });
    return (<div className="bg-white border border-[#c8d6e8] rounded-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
        <h2 className="text-sm font-semibold text-[#0d2137]">Bank Branches</h2>
        <button className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137]">+ Add Branch</button>
      </div>
      <div className="px-4 py-3 border-b border-[#f0f3f8] flex gap-2">
        <select value={bankFilter} onChange={(e) => setBankFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none bg-white">
          <option value="All">All Banks</option>
          {banks.map((b) => <option key={b}>{b}</option>)}
        </select>
        <select className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] focus:outline-none bg-white">
          <option>All Districts</option>
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search IFSC, branch name, district…" className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white flex-1"/>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-[#f5f7fb]">
            <tr>
              {["IFSC Code", "Bank", "Branch Name", "District", "Address", "Pincode", "MICR", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3f8]">
            {filtered.map((b) => (<tr key={b.ifsc} className="hover:bg-[#f8fafd] cursor-pointer" onClick={() => setDetail(b)}>
                <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px] whitespace-nowrap">{b.ifsc}</td>
                <td className="px-3 py-2.5 font-mono font-bold text-[#1a3a5c]">{b.bank}</td>
                <td className="px-3 py-2.5 font-medium text-[#1a2636]">{b.branch}</td>
                <td className="px-3 py-2.5 text-[#4a6080]">{b.district}</td>
                <td className="px-3 py-2.5 text-[#4a6080] max-w-[180px] truncate">{b.address}</td>
                <td className="px-3 py-2.5 font-mono text-[#4a6080]">{b.pincode}</td>
                <td className="px-3 py-2.5 font-mono text-[#4a6080]">{b.micr}</td>
                <td className="px-3 py-2.5"><StatusBadge s={b.status}/></td>
                <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setDetail(b)} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-[#f0f3f8]">
        <span className="text-xs text-[#4a6080]">Showing {filtered.length} of {BRANCHES.length} branches</span>
      </div>

      {detail && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-[#c8d6e8] rounded-sm shadow-xl w-[460px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">{detail.bank} — {detail.branch}</h2>
              <button onClick={() => setDetail(null)} className="text-[#4a6080] hover:text-[#0d2137] text-lg leading-none">✕</button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: "IFSC Code", value: detail.ifsc },
                { label: "Bank", value: detail.bank },
                { label: "Branch Name", value: detail.branch },
                { label: "District", value: detail.district },
                { label: "MICR Code", value: detail.micr },
                { label: "Pincode", value: detail.pincode },
                { label: "Status", value: detail.status },
            ].map(({ label, value }) => (<div key={label}>
                  <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</div>
                  <div className="text-sm text-[#1a2636] font-medium">{value}</div>
                </div>))}
              <div className="col-span-2">
                <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Address</div>
                <div className="text-sm text-[#1a2636] font-medium">{detail.address}</div>
              </div>
            </div>
            <div className="flex justify-end px-5 py-4 border-t border-[#c8d6e8]">
              <button onClick={() => setDetail(null)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Close</button>
            </div>
          </div>
        </div>)}
    </div>);
}
export default function BankPage() {
    const [tab, setTab] = useState("banks");
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Bank Management</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">Manage banks, branches, and IFSC codes used for scholarship and fee disbursement</p>
      </div>

      <div className="flex gap-0 mb-5 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden w-fit">
        {[["banks", "Banks"], ["branches", "Branches & IFSC"]].map(([id, label]) => (<button key={id} onClick={() => setTab(id)} className={`px-5 py-2.5 text-sm font-semibold transition-colors border-r border-[#c8d6e8] last:border-0 ${tab === id ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
            {label}
          </button>))}
      </div>

      {tab === "banks" && <BanksTab />}
      {tab === "branches" && <BranchesTab />}
    </div>);
}
