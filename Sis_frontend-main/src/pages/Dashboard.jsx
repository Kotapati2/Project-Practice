/* ─── Status badge styles ────────────────────────────────────────────── */
const STATUS_BADGES = {
    "Pending Verification": "bg-amber-100 text-amber-800 border border-amber-300",
    Submitted: "bg-blue-100 text-blue-800 border border-blue-300",
    Approved: "bg-green-100 text-green-800 border border-green-300",
    Rejected: "bg-red-100 text-red-800 border border-red-300",
    Returned: "bg-orange-100 text-orange-800 border border-orange-300",
    Draft: "bg-gray-100 text-gray-700 border border-gray-300",
};
/* ─── Shared sample approvals ────────────────────────────────────────── */
const APPROVALS = [
    { id: "APP-2026-0891", type: "School Registration", entity: "ZPHS Kondapur", district: "Rangareddy", status: "Pending Verification", date: "09 Sep" },
    { id: "APP-2026-0890", type: "Student Transfer", entity: "K. Suresh Kumar", district: "Ernakulam", status: "Submitted", date: "09 Sep" },
    { id: "APP-2026-0887", type: "Teacher Appointment", entity: "Govt. HS Malakpet", district: "Hyderabad", status: "Approved", date: "08 Sep" },
    { id: "APP-2026-0884", type: "Infrastructure Grant", entity: "Palakkad District", district: "Palakkad", status: "Rejected", date: "07 Sep" },
    { id: "APP-2026-0882", type: "Exam Centre Setup", entity: "GHSS Thrissur", district: "Thrissur", status: "Returned", date: "06 Sep" },
];
/* ─── Role config ────────────────────────────────────────────────────── */
const ROLE_CONFIG = {
    "school-user": {
        greeting: "Manage your school's students, attendance, and documents.",
        stats: [
            { label: "Total Students", value: "842", delta: "+18 this year", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Present Today", value: "798", delta: "94.8% attendance", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Pending Docs", value: "23", delta: "Needs upload", trend: "neutral", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Draft Applications", value: "5", delta: "Incomplete", trend: "neutral", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "Register Student", nav: "students/register", icon: "➕", primary: true },
            { label: "Mark Attendance", nav: "attendance", icon: "✅", accent: true },
            { label: "View Students", nav: "students/list", icon: "👤" },
            { label: "Upload Docs", nav: "documents", icon: "📄" },
            { label: "Classes", nav: "classes", icon: "🏫" },
            { label: "Reports", nav: "reports", icon: "📊" },
        ],
        analyticsTitle: "This Week's Attendance",
        analyticsType: "bar",
        analyticsData: [
            { label: "Mon", value: 810, color: "#2a5298" },
            { label: "Tue", value: 798, color: "#2a5298" },
            { label: "Wed", value: 822, color: "#2a5298" },
            { label: "Thu", value: 785, color: "#2a5298" },
            { label: "Fri", value: 798, color: "#2a5298" },
        ],
        tableType: "students",
        notices: [
            { dot: "#e07b1a", text: "Census deadline: 30 Sep 2026 — upload all student records.", time: "Today" },
            { dot: "#2a5298", text: "New circular on Aadhaar seeding for students.", time: "2d ago" },
            { dot: "#1a6b3a", text: "Mid-term exam schedule published.", time: "5d ago" },
        ],
    },
    meo: {
        greeting: "Monitor mandal-level schools, approvals, and data quality.",
        stats: [
            { label: "Schools in Mandal", value: "47", delta: "Active: 44", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Students", value: "18,432", delta: "+1.2% YoY", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Pending Approvals", value: "12", delta: "Urgent: 3", trend: "neutral", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Data Issues", value: "38", delta: "Needs correction", trend: "down", color: "text-[#b91c1c]", bg: "bg-red-50", border: "border-red-100" },
        ],
        actions: [
            { label: "Pending Approvals", nav: "approvals", icon: "✅", primary: true },
            { label: "Data Quality", nav: "data-quality", icon: "🔍", accent: true },
            { label: "View Schools", nav: "schools", icon: "🏫" },
            { label: "Student Records", nav: "students/list", icon: "👤" },
            { label: "Teachers", nav: "teachers", icon: "👨‍🏫" },
            { label: "Reports", nav: "reports", icon: "📊" },
        ],
        analyticsTitle: "School Status in Mandal",
        analyticsType: "donut",
        analyticsData: [
            { label: "Active", value: 44, color: "#1a6b3a" },
            { label: "Needs Attention", value: 2, color: "#e07b1a" },
            { label: "Inactive", value: 1, color: "#b91c1c" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "3 school inspection reports overdue.", time: "Today" },
            { dot: "#2a5298", text: "Mandal data submission closes 25 Sep.", time: "1d ago" },
            { dot: "#1a6b3a", text: "New MEO circular on attendance reporting.", time: "3d ago" },
        ],
    },
    deo: {
        greeting: "Oversee district institutions, approvals, and analytics.",
        stats: [
            { label: "Total Students", value: "4,82,931", delta: "+2.4% YoY", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Active Institutions", value: "1,247", delta: "+12 this year", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Pending Approvals", value: "38", delta: "Urgent: 7", trend: "neutral", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Reports Generated", value: "1,058", delta: "This month", trend: "up", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "Approve Requests", nav: "approvals", icon: "✅", primary: true },
            { label: "District Analytics", nav: "analytics", icon: "📈", accent: true },
            { label: "Institutions", nav: "schools", icon: "🏫" },
            { label: "Student Records", nav: "students/list", icon: "👤" },
            { label: "Data Quality", nav: "data-quality", icon: "🔍" },
            { label: "Reports", nav: "reports", icon: "📊" },
        ],
        analyticsTitle: "District Enrollment by Level",
        analyticsType: "bar",
        analyticsData: [
            { label: "Primary", value: 284000, color: "#1a3a5c" },
            { label: "Inter.", value: 142000, color: "#2a5298" },
            { label: "University", value: 56931, color: "#4a7abf" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "Annual data census deadline: 30 Sep 2026.", time: "Today" },
            { dot: "#2a5298", text: "Maintenance window: 25 Sep 02:00–04:00 IST.", time: "2d ago" },
            { dot: "#1a6b3a", text: "Q2 disbursements processed successfully.", time: "5d ago" },
            { dot: "#4a6080", text: "New circular on student data verification.", time: "1w ago" },
        ],
    },
    "primary-head": {
        greeting: "State-level primary education overview and policy management.",
        stats: [
            { label: "State Enrollment", value: "28,41,203", delta: "+3.1% YoY", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Districts", value: "33", delta: "All reporting", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Pending Policy Reviews", value: "7", delta: "This quarter", trend: "neutral", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Data Completeness", value: "91.4%", delta: "+2.1% vs Q1", trend: "up", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "State Analytics", nav: "analytics", icon: "📈", primary: true },
            { label: "Policy Reports", nav: "reports", icon: "📋", accent: true },
            { label: "District Summary", nav: "districts", icon: "🗺️" },
            { label: "Pending Reviews", nav: "approvals", icon: "✅" },
            { label: "Data Quality", nav: "data-quality", icon: "🔍" },
            { label: "Export Data", nav: "reports", icon: "⬇️" },
        ],
        analyticsTitle: "District-wise Enrollment",
        analyticsType: "bar",
        analyticsData: [
            { label: "RR", value: 480000, color: "#1a3a5c" },
            { label: "Hyd", value: 320000, color: "#2a5298" },
            { label: "KNL", value: 280000, color: "#4a7abf" },
            { label: "NLG", value: 260000, color: "#6a96d8" },
            { label: "WGL", value: 240000, color: "#8ab4f0" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "Q3 state report submission due 30 Sep.", time: "Today" },
            { dot: "#2a5298", text: "New RTE compliance guidelines issued.", time: "3d ago" },
            { dot: "#1a6b3a", text: "UDISE+ data synchronisation complete.", time: "1w ago" },
        ],
    },
    "inter-college": {
        greeting: "Manage intermediate college students, attendance, and results.",
        stats: [
            { label: "Students", value: "1,248", delta: "AY 2025–26", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Present Today", value: "1,182", delta: "94.7% attendance", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Pending Docs", value: "31", delta: "Awaiting upload", trend: "neutral", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Exam Results Due", value: "3", delta: "Entry pending", trend: "neutral", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "Register Student", nav: "students/register", icon: "➕", primary: true },
            { label: "Mark Attendance", nav: "attendance", icon: "✅", accent: true },
            { label: "View Students", nav: "students/list", icon: "👤" },
            { label: "Results Entry", nav: "academics", icon: "📝" },
            { label: "Upload Docs", nav: "documents", icon: "📄" },
            { label: "Reports", nav: "reports", icon: "📊" },
        ],
        analyticsTitle: "Stream-wise Enrollment",
        analyticsType: "bar",
        analyticsData: [
            { label: "MPC", value: 480, color: "#1a3a5c" },
            { label: "BiPC", value: 360, color: "#2a5298" },
            { label: "CEC", value: 240, color: "#4a7abf" },
            { label: "HEC", value: 168, color: "#6a96d8" },
        ],
        tableType: "students",
        notices: [
            { dot: "#e07b1a", text: "1st year results entry deadline: 28 Sep.", time: "Today" },
            { dot: "#2a5298", text: "Fee collection window opens 25 Sep.", time: "1d ago" },
            { dot: "#1a6b3a", text: "Hall tickets issued for mid-term exams.", time: "4d ago" },
        ],
    },
    dieo: {
        greeting: "District intermediate education overview and approval management.",
        stats: [
            { label: "Colleges in District", value: "84", delta: "Active: 81", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Students", value: "1,12,840", delta: "+3.2% YoY", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Pending Approvals", value: "19", delta: "Urgent: 4", trend: "neutral", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Data Issues", value: "22", delta: "Needs correction", trend: "down", color: "text-[#b91c1c]", bg: "bg-red-50", border: "border-red-100" },
        ],
        actions: [
            { label: "Pending Approvals", nav: "approvals", icon: "✅", primary: true },
            { label: "College List", nav: "colleges", icon: "🏛️", accent: true },
            { label: "Enrollment Data", nav: "enrollment", icon: "📝" },
            { label: "Data Quality", nav: "data-quality", icon: "🔍" },
            { label: "Lecturers", nav: "lecturers", icon: "👨‍🏫" },
            { label: "Reports", nav: "reports", icon: "📊" },
        ],
        analyticsTitle: "College Type Distribution",
        analyticsType: "donut",
        analyticsData: [
            { label: "Government", value: 48, color: "#1a3a5c" },
            { label: "Aided", value: 22, color: "#2a5298" },
            { label: "Private", value: 14, color: "#4a7abf" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "3 colleges with unverified student data.", time: "Today" },
            { dot: "#2a5298", text: "Circular on lecturer appointment approvals.", time: "2d ago" },
            { dot: "#1a6b3a", text: "Enrollment synchronisation complete.", time: "4d ago" },
        ],
    },
    "inter-state": {
        greeting: "State board of intermediate education — analytics and policy.",
        stats: [
            { label: "Total Enrollment", value: "14,28,312", delta: "+4.8% YoY", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Colleges", value: "1,842", delta: "State-wide", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Pending State Reviews", value: "11", delta: "This quarter", trend: "neutral", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Pass Rate (AY 25–26)", value: "88.4%", delta: "+1.2% vs last", trend: "up", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "State Analytics", nav: "analytics", icon: "📈", primary: true },
            { label: "Pending Reviews", nav: "approvals", icon: "✅", accent: true },
            { label: "College Summary", nav: "colleges", icon: "🏛️" },
            { label: "Enrollment Report", nav: "enrollment", icon: "📝" },
            { label: "Policy Reports", nav: "reports", icon: "📋" },
            { label: "Export Data", nav: "reports", icon: "⬇️" },
        ],
        analyticsTitle: "District Enrollment Trend",
        analyticsType: "bar",
        analyticsData: [
            { label: "RR", value: 280000, color: "#1a3a5c" },
            { label: "Hyd", value: 210000, color: "#2a5298" },
            { label: "KNL", value: 180000, color: "#4a7abf" },
            { label: "NLG", value: 155000, color: "#6a96d8" },
            { label: "WGL", value: 130000, color: "#8ab4f0" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "State board annual review due 15 Oct.", time: "Today" },
            { dot: "#2a5298", text: "New syllabus revision circular issued.", time: "3d ago" },
            { dot: "#1a6b3a", text: "AY 2025–26 final enrollment locked.", time: "1w ago" },
        ],
    },
    "uni-college": {
        greeting: "Osmania University College — manage students, programmes, and academics.",
        stats: [
            { label: "Students", value: "1,248", delta: "AY 2025–26", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Present Today", value: "1,102", delta: "88.3% attendance", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Programmes", value: "12", delta: "UG + PG", trend: "neutral", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Pending Docs", value: "31", delta: "Student uploads", trend: "neutral", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "Register Student", nav: "students/register", icon: "➕", primary: true },
            { label: "Mark Attendance", nav: "attendance", icon: "✅", accent: true },
            { label: "View Students", nav: "students/list", icon: "👤" },
            { label: "Programmes", nav: "programs", icon: "📚" },
            { label: "Documents", nav: "documents", icon: "📄" },
            { label: "Reports", nav: "reports", icon: "📊" },
        ],
        analyticsTitle: "Department-wise Enrollment",
        analyticsType: "bar",
        analyticsData: [
            { label: "CSE", value: 480, color: "#1a3a5c" },
            { label: "Commerce", value: 320, color: "#2a5298" },
            { label: "Arts", value: 248, color: "#4a7abf" },
            { label: "Science", value: 200, color: "#6a96d8" },
        ],
        tableType: "students",
        notices: [
            { dot: "#e07b1a", text: "Semester exam registration closes 27 Sep.", time: "Today" },
            { dot: "#2a5298", text: "Programme fee verification deadline this week.", time: "2d ago" },
            { dot: "#1a6b3a", text: "NAAC accreditation documents submitted.", time: "5d ago" },
        ],
    },
    "uni-user": {
        greeting: "University administration — departments, programs, and analytics.",
        stats: [
            { label: "Total Students", value: "18,432", delta: "+5.2% YoY", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Departments", value: "24", delta: "Across 6 faculties", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Faculty", value: "842", delta: "+12 this year", trend: "up", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Active Programs", value: "112", delta: "UG + PG + PhD", trend: "neutral", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "Student Records", nav: "students/list", icon: "👤", primary: true },
            { label: "Analytics", nav: "analytics", icon: "📈", accent: true },
            { label: "Departments", nav: "departments", icon: "🏢" },
            { label: "Programs", nav: "programs", icon: "📚" },
            { label: "Faculty", nav: "faculty", icon: "👨‍🏫" },
            { label: "Reports", nav: "reports", icon: "📊" },
        ],
        analyticsTitle: "Faculty-wise Enrollment",
        analyticsType: "bar",
        analyticsData: [
            { label: "Sci.", value: 4800, color: "#1a3a5c" },
            { label: "Arts", value: 3200, color: "#2a5298" },
            { label: "Comm.", value: 3800, color: "#4a7abf" },
            { label: "Engg.", value: 4200, color: "#6a96d8" },
            { label: "Law", value: 2432, color: "#8ab4f0" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "Annual report submission due 15 Oct.", time: "Today" },
            { dot: "#2a5298", text: "PhD admission portal opens 1 Oct.", time: "2d ago" },
            { dot: "#1a6b3a", text: "Convocation ceremony scheduled for Nov.", time: "5d ago" },
        ],
    },
    vc: {
        greeting: "Vice-Chancellor — strategic overview and university performance.",
        stats: [
            { label: "Total Students", value: "18,432", delta: "+5.2% YoY", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Faculty", value: "842", delta: "Active", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "NAAC Score", value: "3.41", delta: "'A+' grade", trend: "up", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Research Output", value: "284", delta: "Papers this year", trend: "up", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "Strategic Analytics", nav: "analytics", icon: "🔭", primary: true },
            { label: "University KPIs", nav: "kpis", icon: "🎯", accent: true },
            { label: "Faculty Summary", nav: "faculty", icon: "👨‍🏫" },
            { label: "Research Dashboard", nav: "research", icon: "🔬" },
            { label: "Performance", nav: "performance", icon: "📈" },
            { label: "Reports", nav: "reports", icon: "📊" },
        ],
        analyticsTitle: "5-Year Enrollment Trend",
        analyticsType: "bar",
        analyticsData: [
            { label: "2022", value: 14200, color: "#4a7abf" },
            { label: "2023", value: 15400, color: "#4a7abf" },
            { label: "2024", value: 16800, color: "#2a5298" },
            { label: "2025", value: 17520, color: "#2a5298" },
            { label: "2026", value: 18432, color: "#1a3a5c" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "Board of Management meeting: 30 Sep.", time: "Today" },
            { dot: "#2a5298", text: "NAAC peer team visit scheduled for Oct.", time: "2d ago" },
            { dot: "#1a6b3a", text: "Research funding disbursement processed.", time: "4d ago" },
        ],
    },
    "state-higher": {
        greeting: "State Higher Education Council — policy, analytics, and oversight.",
        stats: [
            { label: "Universities", value: "28", delta: "State-wide", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Total HE Students", value: "8,42,183", delta: "+6.1% YoY", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "GER (Higher Ed)", value: "28.4%", delta: "+1.8% vs 2025", trend: "up", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Pending Policy Items", value: "14", delta: "Awaiting action", trend: "neutral", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "State Analytics", nav: "analytics", icon: "📈", primary: true },
            { label: "University Comparison", nav: "comparison", icon: "⚖️", accent: true },
            { label: "KPI Dashboard", nav: "kpis", icon: "🎯" },
            { label: "Policy Reports", nav: "reports", icon: "📋" },
            { label: "Pending Reviews", nav: "approvals", icon: "✅" },
            { label: "Export Data", nav: "reports", icon: "⬇️" },
        ],
        analyticsTitle: "University-wise Enrollment (Top 5)",
        analyticsType: "bar",
        analyticsData: [
            { label: "OU", value: 18432, color: "#1a3a5c" },
            { label: "JNTUH", value: 14280, color: "#2a5298" },
            { label: "UoH", value: 8420, color: "#4a7abf" },
            { label: "TNOU", value: 6840, color: "#6a96d8" },
            { label: "POU", value: 5120, color: "#8ab4f0" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "State HE annual review: Q4 submission.", time: "Today" },
            { dot: "#2a5298", text: "NEP 2020 implementation status due.", time: "2d ago" },
            { dot: "#1a6b3a", text: "GER improvement targets set for 2027.", time: "5d ago" },
        ],
    },
    "super-admin": {
        greeting: "SIS Operations — system health, users, and configuration.",
        stats: [
            { label: "Active Users", value: "3,284", delta: "+42 this week", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Roles Configured", value: "14", delta: "All active", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "System Uptime", value: "99.8%", delta: "Last 30 days", trend: "up", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Pending Configs", value: "6", delta: "Awaiting review", trend: "neutral", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "Manage Users", nav: "users", icon: "👤", primary: true },
            { label: "Manage Roles", nav: "roles", icon: "🔑", accent: true },
            { label: "System Config", nav: "system-config", icon: "⚙️" },
            { label: "Audit Log", nav: "audit", icon: "🗂️" },
            { label: "Data Quality", nav: "data-quality", icon: "🔍" },
            { label: "Reports", nav: "reports", icon: "📊" },
        ],
        analyticsTitle: "Module Usage (Sessions Today)",
        analyticsType: "bar",
        analyticsData: [
            { label: "Students", value: 1240, color: "#1a3a5c" },
            { label: "Approvals", value: 840, color: "#2a5298" },
            { label: "Reports", value: 620, color: "#4a7abf" },
            { label: "Masters", value: 280, color: "#6a96d8" },
            { label: "Admin", value: 180, color: "#8ab4f0" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "6 system config changes pending review.", time: "Today" },
            { dot: "#2a5298", text: "Maintenance window: 25 Sep 02:00 IST.", time: "2d ago" },
            { dot: "#1a6b3a", text: "All security patches applied successfully.", time: "3d ago" },
        ],
    },
    "state-admin": {
        greeting: "State IT Cell — infrastructure, integrations, and system health.",
        stats: [
            { label: "System Uptime", value: "99.8%", delta: "Last 30 days", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Active Sessions", value: "1,482", delta: "Right now", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "Open Tickets", value: "8", delta: "Support queue", trend: "neutral", color: "text-[#b45309]", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Integrations", value: "12", delta: "All healthy", trend: "up", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "System Health", nav: "system-usage", icon: "📡", primary: true },
            { label: "Users", nav: "users", icon: "👤", accent: true },
            { label: "Integrations", nav: "integrations", icon: "🔗" },
            { label: "Audit Log", nav: "audit", icon: "🗂️" },
            { label: "User Activity", nav: "user-activity", icon: "👁️" },
            { label: "System Config", nav: "system-config", icon: "⚙️" },
        ],
        analyticsTitle: "API Response Times (ms)",
        analyticsType: "bar",
        analyticsData: [
            { label: "Students", value: 120, color: "#1a6b3a" },
            { label: "Auth", value: 85, color: "#1a6b3a" },
            { label: "Reports", value: 340, color: "#e07b1a" },
            { label: "Masters", value: 95, color: "#1a6b3a" },
            { label: "Upload", value: 480, color: "#b91c1c" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "Scheduled maintenance: 25 Sep 02:00 IST.", time: "Today" },
            { dot: "#2a5298", text: "SSL certificates expire in 14 days.", time: "1d ago" },
            { dot: "#1a6b3a", text: "Database backup completed successfully.", time: "3d ago" },
        ],
    },
    auditor: {
        greeting: "State Audit Authority — read-only access to all system records.",
        stats: [
            { label: "Total Records Audited", value: "12,482", delta: "This quarter", trend: "up", color: "text-[#1a3a5c]", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "Discrepancies Found", value: "34", delta: "Under review", trend: "down", color: "text-[#b91c1c]", bg: "bg-red-50", border: "border-red-100" },
            { label: "Audit Reports", value: "18", delta: "Generated Q3", trend: "up", color: "text-[#1a6b3a]", bg: "bg-green-50", border: "border-green-100" },
            { label: "User Actions Logged", value: "4,82,310", delta: "System-wide", trend: "up", color: "text-[#4a6080]", bg: "bg-slate-50", border: "border-slate-100" },
        ],
        actions: [
            { label: "Audit Records", nav: "records", icon: "🗂️", primary: true },
            { label: "User Activity", nav: "user-activity", icon: "👁️", accent: true },
            { label: "Data Quality", nav: "data-quality", icon: "🔍" },
            { label: "Student Records", nav: "students/list", icon: "👤" },
            { label: "Approval History", nav: "approvals", icon: "✅" },
            { label: "Download Logs", nav: "reports", icon: "⬇️" },
        ],
        analyticsTitle: "Audit Findings by Category",
        analyticsType: "donut",
        analyticsData: [
            { label: "Data Entry", value: 14, color: "#1a3a5c" },
            { label: "Doc Missing", value: 12, color: "#e07b1a" },
            { label: "Duplicate", value: 5, color: "#b91c1c" },
            { label: "Other", value: 3, color: "#4a6080" },
        ],
        tableType: "approvals",
        notices: [
            { dot: "#e07b1a", text: "Q3 audit report due by 30 Sep 2026.", time: "Today" },
            { dot: "#2a5298", text: "New audit circular from State AG office.", time: "2d ago" },
            { dot: "#1a6b3a", text: "Previous audit findings resolved: 28 of 34.", time: "5d ago" },
        ],
    },
};
/* ─── Mini bar chart ──────────────────────────────────────────────────── */
function BarChart({ data }) {
    const max = Math.max(...data.map((d) => d.value));
    return (<div className="flex items-end gap-2 h-24 w-full">
      {data.map((d, i) => (<div key={i} className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span className="text-[9px] font-mono text-[#4a6080]">
            {d.value >= 1000 ? `${(d.value / 1000).toFixed(0)}k` : d.value}
          </span>
          <div className="w-full flex items-end" style={{ height: "64px" }}>
            <div className="w-full rounded-sm transition-all" style={{
                height: `${Math.max(6, (d.value / max) * 64)}px`,
                backgroundColor: d.color ?? "#2a5298",
                opacity: 0.85,
            }}/>
          </div>
          <span className="text-[9px] text-[#4a6080] truncate w-full text-center">{d.label}</span>
        </div>))}
    </div>);
}
/* ─── Mini donut chart ────────────────────────────────────────────────── */
function DonutChart({ data }) {
    const total = data.reduce((s, d) => s + d.value, 0);
    const COLORS = ["#1a3a5c", "#e07b1a", "#b91c1c", "#4a6080", "#2a5298", "#1a6b3a"];
    let offset = 0;
    const segments = data.map((d, i) => {
        const pct = d.value / total;
        const seg = { ...d, offset, pct, color: d.color ?? COLORS[i % COLORS.length] };
        offset += pct;
        return seg;
    });
    return (<div className="flex items-center gap-4">
      <svg viewBox="0 0 36 36" className="w-20 h-20 flex-shrink-0 -rotate-90">
        {segments.map((s, i) => {
            const dash = s.pct * 100;
            const gap = 100 - dash;
            const dashOffset = -s.offset * 100;
            return (<circle key={i} r="15.9" cx="18" cy="18" fill="none" stroke={s.color} strokeWidth="4" strokeDasharray={`${dash} ${gap}`} strokeDashoffset={dashOffset}/>);
        })}
        <circle r="12" cx="18" cy="18" fill="white"/>
      </svg>
      <div className="flex flex-col gap-1.5">
        {segments.map((s, i) => (<div key={i} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }}/>
            <span className="text-xs text-[#1a2636]">{s.label}</span>
            <span className="text-xs font-mono font-semibold text-[#4a6080] ml-auto">{s.value}</span>
          </div>))}
      </div>
    </div>);
}
/* ─── Student mini table ─────────────────────────────────────────────── */
const SAMPLE_STUDENTS = [
    { name: "Arjun Ramakrishna", id: "STU-2026-00142", class: "Class 5", level: "Primary", status: "Approved" },
    { name: "Priya Suresh", id: "STU-2026-00143", class: "Class 8", level: "Primary", status: "Pending Verification" },
    { name: "Mohammed Irfan", id: "STU-2026-00144", class: "1st Year · MPC", level: "Intermediate", status: "Submitted" },
    { name: "Shalini Varma", id: "STU-2026-00147", class: "2nd Year · BiPC", level: "Intermediate", status: "Approved" },
    { name: "Kavitha Devi B.", id: "STU-2026-00145", class: "2nd Year", level: "University", status: "Approved" },
    { name: "Ravi Teja G.", id: "STU-2026-00146", class: "Class 10", level: "Primary", status: "Draft" },
];
export default function Dashboard({ role, onNavigate }) {
    const cfg = ROLE_CONFIG[role.id] ?? ROLE_CONFIG["deo"];
    const recentStudents = role.id === "inter-college"
        ? SAMPLE_STUDENTS.filter((student) => student.level === "Intermediate")
        : SAMPLE_STUDENTS.slice(0, 5);
    return (<div className="p-6 space-y-5">

      {/* ── Welcome banner ─────────────────────────────────────────── */}
      <div className="bg-[#0d2137] rounded-sm px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Welcome, {role.label}
          </h1>
          <p className="text-white/60 text-xs mt-0.5 max-w-lg">{cfg.greeting}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-white/40 text-[10px] font-mono">Academic Year 2025–26</span>
            <span className="text-white/20 text-[10px]">·</span>
            <span className="text-white/40 text-[10px] font-mono">{role.org}</span>
          </div>
        </div>
        <div className="hidden md:block text-white/10 text-6xl select-none" style={{ fontFamily: "'DM Serif Display', serif" }}>
          {role.initials}
        </div>
      </div>

      {/* ── KPI stats ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cfg.stats.map((s) => (<div key={s.label} className={`bg-white border rounded-sm p-4 hover:shadow-sm transition-shadow ${s.border}`}>
            <div className="text-[10px] font-semibold text-[#4a6080] uppercase tracking-wide mb-2">{s.label}</div>
            <div className={`text-2xl font-bold ${s.color} mb-1.5`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {s.value}
            </div>
            <div className={`text-[10px] font-medium px-1.5 py-0.5 rounded-sm inline-flex items-center gap-1 ${s.bg} ${s.color}`}>
              {s.trend === "up" ? "↑" : s.trend === "down" ? "↓" : "·"} {s.delta}
            </div>
          </div>))}
      </div>

      {/* ── Quick Actions — full-width below stats ──────────────────── */}
      <div className="bg-white border border-[#c8d6e8] rounded-sm p-4">
        <h2 className="text-xs font-semibold text-[#4a6080] uppercase tracking-wide mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          {cfg.actions.map((a) => (<button key={a.label} onClick={() => onNavigate(a.nav)} className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-sm transition-colors ${a.accent
                ? "bg-[#e07b1a] text-white hover:bg-[#c56b12]"
                : a.primary
                    ? "bg-[#1a3a5c] text-white hover:bg-[#0d2137]"
                    : "bg-white text-[#1a3a5c] border border-[#c8d6e8] hover:bg-[#f0f3f8]"}`}>
              <span className="text-base leading-none">{a.icon}</span>
              {a.label}
            </button>))}
        </div>
      </div>

      {/* ── Analytics + table + notices ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Analytics panel */}
        <div className="bg-white border border-[#c8d6e8] rounded-sm p-5">
          <h2 className="text-sm font-semibold text-[#0d2137] mb-4">{cfg.analyticsTitle}</h2>
          {cfg.analyticsType === "donut"
            ? <DonutChart data={cfg.analyticsData}/>
            : <BarChart data={cfg.analyticsData}/>}
          <div className="mt-3 pt-3 border-t border-[#f0f3f8] flex items-center justify-between">
            <span className="text-[10px] text-[#4a6080]">Academic Year 2025–26</span>
            <button onClick={() => onNavigate("analytics")} className="text-[10px] text-[#2a5298] hover:text-[#e07b1a] font-medium">
              Full Analytics →
            </button>
          </div>
        </div>

        {/* Recent table */}
        <div className="lg:col-span-1 bg-white border border-[#c8d6e8] rounded-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#c8d6e8]">
            <h2 className="text-sm font-semibold text-[#0d2137]">
              {cfg.tableType === "students" ? "Recent Students" : "Recent Approvals"}
            </h2>
            <button onClick={() => onNavigate(cfg.tableType === "students" ? "students/list" : "approvals")} className="text-xs text-[#2a5298] hover:text-[#e07b1a] font-medium transition-colors">
              View All →
            </button>
          </div>
          <div className="divide-y divide-[#f0f3f8]">
            {cfg.tableType === "students"
            ? recentStudents.map((s) => (<div key={s.id} className="px-4 py-3 flex items-center gap-3 hover:bg-[#f8fafd] cursor-pointer transition-colors" onClick={() => onNavigate(`students/profile/${s.id}`)}>
                  <div className="w-7 h-7 rounded-full bg-[#dce6f3] flex items-center justify-center text-[#1a3a5c] text-[10px] font-bold flex-shrink-0">
                    {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#1a2636] truncate">{s.name}</div>
                    <div className="text-[10px] text-[#4a6080] font-mono">{s.class}</div>
                  </div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm flex-shrink-0 ${STATUS_BADGES[s.status]}`}>{s.status}</span>
                </div>))
            : APPROVALS.map((row) => (<div key={row.id} className="px-4 py-3 flex items-center gap-3 hover:bg-[#f8fafd] cursor-pointer transition-colors" onClick={() => onNavigate("approvals")}>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#1a2636] truncate">{row.type}</div>
                    <div className="text-[10px] text-[#4a6080] truncate">{row.entity} · {row.district}</div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm block ${STATUS_BADGES[row.status]}`}>{row.status}</span>
                    <span className="text-[9px] text-[#8090a8] font-mono mt-0.5 block">{row.date}</span>
                  </div>
                </div>))}
          </div>
        </div>

        {/* System Notices */}
        <div className="bg-white border border-[#c8d6e8] rounded-sm">
          <div className="px-4 py-3 border-b border-[#c8d6e8]">
            <h2 className="text-sm font-semibold text-[#0d2137]">System Notices</h2>
          </div>
          <div className="divide-y divide-[#f0f3f8]">
            {cfg.notices.map((n, i) => (<div key={i} className="flex gap-3 px-4 py-3 hover:bg-[#f8fafd] transition-colors">
                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: n.dot }}/>
                <div>
                  <p className="text-xs text-[#1a2636] leading-snug">{n.text}</p>
                  <p className="text-[10px] text-[#4a6080] mt-0.5 font-mono">{n.time}</p>
                </div>
              </div>))}
          </div>
          <div className="px-4 py-3 border-t border-[#f0f3f8]">
            <div className="text-[10px] text-[#4a6080]">
              Logged in as <span className="font-semibold text-[#1a2636]">{role.label}</span> · {role.org}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
