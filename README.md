# FacultyHub — Faculty Course Management System (FCMS)

A premium, cinematic frontend for an academic management platform: courses,
faculty, students, enrollments, modules, materials, assignments, quizzes,
attendance, grades and announcements. Roles: **Admin · Faculty · Student**.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 + shadcn/ui (customized dark/violet theme)
- Lucide icons · Framer Motion (purposeful, reduced-motion aware)
- Supabase (auth, Postgres, RLS) — via `@supabase/ssr`

## Getting started

```bash
npm install
npm run dev
```

### Connecting real data (required for auth + all consoles)

1. Create a Supabase project (email/password auth enabled).
2. Apply **`supabase/schema.sql`** in the SQL editor — it creates tables,
   enums, indexes, helper functions, the profile bootstrap trigger and full
   role-based RLS policies.
3. Copy `.env.local.example` → `.env.local` and set
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Restart `npm run dev`.

The **first registered account becomes an admin** (handled by the bootstrap
trigger); everyone else registers as a student and is promoted from
`Admin → Faculty / Students` management pages.

### Design preview mode

Without a configured backend the app is still browsable for review: opening
`/dashboard` offers an explicitly labeled *design preview* entry per role.
No credentials, no fake accounts — every data region renders its documented
empty state and all mutations return the setup guidance message.

## Structure

| Layer | Location |
| --- | --- |
| Landing (editorial/cinematic) | `src/app/page.tsx` + `src/components/landing/*` |
| Auth pages | `src/app/(auth)/*` |
| App shell (role-aware sidebar/topbar) | `src/components/app-shell/*`, `src/app/(app)/layout.tsx` |
| Admin console | `src/app/(app)/admin/*` |
| Faculty console | `src/app/(app)/faculty/*` |
| Student console | `src/app/(app)/student/*` |
| Shared protected pages (catalog, course, assignment, quiz attempt/result, profile) | `src/app/(app)/{courses,assignments,quizzes,profile}/*` |
| Data reads | `src/lib/fcms/api.ts` (server-only repository) |
| Mutations | `src/lib/fcms/actions.ts` (server actions, role-guarded) |
| Supabase clients / middleware | `src/lib/supabase/*`, `src/middleware.ts` |
| Database contract | `supabase/schema.sql` |

Presentational components never call Supabase directly; pages call the
repository layer and components receive typed rows. Server actions re-check
session + role + ownership (defense in depth alongside RLS).

## Routes

`/` landing · `/login` `/register` `/forgot-password` `/reset-password` ·
`/dashboard` role entry · `/profile` · `/courses` `/courses/[id]` `/courses/[id]/modules` ·
`/assignments/[id]` · `/quizzes/[id]` `/quizzes/[id]/attempt` `/quizzes/[id]/result` ·
plus role consoles per the FCMS navigation spec.

## Quality

- `npm run build` — production type-check + build
- `npm run lint` — ESLint
- Accessibility: semantic HTML, labelled controls, visible focus, reduced-motion support, no color-only status (all statuses carry text).
