import { getUserProfile } from "@/lib/fcms/api";
import { User, Mail, Phone, MapPin, Shield, Calendar, Award } from "lucide-react";

export default async function ProfilePage() {
  const profile = await getUserProfile("faculty");

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b border-[#232742] pb-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">Academic Profile & Credentials</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your personal university record, office coordinates, and notification preferences.
        </p>
      </div>

      <div className="rounded-xl border border-[#232742] bg-[#121422] p-6 space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-violet-600/20">
            {profile.fullName.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{profile.fullName}</h2>
            <p className="text-xs text-violet-400">{profile.department}</p>
            <span className="inline-block mt-1 uppercase tracking-wider text-[10px] font-mono px-2 py-0.5 rounded bg-violet-600/20 border border-violet-500/30 text-violet-300">
              Role: {profile.role}
            </span>
          </div>
        </div>

        {/* Contact info grid */}
        <div className="grid sm:grid-cols-2 gap-4 border-t border-[#232742] pt-4 text-xs text-slate-300">
          <div className="space-y-1">
            <span className="text-slate-500 text-[11px] block">Institutional Email</span>
            <div className="flex items-center gap-2 text-white">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>{profile.email}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 text-[11px] block">Campus Telephone</span>
            <div className="flex items-center gap-2 text-white">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{profile.phone || "Not configured"}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 text-[11px] block">Office Location</span>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>{profile.officeLocation || "Campus Center"}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 text-[11px] block">Appointment Date</span>
            <div className="flex items-center gap-2 text-white">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>{profile.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
