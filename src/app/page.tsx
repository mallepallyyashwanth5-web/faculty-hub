import { Hero } from "@/components/landing/hero";
import { RoleCards } from "@/components/landing/role-cards";
import { Features } from "@/components/landing/features";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0e15] text-[#f8fafc]">
      {/* Top navigation header */}
      <header className="sticky top-0 z-50 border-b border-[#232742] bg-[#0d0e15]/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-white shadow-md shadow-violet-600/30">
              FH
            </div>
            <span className="font-semibold text-white tracking-tight">FacultyHub</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/courses"
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Course Catalog
            </Link>
            <Link
              href="/dashboard"
              className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              Design Preview
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <RoleCards />
        <Features />
      </main>

      <footer className="border-t border-[#232742] py-8 bg-[#090a0f] text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FacultyHub FCMS. All academic consoles operational.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/dashboard" className="hover:text-slate-200">Role Selector</Link>
            <Link href="/courses" className="hover:text-slate-200">Courses</Link>
            <Link href="/login" className="hover:text-slate-200">Portal Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
