Absolutely. I’ll treat this as the **final Figma handoff specification**: workflow-based, role-based, with navigation, screen contents, fields, actions, states, validation, approval flows, and the relationship to the 54 backend tables.

One important point before the specification: **the 54 tables are not 54 screens**. The UI is organized around SIS workflows, while multiple tables work behind each workflow. The source specification explicitly defines the 54-table scope, education hierarchies, student structures, cascading behavior, APIs, and validation rules.  

# SIS — FINAL FIGMA UI/UX SPECIFICATION

## 1. Overall Application Structure

The application should use a consistent desktop government-application layout.

```text
┌──────────────────────────────────────────────────────────────────┐
│ SIS LOGO     Academic Year ▼       🔔 Notifications   User ▼    │
├───────────────┬──────────────────────────────────────────────────┤
│               │                                                  │
│ SIDEBAR       │              MAIN CONTENT                        │
│               │                                                  │
│ Dashboard     │              Breadcrumb                          │
│               │              Page Title                          │
│ Education     │              Content                             │
│ Students      │                                                  │
│ Institutions  │                                                  │
│ Reports       │                                                  │
│ Masters       │                                                  │
│ Administration│                                                  │
│               │                                                  │
└───────────────┴──────────────────────────────────────────────────┘
```

### Global header

Every authenticated screen should contain:

* SIS logo
* Application name
* Academic Year selector
* Notifications
* Help
* User name
* Role
* Profile dropdown
* Logout

### Global sidebar

The sidebar is **role-dependent**.

Common items:

```text
Dashboard
Students
Education
Institutions
Approvals
Reports & Analytics
Masters
Location
Bank
Administration
```

Users should only see modules they are authorized to use.

---

# 2. GLOBAL DESIGN SYSTEM

Figma should create these components before designing individual screens.

## Buttons

### Primary

* Save
* Submit
* Approve
* Add
* Continue

### Secondary

* Cancel
* Back
* Clear
* Reset

### Destructive

* Delete where permitted
* Reject
* Deactivate

### Other

* View
* Edit
* Download
* Upload
* Export
* Send Back

---

## Status badges

Use consistent badges:

```text
Draft
Submitted
Pending Verification
Approved
Rejected
Returned
Active
Inactive
Verified
Not Verified
```

---

## Common table component

Every listing table should support:

* Search
* Filters
* Sort
* Pagination
* Column actions
* Row selection where required
* View
* Edit
* Deactivate
* Export where applicable

---

## Common modal components

Create reusable:

* Delete confirmation
* Deactivate confirmation
* Approve confirmation
* Reject confirmation
* Send Back confirmation
* Unsaved changes
* Success
* Error
* Session timeout

---

# 3. SCREEN 01 — LOGIN

### Purpose

Authenticate SIS users.

### Layout

Left:

* Government/SIS branding
* Application description

Right:

* Login form

### Fields

* Username / Email
* Password

### Controls

* Show password
* Remember me
* Forgot password
* Login

### Error states

```text
Invalid username or password
Account is inactive
Account is locked
Session expired
```

### Navigation

```text
Login
 ↓
Dashboard
```

---

# 4. SCREEN 02 — DASHBOARD

The dashboard changes according to the user's role and organization scope.

### Header cards

Examples:

* Total Students
* Active Students
* Pending Applications
* Pending Approvals
* Approved
* Returned for Correction
* Total Institutions
* Data Completion %

### Charts

* Student enrollment
* Students by education level
* Gender distribution
* District-wise enrollment
* Attendance
* Application status
* Data-quality indicators

### Quick actions

For operational users:

```text
Register Student
View Students
Pending Approvals
Upload Documents
View Reports
```

### Role behavior

A School User sees their school's information.

MEO sees schools under their Mandal.

DEO sees the district.

State authorities see statewide information.

This follows the role scopes specified in the roles document. 

---

