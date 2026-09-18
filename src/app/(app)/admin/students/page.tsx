import { getUsers } from "@/lib/fcms/api";
import { GraduationCap, Mail, Search, CheckCircle } from "lucide-react";

export default async function AdminStudentsPage() {
  const allUsers = await getUsers();
  const students = allUsers.filter((u) => u.role === "student");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Student Registry</h1>
          <p className="text-xs text-slate-400 mt-1">
            Registered students, academic status, and department enrollment.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#232742] bg-[#121422] overflow-hidden">
        <div className="p-4 border-b border-[#232742] flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Enrolled: <strong className="text-white">{students.length} students</strong>
          </div>
          <input
            type="text"
            placeholder="Search by student name or email..."
            className="h-8 w-64 rounded-lg border border-[#232742] bg-[#181a2b] px-3 text-xs text-slate-200 placeholder-slate-500 focus:border-violet-500 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-[#232742] bg-[#10121d] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Student Name</th>
                <th className="py-3.5 px-4 font-semibold">Email</th>
                <th className="py-3.5 px-4 font-semibold">Department</th>
                <th className="py-3.5 px-4 font-semibold">Admission Date</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232742]">
              {students.map((stu) => (
                <tr key={stu.id} className="hover:bg-[#16192a] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-[11px]">
                      {stu.fullName.charAt(0)}
                    </div>
                    <span>{stu.fullName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{stu.email}</td>
                  <td className="py-3.5 px-4">{stu.department}</td>
                  <td className="py-3.5 px-4 text-slate-400">{stu.joinedDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                      <CheckCircle className="h-3 w-3" />
                      <span>{stu.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-violet-400 hover:text-violet-300 font-medium">
                      View Records
                    </button>
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
