import { useState } from "react";
const REPORT_TYPES = [
    {
        category: "Enrollment",
        icon: "📝",
        reports: [
            { name: "School-wise Enrollment", desc: "Enrollment count by school and class.", lastRun: "15 Sep 2026" },
            { name: "Gender-wise Enrollment", desc: "Male/female breakdown across all classes.", lastRun: "10 Sep 2026" },
            { name: "Category-wise Enrollment", desc: "SC/ST/OBC/OC breakdown.", lastRun: "08 Sep 2026" },
            { name: "New Admissions Report", desc: "Students admitted in current academic year.", lastRun: "—" },
        ],
    },
    {
        category: "Attendance",
        icon: "📋",
        reports: [
            { name: "Daily Attendance Summary", desc: "Date-wise attendance across sections.", lastRun: "21 Sep 2026" },
            { name: "Monthly Attendance Report", desc: "Month-wise attendance analytics.", lastRun: "01 Sep 2026" },
            { name: "Chronic Absentees Report", desc: "Students with attendance below 75%.", lastRun: "07 Sep 2026" },
        ],
    },
    {
        category: "Academic",
        icon: "🎓",
        reports: [
            { name: "Pass/Fail Analysis", desc: "Exam-wise pass percentage by class.", lastRun: "20 Sep 2026" },
            { name: "Subject Performance Report", desc: "Average marks per subject.", lastRun: "18 Sep 2026" },
            { name: "Toppers List", desc: "Top 10 students per class/section.", lastRun: "—" },
        ],
    },
    {
        category: "Documents",
        icon: "📄",
        reports: [
            { name: "Pending Verification", desc: "Students with unverified documents.", lastRun: "12 Sep 2026" },
            { name: "Missing Documents", desc: "Students with incomplete document submission.", lastRun: "05 Sep 2026" },
        ],
    },
    {
        category: "Data Quality",
        icon: "🔍",
        reports: [
            { name: "Duplicate Student Records", desc: "Potential duplicate Aadhaar or name matches.", lastRun: "10 Sep 2026" },
            { name: "Incomplete Profiles", desc: "Students with missing mandatory fields.", lastRun: "09 Sep 2026" },
        ],
    },
];
const RECENT = [
    { name: "Daily Attendance Summary", generated: "21 Sep 2026, 09:14 AM", format: "Excel", size: "128 KB" },
    { name: "Pass/Fail Analysis", generated: "20 Sep 2026, 03:42 PM", format: "PDF", size: "2.1 MB" },
    { name: "School-wise Enrollment", generated: "15 Sep 2026, 11:00 AM", format: "Excel", size: "345 KB" },
    { name: "Monthly Attendance Report", generated: "01 Sep 2026, 08:30 AM", format: "PDF", size: "1.8 MB" },
    { name: "Pending Verification", generated: "12 Sep 2026, 04:20 PM", format: "Excel", size: "98 KB" },
];
export default function ReportsPage({ role }) {
    const [activeCategory, setActiveCategory] = useState("Enrollment");
    const [generating, setGenerating] = useState(null);
    const isIntermediateCollege = role?.id === "inter-college";
    const reportTypes = isIntermediateCollege
        ? REPORT_TYPES.map((group) => group.category !== "Enrollment" ? group : {
            ...group,
            reports: group.reports.map((report, index) => index !== 0 ? report : {
                ...report,
                name: "Stream-wise Enrollment",
                desc: "First and second year enrollment across MPC, BiPC, CEC, and HEC streams.",
            }),
        })
        : REPORT_TYPES;
    const recentReports = isIntermediateCollege
        ? RECENT.map((report) => report.name !== "School-wise Enrollment" ? report : { ...report, name: "Stream-wise Enrollment" })
        : RECENT;
    const active = reportTypes.find((r) => r.category === activeCategory);
    function generate(name) {
        setGenerating(name);
        setTimeout(() => setGenerating(null), 1800);
    }
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Reports & Analytics</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">Generate, view, and export comprehensive reports for your institution.</p>
      </div>

      <div className="flex gap-4">
        {/* Category sidebar */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white border border-[#c8d6e8] rounded-sm overflow-hidden">
            {reportTypes.map((rt) => (<button key={rt.category} onClick={() => setActiveCategory(rt.category)} className={`w-full text-left px-3 py-2.5 text-xs flex items-center gap-2.5 border-b border-[#f0f3f8] last:border-0 transition-colors ${activeCategory === rt.category
                ? "bg-[#1a3a5c] text-white"
                : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
                <span>{rt.icon}</span>
                <span className="font-medium">{rt.category}</span>
                <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-sm font-bold ${activeCategory === rt.category ? "bg-white/20 text-white" : "bg-[#e8eef7] text-[#4a6080]"}`}>
                  {rt.reports.length}
                </span>
              </button>))}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {/* Report list */}
          <div className="bg-white border border-[#c8d6e8] rounded-sm">
            <div className="px-4 py-3 border-b border-[#c8d6e8] flex items-center gap-2">
              <span className="text-sm">{active.icon}</span>
              <h2 className="text-sm font-semibold text-[#0d2137]">{active.category} Reports</h2>
            </div>
            <div className="divide-y divide-[#f0f3f8]">
              {active.reports.map((r) => (<div key={r.name} className="px-4 py-4 flex items-start justify-between hover:bg-[#f8fafd] transition-colors">
                  <div className="flex-1 mr-4">
                    <div className="text-sm font-semibold text-[#1a2636]">{r.name}</div>
                    <div className="text-xs text-[#4a6080] mt-0.5">{r.desc}</div>
                    {r.lastRun !== "—" && (<div className="text-[10px] text-[#8090a8] mt-1 font-mono">Last run: {r.lastRun}</div>)}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <select className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs text-[#4a6080] bg-white focus:outline-none">
                      <option>Excel</option>
                      <option>PDF</option>
                      <option>CSV</option>
                    </select>
                    <button onClick={() => generate(r.name)} disabled={generating === r.name} className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137] transition-colors disabled:opacity-60 flex items-center gap-1.5">
                      {generating === r.name ? (<>
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                          Generating…
                        </>) : "Generate"}
                    </button>
                  </div>
                </div>))}
            </div>
          </div>

          {/* Recent reports */}
          <div className="bg-white border border-[#c8d6e8] rounded-sm">
            <div className="px-4 py-3 border-b border-[#c8d6e8]">
              <h2 className="text-sm font-semibold text-[#0d2137]">Recent Reports</h2>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-[#f5f7fb]">
                <tr>
                  {["Report Name", "Generated", "Format", "Size", "Actions"].map((h) => (<th key={h} className="text-left px-4 py-2.5 text-[#4a6080] font-semibold uppercase tracking-wide text-[10px] border-b border-[#e8eef7]">{h}</th>))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3f8]">
                {recentReports.map((r) => (<tr key={r.name} className="hover:bg-[#f8fafd] transition-colors">
                    <td className="px-4 py-3 font-medium text-[#1a2636]">{r.name}</td>
                    <td className="px-4 py-3 text-[#4a6080] font-mono text-[11px]">{r.generated}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm border ${r.format === "PDF" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-800 border-green-200"}`}>{r.format}</span>
                    </td>
                    <td className="px-4 py-3 text-[#4a6080] font-mono text-[11px]">{r.size}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {["View", "Download"].map((a) => (<button key={a} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7] transition-colors">{a}</button>))}
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);
}
