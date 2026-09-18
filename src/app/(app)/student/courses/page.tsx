import Link from "next/link";
import { getCourses } from "@/lib/fcms/api";
import { BookOpen, ArrowRight, User } from "lucide-react";

export default async function StudentCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <div className="border-b border-[#232742] pb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Enrolled Courses</h1>
        <p className="text-xs text-slate-400 mt-1">
          Access weekly syllabus materials, lecture recordings, and module assets.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-xl border border-[#232742] bg-[#121422] p-5 flex flex-col justify-between hover:border-violet-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2 py-0.5 text-xs font-mono font-bold text-violet-300">
                  {course.code}
                </span>
                <span className="text-[11px] text-slate-400">{course.credits} Credits</span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-white">{course.title}</h3>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2">{course.description}</p>
              <div className="mt-4 pt-3 border-t border-[#232742]/70 text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-500" />
                  <span>{course.facultyName}</span>
                </div>
                <div>{course.schedule}</div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#232742] flex items-center justify-between">
              <Link
                href={`/courses/${course.id}`}
                className="text-xs text-slate-300 hover:text-white"
              >
                Syllabus
              </Link>
              <Link
                href={`/courses/${course.id}/modules`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300"
              >
                <span>Modules</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
