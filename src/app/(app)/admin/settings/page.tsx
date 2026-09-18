import { Settings, Shield, Database, Lock, CheckCircle2 } from "lucide-react";
import { SupabaseSchemaManager } from "@/components/admin/SupabaseSchemaManager";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[#232742] pb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">System & Institutional Policies</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure academic terms, registration switches, and database parameters.
        </p>
      </div>

      <div className="space-y-6">
        {/* Term Configuration */}
        <div className="rounded-xl border border-[#232742] bg-[#121422] p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Settings className="h-4 w-4 text-violet-400" />
            <span>Academic Cycle Settings</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Active Academic Term</label>
              <input
                type="text"
                defaultValue="Fall 2026"
                className="w-full rounded-lg border border-[#232742] bg-[#181a2b] px-3.5 py-2 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Grading Deadline</label>
              <input
                type="date"
                defaultValue="2026-12-20"
                className="w-full rounded-lg border border-[#232742] bg-[#181a2b] px-3.5 py-2 text-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Enrollment & Access Policies */}
        <div className="rounded-xl border border-[#232742] bg-[#121422] p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-400" />
            <span>Registration & Access Controls</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#181a2b] border border-[#232742]">
              <div>
                <p className="font-medium text-white">Public Student Self-Registration</p>
                <p className="text-slate-400 text-[11px]">
                  Governed by NEXT_PUBLIC_FCMS_ALLOW_REGISTRATION environment variable.
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-emerald-400 text-[11px] font-semibold">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#181a2b] border border-[#232742]">
              <div>
                <p className="font-medium text-white">First Registered Account Elevation</p>
                <p className="text-slate-400 text-[11px]">
                  Automatic admin role bootstrapping via Postgres trigger in supabase/schema.sql.
                </p>
              </div>
              <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-violet-400 text-[11px] font-semibold">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Supabase Database & Tables Schema Manager */}
        <SupabaseSchemaManager />
      </div>
    </div>
  );
}