# 5. SCREEN 03 — USER PROFILE

### Sections

**Personal Information**

* Name
* User ID
* Email
* Mobile

**Role Information**

* Role
* Organization
* Scope
* Location

**Security**

* Change Password
* Last Login

### Actions

* Edit Profile
* Change Password

---

# PRIMARY EDUCATION

# 6. SCREEN 04 — PRIMARY EDUCATION HIERARCHY

This is **one hierarchy management workflow**, not multiple screens.

The source hierarchy is:

```text
State
 ↓
Region
 ↓
Zonal
 ↓
District
 ↓
Mandal
 ↓
Village/Town
 ↓
Management
 ↓
School
```



### Layout

Left:

```text
State
 ├─ Region
 │   └─ Zonal
 │       └─ District
 │           └─ Mandal
 │               └─ Village/Town
 │                   └─ School
```

Right:

Selected entity details.

### Details

* Code
* Name
* Parent
* Status
* Created Date
* Number of child records

### Actions

* Add
* Edit
* View
* Activate
* Deactivate

---

# 7. SCREEN 05 — PRIMARY SCHOOL MANAGEMENT

### Filters

* State
* Region
* Zonal
* District
* Mandal
* Village/Town
* Management
* Status

### Table

| Column        |
| ------------- |
| School Code   |
| School Name   |
| Management    |
| Village/Town  |
| Mandal        |
| District      |
| Student Count |
| Status        |
| Actions       |

### Add/Edit School

Fields:

* School Code *
* School Name *
* Management *
* State *
* Region *
* Zonal *
* District *
* Mandal *
* Village/Town *
* Address
* Status

### Cascading behavior

```text
State → Region → Zonal → District → Mandal → Village/Town
```

Child dropdowns disabled until the parent is selected. Changing a parent clears downstream values. 

---

# 8. SCREEN 06 — STUDENT MANAGEMENT

This is the main student listing/search screen.

### Filters

* Academic Year
* Education Level
* State
* District
* Institution
* Class/Year
* Application Status
* Verification Status

### Search

Search by:

* Student Name
* Student ID
* Admission Number
* Mobile
* Identity number where permitted

### Table

| Column             |
| ------------------ |
| Photo              |
| Student ID         |
| Student Name       |
| Admission Number   |
| Education          |
| Class/Year         |
| Institution        |
| Application Status |
| Verification       |
| Actions            |

### Actions

* View
* Edit
* Documents
* Verify
* View History

---

# 9. SCREEN 07 — STUDENT REGISTRATION: BASIC DETAILS

This is the beginning of the **multi-step student-registration workflow**.

### Step navigation

```text
01 Basic
02 Education
03 Family
04 Address
05 Bank
06 Income
07 Skills & Activities
08 Disability
09 Documents
10 Review
```

### Student photo

* Upload photo
* Preview
* Replace

### Personal details

* First Name *
* Full Name *
* Surname
* Father's Name *
* Date of Birth *
* Gender *
* Blood Group
* Caste
* Sub Caste
* Religion
* Nationality
* Mother Tongue
* Identity Mark 1
* Identity Mark 2

### Contact

* Mobile
* Alternate Mobile
* Email

### Identity

* Aadhaar / Identity Number
* Other identity details

These fields are based on the `students` structure in the source specification. 

### Buttons

```text
Save Draft
Continue
Cancel
```

---

# 10. SCREEN 08 — STUDENT REGISTRATION: EDUCATION

### Current education

* Education Level *
* Year/Class *
* Course
* Institution Type *
* Institution *
* Medium of Instruction
* Start Year
* End Year
* Result Status

### Education hierarchy

The available controls depend on education level.

### Education history

Table:

| Level | Class/Year | Course | Institution | Start | End | Result | Actions |
| ----- | ---------- | ------ | ----------- | ----- | --- | ------ | ------- |

Buttons:

* Add Education
* Edit
* Remove

