import Link from "next/link";
import { Users, GraduationCap, BookOpen, Clock, ArrowUpRight, ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import { getCourses, getUsers, getAnnouncements } from "@/lib/fcms/api";

export default async function AdminOverviewPage() {
  const [courses, users, announcements] = await Promise.all([
    getCourses(),
    getUsers(),
    getAnnouncements(),
  ]);

  const facultyCount = users.filter((u) => u.role === "faculty").length;
  const studentCount = users.filter((u) => u.role === "student").length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Administrative Governance</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Institution Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Academic Year 2026-2027 · Semester: Fall 2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/courses"
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-colors"
          >
            + Create New Course
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-lg border border-[#232742] bg-[#141624] px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1a1e32] transition-colors"
          >
            System Settings
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium">Appointed Faculty</span>
            <Users className="h-4 w-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-white">{facultyCount}</div>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <span>All verified & active</span>
          </p>
        </div>

        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium">Registered Students</span>
            <GraduationCap className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{studentCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Undergraduate & Masters</p>
        </div>

        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium">Active Courses</span>
            <BookOpen className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{courses.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Across 2 Departments</p>
        </div>

        <div className="rounded-xl border border-[#232742] bg-[#121422] p-5">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-medium">System Health</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">Optimal</div>
          <p className="text-[11px] text-slate-400 mt-1">Design Preview RLS Active</p>
        </div>
      </div>

      {/* Two column layout: Course overview & Announcements */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Active Curriculum Catalog</h2>
            <Link href="/admin/courses" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
              <span>Manage all courses</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-xl border border-[#232742] bg-[#121422] divide-y divide-[#232742] overflow-hidden">
            {courses.map((course) => (
              <div key={course.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#16182a] transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[11px] font-mono text-violet-300">
                      {course.code}
                    </span>
                    <span className="text-xs font-medium text-white">{course.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Lead Faculty: <span className="text-slate-300">{course.facultyName}</span> · {course.department}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-400">
                    <strong className="text-white">{course.enrolledCount}</strong>/{course.maxCapacity} enrolled
                  </span>
                  <Link
                    href={`/courses/${course.id}`}
                    className="rounded border border-[#232742] bg-[#1a1d30] px-3 py-1 text-slate-300 hover:text-white"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements / Alerts */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-white">Campus Notices</h2>
          <div className="rounded-xl border border-[#232742] bg-[#121422] p-4 space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-3 rounded-lg bg-[#181a2b] border border-[#232742]/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${ann.priority === "urgent" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-violet-500/10 text-violet-300 border border-violet-500/20"}`}>
                    {ann.priority}
                  </span>
                  <span className="text-[10px] text-slate-500">Sept 2026</span>
                </div>
                <h4 className="text-xs font-semibold text-white leading-tight">{ann.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
