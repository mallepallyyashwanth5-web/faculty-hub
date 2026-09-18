import { getAttendance } from "@/lib/fcms/api";
import { CalendarCheck, Check, X, Clock, AlertCircle } from "lucide-react";

export default async function FacultyAttendancePage() {
  const records = await getAttendance();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Lecture Attendance Tracker</h1>
          <p className="text-xs text-slate-400 mt-1">
            Record, audit, and export student attendance logs across course sections.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#232742] bg-[#121422] overflow-hidden">
        <div className="p-4 border-b border-[#232742] flex items-center justify-between">
          <span className="text-xs font-semibold text-white">Course: CS-301 · Advanced Distributed Systems</span>
          <span className="text-xs text-slate-400">Session Date: Sept 16, 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-[#232742] bg-[#10121d] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Student</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Quick Mark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232742]">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-[#16192a] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white">{r.studentName}</td>
                  <td className="py-3.5 px-4 text-slate-400">{r.date}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                        r.status === "present"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : r.status === "late"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button className="p-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20">
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1 rounded bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20">
                        <Clock className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
