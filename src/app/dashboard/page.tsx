import Link from "next/link";
import { ShieldCheck, UserCheck, GraduationCap, ArrowRight, Sparkles, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const roles = [
    {
      title: "Administrator Console",
      role: "admin",
      href: "/admin",
      color: "border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5",
      badge: "Institutional Governance",
      badgeClass: "text-amber-400 border-amber-500/20 bg-amber-500/10",
      icon: ShieldCheck,
      description: "Manage university faculty, student rosters, courses, department allocations, and system registration policies.",
    },
    {
      title: "Faculty Member Portal",
      role: "faculty",
      href: "/faculty",
      color: "border-violet-500/30 hover:border-violet-500/60 bg-violet-500/5",
      badge: "Teaching & Course Delivery",
      badgeClass: "text-violet-400 border-violet-500/20 bg-violet-500/10",
      icon: UserCheck,
      description: "Manage weekly curriculum modules, distribute files, publish assignments, record lecture attendance, and calculate course gradebooks.",
    },
    {
      title: "Student Study Desk",
      role: "student",
      href: "/student",
      color: "border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/5",
      badge: "Learner Workspace",
      badgeClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      icon: GraduationCap,
      description: "View enrolled subjects, submit homework projects, take timed interactive quizzes, review attendance, and monitor cumulative grades.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0e15] text-[#f8fafc] flex flex-col justify-between">
      <header className="border-b border-[#232742] bg-[#10121e] px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-white">
              FH
            </div>
            <span className="font-semibold text-white tracking-tight">FacultyHub</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="text-xs text-slate-300 hover:text-white transition-colors"
            >
              Public Course Catalog
            </Link>
            <div className="h-4 w-[1px] bg-[#232742]" />
            <Link
              href="/login"
              className="text-xs text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-medium text-violet-300 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Design Preview Mode Active</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Select an academic role to enter
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-lg mx-auto">
            Experience FacultyHub from any perspective without requiring database credentials.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.role}
                href={r.href}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-all hover:scale-[1.02] ${r.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-[#141626] border border-[#232742]">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className={`text-[10px] font-semibold border rounded-full px-2 py-0.5 ${r.badgeClass}`}>
                      {r.badge}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white">{r.title}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{r.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#232742]/80 flex items-center justify-between text-xs font-semibold text-white">
                  <span>Open Console</span>
                  <ArrowRight className="h-4 w-4 text-violet-400" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl border border-[#232742] bg-[#111322] p-5 text-center text-xs text-slate-400">
          <p className="text-slate-300 font-medium">Have a configured Supabase database?</p>
          <p className="mt-1">
            Apply <code className="text-violet-300 font-mono">supabase/schema.sql</code> and configure{" "}
            <code className="text-violet-300 font-mono">NEXT_PUBLIC_SUPABASE_URL</code> in{" "}
            <code className="text-violet-300 font-mono">.env.local</code> for real-time Postgres and authentication.
          </p>
        </div>
      </main>

      <footer className="border-t border-[#232742] py-4 bg-[#090a0f] text-center text-xs text-slate-500">
        FacultyHub FCMS · Preview Sandbox
      </footer>
    </div>
  );
}