The underlying education history structure includes education level, year level, course, institution, medium and years. 

---

# 11. SCREEN 09 — STUDENT REGISTRATION: FAMILY & GUARDIAN

Use sections within one workflow step.

## Family

* Relationship
* Name
* Mobile
* Occupation
* Aadhaar/identity number

## Guardian

* Guardian Name
* Relationship
* Mobile
* Email
* Occupation
* Address
* Primary Guardian

## Emergency Contact

* Contact Name
* Relationship
* Mobile
* Alternate Mobile
* Address
* Primary

The source defines family, guardian and emergency-contact structures separately, but these belong together in the student workflow.  

---

# 12. SCREEN 10 — STUDENT REGISTRATION: ADDRESS

### Address tabs

```text
Present Address
Permanent Address
```

### Structured location

```text
State
 ↓
District
 ↓
Sub Division
 ↓
Mandal/Taluka
 ↓
Village/City/Town
 ↓
Pincode
```

### Address fields

* Address Line 1
* Address Line 2
* State
* District
* Sub Division
* Mandal/Taluka
* Village/City/Town
* Pincode

The source explicitly requires this common student-location hierarchy. 

---

# 13. SCREEN 11 — STUDENT REGISTRATION: BANK

### Bank cascade

```text
Bank
 ↓
Bank State
 ↓
Bank City
 ↓
Branch
```

### Fields

* Bank
* Bank State
* Bank City
* Branch
* Account Holder Name
* Account Number
* PAN

### Bank document

* Document Type
* Document Number
* Upload
* Verification Status

The source defines Bank → Bank State → City → Branch. 

---

# 14. SCREEN 12 — STUDENT REGISTRATION: INCOME

### Fields

* Income Range
* Income Certificate Number
* Issue Date
* Expiry Date
* Upload Certificate

### Status

* Pending Verification
* Verified
* Rejected

---

# 15. SCREEN 13 — STUDENT REGISTRATION: SKILLS & ACTIVITIES

This can remain part of the same registration workflow.

### Skills

* Skill Type
* Proficiency Level

### Sports

* Sport
* Participation Level
* Achievement Details

### Other Activities

* Activity
* Achievement Details

The corresponding skill, sports and other-activity structures are defined in the specification.  

---

# 16. SCREEN 14 — STUDENT REGISTRATION: DISABILITY

### Fields

* Has Disability? Yes/No
* Disability Type
* Disability Details
* Certificate Number
* Certificate Upload

If **No**, disability-specific fields remain hidden.

---

# 17. SCREEN 15 — STUDENT REGISTRATION: DOCUMENTS

### Document categories

```text
Identity
Academic
Address
Income
Bank
Photo
Other
```

### Upload component

* Document Type
* Document Number
* Issue Date
* Upload File

### Document table

| Document | Number | Uploaded | Verification | Action |
| -------- | ------ | -------- | ------------ | ------ |

Actions:

* Preview
* Replace
* Remove
* Verify

The source specifies identity, academic, address, bank, photo and other document structures.   

---

# 18. SCREEN 16 — STUDENT REGISTRATION: REVIEW & SUBMIT

### Summary cards

```text
Personal Information       ✓
Education                  ✓
Family & Guardian          ✓
Address                    ✓
Bank                       ✓
Income                     ✓
Skills & Activities        ✓
Disability                 ✓
Documents                  ✓
```

Every section has:

**View / Edit**

### Declaration

Checkbox:

> I confirm that the information provided is correct.

### Buttons

* Save Draft
* Submit
* Back

### Submit confirmation

```text
Are you sure you want to submit this student application?

After submission, the application will move to verification.
```

### Status

```text
Draft
 ↓
Submitted
 ↓
Pending Verification
 ↓
Approved / Returned
```

---

# 19. SCREEN 17 — STUDENT PROFILE

This is the **single consolidated student view**.

### Header

