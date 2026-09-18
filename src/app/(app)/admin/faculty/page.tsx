import { getUsers } from "@/lib/fcms/api";
import { Users, Mail, Phone, MapPin, CheckCircle, Plus } from "lucide-react";

export default async function AdminFacultyPage() {
  const allUsers = await getUsers();
  const faculty = allUsers.filter((u) => u.role === "faculty");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232742] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Faculty Roster & Appointments</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage academic appointments, department chairs, and teaching credentials.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Appoint Faculty Member</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {faculty.map((member) => (
          <div
            key={member.id}
            className="rounded-xl border border-[#232742] bg-[#121422] p-5 space-y-4 hover:border-violet-500/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 font-bold flex items-center justify-center text-sm">
                  {member.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{member.fullName}</h3>
                  <p className="text-xs text-violet-400">{member.department}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400">
                <CheckCircle className="h-3 w-3" />
                <span>Active</span>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 border-t border-[#232742]/70 pt-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                <span>{member.email}</span>
              </div>
              {member.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-500" />
                  <span>{member.phone}</span>
                </div>
              )}
              {member.officeLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span>{member.officeLocation}</span>
                </div>
              )}
            </div>

            <div className="border-t border-[#232742]/70 pt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">Appointed: {member.joinedDate}</span>
              <button className="text-violet-400 hover:text-violet-300 font-medium">
                Manage Courses
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
