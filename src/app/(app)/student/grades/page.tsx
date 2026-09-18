import { getGrades } from "@/lib/fcms/api";
import { Award, TrendingUp } from "lucide-react";

export default async function StudentGradesPage() {
  const allGrades = await getGrades();
  const myGrades = allGrades.filter((g) => g.studentId === "usr-stu-1");

  return (
    <div className="space-y-6">
      <div className="border-b border-[#232742] pb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Academic Performance & Grades</h1>
        <p className="text-xs text-slate-400 mt-1">
          Detailed transcript breakdown across quizzes, assignments, midterms, and finals.
        </p>
      </div>

      <div className="rounded-xl border border-[#232742] bg-[#121422] p-6 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400">Current Semester Cumulative GPA</span>
          <div className="text-3xl font-bold text-white mt-1">3.92 <span className="text-xs text-slate-500 font-normal">/ 4.00</span></div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
            <TrendingUp className="h-4 w-4" />
            <span>Top 5% of Senior Cohort</span>
          </span>
          <p className="text-[11px] text-slate-500 mt-1">All grade disputes close Nov 30</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#232742] bg-[#121422] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-[#232742] bg-[#10121d] text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Course</th>
                <th className="py-3.5 px-4 font-semibold">Quizzes (20%)</th>
                <th className="py-3.5 px-4 font-semibold">Assignments (30%)</th>
                <th className="py-3.5 px-4 font-semibold">Midterm (25%)</th>
                <th className="py-3.5 px-4 font-semibold">Final (25%)</th>
                <th className="py-3.5 px-4 font-semibold">Overall</th>
                <th className="py-3.5 px-4 font-semibold">Letter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232742]">
              {myGrades.map((g) => (
                <tr key={g.id} className="hover:bg-[#16192a] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white">
                    <span className="font-mono text-violet-400 mr-2">{g.courseCode}</span>
                    {g.courseTitle}
                  </td>
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
