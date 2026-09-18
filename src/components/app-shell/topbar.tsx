"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ShieldCheck, UserCheck, GraduationCap, Search, LogOut } from "lucide-react";
import { UserRole } from "@/lib/fcms/types";

interface TopbarProps {
  currentRole: UserRole;
  userName: string;
  department: string;
}

export function Topbar({ currentRole, userName, department }: TopbarProps) {
  const pathname = usePathname();

  const roleMeta = {
    admin: { label: "Admin Console", icon: ShieldCheck, badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    faculty: { label: "Faculty Portal", icon: UserCheck, badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
    student: { label: "Student Console", icon: GraduationCap, badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  };

  const meta = roleMeta[currentRole];
  const Icon = meta.icon;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#232742] bg-[#10121d]/90 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${meta.badgeColor}`}>
          <Icon className="h-3.5 w-3.5" />
          <span>{meta.label}</span>
        </div>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            suppressHydrationWarning
            placeholder="Search courses, materials, students..."
            className="h-9 w-64 rounded-lg border border-[#232742] bg-[#161928] pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-violet-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="rounded-lg border border-[#232742] bg-[#161928] px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-[#1e2238] transition-colors"
          >
            Switch Role
          </Link>
        </div>

        <button
          suppressHydrationWarning
          className="relative rounded-lg p-2 text-slate-400 hover:bg-[#1e2238] hover:text-slate-200 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500" />
        </button>

        <div className="h-4 w-[1px] bg-[#232742]" />

        <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            {userName.charAt(0)}
          </div>
          <div className="hidden text-left lg:block">
            <p className="text-xs font-medium text-slate-200">{userName}</p>
            <p className="text-[11px] text-slate-400">{department}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
