import Link from "next/link";
import { getAssignments } from "@/lib/fcms/api";
import { ClipboardList, Plus, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function FacultyAssignmentsPage() {
  const assignments = await getAssignments();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Assignments & Submissions</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review student submissions, configure grading rubrics, and release marks.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {assignments.map((asg) => (
          <div
            key={asg.id}
            className="rounded-xl border border-[#232742] bg-[#121422] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-violet-500/30 transition-colors"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2 py-0.5 text-[11px] font-mono text-violet-300">
                  {asg.courseCode}
                </span>
                <h3 className="text-sm font-bold text-white">{asg.title}</h3>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1">{asg.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Due: {formatDate(asg.dueDate)}</span>
                </span>
                <span>Total Points: <strong className="text-slate-300">{asg.totalPoints}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-6 border-t md:border-t-0 border-[#232742] pt-3 md:pt-0">
              <div className="text-right">
                <p className="text-xs text-slate-400">
                  Submissions: <strong className="text-white">{asg.submissionsCount}</strong>
                </p>
                <p className="text-[11px] text-emerald-400">
                  Graded: {asg.gradedCount}/{asg.submissionsCount}
                </p>
              </div>

              <Link
                href={`/assignments/${asg.id}`}
                className="rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition-colors flex items-center gap-1.5"
              >
                <span>Evaluate</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
