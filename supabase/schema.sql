-- ============================================================
-- FACULTYHUB (FCMS) - COMPLETE SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM TYPES (IDEMPOTENT)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'faculty', 'student');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE course_status AS ENUM ('active', 'archived', 'upcoming');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE assignment_status AS ENUM ('open', 'closed', 'graded');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE submission_status AS ENUM ('submitted', 'graded', 'late');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE material_type AS ENUM ('pdf', 'slides', 'code', 'video');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. PROFILES TABLE (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    department TEXT NOT NULL DEFAULT 'General Studies',
    avatar_url TEXT,
    phone TEXT,
    office_location TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    faculty_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    credits INTEGER NOT NULL DEFAULT 3 CHECK (credits > 0),
    semester TEXT NOT NULL DEFAULT 'Fall 2026',
    enrolled_count INTEGER NOT NULL DEFAULT 0,
    max_capacity INTEGER NOT NULL DEFAULT 50,
    description TEXT,
    status course_status NOT NULL DEFAULT 'active',
    schedule TEXT,
    location TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. COURSE ENROLLMENTS TABLE (Students enrolled in Courses)
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'waitlisted', 'dropped', 'completed')),
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (course_id, student_id)
);

-- 6. WEEKLY MODULES TABLE
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    week INTEGER NOT NULL CHECK (week > 0),
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. MODULE MATERIALS TABLE
CREATE TABLE IF NOT EXISTS public.module_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type material_type NOT NULL DEFAULT 'pdf',
    size TEXT NOT NULL DEFAULT '1.0 MB',
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. ASSIGNMENTS TABLE
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMPTZ NOT NULL,
    total_points INTEGER NOT NULL DEFAULT 100 CHECK (total_points > 0),
    status assignment_status NOT NULL DEFAULT 'open',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_url TEXT,
    file_name TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    grade NUMERIC(5, 2),
    feedback TEXT,
    status submission_status NOT NULL DEFAULT 'submitted',
    UNIQUE (assignment_id, student_id)
);

-- 10. QUIZZES TABLE
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 30 CHECK (duration_minutes > 0),
    total_questions INTEGER NOT NULL DEFAULT 1,
    passing_score INTEGER NOT NULL DEFAULT 70 CHECK (passing_score >= 0 AND passing_score <= 100),
    due_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer INTEGER NOT NULL CHECK (correct_answer >= 0),
    explanation TEXT,
    order_index INTEGER NOT NULL DEFAULT 1
);

-- 12. QUIZ ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    UNIQUE (quiz_id, student_id)
);

-- 13. ATTENDANCE RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status attendance_status NOT NULL DEFAULT 'present',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (course_id, student_id, date)
);

-- 14. GRADES TABLE (Composite Course Grades)
CREATE TABLE IF NOT EXISTS public.grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    quiz_score NUMERIC(5, 2) DEFAULT 0,
    assignment_score NUMERIC(5, 2) DEFAULT 0,
    midterm_score NUMERIC(5, 2) DEFAULT 0,
    final_score NUMERIC(5, 2) DEFAULT 0,
    overall_score NUMERIC(5, 2) DEFAULT 0,
    grade_letter VARCHAR(5) DEFAULT 'A',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (course_id, student_id)
);

-- 15. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    target_role TEXT NOT NULL DEFAULT 'all' CHECK (target_role IN ('all', 'faculty', 'student')),
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================
-- STORAGE BUCKETS (Materials & Submissions)
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('materials', 'materials', true),
    ('submissions', 'submissions', false)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- Storage policies
CREATE POLICY "Public Read for Course Materials"
ON storage.objects FOR SELECT
USING (bucket_id = 'materials');

CREATE POLICY "Faculty and Admin Upload Course Materials"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'materials' AND
    auth.role() = 'authenticated'
);

CREATE POLICY "Student and Faculty Upload Submissions"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'submissions' AND
    auth.role() = 'authenticated'
);

CREATE POLICY "View Submissions"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'submissions' AND
    auth.role() = 'authenticated'
);

-- ============================================================
-- AUTOMATIC USER PROFILE SYNC & FIRST ADMIN BOOTSTRAP
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_count INTEGER;
    initial_role user_role;