* Photo
* Student Name
* Student ID
* Admission Number
* Education Level
* Institution
* Application Status
* Verification Status

### Tabs

```text
Overview
Personal
Education
Family
Address
Bank
Income
Skills & Activities
Disability
Documents
Verification
History
```

This is where multiple backend tables are presented as **one coherent student record**.

---

# 20. SCREEN 18 — ATTENDANCE & CLASS MANAGEMENT

### Filters

* Academic Year
* Institution
* Class/Year
* Section
* Date

### Class management

* Class
* Section
* Student count

### Attendance

| Student | Roll No | Present | Absent | Leave |
| ------- | ------- | ------- | ------ | ----- |

### Summary

* Total
* Present
* Absent
* Leave
* Attendance %

---

# 21. SCREEN 19 — DOCUMENT VERIFICATION

### Filters

* Education Level
* Institution
* District
* Document Type
* Verification Status
* Date

### Table

| Student | Document | Number | Date | Status | Action |
| ------- | -------- | ------ | ---- | ------ | ------ |

### Preview

Right-side document preview panel.

### Actions

* Verify
* Reject
* Send Back
* Add Remarks

---

# 22. SCREEN 20 — PRIMARY APPROVAL / REVIEW

### Approval dashboard

Cards:

* Pending
* Approved
* Returned
* Data Issues

### Queue

| Submission | School | Mandal | District | Date | Status | Action |
| ---------- | ------ | ------ | -------- | ---- | ------ | ------ |

### Review

Show:

* Student information
* Education
* Documents
* Verification
* Previous history

### Actions

Depending on role:

* Approve
* Send Back
* Reject where applicable
* Add Remarks
* View History

MEOs verify school submissions and can send corrections back; DEOs perform district-level verification/approval; the Primary Education Head has statewide monitoring and approval responsibilities. 

---

# 23. SCREEN 21 — PRIMARY REPORTS & ANALYTICS

### Filters

* Academic Year
* State
* District
* Mandal
* School
* Class
* Gender
* Category

### Reports

* Enrollment
* School-wise students
* District-wise students
* Gender
* Attendance
* Data completion
* Verification
* Application status

### Actions

* View
* Export Excel
* Export PDF

---

# INTERMEDIATE EDUCATION

# 24. SCREEN 22 — INTERMEDIATE HIERARCHY & INSTITUTES

### Cascade

```text
State
 ↓
District
 ↓
City/Town
 ↓
Diploma / Regular
 ↓
Government / Private
 ↓
Institute
 ↓
Course
```

This is the specified Intermediate flow. 

### Institute listing

Columns:

* Institute Code
* Institute Name
* Category
* Management
* City
* District
* Status
* Actions

### Add/Edit

Fields:

* Institute Code
* Institute Name
* Category
* Management
* State
* District
* City
* Address
* Status

---

# 25. SCREEN 23 — INTERMEDIATE STUDENT MANAGEMENT

### Filters

* Academic Year
* State
* District
* City
* Institute
* Diploma/Regular
* Course
* Year
* Status

### Table

* Student
* Admission Number
* Institute
* Course
* Year
* Status
* Verification
* Actions

### Actions

* View
* Edit
* Documents
* Verification

---

# 26. SCREEN 24 — INTERMEDIATE ACADEMIC MANAGEMENT

Tabs:

```text
Courses
Streams
Sections
Lecturers
Students
Attendance
Academic Information
```

The Intermediate College User role includes these operational functions. 

### Course form

* Course Code
* Course Name
* Education Level
* Year Level
* Duration
* Status

---

# 27. SCREEN 25 — INTERMEDIATE APPROVAL & REPORTS

Use tabs:

```text
Approvals
Reports
Analytics
```

### DIEO

* District colleges
* Pending submissions
* Data quality
* Attendance
* Academic statistics

### State Authority

* Statewide enrollment
* Attendance
* Academic performance
* College comparison
* Data quality

