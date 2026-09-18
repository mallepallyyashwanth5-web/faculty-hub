import Link from "next/link";
import { getCourseById, getCourseModules } from "@/lib/fcms/api";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Download, Video, Code, Presentation } from "lucide-react";

export default async function CourseModulesPage({
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

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "slides":
        return Presentation;
      case "video":
        return Video;
      case "code":
        return Code;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href={`/courses/${id}`}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to course overview</span>
      </Link>

      <div className="border-b border-[#232742] pb-4">
        <span className="font-mono text-xs text-violet-400 font-bold">{course.code}</span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
          {course.title} — Modules & Materials
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Weekly lecture slides, assigned papers, code repos, and tutorial recordings.
        </p>
      </div>

      <div className="space-y-6">
        {modules.map((mod) => (
          <div key={mod.id} className="rounded-xl border border-[#232742] bg-[#121422] p-6 space-y-4">
            <div className="border-b border-[#232742]/80 pb-3">
              <span className="text-[10px] font-mono uppercase text-violet-400 font-bold tracking-wider">
                Week {mod.week} Curriculum
              </span>
              <h2 className="text-base font-bold text-white mt-1">{mod.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{mod.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-300">Attached Study Materials</h3>
              <div className="space-y-2">
                {mod.materials.map((mat) => {
                  const Icon = getAssetIcon(mat.type);
                  return (
                    <div
                      key={mat.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#181a2b] border border-[#232742] text-xs hover:border-violet-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-violet-600/15 text-violet-300">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{mat.title}</p>
                          <span className="text-[11px] text-slate-500 uppercase">{mat.type} · {mat.size}</span>
                        </div>
                      </div>

                      <a
                        href={mat.url}
                        className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 font-medium px-2.5 py-1 rounded bg-[#131522] border border-[#232742]"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
