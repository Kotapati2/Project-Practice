import { useState } from "react";
/* ── SVG Mini Bar Chart ─────────────────────────────────────────────── */
function BarChart({ data, label }) {
    const max = Math.max(...data.map((d) => d.value));
    const h = 80;
    return (<div>
      <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-2">{label}</div>
      <svg width="100%" viewBox={`0 0 ${data.length * 36} ${h + 20}`} preserveAspectRatio="xMidYMid meet" className="overflow-visible">
        {data.map((d, i) => {
            const barH = max > 0 ? (d.value / max) * h : 0;
            const x = i * 36 + 4;
            return (<g key={d.name}>
              <rect x={x} y={h - barH} width={26} height={barH} rx={2} fill={d.color ?? "#1a3a5c"} opacity={0.85}/>
              <text x={x + 13} y={h + 14} textAnchor="middle" fontSize={8} fill="#4a6080">{d.name}</text>
            </g>);
        })}
      </svg>
    </div>);
}
function TrendLine({ values, color = "#2a5298" }) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const h = 40;
    const w = 120;
    const points = values.map((v, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = max === min ? h / 2 : h - ((v - min) / (max - min)) * h;
        return `${x},${y}`;
    });
    return (<svg width={w} height={h + 4} className="overflow-visible">
      <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      {values.map((v, i) => {
            const x = (i / (values.length - 1)) * w;
            const y = max === min ? h / 2 : h - ((v - min) / (max - min)) * h;
            return <circle key={i} cx={x} cy={y} r={2.5} fill={color}/>;
        })}
    </svg>);
}
/* ── Overview / Analytics Tab ──────────────────────────────────────── */
function OverviewTab() {
    const ENROLL = [
        { name: "2021", value: 38200, color: "#c8d6e8" },
        { name: "2022", value: 40800, color: "#c8d6e8" },
        { name: "2023", value: 43100, color: "#c8d6e8" },
        { name: "2024", value: 45600, color: "#2a5298" },
        { name: "2025", value: 47200, color: "#e07b1a" },
    ];
    const GENDER = [
        { name: "Boys", value: 24640, color: "#1a3a5c" },
        { name: "Girls", value: 22560, color: "#e07b1a" },
    ];
    return (<div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
            { label: "Total Students (Primary)", value: "8,42,183", trend: "+3.5%", positive: true, sparkline: [38, 40, 43, 45, 47] },
            { label: "Enrolment Growth", value: "+3.5%", trend: "vs 2024–25", positive: true, sparkline: [28, 32, 30, 34, 35] },
            { label: "Dropout Rate", value: "2.8%", trend: "-0.4%", positive: true, sparkline: [4.2, 3.8, 3.5, 3.1, 2.8] },
            { label: "Attendance Rate", value: "87.4%", trend: "+1.2%", positive: true, sparkline: [84, 85, 86, 86, 87] },
        ].map((s) => (<div key={s.label} className="bg-white border border-[#c8d6e8] rounded-sm p-4">
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className="text-2xl font-bold text-[#0d2137] mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${s.positive ? "text-[#1a6b3a]" : "text-red-600"}`}>{s.trend}</span>
              <TrendLine values={s.sparkline} color={s.positive ? "#1a6b3a" : "#dc2626"}/>
            </div>
          </div>))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-[#c8d6e8] rounded-sm p-5">
          <h3 className="text-sm font-semibold text-[#0d2137] mb-4">Enrolment Trend (Primary, 000s)</h3>
          <BarChart data={ENROLL} label="Academic Year"/>
        </div>
        <div className="bg-white border border-[#c8d6e8] rounded-sm p-5">
          <h3 className="text-sm font-semibold text-[#0d2137] mb-4">Gender Distribution (Current AY)</h3>
          <BarChart data={GENDER} label="Category"/>
          <div className="mt-3 text-xs text-[#4a6080]">
            Boys: <strong className="text-[#1a3a5c]">52.2%</strong> · Girls: <strong className="text-[#e07b1a]">47.8%</strong> · GPI: <strong className="text-[#1a2636]">0.92</strong>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h3 className="text-sm font-semibold text-[#0d2137]">District-wise Summary</h3>
          <button className="text-xs border border-[#c8d6e8] text-[#2a5298] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["District", "Schools", "Teachers", "Students", "Enrolment ↑", "Dropout %", "Attendance %"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7]">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {[
            { district: "Hyderabad", schools: 247, teachers: 842, students: "1,28,431", enrol: "+2.8%", dropout: "1.9%", att: "91.2%" },
            { district: "Rangareddy", schools: 384, teachers: 1248, students: "1,98,246", enrol: "+4.2%", dropout: "2.4%", att: "88.6%" },
            { district: "Warangal Urban", schools: 218, teachers: 724, students: "94,382", enrol: "+3.1%", dropout: "3.2%", att: "85.4%" },
            { district: "Karimnagar", schools: 310, teachers: 1024, students: "1,32,840", enrol: "+3.8%", dropout: "3.6%", att: "86.1%" },
            { district: "Nizamabad", schools: 268, teachers: 892, students: "1,07,560", enrol: "+2.4%", dropout: "4.1%", att: "84.8%" },
        ].map((row) => (<tr key={row.district} className="hover:bg-[#f8fafd]">
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{row.district}</td>
                  <td className="px-3 py-2.5 font-mono text-[#4a6080]">{row.schools}</td>
                  <td className="px-3 py-2.5 font-mono text-[#4a6080]">{row.teachers}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{row.students}</td>
                  <td className="px-3 py-2.5 text-[#1a6b3a] font-semibold">{row.enrol}</td>
                  <td className="px-3 py-2.5 text-red-600">{row.dropout}</td>
                  <td className="px-3 py-2.5 text-[#1a6b3a] font-semibold">{row.att}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
/* ── KPIs Tab ──────────────────────────────────────────────────────── */
function KPIsTab() {
    const KPIS = [
        { label: "Gross Enrolment Ratio (Primary)", value: 98.4, target: 100, unit: "%", status: "On Track" },
        { label: "Net Enrolment Ratio", value: 89.2, target: 95, unit: "%", status: "Needs Attention" },
        { label: "Retention Rate (Grade 1–5)", value: 91.6, target: 95, unit: "%", status: "Needs Attention" },
        { label: "Transition Rate (Primary → Upper)", value: 84.3, target: 90, unit: "%", status: "Needs Attention" },
        { label: "Teacher-Student Ratio", value: 1.34, target: 1.30, unit: ":30", status: "On Track" },
        { label: "Schools with Electricity", value: 96.8, target: 100, unit: "%", status: "On Track" },
        { label: "Schools with Toilets (Girls)", value: 94.2, target: 100, unit: "%", status: "On Track" },
        { label: "Data Completeness Score", value: 83.4, target: 95, unit: "%", status: "At Risk" },
    ];
    return (<div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
            { label: "On Track KPIs", value: "4", bg: "bg-green-50 border-green-100", color: "text-green-700" },
            { label: "Needs Attention", value: "3", bg: "bg-amber-50 border-amber-100", color: "text-amber-700" },
            { label: "At Risk", value: "1", bg: "bg-red-50 border-red-100", color: "text-red-700" },
        ].map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="px-4 py-3 border-b border-[#c8d6e8]">
          <h3 className="text-sm font-semibold text-[#0d2137]">Key Performance Indicators — AY 2025–26</h3>
        </div>
        <div className="divide-y divide-[#f0f3f8]">
          {KPIS.map((kpi) => {
            const pct = Math.min((kpi.value / kpi.target) * 100, 100);
            const statusCls = kpi.status === "On Track" ? "bg-green-100 text-green-800 border border-green-300" : kpi.status === "Needs Attention" ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-red-100 text-red-800 border border-red-300";
            const barColor = kpi.status === "On Track" ? "#1a6b3a" : kpi.status === "Needs Attention" ? "#b45309" : "#dc2626";
            return (<div key={kpi.label} className="px-4 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-[#1a2636] truncate">{kpi.label}</span>
                    <span className={`ml-2 flex-shrink-0 px-2 py-0.5 rounded-sm text-[10px] font-semibold ${statusCls}`}>{kpi.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-[#e8eef7] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: barColor }}/>
                    </div>
                    <span className="text-xs font-bold text-[#1a2636] whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {kpi.value}{kpi.unit} / {kpi.target}{kpi.unit}
                    </span>
                  </div>
                </div>
              </div>);
        })}
        </div>
      </div>
    </div>);
}
/* ── Comparison Tab ──────────────────────────────────────────────────*/
function ComparisonTab() {
    const rows = [
        { name: "Osmania University", type: "Central", colleges: 98, students: "18,432", faculty: 1240, gpa: "7.8", placed: "68%", naac: "A+" },
        { name: "JNTU Hyderabad", type: "Technical", colleges: 214, students: "14,280", faculty: 980, gpa: "7.4", placed: "82%", naac: "A" },
        { name: "University of Hyderabad", type: "Central", colleges: 12, students: "8,420", faculty: 620, gpa: "8.2", placed: "74%", naac: "A+" },
        { name: "Telangana University", type: "State", colleges: 68, students: "6,840", faculty: 480, gpa: "6.9", placed: "52%", naac: "B+" },
        { name: "Kakatiya University", type: "State", colleges: 87, students: "9,840", faculty: 680, gpa: "7.1", placed: "58%", naac: "A" },
    ];
    return (<div className="space-y-4">
      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h3 className="text-sm font-semibold text-[#0d2137]">University Comparison — AY 2025–26</h3>
          <button className="text-xs border border-[#c8d6e8] text-[#2a5298] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["University", "Type", "Affiliated Colleges", "Students", "Faculty", "Avg GPA", "Placement %", "NAAC"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {rows.map((r) => (<tr key={r.name} className="hover:bg-[#f8fafd]">
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{r.name}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{r.type}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636] text-center">{r.colleges}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{r.students}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636] text-center">{r.faculty}</td>
                  <td className="px-3 py-2.5 font-mono font-bold text-[#1a2636] text-center">{r.gpa}</td>
                  <td className="px-3 py-2.5 font-semibold text-[#1a6b3a]">{r.placed}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border ${r.naac === "A+" ? "bg-green-100 text-green-800 border-green-300" : r.naac === "A" ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-gray-100 text-gray-600 border-gray-200"}`}>{r.naac}</span>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-[#c8d6e8] rounded-sm p-5">
          <h3 className="text-sm font-semibold text-[#0d2137] mb-4">Placement Rate Comparison</h3>
          <BarChart data={rows.map((r) => ({ name: r.name.split(" ")[0], value: parseFloat(r.placed), color: "#1a3a5c" }))} label="University (first word)"/>
        </div>
        <div className="bg-white border border-[#c8d6e8] rounded-sm p-5">
          <h3 className="text-sm font-semibold text-[#0d2137] mb-4">Average GPA Comparison</h3>
          <BarChart data={rows.map((r) => ({ name: r.name.split(" ")[0], value: parseFloat(r.gpa), color: "#e07b1a" }))} label="University (first word)"/>
        </div>
      </div>
    </div>);
}
/* ── Performance Tab ────────────────────────────────────────────────*/
function PerformanceTab() {
    const rows = [
        { rank: 1, name: "Hyderabad", type: "District", score: 94.2, enrol: "+4.1%", att: "91.2%", dq: "96.8%", trend: [88, 90, 92, 93, 94] },
        { rank: 2, name: "Rangareddy", type: "District", score: 91.8, enrol: "+3.8%", att: "88.6%", dq: "95.2%", trend: [86, 88, 89, 90, 91] },
        { rank: 3, name: "Karimnagar", type: "District", score: 88.4, enrol: "+3.2%", att: "86.1%", dq: "93.4%", trend: [82, 84, 86, 87, 88] },
        { rank: 4, name: "Warangal Urban", type: "District", score: 85.6, enrol: "+2.9%", att: "85.4%", dq: "91.8%", trend: [80, 82, 83, 84, 85] },
        { rank: 5, name: "Nizamabad", type: "District", score: 82.1, enrol: "+2.4%", att: "84.8%", dq: "89.4%", trend: [78, 79, 80, 81, 82] },
        { rank: 6, name: "Adilabad", type: "District", score: 76.8, enrol: "+1.8%", att: "82.3%", dq: "86.2%", trend: [72, 73, 75, 76, 76] },
    ];
    return (<div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
            { label: "State Average Score", value: "86.4", bg: "bg-blue-50 border-blue-100", color: "text-[#1a3a5c]" },
            { label: "Top District", value: "Hyderabad", bg: "bg-green-50 border-green-100", color: "text-[#1a6b3a]", mono: false },
            { label: "Improvement YoY", value: "+3.2%", bg: "bg-amber-50 border-amber-100", color: "text-[#b45309]" },
            { label: "Districts Evaluated", value: "33", bg: "bg-slate-50 border-slate-100", color: "text-[#4a6080]" },
        ].map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`} style={{ fontFamily: s.mono === false ? undefined : "'JetBrains Mono', monospace" }}>{s.value}</div>
          </div>))}
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <h3 className="text-sm font-semibold text-[#0d2137]">District Performance Ranking</h3>
          <button className="text-xs border border-[#c8d6e8] text-[#2a5298] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["Rank", "District", "Performance Score", "Enrolment Growth", "Attendance %", "Data Quality %", "5-Year Trend"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {rows.map((r) => (<tr key={r.rank} className="hover:bg-[#f8fafd]">
                  <td className="px-3 py-2.5">
                    <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${r.rank <= 3 ? "bg-[#e07b1a] text-white" : "bg-[#e8eef7] text-[#4a6080]"}`}>{r.rank}</span>
                  </td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636]">{r.name}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-[#e8eef7] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1a3a5c] rounded-full" style={{ width: `${r.score}%` }}/>
                      </div>
                      <span className="font-mono font-bold text-[#1a2636]">{r.score}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[#1a6b3a] font-semibold">{r.enrol}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{r.att}</td>
                  <td className="px-3 py-2.5 font-mono text-[#1a2636]">{r.dq}</td>
                  <td className="px-3 py-2.5"><TrendLine values={r.trend}/></td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
const ROUTE_TABS = [
    { id: "analytics", label: "Overview" },
    { id: "kpis", label: "KPIs" },
    { id: "comparison", label: "Comparison" },
    { id: "performance", label: "Performance" },
];
const TITLES = {
    analytics: "Analytics Overview",
    kpis: "Key Performance Indicators",
    comparison: "Institution Comparison",
    performance: "Performance Monitoring",
};
export default function AnalyticsPage({ route }) {
    const [activeTab, setActiveTab] = useState(route);
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>{TITLES[activeTab]}</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">State-level metrics, trends, and benchmarks — Academic Year 2025–26</p>
      </div>

      <div className="flex gap-0 mb-5 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden w-fit">
        {ROUTE_TABS.map((t) => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-5 py-2.5 text-sm font-semibold transition-colors border-r border-[#c8d6e8] last:border-0 ${activeTab === t.id ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
            {t.label}
          </button>))}
      </div>

      {activeTab === "analytics" && <OverviewTab />}
      {activeTab === "kpis" && <KPIsTab />}
      {activeTab === "comparison" && <ComparisonTab />}
      {activeTab === "performance" && <PerformanceTab />}
    </div>);
}
