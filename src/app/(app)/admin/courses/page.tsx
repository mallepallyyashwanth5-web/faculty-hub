import Link from "next/link";
import { getCourses } from "@/lib/fcms/api";
import { BookOpen, Plus, Clock, Users, ArrowUpRight } from "lucide-react";

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Curriculum & Course Offerings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Oversee active academic courses, capacity allocations, and faculty assignments.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-xl border border-[#232742] bg-[#121422] p-5 flex flex-col justify-between hover:border-violet-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-violet-600/20 border border-violet-500/30 px-2 py-0.5 text-xs font-mono font-semibold text-violet-300">
                  {course.code}
                </span>
                <span className="text-[11px] text-slate-400">{course.credits} Credits</span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-white leading-snug">{course.title}</h3>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2">{course.description}</p>

              <div className="mt-4 space-y-1.5 border-t border-[#232742]/80 pt-3 text-xs text-slate-400">
                <div>Faculty: <strong className="text-slate-300 font-medium">{course.facultyName}</strong></div>
                <div>Schedule: <span className="text-slate-300">{course.schedule}</span></div>
                <div>Location: <span className="text-slate-300">{course.location}</span></div>
              </div>
            </div>

            <div className="mt-5 border-t border-[#232742] pt-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                <strong className="text-emerald-400">{course.enrolledCount}</strong>/{course.maxCapacity} Enrolled
              </span>
              <Link
                href={`/courses/${course.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300"
              >
                <span>Modules</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
