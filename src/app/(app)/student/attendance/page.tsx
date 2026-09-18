import { getAttendance } from "@/lib/fcms/api";
import { CalendarCheck, CheckCircle2 } from "lucide-react";

export default async function StudentAttendancePage() {
  const allAttendance = await getAttendance();
  const myAttendance = allAttendance.filter((a) => a.studentId === "usr-stu-1");

  return (
    <div className="space-y-6">
      <div className="border-b border-[#232742] pb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Attendance Record</h1>
        <p className="text-xs text-slate-400 mt-1">
          Historical log of lecture session attendance across all enrolled courses.
        </p>
      </div>

      <div className="rounded-xl border border-[#232742] bg-[#121422] p-6 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400">Total Recorded Lectures</span>
          <div className="text-3xl font-bold text-white mt-1">{myAttendance.length} Sessions</div>
        </div>
        <div className="text-right">
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            <span>Attendance Above Institutional Requirement (&gt;75%)</span>
          </span>
          <p className="text-[11px] text-slate-400 mt-1">Status: Good Standing</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#232742] bg-[#121422] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-[#232742] bg-[#10121d] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Course</th>
                <th className="py-3.5 px-4 font-semibold">Session Date</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232742]">
              {myAttendance.map((rec) => (
                <tr key={rec.id} className="hover:bg-[#16192a] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white">
                    <span className="font-mono text-violet-400 mr-2">{rec.courseCode}</span>
                    {rec.courseTitle}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{rec.date}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium border ${
                        rec.status === "present"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : rec.status === "late"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {rec.status}
                    </span>
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