BEGIN
    -- Check if this is the very first user in the system
    SELECT COUNT(*) INTO user_count FROM public.profiles;
    
    IF user_count = 0 THEN
        -- First user gets elevated to admin automatically
        initial_role := 'admin';
    ELSE
        -- Default role from user metadata, or 'student'
        initial_role := COALESCE(
            (NEW.raw_user_meta_data->>'role')::user_role,
            'student'
        );
    END IF;

    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        role,
        department,
        status
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        initial_role,
        COALESCE(NEW.raw_user_meta_data->>'department', 'Computer Science'),
        'active'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to auto-update enrolled_count in courses
CREATE OR REPLACE FUNCTION public.sync_course_enrollment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.courses
        SET enrolled_count = enrolled_count + 1
        WHERE id = NEW.course_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.courses
        SET enrolled_count = GREATEST(0, enrolled_count - 1)
        WHERE id = OLD.course_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_course_enrollment_change ON public.course_enrollments;
CREATE TRIGGER on_course_enrollment_change
    AFTER INSERT OR DELETE ON public.course_enrollments
    FOR EACH ROW EXECUTE FUNCTION public.sync_course_enrollment_count();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are readable by authenticated users"
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (id = auth.uid());

CREATE POLICY "Admins have full access to profiles"
ON public.profiles FOR ALL TO authenticated
USING (public.current_user_role() = 'admin');

-- COURSES POLICIES
CREATE POLICY "Anyone authenticated can view active courses"
ON public.courses FOR SELECT TO authenticated USING (true);

CREATE POLICY "Faculty can insert and update their own courses"
ON public.courses FOR ALL TO authenticated
USING (faculty_id = auth.uid() OR public.current_user_role() = 'admin');

-- MODULES & MATERIALS POLICIES
CREATE POLICY "Anyone authenticated can view modules"
ON public.modules FOR SELECT TO authenticated USING (true);

CREATE POLICY "Faculty and admin manage modules"
ON public.modules FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = course_id AND (c.faculty_id = auth.uid() OR public.current_user_role() = 'admin')
    )
);

CREATE POLICY "Anyone authenticated can view materials"
ON public.module_materials FOR SELECT TO authenticated USING (true);

CREATE POLICY "Faculty and admin manage materials"
ON public.module_materials FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.modules m
        JOIN public.courses c ON c.id = m.course_id
        WHERE m.id = module_id AND (c.faculty_id = auth.uid() OR public.current_user_role() = 'admin')
    )
);

-- ASSIGNMENTS POLICIES
CREATE POLICY "Anyone authenticated can view assignments"
ON public.assignments FOR SELECT TO authenticated USING (true);

CREATE POLICY "Faculty and admin manage assignments"
ON public.assignments FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = course_id AND (c.faculty_id = auth.uid() OR public.current_user_role() = 'admin')
    )
);

-- SUBMISSIONS POLICIES
CREATE POLICY "Students can view and create their own submissions"
ON public.submissions FOR ALL TO authenticated
USING (
    student_id = auth.uid() OR
    public.current_user_role() = 'admin' OR
    EXISTS (
        SELECT 1 FROM public.assignments a
        JOIN public.courses c ON c.id = a.course_id
        WHERE a.id = assignment_id AND c.faculty_id = auth.uid()
    )
);

-- QUIZZES & QUESTIONS POLICIES
CREATE POLICY "View quizzes"
ON public.quizzes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Manage quizzes"
ON public.quizzes FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.courses c
        WHERE c.id = course_id AND (c.faculty_id = auth.uid() OR public.current_user_role() = 'admin')
    )
);

CREATE POLICY "View quiz questions"
ON public.quiz_questions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Manage quiz questions"
ON public.quiz_questions FOR ALL TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.quizzes q
        JOIN public.courses c ON c.id = q.course_id
        WHERE q.id = quiz_id AND (c.faculty_id = auth.uid() OR public.current_user_role() = 'admin')
    )
);

CREATE POLICY "Students manage their own quiz attempts"
ON public.quiz_attempts FOR ALL TO authenticated
USING (
    student_id = auth.uid() OR
    public.current_user_role() = 'admin' OR
    EXISTS (
        SELECT 1 FROM public.quizzes q
        JOIN public.courses c ON c.id = q.course_id
        WHERE q.id = quiz_id AND c.faculty_id = auth.uid()
    )
);

