"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  ClipboardList,
  CalendarCheck,
  Award,
  Settings,
  Layers,
  LogOut,
} from "lucide-react";
import { UserRole } from "@/lib/fcms/types";

interface SidebarProps {
  currentRole: UserRole;
}

export function Sidebar({ currentRole }: SidebarProps) {
  const pathname = usePathname();

  const navByRole: Record<UserRole, { label: string; href: string; icon: LucideIcon }[]> = {
    admin: [
      { label: "Overview", href: "/admin", icon: LayoutDashboard },
      { label: "Faculty Directory", href: "/admin/faculty", icon: Users },
      { label: "Student Registry", href: "/admin/students", icon: GraduationCap },
      { label: "Curriculum & Courses", href: "/admin/courses", icon: BookOpen },
      { label: "System Settings", href: "/admin/settings", icon: Settings },
    ],
    faculty: [
      { label: "Teaching Hub", href: "/faculty", icon: LayoutDashboard },
      { label: "My Courses & Modules", href: "/faculty/courses", icon: BookOpen },
      { label: "Assignments & Rubrics", href: "/faculty/assignments", icon: ClipboardList },
      { label: "Attendance Tracker", href: "/faculty/attendance", icon: CalendarCheck },
      { label: "Gradebook & Evaluation", href: "/faculty/grades", icon: Award },
    ],
    student: [
      { label: "Study Desk", href: "/student", icon: LayoutDashboard },
      { label: "Enrolled Courses", href: "/student/courses", icon: BookOpen },
      { label: "Assignments", href: "/student/assignments", icon: ClipboardList },
      { label: "Quizzes & Tests", href: "/student/quizzes", icon: Layers },
      { label: "Grades & GPA", href: "/student/grades", icon: Award },
      { label: "Attendance Record", href: "/student/attendance", icon: CalendarCheck },
    ],
  };

  const currentNav = navByRole[currentRole] || navByRole.student;

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#232742] bg-[#0f111c]">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-[#232742] px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 font-bold text-white shadow-md shadow-violet-500/20">
          FH
        </div>
        <div>
          <span className="font-semibold tracking-tight text-white">FacultyHub</span>
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-mono">FCMS 2026</span>
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        {currentNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? "bg-violet-600/15 text-violet-300 border border-violet-500/30"
                  : "text-slate-400 hover:bg-[#181a29] hover:text-slate-200"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-violet-400" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Academic Portal
        </div>
        <Link
          href="/courses"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
            pathname.startsWith("/courses")
              ? "bg-violet-600/15 text-violet-300 border border-violet-500/30"
              : "text-slate-400 hover:bg-[#181a29] hover:text-slate-200"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Course Catalog</span>
        </Link>
        <Link
          href="/profile"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
            pathname === "/profile"
              ? "bg-violet-600/15 text-violet-300 border border-violet-500/30"
              : "text-slate-400 hover:bg-[#181a29] hover:text-slate-200"
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>My Profile</span>
        </Link>
      </div>

      {/* Footer info */}
      <div className="border-t border-[#232742] p-4 bg-[#0d0e17]">
        <div className="rounded-lg border border-[#232742] bg-[#141624] p-3 text-xs text-slate-400">
          <div className="flex items-center justify-between font-medium text-slate-300">
            <span>Design Preview</span>
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
            FCMS is running in preview mode. Supabase credentials can be connected via .env.local.
          </p>
        </div>
        <Link
          href="/"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#232742] py-2 text-xs font-medium text-slate-300 hover:bg-[#1e2238] transition-colors"
        >
          <LogOut className="h-3.5 w-3.5 text-slate-400" />
          <span>Exit to Landing</span>
        </Link>
      </div>
    </aside>
  );
}
