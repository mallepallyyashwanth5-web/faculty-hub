"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0e15] flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-violet-600/30">
            FH
          </div>
          <span className="text-xl font-bold text-white tracking-tight">FacultyHub</span>
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-white tracking-tight">Set new credentials</h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121422] py-8 px-6 border border-[#232742] rounded-2xl shadow-xl sm:px-10">
          {done ? (
            <div className="text-center space-y-2">
              <p className="text-sm font-semibold text-emerald-400">Password Updated Successfully</p>
              <p className="text-xs text-slate-400">Redirecting to sign in...</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-slate-300">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="mt-1.5 block w-full rounded-lg border border-[#232742] bg-[#181b2d] px-3.5 py-2 text-xs text-slate-200 focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="mt-1.5 block w-full rounded-lg border border-[#232742] bg-[#181b2d] px-3.5 py-2 text-xs text-slate-200 focus:border-violet-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-lg bg-violet-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-colors"
              >
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
