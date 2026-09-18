"use client";

import { useState } from "react";
import {
  Database,
  Copy,
  Check,
  ExternalLink,
  Code,
  Table,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronRight,
  Terminal,
} from "lucide-react";

interface TableInfo {
  name: string;
  category: string;
  description: string;
  columns: string[];
}

const TABLES: TableInfo[] = [
  {
    name: "profiles",
    category: "Auth & Users",
    description: "User profiles linked 1:1 to auth.users with role (admin, faculty, student), department, and contact info.",
    columns: ["id (UUID, PK -> auth.users)", "email", "full_name", "role (ENUM)", "department", "avatar_url", "status"],
  },
  {
    name: "courses",
    category: "Curriculum",
    description: "Academic course catalog with code, department, assigned instructor, credits, capacity, and schedule.",
    columns: ["id (UUID, PK)", "code (UNIQUE)", "title", "department", "faculty_id (FK)", "credits", "enrolled_count", "schedule"],
  },
  {
    name: "course_enrollments",
    category: "Curriculum",
    description: "Student course enrollments with real-time capacity sync trigger.",
    columns: ["id (UUID, PK)", "course_id (FK)", "student_id (FK)", "status", "enrolled_at"],
  },
  {
    name: "modules",
    category: "Course Content",
    description: "Weekly course modules and thematic lesson plans.",
    columns: ["id (UUID, PK)", "course_id (FK)", "week", "title", "description", "created_at"],
  },
  {
    name: "module_materials",
    category: "Course Content",
    description: "Lecture slides, handouts, code starter kits, and video recordings.",
    columns: ["id (UUID, PK)", "module_id (FK)", "title", "type (pdf, slides, code, video)", "size", "url"],
  },
  {
    name: "assignments",
    category: "Assessments",
    description: "Homework problem sets, deliverables, point values, and submission deadlines.",
    columns: ["id (UUID, PK)", "course_id (FK)", "title", "description", "due_date", "total_points", "status"],
  },
  {
    name: "submissions",
    category: "Assessments",
    description: "Student homework uploads, evaluation grades, feedback, and submission status.",
    columns: ["id (UUID, PK)", "assignment_id (FK)", "student_id (FK)", "file_url", "grade", "feedback", "status"],
  },
  {
    name: "quizzes",
    category: "Exams",
    description: "Timed multiple-choice examinations, question counts, and passing cutoffs.",
    columns: ["id (UUID, PK)", "course_id (FK)", "title", "duration_minutes", "total_questions", "passing_score", "due_date"],
  },
  {
    name: "quiz_questions",
    category: "Exams",
    description: "Question prompts, JSONB answer choice arrays, correct answer indices, and detailed explanations.",
    columns: ["id (UUID, PK)", "quiz_id (FK)", "prompt", "options (JSONB)", "correct_answer", "explanation", "order_index"],
  },
  {
    name: "quiz_attempts",
    category: "Exams",
    description: "Student quiz evaluation attempts, recorded scores, and answer selections.",
    columns: ["id (UUID, PK)", "quiz_id (FK)", "student_id (FK)", "score", "answers (JSONB)", "completed_at"],
  },
  {
    name: "attendance_records",
    category: "Records",
    description: "Daily roll-call tracking for enrolled students (present, absent, late, excused).",
    columns: ["id (UUID, PK)", "course_id (FK)", "student_id (FK)", "date", "status"],
  },
  {
    name: "grades",
    category: "Records",
    description: "Composite course grade calculation (quizzes, assignments, midterm, final, letter grade).",
    columns: ["id (UUID, PK)", "course_id (FK)", "student_id (FK)", "quiz_score", "assignment_score", "overall_score", "grade_letter"],
  },
  {
    name: "announcements",
    category: "Communications",
    description: "Departmental and course broadcasts with audience targeting and priority flags.",
    columns: ["id (UUID, PK)", "title", "content", "author_id (FK)", "target_role", "priority", "created_at"],
  },
];