The roles document specifically assigns these responsibilities to DIEO and Intermediate State Authority. 

---

# UNIVERSITY EDUCATION

# 28. SCREEN 26 — UNIVERSITY / COLLEGE HIERARCHY

### Cascade

```text
State
 ↓
District
 ↓
City / Location
 ↓
Government / Affiliated / Private
 ↓
UG / PG
 ↓
College
 ↓
Course
```



### College listing

Columns:

* College Code
* College Name
* Management
* Program Level
* City
* District
* Status
* Actions

---

# 29. SCREEN 27 — UNIVERSITY STUDENT MANAGEMENT

### Filters

* Academic Year
* University
* College
* State
* District
* City
* UG/PG
* Program
* Course
* Year
* Status

### Table

* Student
* College
* Program
* Course
* Year
* Status
* Verification
* Actions

---

# 30. SCREEN 28 — UNIVERSITY ACADEMIC MANAGEMENT

Tabs:

```text
Departments
Programs
Courses
Sections
Faculty
Students
Attendance
Academic Records
Examination
```

The University College User role includes departments, programs, courses, sections, faculty, attendance, academic records and documents. 

---

# 31. SCREEN 29 — UNIVERSITY APPROVAL & REPORTS

### University User

Can:

* View affiliated colleges
* Manage programs
* Manage courses
* Monitor enrollment
* Monitor academic information
* Verify college submissions
* Generate analytics

### Vice-Chancellor

High-level read/approval dashboard:

* Colleges
* Departments
* Students
* Faculty
* Academic performance
* Examination statistics
* Reports awaiting approval

### State Higher Education Authority

* University comparison
* College comparison
* Statewide statistics
* KPIs
* University performance
* State reports

These role responsibilities are explicitly defined in the source. 

---

# COMMON REFERENCE MANAGEMENT

# 32. SCREEN 30 — MASTER MANAGEMENT

This is **one screen/workspace**, not 17 screens.

### Left menu

```text
Gender
Blood Group
Caste
Religion
Nationality
Mother Tongue
Education Level
Year Level
Medium of Instruction
State
Income
Relationship
Occupation
Bank
Skill Type
Sports
Other
```

The source identifies these as the 17 reusable master/reference tables. 

### Main area

Example:

```text
Gender Master

Search                         + Add Gender

------------------------------------------------
ID | Gender Name | Status | Actions
------------------------------------------------
```

### Actions

* Add
* Edit
* Activate
* Deactivate
* Search
* Filter

### Caste

Show:

```text
Caste
 ↓
Sub Caste
```

### Education Year

Show:

```text
Education
 ↓
Primary
 ↓
Class 1
 ↓
Class 2
...
```

---

# 33. SCREEN 31 — LOCATION MANAGEMENT

### One cascading workspace

```text
State
 ↓
District
 ↓
Sub Division
 ↓
Mandal/Taluka
 ↓
Village/City/Town
 ↓
Pincode
```

### Left

Hierarchy tree.

### Right

Selected location details.

### Actions

* Add
* Edit
* View
* Activate
* Deactivate

The source specifies these common geography levels and says State and District must not be duplicated across education modules. 

---

# 34. SCREEN 32 — BANK MANAGEMENT

### Cascade

```text
Bank
 ↓
Bank State
 ↓
Bank City
 ↓
Branch
 ↓
Branch Services
```

### Bank listing

* Bank Code
* Bank Name
* Status

### Branch listing

* Branch Code
* Branch Name
* IFSC
* Bank
* Bank State
* Bank City
* Address
* Status

### Branch services

* Service Name
* Available
* Status

The source defines bank state, city, branch and branch-service structures. 

---

# 35. SCREEN 33 — INSTITUTION MANAGEMENT

This is useful as a consolidated administration screen for institution information.

Tabs:

```text
Primary Schools
Intermediate Institutes
University Colleges
Contacts
Addresses
```

