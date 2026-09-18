import { getGrades } from "@/lib/fcms/api";
import { Award, Download, CheckCircle2 } from "lucide-react";

export default async function FacultyGradesPage() {
  const grades = await getGrades();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Gradebook & Academic Evaluation</h1>
          <p className="text-xs text-slate-400 mt-1">
            Calculate composite semester grades, review weighted breakdowns, and export to registrar.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-[#232742] bg-[#141624] px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-[#1c1f34] transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="rounded-xl border border-[#232742] bg-[#121422] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-[#232742] bg-[#10121d] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Student Name</th>
                <th className="py-3.5 px-4 font-semibold">Quizzes (20%)</th>
                <th className="py-3.5 px-4 font-semibold">Assignments (30%)</th>
                <th className="py-3.5 px-4 font-semibold">Midterm (25%)</th>
                <th className="py-3.5 px-4 font-semibold">Final (25%)</th>
                <th className="py-3.5 px-4 font-semibold">Aggregate</th>
                <th className="py-3.5 px-4 font-semibold">Final Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232742]">
              {grades.map((g) => (
                <tr key={g.id} className="hover:bg-[#16192a] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white">{g.studentName}</td>
                  <td className="py-3.5 px-4">{g.quizScore}%</td>
                  <td className="py-3.5 px-4">{g.assignmentScore}%</td>
                  <td className="py-3.5 px-4">{g.midtermScore}%</td>
                  <td className="py-3.5 px-4">{g.finalScore}%</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-400">{g.overallScore}%</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-violet-600/20 text-violet-300 border border-violet-500/30">
                      {g.gradeLetter}
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
