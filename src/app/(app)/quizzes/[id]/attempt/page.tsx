"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockQuizzes } from "@/lib/fcms/api";
import { Clock, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";

export default function QuizAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const quiz = mockQuizzes.find((q) => q.id === id) || mockQuizzes[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = quiz.questions[currentIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSelectOption = (index: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: index });
  };

  const handleSubmitQuiz = () => {
    setSubmitting(true);
    setTimeout(() => {
      router.push(`/quizzes/${quiz.id}/result`);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Timer Bar */}
      <div className="flex items-center justify-between rounded-xl border border-[#232742] bg-[#121422] p-4">
        <div>
          <span className="font-mono text-xs text-violet-400 font-bold">{quiz.courseCode}</span>
          <h2 className="text-sm font-bold text-white leading-tight">{quiz.title}</h2>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[#1a1d30] border border-[#232742] px-3.5 py-1.5 text-xs font-mono font-bold text-amber-400">
          <Clock className="h-4 w-4" />
          <span>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Question {currentIndex + 1} of {quiz.totalQuestions}</span>
          <span>{Object.keys(selectedAnswers).length} Answered</span>
        </div>
        <div className="h-1.5 w-full bg-[#181a2b] rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quiz.totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-xl border border-[#232742] bg-[#121422] p-6 space-y-6">
        <h3 className="text-base font-semibold text-white leading-relaxed">
          {currentQ.prompt}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedAnswers[currentQ.id] === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(i)}
                className={`w-full text-left p-4 rounded-xl border text-xs font-medium transition-all flex items-center gap-3 ${
                  isSelected
                    ? "bg-violet-600/20 border-violet-500 text-white shadow-md shadow-violet-500/10"
                    : "bg-[#181a2b] border-[#232742] text-slate-300 hover:bg-[#20233b]"
                }`}
              >
                <span
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                    isSelected
                      ? "bg-violet-600 text-white border-violet-400"
                      : "bg-[#121422] text-slate-400 border-[#232742]"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between border-t border-[#232742] pt-4">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          {currentIndex === quiz.questions.length - 1 ? (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmitQuiz}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{submitting ? "Evaluating..." : "Submit Examination"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.min(quiz.questions.length - 1, prev + 1))}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition-colors"
            >
              <span>Next Question</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
