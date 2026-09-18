import Link from "next/link";
import { BookOpen, ClipboardList, Layers, Award, CalendarCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { getCourses, getAssignments, getQuizzes, getGrades } from "@/lib/fcms/api";

export default async function StudentDashboardPage() {
  const [courses, assignments, quizzes, grades] = await Promise.all([
    getCourses(),
    getAssignments(),
    getQuizzes(),
    getGrades(),
  ]);

  const studentGrade = grades.find((g) => g.studentId === "usr-stu-1");

  return (
    <div className="space-y-8">
      {/* Student Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Learner Workspace · Alex Rivera
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">My Study Desk</h1>
          <p className="text-xs text-slate-400 mt-1">
            Senior Year · B.S. Computer Science · Fall 2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/student/quizzes"
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-colors"
          >
            Take Pending Quiz
          </Link>
          <Link
            href="/student/assignments"
            className="rounded-lg border border-[#232742] bg-[#141624] px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1a1e32] transition-colors"
          >
            My Assignments
          </Link>
        </div>
      </div>

      {/* Highlights metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Registered Courses</span>
            <BookOpen className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{courses.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">11 total credit hours</p>
        </div>

        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Cumulative GPA</span>
            <Award className="h-4 w-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-violet-400">3.92</div>
          <p className="text-[11px] text-emerald-400 mt-1">Dean&apos;s Honor List</p>
        </div>

        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Upcoming Deadlines</span>
            <ClipboardList className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">2</div>
          <p className="text-[11px] text-amber-400 mt-1">Due next week</p>
        </div>

        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Attendance Rate</span>
            <CalendarCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">95.0%</div>
          <p className="text-[11px] text-slate-400 mt-1">19 of 20 lectures attended</p>
        </div>
      </div>

      {/* Courses in progress */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-white">My Active Courses</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div key={c.id} className="rounded-xl border border-[#232742] bg-[#121422] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2 py-0.5 text-xs font-mono font-bold text-violet-300">
                    {c.code}
                  </span>
                  <span className="text-xs text-slate-400">{c.credits} Credits</span>
                </div>
                <h3 className="mt-2.5 text-sm font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-xs text-slate-400">{c.facultyName} · {c.schedule}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#232742] flex items-center justify-between">
                <Link
                  href={`/courses/${c.id}/modules`}
                  className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1"
                >
                  <span>Open Class Modules</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-[11px] text-emerald-400">Current Grade: A</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