-- ATTENDANCE & GRADES POLICIES
CREATE POLICY "View attendance"
ON public.attendance_records FOR SELECT TO authenticated
USING (
    student_id = auth.uid() OR
    public.current_user_role() IN ('admin', 'faculty')
);

CREATE POLICY "Faculty and admin manage attendance"
ON public.attendance_records FOR ALL TO authenticated
USING (public.current_user_role() IN ('admin', 'faculty'));

CREATE POLICY "View grades"
ON public.grades FOR SELECT TO authenticated
USING (
    student_id = auth.uid() OR
    public.current_user_role() IN ('admin', 'faculty')
);

CREATE POLICY "Faculty and admin manage grades"
ON public.grades FOR ALL TO authenticated
USING (public.current_user_role() IN ('admin', 'faculty'));

-- ANNOUNCEMENTS POLICIES
CREATE POLICY "View announcements"
ON public.announcements FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and faculty create announcements"
ON public.announcements FOR ALL TO authenticated
USING (public.current_user_role() IN ('admin', 'faculty'));

-- ============================================================
-- INITIAL SEED DATA (COURSES, MODULES, ASSIGNMENTS, QUIZZES)
-- ============================================================
DO $$
DECLARE
    cs301_id UUID := '00000000-0000-0000-0000-000000000301';
    cs410_id UUID := '00000000-0000-0000-0000-000000000410';
    ds210_id UUID := '00000000-0000-0000-0000-000000000210';
    se450_id UUID := '00000000-0000-0000-0000-000000000450';
    mod1_id UUID := '10000000-0000-0000-0000-000000000001';
    mod2_id UUID := '10000000-0000-0000-0000-000000000002';
    asg1_id UUID := '20000000-0000-0000-0000-000000000001';
    asg2_id UUID := '20000000-0000-0000-0000-000000000002';
    quiz1_id UUID := '30000000-0000-0000-0000-000000000001';