### Contact

* Institution
* Contact Person
* Phone
* Email
* Website

### Address

* Address Line 1
* Address Line 2
* State
* District
* City
* Pincode

The source defines reusable institution contact and address structures. 

---

# 36. SCREEN 34 — USER MANAGEMENT

### User listing

| User ID | Name | Role | Organization | Location | Status | Last Login | Actions |
| ------- | ---- | ---- | ------------ | -------- | ------ | ---------- | ------- |

### Add User

* Name
* Username
* Email
* Mobile
* Role
* Education Module
* Organization
* State
* District
* Mandal
* Institution
* Status

### Actions

* View
* Edit
* Activate
* Deactivate
* Reset Password

The SIS Super Administrator and State System Administrator have user-management responsibilities. 

---

# 37. SCREEN 35 — ROLES & PERMISSIONS

### Role list

```text
School User
MEO
DEO
Primary Education Head

Intermediate College User
DIEO
Intermediate State Authority

College User
University User
Vice-Chancellor
State Higher Education Authority

SIS Super Administrator
State System Administrator
Auditor
```

### Permission matrix

```text
                    View  Create  Edit  Approve  Deactivate
Students              ✓      ✓      ✓      -        -
Attendance             ✓      ✓      ✓      -        -
Documents              ✓      ✓      ✓      ✓        -
Approvals              ✓      -      -      ✓        -
Reports                ✓      -      -      -        -
Masters                ✓      ✓      ✓      -        ✓
Users                  ✓      ✓      ✓      -        ✓
Audit                   ✓      -      -      -        -
```

Actual permissions should be configured according to each role's scope.

---

# 38. SCREEN 36 — ORGANIZATION HIERARCHY

### Visual tree

```text
State
 ├── District
 │    ├── Mandal
 │    │    └── Schools
 │    └── Colleges
 └── Universities
      └── Colleges
```

### Details panel

* Organization name
* Organization type
* Parent
* Code
* Location
* Status
* Users
* Children

### Actions

* Add
* Edit
* Activate
* Deactivate

---

# 39. SCREEN 37 — AUDIT LOGS

Auditor and administrators can access this.

### Filters

* Date From
* Date To
* User
* Role
* Module
* Action
* Record
* Status

### Table

| Date/Time | User | Module | Action | Record | Status |
| --------- | ---- | ------ | ------ | ------ | ------ |

### Audit detail

Show:

```text
User
Role
Date/Time
Module
Record
Action

Previous Value
New Value

IP / Activity Information
```

Auditors are explicitly read-only and can track changes, approvals and user activities. 

---

# 40. SCREEN 38 — SYSTEM CONFIGURATION

For Super Administrator.

### Sections

```text
Academic Year
Application Settings
Security
Notifications
File Upload Settings
Workflow Settings
Integration Settings
```

### Actions

* Save
* Update
* Activate/Deactivate configuration

The Super Administrator is responsible for system configuration, security configuration and integration configuration. 

---

# 41. SCREEN 39 — NOTIFICATIONS / TASKS

This should be accessible through the notification icon and optionally as a page.

### Categories

```text
Approvals
Corrections
Documents
System
Announcements
```

### Notification

```text
Student application #12345
has been submitted for verification.

[View]
```

### Actions

* Mark as read
* View
* Clear

---

# 42. SCREEN 40 — COMMON SEARCH / DATA QUALITY

This can be used by MEO, DEO, State Authorities and administrators.

### Search

Search across permitted:

* Students
* Institutions
* Applications
* Documents

### Data-quality indicators

* Duplicate records
* Missing mandatory information
* Invalid references
* Pending verification
* Incomplete applications

MEO and DEO roles explicitly include identifying duplicates/inconsistencies and monitoring data quality. 

---

# FINAL SCREEN COUNT

With the full workflow defined, I would now use **40 Figma page/workflow screens**, but many of these contain tabs, steps and reusable components.

