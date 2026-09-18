import Link from "next/link";
import { getCourses } from "@/lib/fcms/api";
import { BookOpen, User, ArrowRight, Search } from "lucide-react";

export default async function CoursesCatalogPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">University Course Catalog</h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse accredited courses, syllabus offerings, and prerequisites.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-[#232742] bg-[#121422] p-5 flex flex-col justify-between hover:border-violet-500/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2 py-0.5 text-xs font-mono font-bold text-violet-300">
                  {c.code}
                </span>
                <span className="text-[11px] text-slate-400">{c.credits} Credits</span>
              </div>
              <h2 className="mt-3 text-sm font-bold text-white">{c.title}</h2>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2">{c.description}</p>
              <div className="mt-4 pt-3 border-t border-[#232742]/70 text-xs text-slate-400 space-y-1">
                <div>Faculty: <strong className="text-slate-300">{c.facultyName}</strong></div>
                <div>Department: <span className="text-slate-300">{c.department}</span></div>
                <div>Schedule: <span className="text-slate-300">{c.schedule}</span></div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#232742] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                <strong className="text-white">{c.enrolledCount}</strong>/{c.maxCapacity} Seats
              </span>
              <Link
                href={`/courses/${c.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300"
              >
                <span>View Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