BEGIN
    -- Seed Courses
    INSERT INTO public.courses (id, code, title, department, credits, semester, max_capacity, enrolled_count, description, status, schedule, location)
    VALUES
    (cs301_id, 'CS-301', 'Advanced Distributed Systems', 'Computer Science', 4, 'Fall 2026', 45, 38, 'Consensus algorithms, replication protocols, vector clocks, Paxos, Raft, and distributed storage systems.', 'active', 'Mon, Wed 10:00 AM - 11:30 AM', 'Hall B - Room 204'),
    (cs410_id, 'CS-410', 'Cloud Infrastructure & Microservices', 'Computer Science', 3, 'Fall 2026', 40, 32, 'Kubernetes orchestrations, service mesh architecture, distributed tracing, and zero-trust cloud security.', 'active', 'Tue, Thu 01:00 PM - 02:30 PM', 'Engineering Center - Lab 3'),
    (ds210_id, 'DS-210', 'Large-Scale Data Engineering', 'Data Engineering', 4, 'Fall 2026', 50, 44, 'Apache Spark, stream processing with Kafka, real-time analytics, and column-store engines.', 'active', 'Mon, Fri 02:00 PM - 03:30 PM', 'Turing Hall - Room 102'),
    (se450_id, 'SE-450', 'Software Architecture & Design Patterns', 'Software Engineering', 3, 'Fall 2026', 35, 29, 'Domain-driven design, event-driven architectures, hexagonal architecture, and enterprise patterns.', 'active', 'Wed, Fri 09:00 AM - 10:30 AM', 'Hall A - Room 115')
    ON CONFLICT (code) DO NOTHING;

    -- Seed Modules for CS-301
    INSERT INTO public.modules (id, course_id, week, title, description)
    VALUES
    (mod1_id, cs301_id, 1, 'Introduction & System Models', 'Synchronous vs. asynchronous execution, fault tolerance, Byzantine vs. crash-stop failure models.'),
    (mod2_id, cs301_id, 2, 'Consensus, Paxos & Raft', 'State machine replication, leader election, log compaction, and safety proofs.')
    ON CONFLICT (id) DO NOTHING;

    -- Seed Module Materials
    INSERT INTO public.module_materials (module_id, title, type, size, url)
    VALUES
    (mod1_id, 'Lecture 01 - System Models & Clocks', 'slides', '4.2 MB', 'https://facultyhub.edu/materials/cs301/lecture01.pdf'),
    (mod1_id, 'Lamport Clocks Algorithm Specs', 'pdf', '1.1 MB', 'https://facultyhub.edu/materials/cs301/lamport-specs.pdf'),
    (mod2_id, 'Raft Consensus Protocol Walkthrough', 'video', '120 MB', 'https://facultyhub.edu/materials/cs301/raft-breakdown.mp4'),
    (mod2_id, 'Go Consensus Engine Starter Kit', 'code', '450 KB', 'https://facultyhub.edu/materials/cs301/raft-starter.tar.gz')
    ON CONFLICT DO NOTHING;

    -- Seed Assignments
    INSERT INTO public.assignments (id, course_id, title, description, due_date, total_points, status)
    VALUES
    (asg1_id, cs301_id, 'Distributed Key-Value Store with Vector Clocks', 'Implement a fault-tolerant vector-clock coordinated key-value store with read repair and causal consistency.', now() + interval '5 days', 100, 'open'),
    (asg2_id, cs410_id, 'Kubernetes Operator for Stateful PostgreSQL', 'Author a custom Go controller and CRD to orchestrate leader failover and backup snapshots.', now() + interval '12 days', 100, 'open')
    ON CONFLICT (id) DO NOTHING;

    -- Seed Quizzes
    INSERT INTO public.quizzes (id, course_id, title, description, duration_minutes, total_questions, passing_score, due_date)
    VALUES
    (quiz1_id, cs301_id, 'Distributed Consensus & Raft Protocol Quiz', 'Timed assessment verifying understanding of term numbers, log replication invariants, and leader election.', 20, 3, 75, now() + interval '7 days')
    ON CONFLICT (id) DO NOTHING;

    -- Seed Quiz Questions
    INSERT INTO public.quiz_questions (quiz_id, prompt, options, correct_answer, explanation, order_index)
    VALUES
    (quiz1_id, 'In the Raft consensus protocol, what condition must a candidate satisfy to become the recognized leader for a term?', 
     '["Receive votes from a majority of servers in the cluster", "Have the smallest server identifier in the network", "Have served as leader in the immediately preceding term", "Receive an acknowledgment from every active client"]'::jsonb,
     0, 'Raft requires that a candidate receives votes from a strict majority (quorum) of cluster nodes before transitioning to the Leader state.', 1),
    (quiz1_id, 'What ensures that a Raft leader never overwrites or truncates its own log entries?',
     '["Log Matching Property", "Leader Append-Only Property", "Election Safety Invariant", "Leader Completeness Rule"]'::jsonb,
     1, 'The Leader Append-Only property guarantees that a leader only appends new entries to its log and never overwrites or truncates its own entries.', 2),
    (quiz1_id, 'Why are logical vector clocks preferred over physical system clocks in distributed consensus networks?',
     '["Physical clocks suffer from clock drift, skew, and lack relativistic simultaneity", "Vector clocks consume zero network bandwidth", "Vector clocks do not require storing integer counters", "Hardware quartz oscillators cannot measure milliseconds"]'::jsonb,
     0, 'Physical quartz clocks experience drift and NTP synchronization latency; vector clocks establish exact partial ordering without relying on clock synchronization.', 3)
    ON CONFLICT DO NOTHING;

    -- Seed Announcements
    INSERT INTO public.announcements (title, content, target_role, priority)
    VALUES
    ('Fall 2026 Midterm Examination Schedule Published', 'The registrar has published all scheduled exam dates and hall assignments. Please review conflicts by October 1st.', 'all', 'urgent'),
    ('Office Hours Shift for CS-301 on Wednesday', 'Wednesday office hours are shifted to 3:30 PM - 5:00 PM in Turing Hall 318 due to the faculty senate meeting.', 'student', 'normal')
    ON CONFLICT DO NOTHING;
END $$;