This is different from saying there are 40 database-related screens.

### Main workflow

```text
01 Login
02 Dashboard
03 Profile

PRIMARY
04 Primary Hierarchy
05 Primary Schools
06 Student Management
07 Student Registration - Basic
08 Student Registration - Education
09 Student Registration - Family
10 Student Registration - Address
11 Student Registration - Bank
12 Student Registration - Income
13 Student Registration - Skills
14 Student Registration - Disability
15 Student Registration - Documents
16 Student Registration - Review
17 Student Profile
18 Attendance/Class
19 Document Verification
20 Primary Approval
21 Primary Reports

INTERMEDIATE
22 Intermediate Hierarchy/Institutes
23 Intermediate Students
24 Intermediate Academics
25 Intermediate Approval/Reports

UNIVERSITY
26 University Hierarchy
27 University Students
28 University Academics
29 University Approval/Reports

COMMON
30 Masters
31 Location
32 Bank
33 Institution
34 Users
35 Roles/Permissions
36 Organization
37 Audit
38 System Configuration
39 Notifications
40 Data Quality/Search
```

### But for Figma organization, I would group them as:

```text
📁 00 Design System
📁 01 Authentication
📁 02 Dashboard
📁 03 Primary Education
📁 04 Intermediate Education
📁 05 University Education
📁 06 Student Management
📁 07 Common Reference
📁 08 Administration
📁 09 Reports
📁 10 Approval Workflows
📁 11 Empty/Error/Loading States
```

---

# MOST IMPORTANT: ROLE-BASED NAVIGATION

The same application should **not show the same sidebar to every user**.

### School User

```text
Dashboard
Students
  ├── Student List
  ├── Register Student
  └── Student Profile
Attendance
Classes & Sections
Documents
Reports
Profile
```

The School User's permitted functions are student management, personal information, guardians, attendance, classes/sections, documents, teachers and school reports. 

### MEO

```text
Dashboard
Schools
Students
Teachers
Approvals
Data Quality
Attendance Monitoring
Reports
Profile
```

### DEO

```text
Dashboard
District Schools
Mandals
Students
Approvals
Data Quality
Analytics
Reports
Users
Profile
```

### Primary Education Head

```text
Dashboard
Districts
Mandals
Schools
Students
Approvals
Data Quality
State Analytics
Reports
Profile
```

### Intermediate College User

```text
Dashboard
Students
Courses / Streams
Sections
Lecturers
Attendance
Academics
Documents
Reports
Profile
```

### DIEO

```text
Dashboard
Colleges
Students
Approvals
Attendance
Academic Statistics
Data Quality
Reports
Profile
```

### Intermediate State Authority

```text
Dashboard
Colleges
Districts
Enrollment
Attendance
Academic Performance
Data Quality
Analytics
Reports
Profile
```

### University College User

```text
Dashboard
Students
Departments
Programs
Courses
Sections
Faculty
Attendance
Academic Records
Documents
Reports
Profile
```

### University User

```text
Dashboard
Universities / Colleges
Programs
Courses
Students
Academic Information
Approvals
Reports
Analytics
Profile
```

### Vice-Chancellor

```text
Dashboard
Colleges
Departments
Students
Faculty
Academic Performance
Examination
Reports
Approvals
Strategic Analytics
Profile
```

### State Higher Education Authority

```text
Dashboard
Universities
Colleges
Students
KPIs
University Comparison
Performance
State Reports
Analytics
Profile
```

### Super Administrator

```text
Dashboard
Users
Roles & Permissions
Organization
Masters
Location
Bank
System Configuration
Integrations
Audit Logs
Reports
```

### State System Administrator

```text
Dashboard
Users
Organization
Data Quality
System Usage
Reports
Audit
Profile
```

### Auditor

```text
Dashboard
Records
Reports
Audit Logs
Approvals
User Activity
Profile
```