export function SupabaseSchemaManager() {
  const [copied, setCopied] = useState(false);
  const [showSql, setShowSql] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sqlContent, setSqlContent] = useState<string>("");

  const loadAndCopySql = async () => {
    setLoading(true);
    try {
      let sql = sqlContent;
      if (!sql) {
        const res = await fetch("/api/schema");
        if (res.ok) {
          const data = await res.json();
          sql = data.sql;
          setSqlContent(sql);
        }
      }
      if (sql) {
        await navigator.clipboard.writeText(sql);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (e) {
      console.error("Failed to copy SQL", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleSqlView = async () => {
    if (!showSql && !sqlContent) {
      setLoading(true);
      try {
        const res = await fetch("/api/schema");
        if (res.ok) {
          const data = await res.json();
          setSqlContent(data.sql);
        }
      } catch (e) {
        console.error("Failed to load SQL", e);
      } finally {
        setLoading(false);
      }
    }
    setShowSql(!showSql);
  };

  return (
    <div className="rounded-xl border border-[#232742] bg-[#121422] p-6 space-y-6">
      {/* Header with Title and Copy Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232742] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Supabase Database & Tables Schema
            </h2>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
              13 Tables Ready
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Execute the pre-built SQL migration in your Supabase SQL Editor to instantly provision all tables, relations, RLS security policies, triggers, and seed data.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={loadAndCopySql}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-white transition-colors shadow-sm disabled:opacity-50"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span>Copied SQL Script!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>{loading ? "Loading..." : "Copy Supabase SQL"}</span>
              </>
            )}
          </button>

          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-lg border border-[#232742] bg-[#181a2b] hover:bg-[#20233a] px-3 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <span>Supabase Dashboard</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Quick 3-Step Execution Guide */}
      <div className="rounded-lg border border-violet-500/20 bg-violet-950/20 p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
          <Terminal className="h-4 w-4" />
          <span>How to create tables in Supabase in under 1 minute:</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="rounded-md bg-[#161828] border border-[#232742] p-3">
            <span className="inline-block rounded bg-violet-500/20 text-violet-300 font-mono font-bold px-1.5 py-0.5 text-[10px] mb-1">
              Step 1
            </span>
            <p className="font-semibold text-white">Copy Migration</p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Click <strong>&quot;Copy Supabase SQL&quot;</strong> above (or read <code className="text-violet-300">supabase/schema.sql</code>).
            </p>
          </div>

          <div className="rounded-md bg-[#161828] border border-[#232742] p-3">
            <span className="inline-block rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold px-1.5 py-0.5 text-[10px] mb-1">
              Step 2
            </span>
            <p className="font-semibold text-white">Run in SQL Editor</p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              In Supabase dashboard, click <strong>SQL Editor</strong> on left menu, click <strong>&quot;New query&quot;</strong>, paste, and click <strong>Run</strong>.
            </p>
          </div>

          <div className="rounded-md bg-[#161828] border border-[#232742] p-3">
            <span className="inline-block rounded bg-amber-500/20 text-amber-300 font-mono font-bold px-1.5 py-0.5 text-[10px] mb-1">
              Step 3
            </span>
            <p className="font-semibold text-white">Save Credentials</p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Go to <strong>Project Settings &gt; API</strong> and copy your Project URL &amp; anon public key into <code className="text-amber-300">.env.local</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Tables Catalog Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Table className="h-3.5 w-3.5 text-violet-400" />
            <span>Database Tables Breakdown (13 Relational Tables)</span>
          </h3>
          <span className="text-[11px] text-slate-400">PostgreSQL + Row-Level Security</span>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {TABLES.map((t) => (
            <div
              key={t.name}
              className="rounded-lg border border-[#232742] bg-[#161828] p-3.5 space-y-2 hover:border-[#2f3559] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    public.{t.name}
                  </span>
                </div>
                <span className="rounded bg-[#20243d] px-2 py-0.5 text-[10px] font-medium text-slate-300">
                  {t.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">{t.description}</p>
              <div className="pt-1 text-[11px] text-slate-400 font-mono flex flex-wrap gap-1">
                {t.columns.map((col, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-[#111320] border border-[#232742]/80 px-1.5 py-0.5 text-slate-300"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Included Infrastructure Highlights */}
      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="rounded-lg border border-[#232742] bg-[#161828] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Row Level Security (RLS)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Granular policies for Admin, Faculty course owners, and enrolled students with full permission isolation.
          </p>
        </div>

        <div className="rounded-lg border border-[#232742] bg-[#161828] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-violet-400 font-semibold">
            <Layers className="h-3.5 w-3.5" />
            <span>Storage Buckets</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Automated creation of <code className="text-violet-300">materials</code> (public) and <code className="text-violet-300">submissions</code> (private) storage buckets.
          </p>
        </div>

        <div className="rounded-lg border border-[#232742] bg-[#161828] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Terminal className="h-3.5 w-3.5" />
            <span>Auto Admin Elevation</span>
          </div>
          <p className="text-[11px] text-slate-400">
            The first registered user is automatically elevated to system Administrator by the Postgres signup trigger.
          </p>
        </div>
      </div>

      {/* Expandable SQL Code Preview */}
      <div className="border-t border-[#232742] pt-4">
        <button
          onClick={toggleSqlView}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          {showSql ? (
            <ChevronDown className="h-3.5 w-3.5 text-violet-400" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-violet-400" />
          )}
          <Code className="h-3.5 w-3.5 text-violet-400" />
          <span>{showSql ? "Hide SQL Source Code" : "View Full SQL Script (supabase/schema.sql)"}</span>
        </button>

        {showSql && (
          <div className="mt-3 relative rounded-lg border border-[#232742] bg-[#0c0d16] p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#232742]">
              <span className="text-[11px] font-mono text-slate-400">supabase/schema.sql</span>
              <button
                onClick={loadAndCopySql}
                className="flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300 font-medium"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto max-h-96 leading-relaxed whitespace-pre scrollbar-thin">
              {sqlContent || "Loading SQL content..."}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
