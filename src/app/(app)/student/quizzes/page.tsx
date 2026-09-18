import Link from "next/link";
import { getQuizzes } from "@/lib/fcms/api";
import { Layers, Clock, Award, ArrowRight, CheckCircle2 } from "lucide-react";

export default async function StudentQuizzesPage() {
  const quizzes = await getQuizzes();

  return (
    <div className="space-y-6">
      <div className="border-b border-[#232742] pb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Interactive Quizzes & Examinations</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete timed multiple-choice assessments with immediate feedback and scoring.
        </p>
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz) => {
          const completed = !!quiz.userAttempt;
          return (
            <div
              key={quiz.id}
              className="rounded-xl border border-[#232742] bg-[#121422] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-violet-600/20 border border-violet-500/30 px-2 py-0.5 text-[11px] font-mono text-violet-300">
                    {quiz.courseCode}
                  </span>
                  <h3 className="text-sm font-bold text-white">{quiz.title}</h3>
                </div>
                <p className="text-xs text-slate-400 max-w-xl">{quiz.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Duration: {quiz.durationMinutes} mins</span>
                  </span>
                  <span>Questions: <strong className="text-slate-300">{quiz.totalQuestions}</strong></span>
                  <span>Passing score: <strong className="text-slate-300">{quiz.passingScore}%</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 border-[#232742] pt-3 md:pt-0">
                {completed ? (
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Score: {quiz.userAttempt?.score}%</span>
                    </span>
                    <p className="text-[11px] text-slate-500">Passed</p>
                  </div>
                ) : (
                  <span className="text-xs text-amber-400 font-medium">Ready to Attempt</span>
                )}

                <Link
                  href={completed ? `/quizzes/${quiz.id}/result` : `/quizzes/${quiz.id}`}
                  className="rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition-colors flex items-center gap-1"
                >
                  <span>{completed ? "Review Answers" : "Start Quiz"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