The role definitions and scopes come from the supplied roles specification. 

---

# FINAL STUDENT JOURNEY FOR FIGMA

This should be one of the most important prototypes in Figma:

```text
Login
  ↓
Dashboard
  ↓
Students
  ↓
Student Management
  ↓
+ Register Student
  ↓
Basic Details
  ↓
Education
  ↓
Family & Guardian
  ↓
Address
  ↓
Bank
  ↓
Income
  ↓
Skills & Activities
  ↓
Disability
  ↓
Documents
  ↓
Review
  ↓
Submit
  ↓
Success
  ↓
Student Profile
```

Then:

```text
Student Submitted
        ↓
Pending Verification
        ↓
MEO / Appropriate Authority
        ↓
Review
   ↙          ↘
Approve     Send Back
               ↓
        School Correction
               ↓
           Resubmit
```

Then higher-level review proceeds according to the applicable education authority.

---

# FINAL CASCADING FLOWS TO SHOW IN FIGMA

These should actually be demonstrated in the prototype, because they are a core SIS behavior.

### Primary

```text
State
 ↓
Region
 ↓
Zonal
 ↓
District
 ↓
Mandal
 ↓
Village/Town
 ↓
Management
 ↓
School
```

### Intermediate

```text
State
 ↓
District
 ↓
City/Town
 ↓
Diploma/Regular
 ↓
Government/Private
 ↓
Institute
 ↓
Course
```

### University

```text
State
 ↓
District
 ↓
City/Location
 ↓
Government/Affiliated/Private
 ↓
UG/PG
 ↓
College
 ↓
Course
```

### Student Address

```text
State
 ↓
District
 ↓
Sub Division
 ↓
Mandal/Taluka
 ↓
Village/City/Town
 ↓
Pincode
```

### Bank

```text
Bank
 ↓
Bank State
 ↓
Bank City
 ↓
Branch
```

### Caste

```text
Caste
 ↓
Sub Caste
```

These are the hierarchies specified in the SIS document. 

---

# FIGMA STATES THAT MUST BE DESIGNED

For the major screens, don't give Figma only the successful state.

Create variants for:

### Loading

```text
Loading students...
```

### Empty

```text
No students found.
Try changing your filters.
```

### Error

```text
Unable to load student information.
[Retry]
```

### Validation

```text
Please select a district.
```

### Success

```text
Student registered successfully.
```

### Permission

```text
You don't have permission to perform this action.
```

### Inactive

```text
This record is inactive.
```

### Pending

```text
Pending Verification
```

### Returned

```text
Returned for Correction
Reason: Missing address proof
```

The source specifically requires loading, empty and error states for cascading data and API-driven dropdowns. 

---

# 54 TABLES → UI WORKFLOW PRINCIPLE

This is the rule I would put at the **very top of the Figma handoff document**:

> **Do not design one UI screen for each database table. Database tables are implementation structures. UI screens must represent SIS business workflows and user tasks. Multiple tables should be combined into a single logical screen or multi-step workflow wherever they represent one user operation.**

For example:

```text
STUDENT REGISTRATION
│
├── students
├── student_admission_details
├── student_education_history
├── family_details
├── student_guardian_details
├── student_emergency_contact_details
├── student_contact_details
├── student_address_details
├── bank_details
├── student_income_details
├── student_income_certificate_details
├── student_skill_details
├── student_sports_details
├── student_other_activity_details
├── student_disability_details
├── student_document_details
├── student_identity_document_details
├── student_academic_document_details
├── student_address_document_details
├── student_bank_document_details
├── student_photo_document_details
├── student_verification_details
└── student_application_status_history
```

All of those support **one student journey**, not 20+ unrelated screens. The supplied specification defines these tables and their relationships to the student. 

That is the approach I recommend you give to the Figma designer. It will produce a **real SIS application prototype**, rather than a collection of CRUD screens that merely mirror the database.
