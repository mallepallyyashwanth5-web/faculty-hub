import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Users, Award, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Background glowing aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-violet-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300 mb-8 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          <span>Faculty Course Management System · 2026 Academic Edition</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight md:leading-tight">
          Precision management for the modern academic institution.
        </h1>

        <p className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          FacultyHub unifies curriculum delivery, grading workflows, assignments, interactive quizzes, and attendance tracking into an editorial, high-performance portal.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 hover:bg-violet-500 transition-all"
          >
            <span>Launch Design Preview</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-xl border border-[#232742] bg-[#141624] px-6 py-3.5 text-sm font-medium text-slate-200 hover:bg-[#1c2035] transition-colors"
          >
            <BookOpen className="h-4 w-4 text-slate-400" />
            <span>Explore Course Catalog</span>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-[#232742] bg-transparent px-6 py-3.5 text-sm font-medium text-slate-300 hover:bg-[#141624] transition-colors"
          >
            <span>Sign In</span>
          </Link>
        </div>

        {/* Quick Highlights Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#232742] pt-8 text-left">
          <div className="p-4 rounded-xl border border-[#232742]/60 bg-[#121422]/50">
            <p className="text-2xl font-bold text-white">3 Roles</p>
            <p className="text-xs text-slate-400 mt-1">Admin, Faculty, and Student distinct consoles</p>
          </div>
          <div className="p-4 rounded-xl border border-[#232742]/60 bg-[#121422]/50">
            <p className="text-2xl font-bold text-white">Full RLS</p>
            <p className="text-xs text-slate-400 mt-1">Role-guarded row level security & server actions</p>
          </div>
          <div className="p-4 rounded-xl border border-[#232742]/60 bg-[#121422]/50">
            <p className="text-2xl font-bold text-white">Interactive</p>
            <p className="text-xs text-slate-400 mt-1">Quizzes with instant evaluation & rubrics</p>
          </div>
          <div className="p-4 rounded-xl border border-[#232742]/60 bg-[#121422]/50">
            <p className="text-2xl font-bold text-white">Zero Setup</p>
            <p className="text-xs text-slate-400 mt-1">Zero-credential design preview mode</p>
          </div>
        </div>
      </div>
    </section>
  );
}
