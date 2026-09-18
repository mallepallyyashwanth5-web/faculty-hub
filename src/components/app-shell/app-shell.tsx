"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { UserRole } from "@/lib/fcms/types";

interface AppShellProps {
  children: React.ReactNode;
  initialRole?: UserRole;
}

export function AppShell({ children, initialRole = "faculty" }: AppShellProps) {
  const pathname = usePathname();

  let role: UserRole = initialRole;
  if (pathname.startsWith("/admin")) {
    role = "admin";
  } else if (pathname.startsWith("/student")) {
    role = "student";
  } else if (pathname.startsWith("/faculty")) {
    role = "faculty";
  }

  const roleUsers: Record<UserRole, { name: string; department: string }> = {
    admin: { name: "Dr. Eleanor Vance", department: "Academic Administration" },
    faculty: { name: "Prof. Sarah Chen", department: "Computer Science" },
    student: { name: "Alex Rivera", department: "Computer Science (Senior)" },
  };

  const user = roleUsers[role];

  return (
    <div className="min-h-screen bg-[#0d0e15] text-[#f8fafc]">
      <Sidebar currentRole={role} />
      <div className="pl-64 flex flex-col min-h-screen">
        <Topbar
          currentRole={role}
          userName={user.name}
          department={user.department}
        />
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
