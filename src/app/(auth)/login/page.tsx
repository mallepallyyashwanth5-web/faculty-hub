"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // If no backend configured, route to appropriate preview based on email hint
    setTimeout(() => {
      setLoading(false);
      if (email.includes("admin")) {
        router.push("/admin");
      } else if (email.includes("faculty") || email.includes("prof")) {
        router.push("/faculty");
      } else {
        router.push("/student");
      }
    }, 600);
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
        <h1 className="mt-6 text-2xl font-bold text-white tracking-tight">Sign in to your academic portal</h1>
        <p className="mt-2 text-xs text-slate-400">
          Enter credentials or launch via design preview mode
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121422] py-8 px-6 border border-[#232742] rounded-2xl shadow-xl sm:px-10">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-medium text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="faculty.name@facultyhub.edu"
                className="mt-1.5 block w-full rounded-lg border border-[#232742] bg-[#181b2d] px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-slate-300">Password</label>
                <Link href="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="mt-1.5 block w-full rounded-lg border border-[#232742] bg-[#181b2d] px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-colors disabled:opacity-50"
            >
              <LogIn className="h-4 w-4" />
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
            </button>
          </form>

          <div className="mt-6 border-t border-[#232742] pt-4 text-center">
            <p className="text-xs text-slate-400">
              Exploring the interface?{" "}
              <Link href="/dashboard" className="font-medium text-violet-400 hover:text-violet-300">
                Launch Design Preview mode
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">
              Need an account?{" "}
              <Link href="/register" className="font-medium text-slate-200 hover:text-white">
                Register as Student
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
