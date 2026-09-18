import { BookOpen, Layers, CheckCircle2, Award, Users2, Shield } from "lucide-react";

export function Features() {
  const items = [
    {
      icon: BookOpen,
      title: "Modular Curriculum Delivery",
      description: "Organize coursework into chronological weekly modules with embedded slide decks, research papers, and code repositories.",
    },
    {
      icon: Layers,
      title: "Self-Evaluating Quizzes",
      description: "Conduct multiple-choice examinations with live timers, instant scoring, answer keys, and pedagogical explanations.",
    },
    {
      icon: CheckCircle2,
      title: "Lecture Attendance Records",
      description: "Faculty can record and update attendance status with one click; students monitor their percentage in real time.",
    },
    {
      icon: Award,
      title: "Weighted Gradebook",
      description: "Auto-calculate aggregate student GPAs across quizzes, homework assignments, midterms, and final presentations.",
    },
    {
      icon: Users2,
      title: "Campus Directory & Registries",
      description: "Search and filter faculty rosters, active students, and department quotas with comprehensive credential views.",
    },
    {
      icon: Shield,
      title: "Institutional Role Security",
      description: "Built for row-level security (RLS) and server action verification, keeping student records and exams strictly guarded.",
    },
  ];

  return (
    <section className="py-20 bg-[#0d0e15]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            An all-in-one ecosystem for higher education
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Engineered to streamline daily interactions between course instructors, academic deans, and learners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-xl border border-[#232742] bg-[#121422] p-6 hover:border-violet-500/40 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{feat.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
