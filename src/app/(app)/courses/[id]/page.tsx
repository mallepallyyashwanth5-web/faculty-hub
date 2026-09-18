import Link from "next/link";
import { getCourseById, getCourseModules } from "@/lib/fcms/api";
import { notFound } from "next/navigation";
import { BookOpen, User, Calendar, MapPin, Layers, ArrowLeft, ArrowRight } from "lucide-react";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  const modules = await getCourseModules(id);

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href="/courses"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to course catalog</span>
      </Link>

      <div className="rounded-xl border border-[#232742] bg-[#121422] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232742] pb-4">
          <div>
            <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2.5 py-0.5 text-xs font-mono font-bold text-violet-300">
              {course.code}
            </span>
            <h1 className="text-2xl font-bold text-white mt-2">{course.title}</h1>
            <p className="text-xs text-violet-400 mt-1">{course.department} · {course.semester}</p>
          </div>

          <Link
            href={`/courses/${course.id}/modules`}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition-colors self-start sm:self-auto"
          >
            <Layers className="h-4 w-4" />
            <span>Open Modules</span>
          </Link>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#232742] pt-4 text-xs text-slate-400">
          <div>
            <span className="text-slate-500 block text-[11px]">Instructor</span>
            <strong className="text-white">{course.facultyName}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Schedule</span>
            <span className="text-slate-200">{course.schedule}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Classroom</span>
            <span className="text-slate-200">{course.location}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Capacity</span>
            <span className="text-emerald-400 font-semibold">{course.enrolledCount} / {course.maxCapacity}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Curriculum Outline ({modules.length} Modules)</h2>
          <Link
            href={`/courses/${course.id}/modules`}
            className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            <span>View all module files</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {modules.map((m) => (
            <div key={m.id} className="rounded-lg border border-[#232742] bg-[#121422] p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-violet-400 font-bold">Week {m.week}</span>
                <h4 className="text-xs font-semibold text-white mt-0.5">{m.title}</h4>
                <p className="text-[11px] text-slate-400">{m.description}</p>
              </div>
              <span className="text-xs text-slate-500">{m.materialsCount} items</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
