import Link from "next/link";
import { BookOpen, ClipboardList, CalendarCheck, Award, ArrowUpRight, Clock, Plus } from "lucide-react";
import { getCourses, getAssignments, getAttendance } from "@/lib/fcms/api";

export default async function FacultyDashboardPage() {
  const [courses, assignments, attendance] = await Promise.all([
    getCourses(),
    getAssignments(),
    getAttendance(),
  ]);

  const facultyCourses = courses.filter((c) => c.facultyId === "usr-fac-1");
  const pendingGradingCount = assignments.reduce((acc, curr) => acc + (curr.submissionsCount - curr.gradedCount), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Instructor Console · Prof. Sarah Chen
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">Teaching Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Department of Computer Science · Fall 2026 Term
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/faculty/assignments"
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-colors"
          >
            + Create Assignment
          </Link>
          <Link
            href="/faculty/attendance"
            className="rounded-lg border border-[#232742] bg-[#141624] px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1a1e32] transition-colors"
          >
            Mark Attendance
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Assigned Courses</span>
            <BookOpen className="h-4 w-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white">{facultyCourses.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">80 total students</p>
        </div>

        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Pending Submissions</span>
            <ClipboardList className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">{pendingGradingCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Awaiting evaluation</p>
        </div>

        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Attendance Logs</span>
            <CalendarCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">96.2%</div>
          <p className="text-[11px] text-emerald-400 mt-1">Average lecture presence</p>
        </div>

        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Course GPA Mean</span>
            <Award className="h-4 w-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white">3.74</div>
          <p className="text-[11px] text-slate-400 mt-1">Out of 4.00 maximum</p>
        </div>
      </div>

      {/* Courses teaching list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">My Active Lecture Sections</h2>
          <Link href="/faculty/courses" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
            <span>Manage modules & syllabus</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {facultyCourses.map((c) => (
            <div key={c.id} className="rounded-xl border border-[#232742] bg-[#121422] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2.5 py-0.5 text-xs font-mono font-bold text-violet-300">
                    {c.code}
                  </span>
                  <span className="text-xs text-slate-400">{c.schedule}</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{c.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#232742] flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  <strong className="text-white">{c.enrolledCount}</strong> enrolled
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/courses/${c.id}/modules`}
                    className="rounded-lg border border-[#232742] bg-[#181a2c] px-3 py-1.5 text-slate-200 hover:bg-[#20233b]"
                  >
                    View Modules
                  </Link>
                  <Link
                    href={`/faculty/attendance`}
                    className="rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-1.5 text-violet-300 hover:bg-violet-600/30"
                  >
                    Attendance
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
