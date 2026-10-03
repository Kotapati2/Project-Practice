import { useState } from "react";
const CREDENTIALS = {
    "school.user": "school-user",
    "meo.officer": "meo",
    "deo.ernakulam": "deo",
    "primary.head": "primary-head",
    "inter.college": "inter-college",
    "dieo.officer": "dieo",
    "inter.state": "inter-state",
    "uni.college": "uni-college",
    "uni.user": "uni-user",
    "vc.osmania": "vc",
    "state.higher": "state-higher",
    "superadmin": "super-admin",
    "state.admin": "state-admin",
    "auditor": "auditor",
};
export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    function handleLogin(e) {
        e.preventDefault();
        if (!username || !password) {
            setError("Please enter username and password.");
            return;
        }
        const roleId = CREDENTIALS[username.trim().toLowerCase()];
        if (!roleId || password !== "Pass@123") {
            setError("Invalid username or password. Please try again.");
            return;
        }
        setLoading(true);
        setError("");
        setTimeout(() => {
            setLoading(false);
            onLogin(roleId);
        }, 800);
    }
    return (<div className="min-h-screen flex bg-[#f0f3f8]" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0d2137] p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 8 }).map((_, i) => (<div key={i} className="absolute border border-white rounded-full" style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                top: "50%",
                left: "30%",
                transform: "translate(-50%, -50%)",
            }}/>))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded bg-[#e07b1a] flex items-center justify-center text-white font-bold text-sm">SIS</div>
            <div>
              <div className="text-white font-semibold text-base leading-tight">Student Information System</div>
              <div className="text-white/40 text-xs mt-0.5">Government of State</div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Unified Education<br />Management Portal
            </h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              A comprehensive platform for managing student records, academic workflows, approvals, and reporting across Primary, Intermediate, and University education.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {[
            { num: "4,82,931", label: "Students Enrolled" },
            { num: "1,247", label: "Institutions" },
            { num: "13", label: "User Roles" },
            { num: "40", label: "Workflows" },
        ].map((s) => (<div key={s.label} className="bg-white/5 border border-white/10 rounded px-4 py-3">
                <div className="text-[#e07b1a] font-bold text-lg leading-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.num}</div>
                <div className="text-white/50 text-xs mt-1">{s.label}</div>
              </div>))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2">
            {["Primary Education", "Intermediate", "University", "Administration"].map((tag) => (<span key={tag} className="text-white/40 text-xs border border-white/10 rounded-full px-3 py-1">{tag}</span>))}
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded bg-[#e07b1a] flex items-center justify-center text-white font-bold text-sm">SIS</div>
            <div className="font-semibold text-[#0d2137]">Student Information System</div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>Sign in to SIS</h2>
            <p className="text-[#4a6080] text-sm mt-1">Use your government credentials to access the portal.</p>
          </div>

          {error && (<div className="mb-4 bg-red-50 border border-red-200 rounded px-4 py-3 flex items-start gap-2">
              <span className="text-red-500 text-sm mt-0.5">⚠</span>
              <p className="text-red-700 text-sm">{error}</p>
            </div>)}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">Username / Employee ID</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="w-full border border-[#c8d6e8] rounded px-3 py-2.5 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] focus:ring-1 focus:ring-[#2a5298]/20 bg-white"/>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1a2636] mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full border border-[#c8d6e8] rounded px-3 py-2.5 pr-10 text-sm text-[#1a2636] placeholder-[#a0b0c8] focus:outline-none focus:border-[#2a5298] focus:ring-1 focus:ring-[#2a5298]/20 bg-white"/>
                <button type="button" onClick={() => setShowPw((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a6080] text-xs hover:text-[#1a3a5c]">
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-3.5 h-3.5 accent-[#1a3a5c]"/>
                <span className="text-xs text-[#4a6080]">Remember me</span>
              </label>
              <button type="button" className="text-xs text-[#2a5298] hover:text-[#e07b1a] transition-colors">
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-semibold py-2.5 rounded text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? (<>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Signing in…
                </>) : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#c8d6e8]">
            <p className="text-xs text-[#4a6080] text-center">
              For access issues contact your District System Administrator
            </p>
            <p className="text-xs text-[#4a6080] text-center mt-1">
              Helpdesk: <span className="text-[#2a5298]">1800-XXX-XXXX</span>
            </p>
          </div>

          {/* Demo credentials hint */}
          <details className="mt-4">
            <summary className="text-xs text-[#4a6080] cursor-pointer hover:text-[#2a5298] select-none">
              Demo credentials (click to expand)
            </summary>
            <div className="mt-3 bg-[#f0f3f8] border border-[#c8d6e8] rounded p-3">
              <p className="text-xs text-[#4a6080] mb-2">Password for all accounts: <span className="font-mono font-semibold text-[#1a3a5c]">Pass@123</span></p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                {Object.entries({
            "school.user": "School User",
            "meo.officer": "MEO",
            "deo.ernakulam": "DEO",
            "primary.head": "Primary Head",
            "inter.college": "Inter. College",
            "dieo.officer": "DIEO",
            "inter.state": "Inter. State",
            "uni.college": "Uni. College",
            "uni.user": "University User",
            "vc.osmania": "Vice-Chancellor",
            "state.higher": "State Higher Edu.",
            "superadmin": "Super Admin",
            "state.admin": "State Admin",
            "auditor": "Auditor",
        }).map(([u, label]) => (<div key={u} className="flex items-baseline gap-1">
                    <span className="font-mono text-[10px] text-[#2a5298]">{u}</span>
                    <span className="text-[10px] text-[#8090a8]">— {label}</span>
                  </div>))}
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>);
}
