import Link from "next/link";
import { getAssignmentById } from "@/lib/fcms/api";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, FileText, Upload, CheckCircle2, Award } from "lucide-react";
import { submitAssignmentAction } from "@/lib/fcms/actions";
import { formatDateTime } from "@/lib/utils";

export default async function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const assignment = await getAssignmentById(id);

  if (!assignment) {
    notFound();
  }

  const isSubmitted = !!assignment.submission;

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        href="/student/assignments"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to assignments</span>
      </Link>

      <div className="rounded-xl border border-[#232742] bg-[#121422] p-6 space-y-4">
        <div className="border-b border-[#232742] pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2 py-0.5 text-xs font-mono font-bold text-violet-300">
              {assignment.courseCode}
            </span>
            <span className="text-xs text-slate-400">{assignment.courseTitle}</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">{assignment.title}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-5.5 text-slate-500" />
              <span>Deadline: {formatDateTime(assignment.dueDate)}</span>
            </span>
            <span>Total Points: <strong className="text-white">{assignment.totalPoints}</strong></span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-300">Problem Description & Rubric</h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-[#181a2b] p-4 rounded-lg border border-[#232742]">
            {assignment.description}
          </p>
        </div>

        {/* Submission area */}
        <div className="border-t border-[#232742] pt-5 space-y-3">
          <h3 className="text-xs font-semibold text-white">Your Submission Status</h3>

          {isSubmitted ? (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Submitted on {formatDateTime(assignment.submission!.submittedAt)}</span>
                </div>
                {assignment.submission?.grade && (
                  <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300">
                    Grade: {assignment.submission.grade} / {assignment.totalPoints}
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-300">
                Uploaded archive: <code className="font-mono text-violet-300">{assignment.submission?.fileName}</code>
              </div>

              {assignment.submission?.feedback && (
                <div className="text-xs text-slate-300 bg-[#121422] p-3 rounded border border-[#232742]">
                  <strong className="text-white block mb-1">Faculty Feedback:</strong>
                  {assignment.submission.feedback}
                </div>
              )}
            </div>
          ) : (
            <form action={submitAssignmentAction} className="space-y-3">
              <input type="hidden" name="assignmentId" value={assignment.id} />
              <div className="rounded-lg border-2 border-dashed border-[#232742] bg-[#161828] p-8 text-center">
                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-300 font-medium">Select or drag your archive / PDF submission</p>
                <p className="text-[11px] text-slate-500 mt-1">Accepts .zip, .tar.gz, .pdf up to 50MB</p>
                <input type="file" name="submissionFile" className="mt-4 text-xs text-slate-400" />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-violet-600 py-2.5 px-4 text-xs font-semibold text-white hover:bg-violet-500 transition-colors"
              >
                Submit Assignment Solution
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
