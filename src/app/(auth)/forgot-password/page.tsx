"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
        <h1 className="mt-6 text-2xl font-bold text-white tracking-tight">Reset password</h1>
        <p className="mt-2 text-xs text-slate-400">
          We&apos;ll send recovery instructions to your institutional inbox
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121422] py-8 px-6 border border-[#232742] rounded-2xl shadow-xl sm:px-10">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-sm font-semibold text-white">Instructions Dispatched</h2>
              <p className="text-xs text-slate-400">
                If an account exists for {email}, a recovery link has been generated.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex items-center gap-2 text-xs text-violet-400 hover:text-violet-300"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to sign in</span>
              </Link>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-slate-300">Registered Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@facultyhub.edu"
                  className="mt-1.5 block w-full rounded-lg border border-[#232742] bg-[#181b2d] px-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-violet-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-lg bg-violet-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-colors"
              >
                Send Recovery Link
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
