import { useState } from "react";
const DEPARTMENTS = [
    { code: "DEPT-CS", name: "Computer Science & Engineering", hod: "Prof. D. Ramachandran", faculty: 18, programs: 4, students: 1240, university: "Osmania University", status: "Active" },
    { code: "DEPT-EC", name: "Electronics & Communication", hod: "Dr. S. Kamala Devi", faculty: 14, programs: 3, students: 980, university: "JNTU Hyderabad", status: "Active" },
    { code: "DEPT-ME", name: "Mechanical Engineering", hod: "Prof. G. Siva Prasad", faculty: 16, programs: 3, students: 1120, university: "Kakatiya University", status: "Active" },
    { code: "DEPT-EC2", name: "Economics", hod: "Prof. M. Ibrahim Ali", faculty: 12, programs: 2, students: 640, university: "University of Hyderabad", status: "Active" },
    { code: "DEPT-CHM", name: "Chemistry", hod: "Dr. V. Anitha Kumari", faculty: 10, programs: 2, students: 480, university: "Osmania University", status: "Active" },
    { code: "DEPT-BT", name: "Biotechnology", hod: "Dr. L. Vasudha Rani", faculty: 8, programs: 2, students: 320, university: "Telangana University", status: "Inactive" },
];
const PROGRAMS = [
    { code: "PROG-BTECH-CS", name: "B.Tech Computer Science", dept: "Computer Science & Engineering", duration: "4 Years", seats: 120, enrolled: 112, type: "UG", status: "Active" },
    { code: "PROG-MTECH-CS", name: "M.Tech Computer Science", dept: "Computer Science & Engineering", duration: "2 Years", seats: 30, enrolled: 28, type: "PG", status: "Active" },
    { code: "PROG-BTECH-EC", name: "B.Tech Electronics", dept: "Electronics & Communication", duration: "4 Years", seats: 90, enrolled: 84, type: "UG", status: "Active" },
    { code: "PROG-BA-ECO", name: "B.A. Economics", dept: "Economics", duration: "3 Years", seats: 80, enrolled: 76, type: "UG", status: "Active" },
    { code: "PROG-MA-ECO", name: "M.A. Economics", dept: "Economics", duration: "2 Years", seats: 40, enrolled: 36, type: "PG", status: "Active" },
    { code: "PROG-BSC-BT", name: "B.Sc Biotechnology", dept: "Biotechnology", duration: "3 Years", seats: 60, enrolled: 48, type: "UG", status: "Active" },
];
const COURSES = [
    { code: "CS101", name: "Data Structures & Algorithms", dept: "CSE", credits: 4, semester: "III", faculty: "Prof. Ramachandran", type: "Core", enrolled: 112 },
    { code: "CS201", name: "Database Management Systems", dept: "CSE", credits: 4, semester: "IV", faculty: "Dr. Anitha", type: "Core", enrolled: 98 },
    { code: "EC101", name: "Digital Electronics", dept: "ECE", credits: 3, semester: "II", faculty: "Dr. Kamala Devi", type: "Core", enrolled: 84 },
    { code: "MA101", name: "Engineering Mathematics I", dept: "CSE / ECE", credits: 4, semester: "I", faculty: "Prof. Raghavan", type: "Core", enrolled: 196 },
    { code: "CS301", name: "Machine Learning", dept: "CSE", credits: 3, semester: "VI", faculty: "Dr. Priya", type: "Elective", enrolled: 64 },
    { code: "EC201", name: "Analog Circuits", dept: "ECE", credits: 3, semester: "III", faculty: "Prof. Mohan", type: "Core", enrolled: 78 },
];
const SECTIONS = [
    { code: "SEC-CS-A", name: "CS-A", course: "B.Tech CSE — Sem III", strength: 60, room: "Block A, Room 201", classTeacher: "Prof. Ramachandran", status: "Active" },
    { code: "SEC-CS-B", name: "CS-B", course: "B.Tech CSE — Sem III", strength: 52, room: "Block A, Room 202", classTeacher: "Dr. Suresh", status: "Active" },
    { code: "SEC-EC-A", name: "EC-A", course: "B.Tech ECE — Sem III", strength: 48, room: "Block B, Room 101", classTeacher: "Dr. Kamala Devi", status: "Active" },
    { code: "SEC-MPC", name: "MPC", course: "Intermediate — MPC Stream", strength: 55, room: "Block C, Room 301", classTeacher: "Mr. Srinivas", status: "Active" },
    { code: "SEC-BIPC", name: "BiPC", course: "Intermediate — BiPC Stream", strength: 42, room: "Block C, Room 302", classTeacher: "Mrs. Annapurna", status: "Active" },
];
const ENROLLMENT = [
    { id: "ENR-001", student: "Arjun Ramakrishna", program: "B.Tech CSE", section: "CS-A", sem: "III", year: "2025–26", status: "Active", date: "12-Jun-2025" },
    { id: "ENR-002", student: "Priya Suresh", program: "B.Tech ECE", section: "EC-A", sem: "I", year: "2025–26", status: "Active", date: "12-Jun-2025" },
    { id: "ENR-003", student: "Mohammed Irfan", program: "B.A Economics", section: "ECO-A", sem: "V", year: "2025–26", status: "Active", date: "12-Jun-2025" },
    { id: "ENR-004", student: "Kavitha Reddy", program: "B.Sc Biotechnology", section: "BT-A", sem: "III", year: "2025–26", status: "Pending", date: "18-Jun-2025" },
    { id: "ENR-005", student: "Venkat Rao", program: "M.Tech CSE", section: "MCS-A", sem: "I", year: "2025–26", status: "Active", date: "10-Jun-2025" },
];
const EXAM_RESULTS = [
    { id: "EXM-001", exam: "Semester III — Supplementary", subject: "Data Structures", date: "15-Sep-2026", students: 112, passed: 98, failed: 14, passRate: "87.5%", status: "Completed" },
    { id: "EXM-002", exam: "Semester I — Regular", subject: "Engineering Mathematics", date: "28-Nov-2025", students: 196, passed: 174, failed: 22, passRate: "88.8%", status: "Completed" },
    { id: "EXM-003", exam: "Semester II — Regular", subject: "Digital Electronics", date: "02-Apr-2026", students: 84, passed: 71, failed: 13, passRate: "84.5%", status: "Completed" },
    { id: "EXM-004", exam: "Semester IV — Regular", subject: "DBMS", date: "08-Nov-2026", students: 98, passed: 0, failed: 0, passRate: "—", status: "Scheduled" },
    { id: "EXM-005", exam: "Semester VI — Regular", subject: "Machine Learning", date: "12-Nov-2026", students: 64, passed: 0, failed: 0, passRate: "—", status: "Scheduled" },
];
const INTERMEDIATE_STREAMS = [
    { code: "MPC", name: "Mathematics, Physics & Chemistry", group: "Science", firstYear: 248, secondYear: 232, medium: "English / Telugu", status: "Active" },
    { code: "BIPC", name: "Biology, Physics & Chemistry", group: "Science", firstYear: 186, secondYear: 174, medium: "English / Telugu", status: "Active" },
    { code: "CEC", name: "Civics, Economics & Commerce", group: "Commerce", firstYear: 126, secondYear: 114, medium: "English / Telugu", status: "Active" },
    { code: "HEC", name: "History, Economics & Civics", group: "Arts", firstYear: 88, secondYear: 80, medium: "Telugu", status: "Active" },
];
const INTERMEDIATE_SECTIONS = [
    { code: "MPC-1A", name: "MPC 1A", stream: "MPC", year: "1st Year", strength: 62, room: "Block A · 101", status: "Active" },
    { code: "MPC-2A", name: "MPC 2A", stream: "MPC", year: "2nd Year", strength: 58, room: "Block A · 102", status: "Active" },
    { code: "BIPC-1A", name: "BiPC 1A", stream: "BiPC", year: "1st Year", strength: 46, room: "Block B · 201", status: "Active" },
    { code: "BIPC-2A", name: "BiPC 2A", stream: "BiPC", year: "2nd Year", strength: 44, room: "Block B · 202", status: "Active" },
    { code: "CEC-1A", name: "CEC 1A", stream: "CEC", year: "1st Year", strength: 42, room: "Block C · 301", status: "Active" },
    { code: "HEC-2A", name: "HEC 2A", stream: "HEC", year: "2nd Year", strength: 40, room: "Block C · 302", status: "Active" },
];
const INTERMEDIATE_RESULTS = [
    { stream: "MPC", year: "2nd Year", appeared: 232, passed: 214, passRate: "92.2%", distinction: "48.7%" },
    { stream: "BiPC", year: "2nd Year", appeared: 174, passed: 158, passRate: "90.8%", distinction: "44.3%" },
    { stream: "CEC", year: "2nd Year", appeared: 114, passed: 99, passRate: "86.8%", distinction: "31.6%" },
    { stream: "HEC", year: "2nd Year", appeared: 80, passed: 67, passRate: "83.8%", distinction: "25.0%" },
];
function StatusBadge({ status }) {
    const cls = {
        Active: "bg-green-100 text-green-800 border border-green-300",
        Inactive: "bg-gray-100 text-gray-600 border border-gray-300",
        Completed: "bg-green-100 text-green-800 border border-green-300",
        Scheduled: "bg-blue-100 text-blue-800 border border-blue-200",
        Pending: "bg-amber-100 text-amber-800 border border-amber-300",
    };
    return <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${cls[status] ?? cls.Inactive}`}>{status}</span>;
}
function Table({ title, addLabel, headers, rows, renderRow, searchPlaceholder = "Search…", }) {
    const [search, setSearch] = useState("");
    const filteredRows = search ? rows.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))) : rows;
    return (<div className="bg-white border border-[#c8d6e8] rounded-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
        <h2 className="text-sm font-semibold text-[#0d2137]">{title}</h2>
        {addLabel && (<button className="bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-[#0d2137]">+ {addLabel}</button>)}
      </div>
      <div className="px-4 py-3 border-b border-[#f0f3f8]">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={searchPlaceholder} className="border border-[#c8d6e8] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-[#2a5298] bg-white w-full max-w-sm"/>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-[#f5f7fb]">
            <tr>
              {headers.map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[10px] text-[#4a6080] font-semibold uppercase tracking-wide border-b border-[#e8eef7] whitespace-nowrap">{h}</th>))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3f8]">
            {filteredRows.map((item, i) => (<tr key={i} className="hover:bg-[#f8fafd] transition-colors">
                {renderRow(item)}
              </tr>))}
            {filteredRows.length === 0 && (<tr><td colSpan={headers.length} className="px-3 py-8 text-center text-xs text-[#4a6080]">No records found.</td></tr>)}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-[#f0f3f8]">
        <span className="text-xs text-[#4a6080]">Showing {filteredRows.length} of {rows.length} records</span>
      </div>
    </div>);
}
const ROUTE_TABS = [
    { id: "departments", label: "Departments" },
    { id: "programs", label: "Programs" },
    { id: "courses", label: "Courses" },
    { id: "sections", label: "Sections" },
    { id: "enrollment", label: "Enrollment" },
    { id: "academics", label: "Academics" },
    { id: "examination", label: "Examination" },
];
const TITLES = {
    departments: { title: "Departments", desc: "Manage academic departments and HOD assignments" },
    programs: { title: "Programs", desc: "Manage degree programmes and intake details" },
    courses: { title: "Courses", desc: "Manage course catalogue, credits, and faculty assignments" },
    sections: { title: "Sections", desc: "Manage class sections, room assignments, and strength" },
    enrollment: { title: "Enrollment", desc: "View and manage student course enrollments" },
    academics: { title: "Academic Records", desc: "Review academic performance and semester-wise data" },
    examination: { title: "Examination", desc: "Manage exam schedules, results, and pass/fail analytics" },
};
function IntermediateAcademics({ route }) {
    const [activeTab, setActiveTab] = useState(["courses", "sections", "academics"].includes(route) ? route : "courses");
    const tabs = [
        { id: "courses", label: "Streams" },
        { id: "sections", label: "Sections" },
        { id: "academics", label: "Results" },
    ];
    const headings = {
        courses: { title: "Intermediate Streams", desc: "Manage Board of Intermediate Education streams and student intake" },
        sections: { title: "Intermediate Sections", desc: "Manage first-year and second-year sections" },
        academics: { title: "Intermediate Results", desc: "Review board examination performance by stream" },
    };
    const info = headings[activeTab];
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>{info.title}</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">{info.desc}</p>
      </div>
      <div className="flex mb-5 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden w-fit">
        {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 text-sm font-semibold border-r border-[#c8d6e8] last:border-0 ${activeTab === tab.id ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
            {tab.label}
          </button>))}
      </div>
      {activeTab === "courses" && (<Table title="Intermediate Streams" addLabel="Add Stream" headers={["Code", "Stream", "Group", "1st Year", "2nd Year", "Medium", "Status", "Actions"]} rows={INTERMEDIATE_STREAMS} searchPlaceholder="Search streams…" renderRow={(stream) => (<>
            <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{stream.code}</td>
            <td className="px-3 py-2.5 font-medium text-[#1a2636]">{stream.name}</td>
            <td className="px-3 py-2.5 text-[#4a6080]">{stream.group}</td>
            <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{stream.firstYear}</td>
            <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{stream.secondYear}</td>
            <td className="px-3 py-2.5 text-[#4a6080]">{stream.medium}</td>
            <td className="px-3 py-2.5"><StatusBadge status={stream.status}/></td>
            <td className="px-3 py-2.5"><button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button></td>
          </>)}/>)}
      {activeTab === "sections" && (<Table title="Intermediate Sections" addLabel="Add Section" headers={["Code", "Section", "Stream", "Year", "Strength", "Room", "Status", "Actions"]} rows={INTERMEDIATE_SECTIONS} searchPlaceholder="Search sections or streams…" renderRow={(section) => (<>
            <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{section.code}</td>
            <td className="px-3 py-2.5 font-medium text-[#1a2636]">{section.name}</td>
            <td className="px-3 py-2.5 text-[#4a6080]">{section.stream}</td>
            <td className="px-3 py-2.5 text-[#4a6080]">{section.year}</td>
            <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{section.strength}</td>
            <td className="px-3 py-2.5 text-[#4a6080]">{section.room}</td>
            <td className="px-3 py-2.5"><StatusBadge status={section.status}/></td>
            <td className="px-3 py-2.5"><button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button></td>
          </>)}/>)}
      {activeTab === "academics" && (<div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
                { label: "Overall Pass Rate", value: "89.4%", bg: "bg-blue-50 border-blue-100", color: "text-[#1a3a5c]" },
                { label: "MPC Pass Rate", value: "92.2%", bg: "bg-green-50 border-green-100", color: "text-[#1a6b3a]" },
                { label: "Students Appeared", value: "600", bg: "bg-amber-50 border-amber-100", color: "text-[#b45309]" },
                { label: "Distinctions", value: "232", bg: "bg-slate-50 border-slate-100", color: "text-[#4a6080]" },
            ].map((stat) => (<div key={stat.label} className={`border rounded-sm p-4 ${stat.bg}`}>
                <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{stat.label}</div>
                <div className={`text-2xl font-bold ${stat.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{stat.value}</div>
              </div>))}
          </div>
          <Table title="Board Results by Stream" headers={["Stream", "Year", "Appeared", "Passed", "Pass Rate", "Distinction"]} rows={INTERMEDIATE_RESULTS} renderRow={(result) => (<>
                <td className="px-3 py-2.5 font-semibold text-[#1a2636]">{result.stream}</td>
                <td className="px-3 py-2.5 text-[#4a6080]">{result.year}</td>
                <td className="px-3 py-2.5 font-mono text-[#1a2636]">{result.appeared}</td>
                <td className="px-3 py-2.5 font-mono text-[#1a2636]">{result.passed}</td>
                <td className="px-3 py-2.5 font-semibold text-[#1a6b3a]">{result.passRate}</td>
                <td className="px-3 py-2.5 text-[#1a2636]">{result.distinction}</td>
              </>)}/>
        </div>)}
    </div>);
}
function HigherAcademics({ route, role }) {
    const isUniCollege = role?.id === "uni-college";
    const [activeTab, setActiveTab] = useState(route);
    const info = TITLES[activeTab];
    const departments = isUniCollege ? DEPARTMENTS.filter((d) => d.university === "Osmania University") : DEPARTMENTS;
    const programs = isUniCollege ? PROGRAMS.filter((p) => ["Computer Science & Engineering", "Economics"].includes(p.dept)) : PROGRAMS;
    const courses = isUniCollege ? COURSES.filter((c) => ["CSE", "CSE / ECE"].includes(c.dept)) : COURSES;
    const sections = isUniCollege ? SECTIONS.filter((s) => !s.course.includes("Intermediate")) : SECTIONS;
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>{info.title}</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">{info.desc}</p>
      </div>

      <div className="flex flex-wrap gap-0 mb-5 bg-white border border-[#c8d6e8] rounded-sm overflow-hidden w-fit">
        {ROUTE_TABS.map((t) => (<button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-4 py-2.5 text-sm font-semibold transition-colors border-r border-[#c8d6e8] last:border-0 whitespace-nowrap ${activeTab === t.id ? "bg-[#1a3a5c] text-white" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
            {t.label}
          </button>))}
      </div>

      {activeTab === "departments" && (<Table title="Academic Departments" addLabel="Add Department" headers={["Code", "Department Name", "University", "HoD", "Faculty", "Programs", "Students", "Status", "Actions"]} rows={departments} searchPlaceholder="Search departments, HoD…" renderRow={(d) => (<>
              <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{d.code}</td>
              <td className="px-3 py-2.5 font-medium text-[#1a2636] max-w-[200px] truncate">{d.name}</td>
              <td className="px-3 py-2.5 text-[#4a6080] max-w-[140px] truncate">{d.university}</td>
              <td className="px-3 py-2.5 text-[#4a6080]">{d.hod}</td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{d.faculty}</td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{d.programs}</td>
              <td className="px-3 py-2.5 font-mono text-[#1a2636]">{d.students}</td>
              <td className="px-3 py-2.5"><StatusBadge status={d.status}/></td>
              <td className="px-3 py-2.5">
                <div className="flex gap-1">
                  <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
                  <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Edit</button>
                </div>
              </td>
            </>)}/>)}

      {activeTab === "programs" && (<Table title="Programmes" addLabel="Add Programme" headers={["Code", "Programme Name", "Department", "Duration", "Type", "Seats", "Enrolled", "Status", "Actions"]} rows={programs} searchPlaceholder="Search programmes…" renderRow={(p) => (<>
              <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px] whitespace-nowrap">{p.code}</td>
              <td className="px-3 py-2.5 font-medium text-[#1a2636] max-w-[200px] truncate">{p.name}</td>
              <td className="px-3 py-2.5 text-[#4a6080] max-w-[160px] truncate">{p.dept}</td>
              <td className="px-3 py-2.5 text-[#4a6080] whitespace-nowrap">{p.duration}</td>
              <td className="px-3 py-2.5">
                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold border ${p.type === "UG" ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-purple-100 text-purple-800 border-purple-200"}`}>{p.type}</span>
              </td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{p.seats}</td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{p.enrolled}</td>
              <td className="px-3 py-2.5"><StatusBadge status={p.status}/></td>
              <td className="px-3 py-2.5">
                <div className="flex gap-1">
                  <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
                  <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Edit</button>
                </div>
              </td>
            </>)}/>)}

      {activeTab === "courses" && (<Table title="Courses" addLabel="Add Course" headers={["Code", "Course Name", "Department", "Credits", "Semester", "Faculty", "Type", "Enrolled", "Actions"]} rows={courses} searchPlaceholder="Search courses, faculty…" renderRow={(c) => (<>
              <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{c.code}</td>
              <td className="px-3 py-2.5 font-medium text-[#1a2636] max-w-[180px] truncate">{c.name}</td>
              <td className="px-3 py-2.5 text-[#4a6080] whitespace-nowrap">{c.dept}</td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{c.credits}</td>
              <td className="px-3 py-2.5 text-[#4a6080]">{c.semester}</td>
              <td className="px-3 py-2.5 text-[#4a6080]">{c.faculty}</td>
              <td className="px-3 py-2.5">
                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold border ${c.type === "Core" ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-green-100 text-green-800 border-green-200"}`}>{c.type}</span>
              </td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{c.enrolled}</td>
              <td className="px-3 py-2.5">
                <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
              </td>
            </>)}/>)}

      {activeTab === "sections" && (<Table title="Sections" addLabel="Add Section" headers={["Code", "Section", "Course / Programme", "Strength", "Room", "Status", "Actions"]} rows={sections} searchPlaceholder="Search sections…" renderRow={(s) => (<>
              <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{s.code}</td>
              <td className="px-3 py-2.5 font-bold text-[#1a2636]">{s.name}</td>
              <td className="px-3 py-2.5 text-[#4a6080] max-w-[180px] truncate">{s.course}</td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{s.strength}</td>
              <td className="px-3 py-2.5 text-[#4a6080]">{s.room}</td>

              <td className="px-3 py-2.5"><StatusBadge status={s.status}/></td>
              <td className="px-3 py-2.5">
                <div className="flex gap-1">
                  <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
                  <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">Edit</button>
                </div>
              </td>
            </>)}/>)}

      {activeTab === "enrollment" && (<Table title="Student Enrollment" headers={["Enrol. ID", "Student Name", "Programme", "Section", "Semester", "AY", "Status", "Date", "Actions"]} rows={ENROLLMENT} searchPlaceholder="Search students, programme…" renderRow={(e) => (<>
              <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{e.id}</td>
              <td className="px-3 py-2.5 font-medium text-[#1a2636] whitespace-nowrap">{e.student}</td>
              <td className="px-3 py-2.5 text-[#4a6080] max-w-[160px] truncate">{e.program}</td>
              <td className="px-3 py-2.5 text-[#4a6080]">{e.section}</td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{e.sem}</td>
              <td className="px-3 py-2.5 text-[#4a6080]">{e.year}</td>
              <td className="px-3 py-2.5"><StatusBadge status={e.status}/></td>
              <td className="px-3 py-2.5 text-[#4a6080] font-mono whitespace-nowrap">{e.date}</td>
              <td className="px-3 py-2.5">
                <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
              </td>
            </>)}/>)}

      {activeTab === "academics" && (<div className="space-y-4">
          <div className="grid grid-cols-4 gap-3">
            {[
                { label: "Avg CGPA (UG)", value: "7.42", bg: "bg-blue-50 border-blue-100", color: "text-[#1a3a5c]" },
                { label: "Avg CGPA (PG)", value: "7.98", bg: "bg-green-50 border-green-100", color: "text-[#1a6b3a]" },
                { label: "Pass Rate (Sem Exams)", value: "87.4%", bg: "bg-amber-50 border-amber-100", color: "text-[#b45309]" },
                { label: "Distinction %", value: "12.8%", bg: "bg-slate-50 border-slate-100", color: "text-[#4a6080]" },
            ].map((s) => (<div key={s.label} className={`border rounded-sm p-4 ${s.bg}`}>
                <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{s.label}</div>
                <div className={`text-2xl font-bold ${s.color}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
              </div>))}
          </div>
          <Table title="Academic Performance by Programme" headers={["Programme", "Semester", "Students", "Pass %", "Distinction %", "Avg CGPA", "Backlogs"]} rows={[
                { prog: "B.Tech CSE", sem: "III", students: 112, pass: "89.2%", dist: "14.3%", cgpa: "7.62", backlogs: 12 },
                { prog: "B.Tech ECE", sem: "III", students: 84, pass: "86.9%", dist: "11.9%", cgpa: "7.38", backlogs: 11 },
                { prog: "B.A. Economics", sem: "V", students: 76, pass: "91.4%", dist: "9.2%", cgpa: "7.84", backlogs: 6 },
                { prog: "M.Tech CSE", sem: "I", students: 28, pass: "96.4%", dist: "28.6%", cgpa: "8.24", backlogs: 1 },
            ]} renderRow={(r) => (<>
                <td className="px-3 py-2.5 font-medium text-[#1a2636]">{r.prog}</td>
                <td className="px-3 py-2.5 text-[#4a6080]">{r.sem}</td>
                <td className="px-3 py-2.5 font-mono text-[#1a2636]">{r.students}</td>
                <td className="px-3 py-2.5 font-semibold text-[#1a6b3a]">{r.pass}</td>
                <td className="px-3 py-2.5 text-[#1a2636]">{r.dist}</td>
                <td className="px-3 py-2.5 font-mono font-bold text-[#1a2636]">{r.cgpa}</td>
                <td className="px-3 py-2.5 font-mono text-red-600">{r.backlogs}</td>
              </>)}/>
        </div>)}

      {activeTab === "examination" && (<Table title="Examination Schedule & Results" addLabel="Schedule Exam" headers={["Exam ID", "Exam Name", "Subject", "Date", "Students", "Passed", "Failed", "Pass Rate", "Status", "Actions"]} rows={EXAM_RESULTS} searchPlaceholder="Search exams, subjects…" renderRow={(e) => (<>
              <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{e.id}</td>
              <td className="px-3 py-2.5 font-medium text-[#1a2636] max-w-[180px] truncate">{e.exam}</td>
              <td className="px-3 py-2.5 text-[#4a6080] max-w-[140px] truncate">{e.subject}</td>
              <td className="px-3 py-2.5 font-mono text-[#4a6080] whitespace-nowrap">{e.date}</td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a2636]">{e.students}</td>
              <td className="px-3 py-2.5 text-center font-mono text-[#1a6b3a]">{e.passed || "—"}</td>
              <td className="px-3 py-2.5 text-center font-mono text-red-600">{e.failed || "—"}</td>
              <td className="px-3 py-2.5 font-semibold text-[#1a2636]">{e.passRate}</td>
              <td className="px-3 py-2.5"><StatusBadge status={e.status}/></td>
              <td className="px-3 py-2.5">
                <button className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7]">View</button>
              </td>
            </>)}/>)}
    </div>);
}
export default function AcademicsPage({ route, role }) {
    return role?.id === "inter-college"
        ? <IntermediateAcademics route={route}/>
        : <HigherAcademics route={route} role={role}/>;
}
