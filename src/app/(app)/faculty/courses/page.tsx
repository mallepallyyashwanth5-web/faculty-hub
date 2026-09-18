import Link from "next/link";
import { getCourses, getCourseModules } from "@/lib/fcms/api";
import { BookOpen, Plus, FileText, ArrowRight, Layers } from "lucide-react";

export default async function FacultyCoursesPage() {
  const courses = await getCourses();
  const myCourses = courses.filter((c) => c.facultyId === "usr-fac-1");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Course & Module Administration</h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize weekly syllabus modules, distribute lecture slides, and upload lab assets.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {myCourses.map(async (course) => {
          const modules = await getCourseModules(course.id);
          return (
            <div key={course.id} className="rounded-xl border border-[#232742] bg-[#121422] p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232742]/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2 py-0.5 text-xs font-mono font-bold text-violet-300">
                      {course.code}
                    </span>
                    <h2 className="text-base font-bold text-white">{course.title}</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{course.schedule} · {course.location}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/courses/${course.id}/modules`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#232742] bg-[#181a2b] px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-[#20233a] transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5 text-violet-400" />
                    <span>Manage Modules ({modules.length})</span>
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 pt-1">
                {modules.map((mod) => (
                  <div key={mod.id} className="p-3.5 rounded-lg bg-[#181b2d] border border-[#232742] text-xs">
                    <span className="text-[10px] font-mono uppercase text-violet-400 font-bold">Week {mod.week}</span>
                    <h4 className="font-semibold text-white mt-1 leading-snug">{mod.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">{mod.materialsCount} Attached Assets</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
