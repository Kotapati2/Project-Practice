import { useState } from "react";
const STATUS_BADGES = {
    "Pending Verification": "bg-amber-100 text-amber-800 border border-amber-300",
    Submitted: "bg-blue-100 text-blue-800 border border-blue-300",
    Approved: "bg-green-100 text-green-800 border border-green-300",
    Rejected: "bg-red-100 text-red-800 border border-red-300",
    Draft: "bg-gray-100 text-gray-700 border border-gray-300",
    Active: "bg-green-100 text-green-800 border border-green-300",
};
const STUDENTS = [
    {
        id: "STU-2026-00142",
        name: "Arjun Ramakrishna",
        admission: "ADM/26/0142",
        dob: "14-03-2012",
        mobile: "98765 43210",
        edu: "Primary",
        class: "Class 5",
        institution: "ZPHS Kondapur",
        gender: "Male",
        fatherName: "Ramakrishna T.",
        caste: "OC",
        religion: "Hindu",
        nationality: "Indian",
        appStatus: "Approved",
        verif: "Verified",
    },
    {
        id: "STU-2026-00143",
        name: "Priya Suresh",
        admission: "ADM/26/0143",
        dob: "22-07-2010",
        mobile: "87654 32109",
        edu: "Primary",
        class: "Class 8",
        institution: "Govt. HS Malakpet",
        gender: "Female",
        fatherName: "Suresh K.",
        caste: "BC-B",
        religion: "Hindu",
        nationality: "Indian",
        appStatus: "Pending Verification",
        verif: "Not Verified",
    },
    {
        id: "STU-2026-00144",
        name: "Mohammed Irfan",
        admission: "ADM/26/0144",
        dob: "05-11-2008",
        mobile: "76543 21098",
        edu: "Intermediate",
        class: "1st Year",
        institution: "Govt. Jr. College, Hyd.",
        gender: "Male",
        fatherName: "Mohammed Salim",
        caste: "BC-E",
        religion: "Islam",
        nationality: "Indian",
        appStatus: "Submitted",
        verif: "Not Verified",
    },
    {
        id: "STU-2026-00145",
        name: "Kavitha Devi B.",
        admission: "ADM/26/0145",
        dob: "18-05-2004",
        mobile: "65432 10987",
        edu: "University",
        class: "2nd Year",
        institution: "Osmania University",
        gender: "Female",
        fatherName: "Bhaskar Rao",
        caste: "SC",
        religion: "Hindu",
        nationality: "Indian",
        appStatus: "Approved",
        verif: "Verified",
    },
    {
        id: "STU-2026-00146",
        name: "Ravi Teja G.",
        admission: "ADM/26/0146",
        dob: "30-09-2009",
        mobile: "54321 09876",
        edu: "Primary",
        class: "Class 10",
        institution: "ZPHS Rangareddy",
        gender: "Male",
        fatherName: "Govinda Rao",
        caste: "OC",
        religion: "Hindu",
        nationality: "Indian",
        appStatus: "Draft",
        verif: "Not Verified",
    },
    {
        id: "STU-2026-00147",
        name: "Shalini Varma",
        admission: "ADM/26/0147",
        dob: "12-01-2007",
        mobile: "43210 98765",
        edu: "Intermediate",
        class: "2nd Year",
        institution: "Govt. Jr. College, Hyd.",
        gender: "Female",
        fatherName: "Varma P.",
        caste: "OC",
        religion: "Hindu",
        nationality: "Indian",
        appStatus: "Approved",
        verif: "Verified",
    },
    {
        id: "STU-2026-00148",
        name: "Kiran Kumar P.",
        admission: "ADM/26/0148",
        dob: "07-08-2003",
        mobile: "32109 87654",
        edu: "University",
        class: "3rd Year",
        institution: "OU College of Engineering",
        gender: "Male",
        fatherName: "Prakash Kumar",
        caste: "BC-A",
        religion: "Hindu",
        nationality: "Indian",
        appStatus: "Pending Verification",
        verif: "Not Verified",
    },
];
const REG_STEPS = [
    "Basic Details",
    "Education",
    "Family & Guardian",
    "Address",
    "Bank",
    "Income",
    "Skills & Activities",
    "Documents",
    "Review & Submit",
];
const PROFILE_TABS = [
    "Overview",
    "Personal",
    "Education",
    "Family",
    "Address",
    "Skills",
    "Bank",
    "Documents",
    "Admission",
    "Verification",
];
export default function Students({ subPage, onNavigate, role }) {
    const isIntermediateCollege = role?.id === "inter-college";
    const isUniversityCollege = role?.id === "uni-college";
    const availableStudents = isIntermediateCollege
        ? STUDENTS.filter((student) => student.edu === "Intermediate")
        : isUniversityCollege
            ? STUDENTS.filter((student) => student.edu === "University")
            : STUDENTS;
    if (subPage === "register")
        return <StudentRegistration onBack={() => onNavigate("students/list")} isIntermediateCollege={isIntermediateCollege} isUniversityCollege={isUniversityCollege}/>;
    if (subPage?.startsWith("profile/")) {
        const id = subPage.replace("profile/", "");
        const student = availableStudents.find((s) => s.id === id) ?? availableStudents[0];
        return <StudentProfile student={student} onBack={() => onNavigate("students/list")} initialTab="Overview"/>;
    }
    if (subPage?.startsWith("docs/")) {
        const id = subPage.replace("docs/", "");
        const student = availableStudents.find((s) => s.id === id) ?? availableStudents[0];
        return <StudentProfile student={student} onBack={() => onNavigate("students/list")} initialTab="Documents"/>;
    }
    return <StudentList onNavigate={onNavigate} students={availableStudents} isIntermediateCollege={isIntermediateCollege} isUniversityCollege={isUniversityCollege}/>;
}
function StudentList({ onNavigate, students, isIntermediateCollege, isUniversityCollege }) {
    const [search, setSearch] = useState("");
    const [eduFilter, setEduFilter] = useState("All");
    const filtered = students.filter((s) => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search);
        const matchEdu = eduFilter === "All" || s.edu === eduFilter;
        return matchSearch && matchEdu;
    });
    return (<div className="p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Student Management</h1>
          <p className="text-sm text-[#4a6080] mt-0.5">{isIntermediateCollege ? "Manage intermediate student records, registrations, streams, and verifications." : isUniversityCollege ? "Manage Osmania University College student records, programmes, and verifications." : "Manage all student records, registrations, and verifications."}</p>
        </div>
        <button onClick={() => onNavigate("students/register")} className="bg-[#1a3a5c] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#0d2137] transition-colors">
          + Register Student
        </button>
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm p-4 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="col-span-2">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, ID, admission no…" className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2a5298] bg-white"/>
          </div>
          {!isIntermediateCollege && !isUniversityCollege && (<select value={eduFilter} onChange={(e) => setEduFilter(e.target.value)} className="border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white">
              {["All", "Primary", "Intermediate", "University"].map((o) => <option key={o}>{o}</option>)}
            </select>)}
          {["District", "Institution", "Status"].map((lbl) => (<select key={lbl} className="border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
              <option>All {lbl}s</option>
            </select>))}
          <button className="bg-[#e07b1a] text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#c56b12] transition-colors">
            Search
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
          <span className="text-sm font-semibold text-[#0d2137]">Students <span className="text-[#4a6080] font-normal text-xs ml-1">({filtered.length} records)</span></span>
          <div className="flex items-center gap-2">
            <button className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1.5 rounded-sm hover:bg-[#f0f3f8]">Export Excel</button>
            <button className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1.5 rounded-sm hover:bg-[#f0f3f8]">Export PDF</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-[#f5f7fb]">
              <tr>
                {["", "Student ID", "Name", "Admission No.", "Education", "Class/Year", "Institution", "App. Status", "Verification", "Actions"].map((h) => (<th key={h} className="text-left px-3 py-2.5 text-[#4a6080] font-semibold uppercase tracking-wide text-[10px] border-b border-[#e8eef7]">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f3f8]">
              {filtered.map((s) => (<tr key={s.id} className="hover:bg-[#f8fafd] transition-colors cursor-pointer" onClick={() => onNavigate(`students/profile/${s.id}`)}>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="w-7 h-7 rounded-full bg-[#dce6f3] flex items-center justify-center text-[#1a3a5c] text-[11px] font-bold">
                      {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 font-mono text-[#2a5298] text-[11px]">{s.id}</td>
                  <td className="px-3 py-2.5 font-medium text-[#1a2636] hover:text-[#2a5298]">{s.name}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{s.admission}</td>
                  <td className="px-3 py-2.5 text-[#1a2636]">{s.edu}</td>
                  <td className="px-3 py-2.5 text-[#4a6080]">{s.class}</td>
                  <td className="px-3 py-2.5 text-[#4a6080] max-w-[120px] truncate">{s.institution}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${STATUS_BADGES[s.appStatus]}`}>{s.appStatus}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${s.verif === "Verified" ? "bg-green-100 text-green-800 border border-green-300" : "bg-gray-100 text-gray-700 border border-gray-300"}`}>{s.verif}</span>
                  </td>
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button onClick={() => onNavigate(`students/profile/${s.id}`)} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7] transition-colors">View</button>
                      <button onClick={() => onNavigate("students/register")} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7] transition-colors">Edit</button>
                      <button onClick={() => onNavigate(`students/docs/${s.id}`)} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7] transition-colors">Docs</button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8eef7]">
          <span className="text-xs text-[#4a6080]">Showing 1–{filtered.length} of {filtered.length} records</span>
          <div className="flex items-center gap-1">
            {["‹", "1", "2", "3", "›"].map((p) => (<button key={p} className={`w-7 h-7 text-xs rounded-sm ${p === "1" ? "bg-[#1a3a5c] text-white" : "border border-[#c8d6e8] text-[#4a6080] hover:bg-[#f0f3f8]"}`}>{p}</button>))}
          </div>
        </div>
      </div>
    </div>);
}
function StudentProfile({ student, onBack, initialTab }) {
    const [activeTab, setActiveTab] = useState(initialTab);
    return (<div className="p-6">
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-[#4a6080] hover:text-[#1a3a5c] mb-5 transition-colors">
        ← Students
      </button>

      {/* Header card — matches reference image */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm p-5 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#dce6f3] border-2 border-[#2a5298] flex items-center justify-center text-[#1a3a5c] text-xl font-bold flex-shrink-0">
              {student.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>{student.name}</h2>
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1.5 text-xs text-[#4a6080]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <span>Admission No: <span className="text-[#1a2636] font-semibold">{student.admission}</span></span>
                <span>DOB: <span className="text-[#1a2636] font-semibold">{student.dob}</span></span>
                <span>Mobile: <span className="text-[#1a2636] font-semibold">{student.mobile}</span></span>
              </div>
              <div className="flex items-center gap-2 mt-2.5">
                {student.verif === "Verified" ? (<span className="flex items-center gap-1 text-green-700 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"/>
                    VERIFIED
                  </span>) : (<span className="flex items-center gap-1 text-amber-700 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"/>
                    NOT VERIFIED
                  </span>)}
                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${STATUS_BADGES[student.appStatus]}`}>{student.appStatus}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="text-xs border border-[#c8d6e8] text-[#2a5298] px-3 py-1.5 rounded-sm hover:bg-[#e8eef7] transition-colors font-medium">Edit</button>
            <button className="text-xs bg-[#1a3a5c] text-white px-3 py-1.5 rounded-sm hover:bg-[#0d2137] transition-colors font-medium">Verify</button>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm mb-0 border-b-0">
        <div className="flex overflow-x-auto">
          {PROFILE_TABS.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex-shrink-0
                ${activeTab === tab
                ? "border-[#1a3a5c] text-[#1a3a5c] bg-[#f8fafd]"
                : "border-transparent text-[#4a6080] hover:text-[#1a3a5c] hover:bg-[#f5f7fb]"}`}>
              {tab}
            </button>))}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm rounded-tl-none p-6">
        <ProfileTabContent student={student} tab={activeTab}/>
      </div>
    </div>);
}
function ProfileTabContent({ student, tab }) {
    if (tab === "Overview")
        return (<div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Profile Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
          {[
                { label: "Father Name", value: student.fatherName },
                { label: "Gender", value: student.gender },
                { label: "Caste", value: student.caste },
                { label: "Religion", value: student.religion },
                { label: "Nationality", value: student.nationality },
                { label: "Education Level", value: student.edu },
                { label: "Class / Year", value: student.class },
                { label: "Institution", value: student.institution },
            ].map(({ label, value }) => (<div key={label} className="flex flex-col">
              <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</span>
              <span className="text-sm text-[#1a2636] font-medium">{value}</span>
            </div>))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Application Status</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Student ID</span>
            <span className="text-sm font-mono text-[#2a5298] font-semibold">{student.id}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Admission No.</span>
            <span className="text-sm font-mono text-[#1a2636] font-semibold">{student.admission}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Status</span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${STATUS_BADGES[student.appStatus]}`}>{student.appStatus}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">Verification</span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${student.verif === "Verified" ? "bg-green-100 text-green-800 border border-green-300" : "bg-gray-100 text-gray-700 border border-gray-300"}`}>{student.verif}</span>
          </div>
        </div>
      </div>
    </div>);
    if (tab === "Personal")
        return (<div>
      <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Personal Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
        {[
                { label: "Full Name", value: student.name },
                { label: "Date of Birth", value: student.dob },
                { label: "Gender", value: student.gender },
                { label: "Blood Group", value: "B+" },
                { label: "Caste", value: student.caste },
                { label: "Religion", value: student.religion },
                { label: "Nationality", value: student.nationality },
                { label: "Mother Tongue", value: "Telugu" },
                { label: "Mobile", value: student.mobile },
                { label: "Aadhaar", value: "XXXX XXXX XXXX" },
                { label: "Email", value: "—" },
                { label: "Disability", value: "None" },
            ].map(({ label, value }) => (<div key={label} className="flex flex-col">
            <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</span>
            <span className="text-sm text-[#1a2636]">{value}</span>
          </div>))}
      </div>
    </div>);
    if (tab === "Education")
        return (<div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Current Education</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
          {[
                { label: "Education Level", value: student.edu },
                { label: "Class / Year", value: student.class },
                { label: "Institution", value: student.institution },
                { label: "Medium", value: "Telugu" },
                { label: "Academic Year", value: "2025–26" },
                { label: "Result Status", value: "Promoted" },
            ].map(({ label, value }) => (<div key={label} className="flex flex-col">
              <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</span>
              <span className="text-sm text-[#1a2636]">{value}</span>
            </div>))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Education History</h3>
        <div className="bg-[#f5f7fb] border border-[#e8eef7] rounded-sm p-4 text-xs text-[#4a6080] text-center">No previous education records on file.</div>
      </div>
    </div>);
    if (tab === "Family")
        return (<div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Family Members</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
          {[
                { label: "Father Name", value: student.fatherName },
                { label: "Father Occupation", value: "Farmer" },
                { label: "Father Mobile", value: "98765 XXXXX" },
                { label: "Mother Name", value: "—" },
                { label: "Mother Occupation", value: "—" },
                { label: "Annual Income", value: "₹ 2,40,000" },
            ].map(({ label, value }) => (<div key={label} className="flex flex-col">
              <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</span>
              <span className="text-sm text-[#1a2636]">{value}</span>
            </div>))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Guardian</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
          {[
                { label: "Guardian Name", value: student.fatherName },
                { label: "Relationship", value: "Father" },
                { label: "Mobile", value: "98765 XXXXX" },
            ].map(({ label, value }) => (<div key={label} className="flex flex-col">
              <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</span>
              <span className="text-sm text-[#1a2636]">{value}</span>
            </div>))}
        </div>
      </div>
    </div>);
    if (tab === "Address")
        return (<div className="space-y-6">
      {[
                { title: "Present Address", fields: [
                        { label: "Address", value: "H.No 4-56, Main Road" },
                        { label: "Village / Town", value: "Kondapur" },
                        { label: "Mandal", value: "Serilingampally" },
                        { label: "District", value: "Rangareddy" },
                        { label: "State", value: "Telangana" },
                        { label: "Pincode", value: "500084" },
                    ] },
                { title: "Permanent Address", fields: [
                        { label: "Address", value: "H.No 4-56, Main Road" },
                        { label: "Village / Town", value: "Kondapur" },
                        { label: "Mandal", value: "Serilingampally" },
                        { label: "District", value: "Rangareddy" },
                        { label: "State", value: "Telangana" },
                        { label: "Pincode", value: "500084" },
                    ] },
                { title: "Native Address", fields: [
                        { label: "Address", value: "—" },
                        { label: "Village / Town", value: "—" },
                        { label: "Mandal", value: "—" },
                        { label: "District", value: "—" },
                        { label: "State", value: "—" },
                        { label: "Pincode", value: "—" },
                    ] },
            ].map(({ title, fields }) => (<div key={title}>
          <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">{title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
            {fields.map(({ label, value }) => (<div key={label} className="flex flex-col">
                <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</span>
                <span className="text-sm text-[#1a2636]">{value}</span>
              </div>))}
          </div>
        </div>))}
    </div>);
    if (tab === "Bank")
        return (<div>
      <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Bank Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
        {[
                { label: "Account Holder", value: "Self" },
                { label: "Bank Name", value: "State Bank of India" },
                { label: "Branch", value: "Kondapur Branch" },
                { label: "Account Number", value: "XXXX XXXX 4523" },
                { label: "IFSC Code", value: "SBIN0012345" },
                { label: "PAN", value: "—" },
            ].map(({ label, value }) => (<div key={label} className="flex flex-col">
            <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</span>
            <span className="text-sm text-[#1a2636] font-mono">{value}</span>
          </div>))}
      </div>
    </div>);
    if (tab === "Documents")
        return (<div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#0d2137]">Documents</h3>
        <button className="text-xs text-[#2a5298] border border-[#c8d6e8] px-3 py-1.5 rounded-sm hover:bg-[#f0f3f8]">+ Upload Document</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
                { name: "Birth Certificate", status: "Verified", date: "01 Aug 2026" },
                { name: "Aadhaar Card", status: "Verified", date: "01 Aug 2026" },
                { name: "Caste Certificate", status: "Pending", date: "—" },
                { name: "Income Certificate", status: "Not Uploaded", date: "—" },
                { name: "Photo", status: "Verified", date: "01 Aug 2026" },
                { name: "Bank Passbook", status: "Pending", date: "—" },
            ].map((doc) => (<div key={doc.name} className="border border-[#c8d6e8] rounded-sm p-3 flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1a2636] mb-1">{doc.name}</div>
              <div className="text-[10px] text-[#4a6080]">{doc.date}</div>
            </div>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm flex-shrink-0 ${doc.status === "Verified" ? "bg-green-100 text-green-800 border border-green-300" :
                    doc.status === "Pending" ? "bg-amber-100 text-amber-800 border border-amber-300" :
                        "bg-gray-100 text-gray-600 border border-gray-200"}`}>{doc.status}</span>
          </div>))}
      </div>
    </div>);
    if (tab === "Admission")
        return (<div>
      <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Admission Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
        {[
                { label: "Admission Number", value: student.admission },
                { label: "Academic Year", value: "2025–26" },
                { label: "Date of Admission", value: "15 Jun 2026" },
                { label: "Admission Type", value: "Fresh" },
                { label: "Quota", value: "Government" },
                { label: "Section", value: "A" },
            ].map(({ label, value }) => (<div key={label} className="flex flex-col">
            <span className="text-[10px] text-[#4a6080] uppercase tracking-wide font-semibold mb-0.5">{label}</span>
            <span className="text-sm text-[#1a2636]">{value}</span>
          </div>))}
      </div>
    </div>);
    if (tab === "Verification")
        return (<div>
      <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Verification History</h3>
      <div className="space-y-2">
        {[
                { action: "Application Submitted", by: "School User", date: "01 Aug 2026", status: "Done" },
                { action: "Document Verification", by: "MEO Officer", date: "05 Aug 2026", status: student.verif === "Verified" ? "Done" : "Pending" },
                { action: "Final Approval", by: "DEO", date: student.verif === "Verified" ? "10 Aug 2026" : "—", status: student.appStatus === "Approved" ? "Done" : "Pending" },
            ].map((v, i) => (<div key={i} className="flex items-center gap-4 px-4 py-3 bg-[#f8fafd] border border-[#e8eef7] rounded-sm">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${v.status === "Done" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
              {v.status === "Done" ? "✓" : "…"}
            </span>
            <div className="flex-1">
              <div className="text-xs font-semibold text-[#1a2636]">{v.action}</div>
              <div className="text-[10px] text-[#4a6080]">By: {v.by}</div>
            </div>
            <div className="text-[10px] text-[#4a6080] font-mono">{v.date}</div>
          </div>))}
      </div>
    </div>);
    if (tab === "Skills")
        return (<div>
      <h3 className="text-sm font-semibold text-[#0d2137] mb-3 pb-2 border-b border-[#f0f3f8]">Skills & Activities</h3>
      <div className="bg-[#f5f7fb] border border-[#e8eef7] rounded-sm p-4 text-xs text-[#4a6080] text-center">No skills or activities recorded.</div>
    </div>);
    return <div className="text-sm text-[#4a6080]">No data available for this section.</div>;
}
function StudentRegistration({ onBack, isIntermediateCollege, isUniversityCollege }) {
    const [step, setStep] = useState(0);
    const [saved, setSaved] = useState(false);
    const prev = () => setStep((s) => Math.max(0, s - 1));
    const next = () => setStep((s) => Math.min(REG_STEPS.length - 1, s + 1));
    const saveDraft = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
    return (<div className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="text-[#4a6080] hover:text-[#1a3a5c] text-sm border border-[#c8d6e8] px-3 py-1.5 rounded-sm hover:bg-white transition-colors">
          ← Back
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Register Student</h1>
          <p className="text-xs text-[#4a6080]">New student registration — Academic Year 2025–26</p>
        </div>
        {saved && (<span className="ml-auto bg-green-100 text-green-800 border border-green-300 text-xs px-3 py-1.5 rounded-sm font-semibold">
            ✓ Draft saved
          </span>)}
      </div>

      <div className="flex gap-4">
        <div className="w-48 flex-shrink-0">
          <div className="bg-white border border-[#c8d6e8] rounded-sm overflow-hidden">
            {REG_STEPS.map((s, i) => (<button key={s} onClick={() => setStep(i)} className={`w-full text-left px-3 py-2.5 text-xs flex items-center gap-2.5 border-b border-[#f0f3f8] last:border-0 transition-colors
                  ${i === step ? "bg-[#1a3a5c] text-white" : i < step ? "text-[#1a6b3a] hover:bg-[#f0f3f8]" : "text-[#4a6080] hover:bg-[#f0f3f8]"}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${i === step ? "bg-[#e07b1a] text-white" : i < step ? "bg-[#1a6b3a] text-white" : "bg-[#dce6f3] text-[#4a6080]"}`}>
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="font-medium">{s}</span>
              </button>))}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white border border-[#c8d6e8] rounded-sm p-6 mb-4">
            <h2 className="text-base font-semibold text-[#0d2137] mb-4 pb-3 border-b border-[#f0f3f8]">
              Step {step + 1} of {REG_STEPS.length}: {REG_STEPS[step]}
            </h2>
            <StepContent step={step} isIntermediateCollege={isIntermediateCollege} isUniversityCollege={isUniversityCollege}/>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={saveDraft} className="border border-[#c8d6e8] text-[#1a3a5c] text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#f0f3f8] transition-colors">
                Save Draft
              </button>
              <button onClick={onBack} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8] transition-colors">
                Cancel
              </button>
            </div>
            <div className="flex items-center gap-2">
              {step > 0 && (<button onClick={prev} className="border border-[#c8d6e8] text-[#1a3a5c] text-sm font-semibold px-4 py-2 rounded-sm hover:bg-[#f0f3f8] transition-colors">
                  ← Back
                </button>)}
              {step < REG_STEPS.length - 1 ? (<button onClick={next} className="bg-[#1a3a5c] text-white text-sm font-semibold px-5 py-2 rounded-sm hover:bg-[#0d2137] transition-colors">
                  Continue →
                </button>) : (<button className="bg-[#e07b1a] text-white text-sm font-semibold px-5 py-2 rounded-sm hover:bg-[#c56b12] transition-colors">
                  Submit Application
                </button>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
function Field({ label, required, type = "text", placeholder, half }) {
    return (<div className={half ? "col-span-1" : "col-span-2 md:col-span-1"}>
      <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {type === "select" ? (<select className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#4a6080] focus:outline-none focus:border-[#2a5298] bg-white">
          <option>Select {label}</option>
        </select>) : type === "date" ? (<input type="date" className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white"/>) : (<input type={type} placeholder={placeholder ?? `Enter ${label}`} className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white"/>)}
    </div>);
}
function BankEntry({ index, onRemove, showRemove }) {
    return (<div className="border border-[#c8d6e8] rounded-sm p-4 bg-[#f8fafd] relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wide">
          Bank Account {index + 1}
        </span>
        {showRemove && (<button type="button" onClick={onRemove} className="text-[10px] text-red-500 border border-red-200 px-2 py-0.5 rounded-sm hover:bg-red-50 transition-colors">
            Remove
          </button>)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
        <div className="col-span-2 md:col-span-3">
          <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">
            Account Holder <span className="text-red-500">*</span>
          </label>
          <select className="w-48 border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white" defaultValue="self">
            <option value="self">Self</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="guardian">Guardian</option>
          </select>
        </div>
        <Field label="Bank" required type="select"/>
        <Field label="Bank State" required type="select"/>
        <Field label="Bank City" required type="select"/>
        <Field label="Branch" required type="select"/>
        <Field label="Account Holder Name" required/>
        <Field label="Account Number" required/>
        <Field label="PAN"/>
      </div>
      <div className="pt-3 border-t border-[#e8eef7]">
        <p className="text-xs font-semibold text-[#1a2636] mb-2 uppercase tracking-wide">Bank Document</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Field label="Document Type" type="select"/>
          <Field label="Document Number"/>
          <div>
            <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">Upload Document</label>
            <div className="border border-dashed border-[#c8d6e8] rounded px-4 py-3 text-center text-xs text-[#4a6080] hover:bg-[#f8fafd] cursor-pointer bg-white">
              Click or drag to upload
            </div>
          </div>
        </div>
      </div>
    </div>);
}
function BankStep() {
    const [accounts, setAccounts] = useState([0]);
    return (<div className="space-y-4">
      {accounts.map((id, i) => (<BankEntry key={id} index={i} showRemove={accounts.length > 1} onRemove={() => setAccounts((prev) => prev.filter((x) => x !== id))}/>))}
      <button type="button" onClick={() => setAccounts((prev) => [...prev, Date.now()])} className="flex items-center gap-2 text-sm font-semibold text-[#2a5298] border border-dashed border-[#2a5298] px-4 py-2.5 rounded-sm hover:bg-[#e8eef7] transition-colors w-full justify-center">
        + Add Another Bank Account
      </button>
    </div>);
}
function AddressForm({ required }) {
    return (<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
      <div className="col-span-2 md:col-span-3"><Field label="Address Line 1" required={required}/></div>
      <div className="col-span-2 md:col-span-3"><Field label="Address Line 2"/></div>
      <Field label="State" required={required} type="select"/>
      <Field label="District" required={required} type="select"/>
      <Field label="Sub Division" required={required} type="select"/>
      <Field label="Mandal / Taluka" required={required} type="select"/>
      <Field label="Village / City / Town" required={required} type="select"/>
      <Field label="Pincode" required={required} placeholder="6-digit pincode"/>
    </div>);
}
function AddressStep() {
    const [activeAddr, setActiveAddr] = useState(0);
    const ADDR_TYPES = ["Present Address", "Permanent Address", "Native Address"];
    return (<div className="space-y-3">
      <div className="flex gap-2">
        {ADDR_TYPES.map((t, i) => (<button key={t} type="button" onClick={() => setActiveAddr(i)} className={`text-sm font-semibold px-4 py-2 rounded-sm border transition-colors ${activeAddr === i ? "bg-[#1a3a5c] text-white border-[#1a3a5c]" : "bg-white text-[#4a6080] border-[#c8d6e8] hover:bg-[#f0f3f8]"}`}>{t}</button>))}
      </div>
      {activeAddr === 0 && (<>
          <p className="text-xs text-[#4a6080]">Current residential address of the student.</p>
          <AddressForm required/>
        </>)}
      {activeAddr === 1 && (<>
          <p className="text-xs text-[#4a6080]">Permanent / correspondence address.</p>
          <div className="flex items-center gap-2 mt-1">
            <input type="checkbox" className="accent-[#1a3a5c]" id="same-as-present"/>
            <label htmlFor="same-as-present" className="text-xs text-[#1a2636] cursor-pointer">Same as Present Address</label>
          </div>
          <AddressForm />
        </>)}
      {activeAddr === 2 && (<>
          <p className="text-xs text-[#4a6080]">Native / ancestral village or town address.</p>
          <AddressForm />
        </>)}
    </div>);
}
function FamilyMemberEntry({ index, onRemove, showRemove }) {
    return (<div className="border border-[#c8d6e8] rounded-sm p-4 bg-[#f8fafd]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#1a3a5c] uppercase tracking-wide">Family Member {index + 1}</span>
        {showRemove && (<button type="button" onClick={onRemove} className="text-[10px] text-red-500 border border-red-200 px-2 py-0.5 rounded-sm hover:bg-red-50 transition-colors">Remove</button>)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Field label="Relationship" type="select" required/>
        <Field label="Name" required/>
        <Field label="Mobile"/>
        <Field label="Occupation" type="select"/>
        <Field label="Aadhaar / Identity No."/>
        <Field label="Annual Income"/>
      </div>
    </div>);
}
function FamilyGuardianStep() {
    const [members, setMembers] = useState([0]);
    return (<div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#0d2137]">Family Members</h3>
      </div>
      {members.map((id, i) => (<FamilyMemberEntry key={id} index={i} showRemove={members.length > 1} onRemove={() => setMembers((prev) => prev.filter((x) => x !== id))}/>))}
      <button type="button" onClick={() => setMembers((prev) => [...prev, Date.now()])} className="flex items-center gap-2 text-sm font-semibold text-[#2a5298] border border-dashed border-[#2a5298] px-4 py-2.5 rounded-sm hover:bg-[#e8eef7] transition-colors w-full justify-center">
        + Add Another Family Member
      </button>
      <div className="pt-4 border-t border-[#f0f3f8]">
        <h3 className="text-sm font-semibold text-[#0d2137] mb-3">Guardian Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Field label="Guardian Name" required/>
          <Field label="Relationship" type="select"/>
          <Field label="Mobile" required/>
          <Field label="Email" type="email"/>
          <Field label="Occupation" type="select"/>
        </div>
      </div>
      <div className="pt-4 border-t border-[#f0f3f8]">
        <h3 className="text-sm font-semibold text-[#0d2137] mb-3">Emergency Contact</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Field label="Contact Name" required/>
          <Field label="Relationship" type="select"/>
          <Field label="Mobile" required/>
          <Field label="Alternate Mobile"/>
        </div>
      </div>
    </div>);
}
// ─── Education Step (Step 1 of Registration) ──────────────────────────────────

const SCHOOL_INSTITUTION = {
    state: "Telangana",
    region: "Hyderabad Region",
    zonal: "Hyderabad Zonal",
    district: "Hyderabad",
    mandal: "Kondapur Mandal",
    village: "Kondapur",
    management: "Government",
    school: "ZPHS Kondapur",
};
const INTER_INSTITUTION = {
    state: "Telangana",
    district: "Hyderabad",
    city: "Hyderabad",
    institutionType: "Government",
    college: "Govt. Jr. College, Hyderabad",
};
const UNI_INSTITUTION = {
    state: "Telangana",
    district: "Hyderabad",
    city: "Hyderabad",
    institutionType: "Government",
    college: "Osmania University College",
};

const PREV_EDU_EMPTY = {
    level: "",
    diplomaRegular: "",
    ugPg: "",
    institutionType: "",
    institutionName: "",
    course: "",
    medium: "",
    yearLevel: "",
    fromYear: "",
    toYear: "",
    locState: "",
    locDistrict: "",
    locSubDivision: "",
    locMandal: "",
    locVillage: "",
};

function ReadOnlyField({ label, value }) {
    return (
        <div className="flex flex-col">
            <label className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-1">{label}</label>
            <div className="flex items-center gap-1.5 border border-[#dce6f3] bg-[#f5f7fb] rounded px-3 py-2 text-sm text-[#4a6080]">
                <span className="flex-1 truncate">{value}</span>
                <span className="text-[#a0b0c8] text-[11px]">🔒</span>
            </div>
        </div>
    );
}

function SelectField({ label, required, options, value, onChange, placeholder, error }) {
    return (
        <div className="flex flex-col">
            <label className="text-[10px] font-semibold text-[#1a2636] uppercase tracking-wide mb-1">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                className={`border rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white ${error ? "border-red-400" : "border-[#c8d6e8]"}`}
            >
                <option value="">{placeholder || `Select ${label}`}</option>
                {(options || []).map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {error && <span className="text-red-500 text-[10px] mt-0.5">{error}</span>}
        </div>
    );
}

function TextField({ label, required, value, onChange, placeholder, error }) {
    return (
        <div className="flex flex-col">
            <label className="text-[10px] font-semibold text-[#1a2636] uppercase tracking-wide mb-1">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                placeholder={placeholder || `Enter ${label}`}
                className={`border rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white ${error ? "border-red-400" : "border-[#c8d6e8]"}`}
            />
            {error && <span className="text-red-500 text-[10px] mt-0.5">{error}</span>}
        </div>
    );
}

function DateField({ label, required, value, onChange, error }) {
    return (
        <div className="flex flex-col">
            <label className="text-[10px] font-semibold text-[#1a2636] uppercase tracking-wide mb-1">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
                type="date"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                className={`border rounded px-3 py-2 text-sm text-[#1a2636] focus:outline-none focus:border-[#2a5298] bg-white ${error ? "border-red-400" : "border-[#c8d6e8]"}`}
            />
            {error && <span className="text-red-500 text-[10px] mt-0.5">{error}</span>}
        </div>
    );
}

const YEARS = Array.from({ length: 30 }, (_, i) => String(2025 - i));
const STATES = ["Telangana", "Andhra Pradesh", "Karnataka", "Maharashtra", "Tamil Nadu", "Kerala", "Odisha", "West Bengal", "Uttar Pradesh", "Rajasthan"];
const DISTRICTS = { Telangana: ["Hyderabad", "Rangareddy", "Medchal", "Warangal", "Nalgonda", "Khammam", "Nizamabad"], "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"], Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"], default: ["Select district"] };
const MEDIUMS = ["Telugu", "English", "Urdu", "Hindi", "Marathi", "Other"];
const SCHOOL_CLASSES = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
const INTER_COURSES = ["MPC", "BiPC", "CEC", "HEC", "MEC", "Vocational"];
const INTER_YEARS = ["1st Year", "2nd Year"];
const UG_PG = ["UG", "PG"];
const UNI_COURSES = ["B.Sc.", "B.A.", "B.Com.", "B.Tech.", "M.Sc.", "M.A.", "M.Com.", "MBA", "M.Tech.", "Ph.D."];
const UNI_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
const DIPLOMA_REGULAR = ["Regular", "Diploma"];
const INTER_INST_TYPES = ["Government", "Private", "Aided"];
const UNI_INST_TYPES = ["Government", "Affiliated", "Private", "Autonomous"];

function PrevEduModal({ initial, onSave, onClose, availableLevels }) {
    const [form, setForm] = useState(initial || PREV_EDU_EMPTY);
    const [errors, setErrors] = useState({});

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const districts = DISTRICTS[form.locState] || DISTRICTS.default;

    const validate = () => {
        const e = {};
        if (!form.level) e.level = "This field is required.";
        if (!form.institutionType) e.institutionType = "This field is required.";
        if (!form.institutionName) e.institutionName = "This field is required.";
        if (!form.medium) e.medium = "This field is required.";
        if (!form.fromYear) e.fromYear = "This field is required.";
        if (!form.toYear) e.toYear = "This field is required.";
        if (form.fromYear && form.toYear && Number(form.toYear) < Number(form.fromYear))
            e.toYear = "To Year cannot be earlier than From Year.";
        if (!form.locState) e.locState = "This field is required.";
        if (!form.locDistrict) e.locDistrict = "This field is required.";
        return e;
    };

    const handleSave = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        onSave(form);
    };

    const isEdit = !!initial;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white border border-[#c8d6e8] rounded-sm w-full max-w-2xl my-4 shadow-2xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#c8d6e8] bg-[#0d2137] rounded-t-sm">
                    <h2 className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {isEdit ? "Edit Previous Academic Record" : "Add Previous Academic Record"}
                    </h2>
                    <button onClick={onClose} className="text-white/70 hover:text-white text-lg leading-none">✕</button>
                </div>

                <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Level */}
                    <div className="grid grid-cols-2 gap-3">
                        <SelectField label="Education Level" required options={availableLevels} value={form.level} onChange={(v) => set("level", v)} error={errors.level}/>
                        {form.level === "Intermediate" && (
                            <SelectField label="Diploma / Regular" options={DIPLOMA_REGULAR} value={form.diplomaRegular} onChange={(v) => set("diplomaRegular", v)}/>
                        )}
                        {form.level === "University" && (
                            <SelectField label="UG / PG" options={UG_PG} value={form.ugPg} onChange={(v) => set("ugPg", v)}/>
                        )}
                    </div>

                    {/* Institution */}
                    <div className="grid grid-cols-2 gap-3">
                        <SelectField
                            label="Institution Type"
                            required
                            options={form.level === "University" ? UNI_INST_TYPES : INTER_INST_TYPES}
                            value={form.institutionType}
                            onChange={(v) => set("institutionType", v)}
                            error={errors.institutionType}
                        />
                        <TextField
                            label={form.level === "Primary" || form.level === "Pre-Primary" ? "School Name" : "College / Institute Name"}
                            required
                            value={form.institutionName}
                            onChange={(v) => set("institutionName", v)}
                            placeholder="Search or enter institution name"
                            error={errors.institutionName}
                        />
                    </div>

                    {/* Course/Medium/Year */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {form.level !== "Primary" && form.level !== "Pre-Primary" && (
                            <SelectField
                                label="Course"
                                options={form.level === "University" ? UNI_COURSES : INTER_COURSES}
                                value={form.course}
                                onChange={(v) => set("course", v)}
                            />
                        )}
                        <SelectField label="Medium of Instruction" required options={MEDIUMS} value={form.medium} onChange={(v) => set("medium", v)} error={errors.medium}/>
                        <SelectField
                            label="Year Level"
                            options={form.level === "Pre-Primary" ? ["Nursery", "LKG", "UKG"] : form.level === "Primary" ? SCHOOL_CLASSES : form.level === "University" ? UNI_YEARS : INTER_YEARS}
                            value={form.yearLevel}
                            onChange={(v) => set("yearLevel", v)}
                        />
                        <SelectField label="From Year" required options={YEARS} value={form.fromYear} onChange={(v) => set("fromYear", v)} error={errors.fromYear}/>
                        <SelectField label="To Year" required options={YEARS} value={form.toYear} onChange={(v) => set("toYear", v)} error={errors.toYear}/>
                    </div>

                    {/* Location */}
                    <div className="border-t border-[#f0f3f8] pt-4">
                        <h3 className="text-xs font-semibold text-[#0d2137] uppercase tracking-wide mb-3">Previous Institution Location</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <SelectField label="State" required options={STATES} value={form.locState} onChange={(v) => set("locState", v)} error={errors.locState}/>
                            <SelectField label="District" required options={districts} value={form.locDistrict} onChange={(v) => set("locDistrict", v)} error={errors.locDistrict}/>
                            <TextField label="Sub Division" value={form.locSubDivision} onChange={(v) => set("locSubDivision", v)} placeholder="Enter sub division"/>
                            <TextField label="Mandal / Taluka" value={form.locMandal} onChange={(v) => set("locMandal", v)} placeholder="Enter mandal or taluka"/>
                            <TextField label="Village / City / Town" value={form.locVillage} onChange={(v) => set("locVillage", v)} placeholder="Enter village, city or town"/>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#c8d6e8] bg-[#f8fafd]">
                    <button onClick={onClose} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8] transition-colors">Cancel</button>
                    <button onClick={handleSave} className="bg-[#1a3a5c] text-white text-sm font-semibold px-5 py-2 rounded-sm hover:bg-[#0d2137] transition-colors">
                        {isEdit ? "Update" : "Save Previous Education"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function DeleteConfirmModal({ record, onConfirm, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-[#c8d6e8] rounded-sm w-full max-w-sm shadow-2xl">
                <div className="p-5">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-lg mb-3">⚠</div>
                    <h3 className="text-sm font-semibold text-[#0d2137] mb-1">Delete Academic Record</h3>
                    <p className="text-xs text-[#4a6080] mb-4">
                        Are you sure you want to delete the <span className="font-semibold text-[#1a2636]">{record.level}</span> record from{" "}
                        <span className="font-semibold text-[#1a2636]">{record.institutionName}</span>? This cannot be undone.
                    </p>
                    <div className="flex items-center justify-end gap-2">
                        <button onClick={onClose} className="border border-[#c8d6e8] text-[#4a6080] text-sm px-4 py-2 rounded-sm hover:bg-[#f0f3f8] transition-colors">Cancel</button>
                        <button onClick={onConfirm} className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-red-700 transition-colors">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EducationStep({ isIntermediateCollege, isUniversityCollege }) {
    // Current education state
    const [currentForm, setCurrentForm] = useState({
        medium: "", classYear: "", admissionNo: "", admissionDate: "",
        diplomaRegular: "", course: "", ugPg: "",
    });
    const setCurrent = (k, v) => setCurrentForm((f) => ({ ...f, [k]: v }));

    // Previous academic history state
    const [prevRecords, setPrevRecords] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const institution = isIntermediateCollege ? INTER_INSTITUTION : isUniversityCollege ? UNI_INSTITUTION : SCHOOL_INSTITUTION;
    const levelLabel = isIntermediateCollege ? "Intermediate" : isUniversityCollege ? "University" : "Primary";

    // Previous education levels a student could have BEFORE joining this institution
    // School (Primary): student may have Pre-Primary schooling only
    // Intermediate: student completed Primary (SSC/Class 10)
    // University: student completed Primary and Intermediate before joining
    const prevAvailableLevels = isUniversityCollege
        ? ["Primary", "Intermediate"]
        : isIntermediateCollege
            ? ["Primary"]
            : ["Pre-Primary"];

    const handleSavePrev = (record) => {
        if (editIndex !== null) {
            setPrevRecords((r) => r.map((x, i) => i === editIndex ? record : x));
            setEditIndex(null);
        } else {
            setPrevRecords((r) => [...r, record]);
        }
        setShowAddModal(false);
    };

    const handleDelete = () => {
        setPrevRecords((r) => r.filter((_, i) => i !== deleteIndex));
        setDeleteIndex(null);
    };

    return (
        <div className="space-y-6">
            {/* ── CURRENT EDUCATION ─────────────────────────────────────────── */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#0d2137]">Current Education</h3>
                    <span className="bg-[#dce6f3] text-[#1a3a5c] text-[10px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide">{levelLabel}</span>
                </div>
                <div className="flex items-start gap-2 mb-4 bg-[#e8f0fb] border border-[#c8d6e8] rounded px-3 py-2">
                    <span className="text-[#2a5298] text-sm mt-0.5">ℹ</span>
                    <p className="text-xs text-[#2a5298]">Current institution is automatically associated with the student based on your institution.</p>
                </div>

                {/* Institution block — read only */}
                <div className="bg-[#f8fafd] border border-[#e8eef7] rounded-sm p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-[#4a6080] uppercase tracking-widest">Institution Details</span>
                        <span className="h-px flex-1 bg-[#e8eef7]"/>
                        <span className="text-[10px] text-[#a0b0c8] flex items-center gap-1">🔒 Auto-populated</span>
                    </div>
                    {!isIntermediateCollege && !isUniversityCollege ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <ReadOnlyField label="Education Level" value="Primary"/>
                            <ReadOnlyField label="State" value={institution.state}/>
                            <ReadOnlyField label="Region" value={institution.region}/>
                            <ReadOnlyField label="Zonal" value={institution.zonal}/>
                            <ReadOnlyField label="District" value={institution.district}/>
                            <ReadOnlyField label="Mandal" value={institution.mandal}/>
                            <ReadOnlyField label="Village / Town" value={institution.village}/>
                            <ReadOnlyField label="Management" value={institution.management}/>
                            <ReadOnlyField label="School" value={institution.school}/>
                        </div>
                    ) : isIntermediateCollege ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <ReadOnlyField label="Education Level" value="Intermediate"/>
                            <ReadOnlyField label="State" value={institution.state}/>
                            <ReadOnlyField label="District" value={institution.district}/>
                            <ReadOnlyField label="City / Town" value={institution.city}/>
                            <ReadOnlyField label="Institution Type" value={institution.institutionType}/>
                            <ReadOnlyField label="Institute / College" value={institution.college}/>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <ReadOnlyField label="Education Level" value="University"/>
                            <ReadOnlyField label="State" value={institution.state}/>
                            <ReadOnlyField label="District" value={institution.district}/>
                            <ReadOnlyField label="City / Location" value={institution.city}/>
                            <ReadOnlyField label="Institution Type" value={institution.institutionType}/>
                            <ReadOnlyField label="College" value={institution.college}/>
                        </div>
                    )}
                </div>

                {/* Student-specific fields */}
                <div className="bg-white border border-[#e8eef7] rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-[#4a6080] uppercase tracking-widest">Student Details</span>
                        <span className="h-px flex-1 bg-[#e8eef7]"/>
                    </div>
                    {!isIntermediateCollege && !isUniversityCollege ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <SelectField label="Medium of Instruction" required options={MEDIUMS} value={currentForm.medium} onChange={(v) => setCurrent("medium", v)}/>
                            <SelectField label="Year Level / Class" required options={SCHOOL_CLASSES} value={currentForm.classYear} onChange={(v) => setCurrent("classYear", v)}/>
                            <TextField label="Admission Number" required value={currentForm.admissionNo} onChange={(v) => setCurrent("admissionNo", v)} placeholder="Enter admission number"/>
                            <DateField label="Admission Date" value={currentForm.admissionDate} onChange={(v) => setCurrent("admissionDate", v)}/>
                        </div>
                    ) : isIntermediateCollege ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <SelectField label="Diploma / Regular" required options={DIPLOMA_REGULAR} value={currentForm.diplomaRegular} onChange={(v) => setCurrent("diplomaRegular", v)}/>
                            <SelectField label="Course / Stream" required options={INTER_COURSES} value={currentForm.course} onChange={(v) => setCurrent("course", v)}/>
                            <SelectField label="Year Level / Course Year" required options={INTER_YEARS} value={currentForm.classYear} onChange={(v) => setCurrent("classYear", v)}/>
                            <SelectField label="Medium of Instruction" required options={MEDIUMS} value={currentForm.medium} onChange={(v) => setCurrent("medium", v)}/>
                            <TextField label="Admission Number" required value={currentForm.admissionNo} onChange={(v) => setCurrent("admissionNo", v)} placeholder="Enter admission number"/>
                            <DateField label="Admission Date" value={currentForm.admissionDate} onChange={(v) => setCurrent("admissionDate", v)}/>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <SelectField label="UG / PG" required options={UG_PG} value={currentForm.ugPg} onChange={(v) => setCurrent("ugPg", v)}/>
                            <SelectField label="Course" required options={UNI_COURSES} value={currentForm.course} onChange={(v) => setCurrent("course", v)}/>
                            <SelectField label="Year Level / Course Year" required options={UNI_YEARS} value={currentForm.classYear} onChange={(v) => setCurrent("classYear", v)}/>
                            <SelectField label="Medium of Instruction" required options={MEDIUMS} value={currentForm.medium} onChange={(v) => setCurrent("medium", v)}/>
                            <TextField label="Admission Number" required value={currentForm.admissionNo} onChange={(v) => setCurrent("admissionNo", v)} placeholder="Enter admission number"/>
                            <DateField label="Admission Date" value={currentForm.admissionDate} onChange={(v) => setCurrent("admissionDate", v)}/>
                        </div>
                    )}
                </div>
            </div>

            {/* ── PREVIOUS ACADEMIC HISTORY ──────────────────────────────────── */}
            <div className="border-t border-[#f0f3f8] pt-5">
                <div className="flex items-center justify-between mb-1">
                    <div>
                        <h3 className="text-sm font-semibold text-[#0d2137]">Previous Academic History</h3>
                        <p className="text-xs text-[#4a6080] mt-0.5">Add the student&apos;s previous educational records.</p>
                    </div>
                    <button
                        onClick={() => { setEditIndex(null); setShowAddModal(true); }}
                        className="flex items-center gap-1.5 bg-[#1a3a5c] text-white text-xs font-semibold px-3 py-2 rounded-sm hover:bg-[#0d2137] transition-colors"
                    >
                        + Add Previous Education
                    </button>
                </div>

                {prevRecords.length === 0 ? (
                    <div className="bg-[#f5f7fb] border border-dashed border-[#c8d6e8] rounded-sm p-8 text-center mt-3">
                        <div className="text-3xl mb-2 opacity-30">🎓</div>
                        <p className="text-sm text-[#4a6080] font-medium">No previous academic records added.</p>
                        <p className="text-xs text-[#a0b0c8] mt-1">Click &quot;+ Add Previous Education&quot; to add records.</p>
                    </div>
                ) : (
                    <div className="border border-[#c8d6e8] rounded-sm overflow-hidden mt-3">
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                                <thead className="bg-[#f5f7fb]">
                                    <tr>
                                        {["Education Level", "Institution Type", "Institution Name", "Course", "Medium", "Year Level", "Years", "Location", "Actions"].map((h) => (
                                            <th key={h} className="text-left px-3 py-2.5 text-[#4a6080] font-semibold uppercase tracking-wide text-[10px] border-b border-[#e8eef7] whitespace-nowrap">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#f0f3f8]">
                                    {prevRecords.map((r, i) => (
                                        <tr key={i} className="hover:bg-[#f8fafd] transition-colors">
                                            <td className="px-3 py-2.5">
                                                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold border ${r.level === "Primary" ? "bg-blue-50 text-blue-700 border-blue-200" : r.level === "Intermediate" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-green-50 text-green-700 border-green-200"}`}>
                                                    {r.level}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2.5 text-[#4a6080]">{r.institutionType || "—"}</td>
                                            <td className="px-3 py-2.5 text-[#1a2636] font-medium max-w-[140px] truncate">{r.institutionName}</td>
                                            <td className="px-3 py-2.5 text-[#4a6080]">{r.course || "—"}</td>
                                            <td className="px-3 py-2.5 text-[#4a6080]">{r.medium || "—"}</td>
                                            <td className="px-3 py-2.5 text-[#4a6080]">{r.yearLevel || "—"}</td>
                                            <td className="px-3 py-2.5 text-[#4a6080] whitespace-nowrap">{r.fromYear}–{r.toYear}</td>
                                            <td className="px-3 py-2.5 text-[#4a6080] max-w-[100px] truncate">{[r.locVillage, r.locDistrict].filter(Boolean).join(", ") || "—"}</td>
                                            <td className="px-3 py-2.5">
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => { setEditIndex(i); setShowAddModal(true); }} className="text-[10px] border border-[#c8d6e8] text-[#2a5298] px-2 py-0.5 rounded-sm hover:bg-[#e8eef7] transition-colors">Edit</button>
                                                    <button onClick={() => setDeleteIndex(i)} className="text-[10px] border border-red-200 text-red-600 px-2 py-0.5 rounded-sm hover:bg-red-50 transition-colors">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 py-3 border-t border-[#e8eef7] flex items-center justify-between bg-[#f8fafd]">
                            <span className="text-[10px] text-[#4a6080]">{prevRecords.length} record{prevRecords.length !== 1 ? "s" : ""}</span>
                            <button
                                onClick={() => { setEditIndex(null); setShowAddModal(true); }}
                                className="text-xs text-[#2a5298] border border-[#c8d6e8] px-3 py-1 rounded-sm hover:bg-[#f0f3f8] transition-colors"
                            >+ Add Previous Education</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showAddModal && (
                <PrevEduModal
                    initial={editIndex !== null ? prevRecords[editIndex] : null}
                    onSave={handleSavePrev}
                    onClose={() => { setShowAddModal(false); setEditIndex(null); }}
                    availableLevels={prevAvailableLevels}
                />
            )}
            {deleteIndex !== null && (
                <DeleteConfirmModal
                    record={prevRecords[deleteIndex]}
                    onConfirm={handleDelete}
                    onClose={() => setDeleteIndex(null)}
                />
            )}
        </div>
    );
}

function StepContent({ step, isIntermediateCollege, isUniversityCollege }) {
    const [hasDisability, setHasDisability] = useState(false);
    // Step 0: Basic Details (with disability at the bottom)
    if (step === 0)
        return (<div className="space-y-5">
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-28 bg-[#f0f3f8] border-2 border-dashed border-[#c8d6e8] rounded flex flex-col items-center justify-center text-[#4a6080] text-xs text-center gap-1">
            <span className="text-2xl opacity-40">👤</span>
            <span>Upload Photo</span>
          </div>
          <button className="text-xs text-[#2a5298] border border-[#c8d6e8] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">Browse</button>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3">
          <Field label="First Name" required/>
          <Field label="Full Name" required/>
          <Field label="Surname"/>
          <Field label="Father's Name" required/>
          <Field label="Date of Birth" required type="date"/>
          <Field label="Gender" required type="select"/>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4 border-t border-[#f0f3f8]">
        <Field label="Blood Group" type="select"/>
        <Field label="Religion" type="select"/>
        <Field label="Nationality" type="select"/>
        <Field label="Mother Tongue" type="select"/>
        <Field label="Mobile" placeholder="10-digit mobile" required/>
        <Field label="Alternate Mobile"/>
        <Field label="Email" type="email"/>
        <Field label="Aadhaar / Identity No."/>
      </div>

      {/* Disability section — inside Basic Details */}
      <div className="pt-4 border-t border-[#f0f3f8]">
        <h3 className="text-sm font-semibold text-[#0d2137] mb-3">Disability</h3>
        <div className="mb-3">
          <label className="block text-xs font-semibold text-[#1a2636] mb-2 uppercase tracking-wide">Does the student have a disability?</label>
          <div className="flex gap-4">
            {["Yes", "No"].map((opt) => (<label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="disability" onChange={() => setHasDisability(opt === "Yes")} defaultChecked={opt === "No"} className="accent-[#1a3a5c]"/>
                <span className="text-sm text-[#1a2636]">{opt}</span>
              </label>))}
          </div>
        </div>
        {hasDisability && (<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Field label="Disability Type" type="select"/>
            <Field label="Disability Details"/>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">
                Disability Percentage <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input type="number" min={0} max={100} placeholder="e.g. 40" className="w-24 border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white"/>
                <span className="text-sm text-[#4a6080]">%</span>
              </div>
            </div>
            <Field label="Certificate Number"/>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">Certificate Upload</label>
              <div className="border border-dashed border-[#c8d6e8] rounded px-4 py-3 text-center text-xs text-[#4a6080] hover:bg-[#f8fafd] cursor-pointer">
                Click or drag to upload
              </div>
            </div>
          </div>)}
      </div>
    </div>);
    // Step 1: Education
    if (step === 1)
        return <EducationStep isIntermediateCollege={isIntermediateCollege} isUniversityCollege={isUniversityCollege}/>;
    // Step 2: Family & Guardian
    if (step === 2)
        return <FamilyGuardianStep />;
    // Step 3: Address
    if (step === 3)
        return <AddressStep />;
    // Step 4: Bank (with Account Holder listbox + Add Another)
    if (step === 4)
        return <BankStep />;
    // Step 8: Review & Submit (was step 9)
    if (step === 8)
        return (<div className="space-y-4">
      <p className="text-sm text-[#4a6080]">Review all sections before submitting the application.</p>
      <div className="grid grid-cols-1 gap-2">
        {[
                { label: "Basic Details & Disability", done: true },
                { label: "Caste & Community", done: true },
                { label: "Education", done: true },
                { label: "Family & Guardian", done: true },
                { label: "Address", done: true },
                { label: "Bank", done: true },
                { label: "Income & Certificates", done: false },
                { label: "Skills & Activities", done: false },
                { label: "Documents", done: false },
            ].map((s) => (<div key={s.label} className="flex items-center justify-between px-4 py-3 bg-[#f8fafd] border border-[#e8eef7] rounded-sm">
            <div className="flex items-center gap-3">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${s.done ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                {s.done ? "✓" : "!"}
              </span>
              <span className="text-sm text-[#1a2636] font-medium">{s.label}</span>
            </div>
            <button className="text-xs text-[#2a5298] hover:text-[#e07b1a]">Edit</button>
          </div>))}
      </div>
      <div className="pt-4 border-t border-[#f0f3f8]">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-0.5 accent-[#1a3a5c]"/>
          <span className="text-sm text-[#1a2636]">I confirm that all information provided is accurate and complete to the best of my knowledge.</span>
        </label>
      </div>
    </div>);
    // Generic steps 5, 6, 7
    const stepContent = {
        5: (<div className="space-y-5">
        <h3 className="text-sm font-semibold text-[#0d2137]">Caste &amp; Community Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">
              Category <span className="text-red-500">*</span>
            </label>
            <select className="w-full border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] bg-white focus:outline-none focus:border-[#2a5298]">
              <option value="">Select Category</option>
              {["General / Open", "OBC (Other Backward Class)", "SC (Scheduled Caste)", "ST (Scheduled Tribe)", "NT-A (Nomadic Tribe)", "NT-B", "NT-C", "NT-D", "SBC (Special Backward Class)", "VJ/DT (Vimukta Jati)", "EWS (Economically Weaker Section)"].map(o => (<option key={o}>{o}</option>))}
            </select>
          </div>
          <Field label="Caste" type="select" required/>
          <Field label="Sub-Caste"/>
          <Field label="Community" type="select"/>
          <Field label="Validity Certificate No."/>
          <Field label="Caste Certificate No."/>
          <Field label="Certificate Issue Date" type="date"/>
          <Field label="Certificate Issuing Authority"/>
          <div className="col-span-1">
            <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">Upload Caste Certificate</label>
            <div className="border border-dashed border-[#c8d6e8] rounded px-4 py-3 text-center text-xs text-[#4a6080] hover:bg-[#f8fafd] cursor-pointer">
              Click or drag PDF / image
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#f0f3f8]">
          <h3 className="text-sm font-semibold text-[#0d2137] mb-3">Family Income</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">
                Annual Income <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#4a6080]">₹</span>
                <input type="number" min={0} placeholder="e.g. 120000" className="flex-1 border border-[#c8d6e8] rounded px-3 py-2 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] bg-white"/>
              </div>
            </div>
            <Field label="Income Range / Slab" type="select"/>
            <Field label="Primary Income Source" type="select"/>
            <Field label="Father's Occupation" type="select"/>
            <Field label="Mother's Occupation" type="select"/>
            <Field label="Guardian's Occupation" type="select"/>
          </div>
        </div>

        <div className="pt-4 border-t border-[#f0f3f8]">
          <h3 className="text-sm font-semibold text-[#0d2137] mb-3">Income Certificate</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Field label="Certificate Number" required/>
            <Field label="Issue Date" type="date" required/>
            <Field label="Valid Upto" type="date"/>
            <Field label="Issuing Authority" required/>
            <Field label="Issuing Tahsil / Taluka"/>
            <Field label="Issuing District" type="select"/>
            <div className="col-span-2 md:col-span-3">
              <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">Upload Income Certificate</label>
              <div className="border border-dashed border-[#c8d6e8] rounded px-4 py-4 text-center text-xs text-[#4a6080] hover:bg-[#f8fafd] cursor-pointer">
                Click or drag to upload PDF / image (max 2 MB)
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#f0f3f8]">
          <h3 className="text-sm font-semibold text-[#0d2137] mb-3">BPL / Scholarship Eligibility</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-[#1a2636] mb-2 uppercase tracking-wide">BPL Card Holder?</label>
              <div className="flex gap-4">
                {["Yes", "No"].map((opt) => (<label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="bpl" defaultChecked={opt === "No"} className="accent-[#1a3a5c]"/>
                    <span className="text-sm text-[#1a2636]">{opt}</span>
                  </label>))}
              </div>
            </div>
            <Field label="BPL Card Number"/>
            <Field label="Ration Card Type" type="select"/>
            <Field label="Scholarship Scheme" type="select"/>
            <Field label="EBC / Freeship Eligible" type="select"/>
          </div>
        </div>
      </div>),
        6: (<div className="space-y-5">
        <h3 className="text-sm font-semibold text-[#0d2137]">Skills</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Skill Type" type="select"/>
          <Field label="Proficiency Level" type="select"/>
        </div>
        <h3 className="text-sm font-semibold text-[#0d2137] pt-3 border-t border-[#f0f3f8]">Sports</h3>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Sport" type="select"/>
          <Field label="Participation Level" type="select"/>
          <Field label="Achievement Details"/>
        </div>
        <h3 className="text-sm font-semibold text-[#0d2137] pt-3 border-t border-[#f0f3f8]">Other Activities</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Activity" type="select"/>
          <Field label="Achievement Details"/>
        </div>
      </div>),
        7: (<div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#0d2137]">Documents</h3>
          <button className="text-xs text-[#2a5298] border border-[#c8d6e8] px-3 py-1 rounded-sm hover:bg-[#f0f3f8]">+ Add Document</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
          {["Identity", "Academic", "Address", "Income", "Bank", "Photo", "Other"].map((cat) => (<span key={cat} className="text-xs border border-[#c8d6e8] text-[#4a6080] px-3 py-1.5 rounded-sm text-center cursor-pointer hover:bg-[#f0f3f8]">{cat}</span>))}
        </div>
        <div className="bg-[#f5f7fb] border border-[#e8eef7] rounded-sm p-4 text-xs text-[#4a6080] text-center">No documents uploaded yet. Click "+ Add Document" to begin.</div>
      </div>),
    };
    return <>{stepContent[step] ?? null}</>;
}
