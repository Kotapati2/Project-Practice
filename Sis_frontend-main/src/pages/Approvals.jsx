import { useState } from "react";
const STATUS_BADGES = {
    "Pending Verification": "bg-amber-100 text-amber-800 border border-amber-300",
    Submitted: "bg-blue-100 text-blue-800 border border-blue-300",
    Approved: "bg-green-100 text-green-800 border border-green-300",
    Rejected: "bg-red-100 text-red-800 border border-red-300",
    Returned: "bg-orange-100 text-orange-800 border border-orange-300",
};
const QUEUE = [
    { id: "APP-2026-0891", type: "School Registration", entity: "ZPHS Kondapur", mandal: "Serilingampally", district: "Rangareddy", date: "09 Sep 2026", status: "Pending Verification", urgent: true },
    { id: "APP-2026-0890", type: "Student Transfer", entity: "K. Suresh Kumar", mandal: "Hyderabad", district: "Hyderabad", date: "09 Sep 2026", status: "Submitted", urgent: false },
    { id: "APP-2026-0887", type: "Teacher Appointment", entity: "Govt. HS Malakpet", mandal: "Hyderabad", district: "Hyderabad", date: "08 Sep 2026", status: "Approved", urgent: false },
    { id: "APP-2026-0885", type: "Infrastructure Grant", entity: "Palakkad District", mandal: "Palakkad", district: "Palakkad", date: "07 Sep 2026", status: "Pending Verification", urgent: true },
    { id: "APP-2026-0882", type: "Exam Centre Setup", entity: "GHSS Thrissur", mandal: "Thrissur East", district: "Thrissur", date: "06 Sep 2026", status: "Returned", urgent: false },
];
export default function Approvals({ onNavigate }) {
    const [selected, setSelected] = useState(null);
    const [modal, setModal] = useState(null);
    const [remarks, setRemarks] = useState("");
    const selectedItem = QUEUE.find((q) => q.id === selected);
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Approvals</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">Review and process pending approval requests.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
            { label: "Pending", value: "12", color: "text-[#b45309]", bg: "bg-amber-50 border-amber-200" },
            { label: "Approved", value: "284", color: "text-[#1a6b3a]", bg: "bg-green-50 border-green-200" },
            { label: "Returned", value: "8", color: "text-[#b45309]", bg: "bg-orange-50 border-orange-200" },
            { label: "Rejected", value: "3", color: "text-[#b91c1c]", bg: "bg-red-50 border-red-200" },
        ].map((c) => (<div key={c.label} className={`border rounded-sm p-4 ${c.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{c.label}</div>
            <div className={`text-2xl font-bold ${c.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{c.value}</div>
          </div>))}
      </div>

      <div className="flex gap-4">
        {/* Queue */}
        <div className="flex-1">
          <div className="bg-white border border-[#c8d6e8] rounded-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">Approval Queue</h2>
              <div className="flex items-center gap-2">
                <select className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] bg-white focus:outline-none">
                  <option>All Statuses</option>
                  <option>Pending Verification</option>
                  <option>Submitted</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-[#f5f7fb]">
                  <tr>
                    {["", "Ref No.", "Type", "Entity", "Mandal", "District", "Date", "Status", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{h}</th>))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f3f8]">
                  {QUEUE.map((row) => (<tr key={row.id} onClick={() => setSelected(row.id === selected ? null : row.id)} className={`cursor-pointer transition-colors ${selected === row.id ? "bg-[#e8eef7]" : "hover:bg-[#f8fafd]"}`}>
                      <td className="px-3 py-2.5">
                        {row.urgent && <span className="w-2 h-2 rounded-full bg-[#e07b1a] block" title="Urgent"/>}
                      </td>
                      <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{row.id}</td>
                      <td className="px-3 py-2.5 text-[#1a2636]">{row.type}</td>
                      <td className="px-3 py-2.5 text-[#4a6080]">{row.entity}</td>
                      <td className="px-3 py-2.5 text-[#4a6080]">{row.mandal}</td>
                      <td className="px-3 py-2.5 text-[#4a6080]">{row.district}</td>
                      <td className="px-3 py-2.5 text-[#4a6080]">{row.date}</td>
                      <td className="px-3 py-2.5">
                        <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${STATUS_BADGES[row.status]}`}>{row.status}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex gap-1">
                          <button onClick={(e) => { e.stopPropagation(); setSelected(row.id); }} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Review</button>
                        </div>
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Review panel */}
        {selectedItem && (<div className="w-72 flex-shrink-0 space-y-3">
            <div className="bg-white border border-[#c8d6e8] rounded-sm">
              <div className="px-4 py-3 border-b border-[#c8d6e8] flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#0d2137]">Review</h3>
                <button onClick={() => setSelected(null)} className="text-[#4a6080] hover:text-[#1a3a5c] text-xs">✕</button>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Reference</div>
                  <div className="text-xs font-mono text-[#2a5298]">{selectedItem.id}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Type</div>
                  <div className="text-xs text-[#1a2636] font-medium">{selectedItem.type}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Entity</div>
                  <div className="text-xs text-[#1a2636]">{selectedItem.entity}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Status</div>
                  <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${STATUS_BADGES[selectedItem.status]}`}>{selectedItem.status}</span>
                </div>
                <div>
                  <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Submitted</div>
                  <div className="text-xs text-[#1a2636]">{selectedItem.date}</div>
                </div>

                <div className="pt-2 border-t border-[#f0f3f8]">
                  <div className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-2">Add Remarks</div>
                  <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} placeholder="Enter remarks or comments…" className="w-full border border-[#c8d6e8] rounded px-2 py-2 text-xs focus:outline-none focus:border-[#2a5298] resize-none"/>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button onClick={() => setModal("approve")} className="bg-[#1a6b3a] text-white text-xs font-semibold py-2 rounded-sm hover:bg-[#145630] transition-colors">✓ Approve</button>
                  <button onClick={() => setModal("sendback")} className="bg-[#e07b1a] text-white text-xs font-semibold py-2 rounded-sm hover:bg-[#c56b12] transition-colors">↩ Send Back</button>
                  <button onClick={() => setModal("reject")} className="bg-white text-[#b91c1c] border border-[#b91c1c]/40 text-xs font-semibold py-2 rounded-sm hover:bg-red-50 transition-colors">✕ Reject</button>
                </div>
              </div>
            </div>
          </div>)}
      </div>

      {/* Confirmation modals */}
      {modal && (<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-[#c8d6e8] rounded shadow-lg w-96 p-6">
            <h3 className="text-base font-semibold text-[#0d2137] mb-2">
              {modal === "approve" ? "Confirm Approval" : modal === "reject" ? "Confirm Rejection" : "Send Back for Correction"}
            </h3>
            <p className="text-sm text-[#4a6080] mb-4">
              {modal === "approve"
                ? "Are you sure you want to approve this request? This action cannot be undone."
                : modal === "reject"
                    ? "Are you sure you want to reject this request? Provide a reason below."
                    : "This request will be sent back to the submitting officer for correction."}
            </p>
            {(modal === "reject" || modal === "sendback") && (<textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} placeholder="Enter reason / remarks…" className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm mb-4 focus:outline-none focus:border-[#2a5298] resize-none"/>)}
            <div className="flex gap-2 justify-end">
              <button onClick={() => setModal(null)} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8]">Cancel</button>
              <button onClick={() => { setModal(null); setSelected(null); }} className={`text-white text-sm font-semibold px-5 py-2 rounded-sm transition-colors ${modal === "approve" ? "bg-[#1a6b3a] hover:bg-[#145630]" : modal === "reject" ? "bg-[#b91c1c] hover:bg-[#991515]" : "bg-[#e07b1a] hover:bg-[#c56b12]"}`}>
                {modal === "approve" ? "Approve" : modal === "reject" ? "Reject" : "Send Back"}
              </button>
            </div>
          </div>
        </div>)}
    </div>);
}
