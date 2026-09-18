import Link from "next/link";
import { getQuizById } from "@/lib/fcms/api";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Award, ShieldAlert, ArrowRight } from "lucide-react";

export default async function QuizOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = await getQuizById(id);

  if (!quiz) {
    notFound();
  }

  const completed = !!quiz.userAttempt;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Link
        href="/student/quizzes"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to quizzes</span>
      </Link>

      <div className="rounded-xl border border-[#232742] bg-[#121422] p-8 text-center space-y-6">
        <div>
          <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2.5 py-0.5 text-xs font-mono font-bold text-violet-300">
            {quiz.courseCode}
          </span>
          <h1 className="text-2xl font-bold text-white mt-3">{quiz.title}</h1>
          <p className="text-xs text-slate-400 mt-2 max-w-lg mx-auto">{quiz.description}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 border-y border-[#232742] py-4 text-xs text-slate-400">
          <div>
            <span className="block text-slate-500 text-[11px]">Time Limit</span>
            <strong className="text-white text-sm">{quiz.durationMinutes} Minutes</strong>
          </div>
          <div>
            <span className="block text-slate-500 text-[11px]">Questions</span>
            <strong className="text-white text-sm">{quiz.totalQuestions} Items</strong>
          </div>
          <div>
            <span className="block text-slate-500 text-[11px]">Passing Mark</span>
            <strong className="text-emerald-400 text-sm">{quiz.passingScore}%</strong>
          </div>
        </div>

        <div className="rounded-lg bg-[#181a2b] border border-[#232742] p-4 text-left text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-violet-400 font-semibold">
            <ShieldAlert className="h-4 w-4" />
            <span>Examination Protocol</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Once started, the countdown timer cannot be paused. Submit your answers before time expires.
            Results are graded immediately.
          </p>
        </div>

        <div>
          {completed ? (
            <Link
              href={`/quizzes/${quiz.id}/result`}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg"
            >
              <span>View Your Results ({quiz.userAttempt?.score}%)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={`/quizzes/${quiz.id}/attempt`}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-xs font-bold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/30"
            >
              <span>Begin Timed Examination</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
