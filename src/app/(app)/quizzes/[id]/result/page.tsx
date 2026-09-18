import Link from "next/link";
import { getQuizById } from "@/lib/fcms/api";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Award, BookOpen, AlertCircle } from "lucide-react";

export default async function QuizResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = await getQuizById(id);

  if (!quiz) {
    notFound();
  }

  const userScore = quiz.userAttempt?.score ?? 100;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link
        href="/student/quizzes"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to quizzes</span>
      </Link>

      {/* Result score header */}
      <div className="rounded-xl border border-[#232742] bg-[#121422] p-8 text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <Award className="h-8 w-8" />
        </div>

        <div>
          <span className="text-xs text-slate-400">Examination Results Evaluated</span>
          <h1 className="text-2xl font-bold text-white mt-1">{quiz.title}</h1>
        </div>

        <div className="text-4xl font-black text-emerald-400 font-mono">
          {userScore}%
        </div>
        <p className="text-xs text-slate-400">
          Status: <strong className="text-emerald-400">Passed</strong> · Minimum required: {quiz.passingScore}%
        </p>
      </div>

      {/* Detailed Question Review */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white">Answer Review & Explanations</h2>

        {quiz.questions.map((q, idx) => (
          <div key={q.id} className="rounded-xl border border-[#232742] bg-[#121422] p-5 space-y-3">
            <div className="flex items-start gap-2">
              <span className="rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] px-1.5 py-0.5 mt-0.5">
                Q{idx + 1}
              </span>
              <h3 className="text-xs font-semibold text-white leading-relaxed">{q.prompt}</h3>
            </div>

            <div className="space-y-1.5 pt-1">
              {q.options.map((opt, optIdx) => {
                const isCorrect = optIdx === q.correctAnswer;
                return (
                  <div
                    key={optIdx}
                    className={`p-2.5 rounded-lg text-xs flex items-center justify-between border ${
                      isCorrect
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-[#161828] border-[#232742] text-slate-400"
                    }`}
                  >
                    <span>{opt}</span>
                    {isCorrect && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Correct Answer</span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg bg-[#181a2b] border border-[#232742] p-3 text-[11px] text-slate-400">
              <strong className="text-violet-300 block mb-0.5">Instructor Explanation:</strong>
              {q.explanation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
