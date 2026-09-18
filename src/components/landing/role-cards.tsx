import Link from "next/link";
import { ShieldCheck, UserCheck, GraduationCap, ArrowRight } from "lucide-react";

export function RoleCards() {
  const roles = [
    {
      role: "Admin Console",
      target: "/admin",
      color: "from-amber-500/20 to-amber-600/5 border-amber-500/30 text-amber-400",
      buttonColor: "hover:border-amber-500/40 text-amber-300",
      icon: ShieldCheck,
      description:
        "Institute-wide governance, faculty promotion, student enrollment status, curriculum creation, and system configuration.",
      highlights: ["Faculty appointments & approvals", "Departmental course offerings", "Global registration policy controls"],
    },
    {
      role: "Faculty Portal",
      target: "/faculty",
      color: "from-violet-500/20 to-violet-600/5 border-violet-500/30 text-violet-400",
      buttonColor: "hover:border-violet-500/40 text-violet-300",
      icon: UserCheck,
      description:
        "Comprehensive course management, syllabus and weekly module publishing, assignments, attendance logs, and gradebook calculation.",
      highlights: ["Module & material distribution", "Attendance logging per lecture", "Assignment grading & feedback"],
    },
    {
      role: "Student Console",
      target: "/student",
      color: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400",
      buttonColor: "hover:border-emerald-500/40 text-emerald-300",
      icon: GraduationCap,
      description:
        "Unified study desk with registered modules, homework submission dropboxes, timed interactive quizzes, attendance stats, and GPA overview.",
      highlights: ["Interactive timed quizzes & results", "Assignment submission tracking", "Live attendance percentage metric"],
    },
  ];

  return (
    <section className="py-16 border-t border-[#232742] bg-[#0f111c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Role-tailored experience for every stakeholder
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Select a console below to enter directly via Design Preview mode, or log in with credentials.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.role}
                className={`rounded-2xl border bg-gradient-to-b ${r.color} p-6 flex flex-col justify-between transition-all hover:scale-[1.01]`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#141626] border border-[#232742]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Preview Ready</span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">{r.role}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{r.description}</p>

                  <ul className="mt-4 space-y-2 border-t border-[#232742]/50 pt-4">
                    {r.highlights.map((h) => (
                      <li key={h} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#232742]">
                  <Link
                    href={r.target}
                    className={`inline-flex items-center justify-between w-full rounded-xl border border-[#232742] bg-[#141624] px-4 py-2.5 text-xs font-semibold ${r.buttonColor} transition-colors`}
                  >
                    <span>Enter {r.role}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
