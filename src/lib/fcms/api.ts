import {
  UserProfile,
  Course,
  ModuleItem,
  Assignment,
  Quiz,
  AttendanceRecord,
  GradeItem,
  Announcement,
  UserRole,
} from "./types";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && !url.includes("mock") && key && !key.includes("mock")) {
    return createClient(url, key);
  }
  return null;
}

export const mockUsers: UserProfile[] = [
  {
    id: "usr-admin-1",
    email: "admin@facultyhub.edu",
    fullName: "Dr. Eleanor Vance",
    role: "admin",
    department: "Academic Administration",
    joinedDate: "2024-01-10",
    status: "active",
    phone: "+1 (555) 019-2834",
    officeLocation: "Admin Building, Suite 402",
  },
  {
    id: "usr-fac-1",
    email: "sarah.chen@facultyhub.edu",
    fullName: "Prof. Sarah Chen",
    role: "faculty",
    department: "Computer Science",
    joinedDate: "2024-02-15",
    status: "active",
    phone: "+1 (555) 014-9921",
    officeLocation: "Turing Hall, Room 318",
  },
  {
    id: "usr-fac-2",
    email: "marcus.brooks@facultyhub.edu",
    fullName: "Dr. Marcus Brooks",
    role: "faculty",
    department: "Data Engineering",
    joinedDate: "2024-03-01",
    status: "active",
    phone: "+1 (555) 018-4432",
    officeLocation: "Engineering Center, Lab 104",
  },
  {
    id: "usr-stu-1",
    email: "alex.rivera@student.facultyhub.edu",
    fullName: "Alex Rivera",
    role: "student",
    department: "Computer Science",
    joinedDate: "2024-08-20",
    status: "active",
    phone: "+1 (555) 012-7890",
  },
  {
    id: "usr-stu-2",
    email: "maya.patel@student.facultyhub.edu",
    fullName: "Maya Patel",
    role: "student",
    department: "Computer Science",
    joinedDate: "2024-08-20",
    status: "active",
  },
  {
    id: "usr-stu-3",
    email: "jordan.lee@student.facultyhub.edu",
    fullName: "Jordan Lee",
    role: "student",
    department: "Data Engineering",
    joinedDate: "2024-08-22",
    status: "active",
  },
];

export const mockCourses: Course[] = [
  {
    id: "crs-cs301",
    code: "CS-301",
    title: "Advanced Distributed Systems",
    department: "Computer Science",
    facultyId: "usr-fac-1",
    facultyName: "Prof. Sarah Chen",
    credits: 4,
    semester: "Fall 2026",
    enrolledCount: 38,
    maxCapacity: 45,
    description: "Consensus algorithms, replication protocols, vector clocks, Paxos, Raft, and distributed storage systems.",
    status: "active",
    schedule: "Mon, Wed 10:00 AM - 11:30 AM",
    location: "Hall B - Room 204",
  },
  {
    id: "crs-cs410",
    code: "CS-410",
    title: "Cloud Infrastructure & Microservices",
    department: "Computer Science",
    facultyId: "usr-fac-1",
    facultyName: "Prof. Sarah Chen",
    credits: 3,
    semester: "Fall 2026",
    enrolledCount: 42,
    maxCapacity: 50,
    description: "Containerization, service mesh, observability, declarative infrastructure, and cloud-native architecture.",
    status: "active",
    schedule: "Tue, Thu 2:00 PM - 3:30 PM",
    location: "Online / Hybrid Room 102",
  },
  {
    id: "crs-ds205",
    code: "DS-205",
    title: "Relational Database Internals & Query Engines",
    department: "Data Engineering",
    facultyId: "usr-fac-2",
    facultyName: "Dr. Marcus Brooks",
    credits: 4,
    semester: "Fall 2026",
    enrolledCount: 35,
    maxCapacity: 40,
    description: "B-Trees, buffer pool management, write-ahead logging (WAL), cost-based query optimizers, and ACID guarantees.",
    status: "active",
    schedule: "Fri 9:00 AM - 12:00 PM",
    location: "Engineering Complex 405",
  },
];

export const mockModules: Record<string, ModuleItem[]> = {
  "crs-cs301": [
    {
      id: "mod-1",
      courseId: "crs-cs301",
      week: 1,
      title: "Foundations & The Fallacies of Distributed Computing",
      description: "Network latency, clock synchronization, NTP, and vector clocks.",
      materialsCount: 3,
      materials: [
        { id: "mat-1", title: "Lecture 01 Slides: Physical & Logical Clocks", type: "slides", size: "4.2 MB", url: "#" },
        { id: "mat-2", title: "Paper: Time, Clocks, and the Ordering of Events (Lamport)", type: "pdf", size: "1.1 MB", url: "#" },
        { id: "mat-3", title: "Vector Clock Implementation Sample (TypeScript)", type: "code", size: "12 KB", url: "#" },
      ],
    },
    {
      id: "mod-2",
      courseId: "crs-cs301",
      week: 2,
      title: "Replication & Consensus: Paxos to Raft",
      description: "Quorum systems, leader election, log replication, safety invariants.",
      materialsCount: 2,
      materials: [
        { id: "mat-4", title: "Lecture 02 Slides: Raft Consensus Protocol", type: "slides", size: "5.8 MB", url: "#" },
        { id: "mat-5", title: "Raft State Machine Guide", type: "pdf", size: "850 KB", url: "#" },
      ],
    },
    {
      id: "mod-3",
      courseId: "crs-cs301",
      week: 3,
      title: "Fault Tolerance & Byzantine Generals Problem",
      description: "Crash-stop vs Byzantine failure modes, cryptographic proofs, PBFT.",
      materialsCount: 2,
      materials: [
        { id: "mat-6", title: "Lecture 03 Slides: Byzantine Agreement", type: "slides", size: "3.4 MB", url: "#" },
        { id: "mat-7", title: "Recorded Guest Lecture: Enterprise Fault Tolerance", type: "video", size: "180 MB", url: "#" },
      ],
    },
  ],
};

export const mockAssignments: Assignment[] = [
  {
    id: "asg-1",
    courseId: "crs-cs301",
    courseCode: "CS-301",
    courseTitle: "Advanced Distributed Systems",
    title: "Project 1: Implement Raft Leader Election & Heartbeats",
    description: "Write a complete Raft consensus node in Go or TypeScript supporting term increments, vote solicitation, and randomized timer backoff.",
    dueDate: "2026-10-05T23:59:00Z",
    totalPoints: 100,
    submissionsCount: 31,
    gradedCount: 28,
    status: "open",
    submission: {
      id: "sub-1",
      studentId: "usr-stu-1",
      studentName: "Alex Rivera",
      submittedAt: "2026-09-28T14:22:00Z",
      fileName: "alex_rivera_raft_p1.zip",
      fileUrl: "#",
      grade: 96,
      feedback: "Clean term handling and correct split-vote tie resolution. Minor edge case in log indexing.",
      status: "graded",
    },
  },
  {
    id: "asg-2",
    courseId: "crs-cs301",
    courseCode: "CS-301",
    courseTitle: "Advanced Distributed Systems",
    title: "Written Problem Set 2: Vector Clocks & Causal Consistency",
    description: "Analyze the provided Lamport timestamp diagrams and identify all concurrently executing events and causal violations.",
    dueDate: "2026-10-14T23:59:00Z",
    totalPoints: 50,
    submissionsCount: 24,
    gradedCount: 0,
    status: "open",
  },
  {
    id: "asg-3",
    courseId: "crs-cs410",
    courseCode: "CS-410",
    courseTitle: "Cloud Infrastructure & Microservices",
    title: "Lab 3: Service Mesh & Zero-Trust Mutual TLS Configuration",
    description: "Deploy an Istio or Linkerd control plane with strict mTLS enforcement and export distributed traces to Jaeger.",
    dueDate: "2026-10-18T23:59:00Z",
    totalPoints: 75,
    submissionsCount: 19,
    gradedCount: 15,
    status: "open",
  },
];

export const mockQuizzes: Quiz[] = [
  {
    id: "qz-1",
    courseId: "crs-cs301",
    courseCode: "CS-301",
    courseTitle: "Advanced Distributed Systems",
    title: "Quiz 1: Clock Synchronization & Lamport Ordering",
    description: "Assesses understanding of drift rates, logical vs physical clocks, and happened-before relations.",
    durationMinutes: 20,
    totalQuestions: 4,
    passingScore: 70,
    dueDate: "2026-10-08T23:59:00Z",
    questions: [
      {
        id: "q1",
        prompt: "According to Lamport's Happened-Before relation, if event A and event B occur in different processes without message exchange:",
        options: [
          "Event A definitely happened before B",
          "Event B definitely happened before A",
          "Events A and B are concurrent (A || B)",
          "A causal cycle is created",
        ],
        correctAnswer: 2,
        explanation: "Without a message or transitive causal link between independent processes, the two events are concurrent.",
      },
      {
        id: "q2",
        prompt: "Which consensus algorithm uses a randomized election timeout to resolve split-vote situations efficiently?",
        options: ["Two-Phase Commit (2PC)", "Raft", "Basic Paxos", "Vector Timestamping"],
        correctAnswer: 1,
        explanation: "Raft specifies randomized election timeouts to ensure split votes are broken quickly.",
      },
      {
        id: "q3",
        prompt: "In a system with N nodes that tolerates f crash failures under Paxos or Raft, what is the minimum quorum size?",
        options: ["f + 1", "2f + 1", "f / 2", "N - 1"],
        correctAnswer: 1,
        explanation: "To survive f failures, a majority quorum requires at least 2f + 1 total nodes.",
      },
      {
        id: "q4",
        prompt: "What does the CAP theorem state regarding network partitions (P)?",
        options: [
          "Network partitions never happen in modern datacenters",
          "When a partition occurs, a distributed system must choose between consistency and availability",
          "A partition guarantees both perfect consistency and zero latency",
          "Partitions can be resolved without message passing",
        ],
        correctAnswer: 1,
        explanation: "Under network partition, nodes cannot communicate across splits; thus the system must either accept stale data or reject writes.",
      },
    ],
    userAttempt: {
      score: 100,
      completedAt: "2026-09-25T16:40:00Z",
      answers: { q1: 2, q2: 1, q3: 1, q4: 1 },
    },
  },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: "att-1", courseId: "crs-cs301", courseCode: "CS-301", courseTitle: "Advanced Distributed Systems", studentId: "usr-stu-1", studentName: "Alex Rivera", date: "2026-09-16", status: "present" },
  { id: "att-2", courseId: "crs-cs301", courseCode: "CS-301", courseTitle: "Advanced Distributed Systems", studentId: "usr-stu-1", studentName: "Alex Rivera", date: "2026-09-14", status: "present" },
  { id: "att-3", courseId: "crs-cs301", courseCode: "CS-301", courseTitle: "Advanced Distributed Systems", studentId: "usr-stu-1", studentName: "Alex Rivera", date: "2026-09-09", status: "present" },
  { id: "att-4", courseId: "crs-cs301", courseCode: "CS-301", courseTitle: "Advanced Distributed Systems", studentId: "usr-stu-1", studentName: "Alex Rivera", date: "2026-09-07", status: "late" },
  { id: "att-5", courseId: "crs-cs301", courseCode: "CS-301", courseTitle: "Advanced Distributed Systems", studentId: "usr-stu-2", studentName: "Maya Patel", date: "2026-09-16", status: "present" },
  { id: "att-6", courseId: "crs-cs301", courseCode: "CS-301", courseTitle: "Advanced Distributed Systems", studentId: "usr-stu-3", studentName: "Jordan Lee", date: "2026-09-16", status: "absent" },
];

export const mockGrades: GradeItem[] = [
  { id: "grd-1", courseId: "crs-cs301", courseCode: "CS-301", courseTitle: "Advanced Distributed Systems", studentId: "usr-stu-1", studentName: "Alex Rivera", quizScore: 98, assignmentScore: 95, midtermScore: 92, finalScore: 94, overallScore: 94.6, gradeLetter: "A" },
  { id: "grd-2", courseId: "crs-cs301", courseCode: "CS-301", courseTitle: "Advanced Distributed Systems", studentId: "usr-stu-2", studentName: "Maya Patel", quizScore: 90, assignmentScore: 88, midtermScore: 86, finalScore: 89, overallScore: 88.2, gradeLetter: "B+" },
  { id: "grd-3", courseId: "crs-cs301", courseCode: "CS-301", courseTitle: "Advanced Distributed Systems", studentId: "usr-stu-3", studentName: "Jordan Lee", quizScore: 84, assignmentScore: 82, midtermScore: 80, finalScore: 83, overallScore: 82.1, gradeLetter: "B" },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Fall 2026 Midterm Examination Schedule Published",
    content: "The registrar has published all scheduled exam dates and hall assignments. Please review conflicts by October 1st.",
    authorName: "Dr. Eleanor Vance (Dean)",
    authorRole: "admin",
    targetRole: "all",
    createdAt: "2026-09-15T09:00:00Z",
    priority: "urgent",
  },
  {
    id: "ann-2",
    title: "Office Hours Shift for CS-301 on Wednesday",
    content: "Wednesday office hours are shifted to 3:30 PM - 5:00 PM in Turing Hall 318 due to the faculty senate meeting.",
    authorName: "Prof. Sarah Chen",
    authorRole: "faculty",
    targetRole: "student",
    createdAt: "2026-09-17T11:30:00Z",
    priority: "normal",
  },
];

// Helper data access functions
export async function getCourses(): Promise<Course[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("code", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          code: row.code,
          title: row.title,
          department: row.department,
          facultyId: row.faculty_id || "usr-fac-1",
          facultyName: row.faculty_name || "Faculty Member",
          credits: row.credits || 3,
          semester: row.semester || "Fall 2026",
          enrolledCount: row.enrolled_count || 0,
          maxCapacity: row.max_capacity || 50,
          description: row.description || "",
          status: row.status || "active",
          schedule: row.schedule || "TBA",
          location: row.location || "Campus Hall",
        }));
      }
    } catch {
      // Graceful fallback to mock courses
    }
  }
  return mockCourses;
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const courses = await getCourses();
  return courses.find((c) => c.id === id);
}

export async function getCourseModules(courseId: string): Promise<ModuleItem[]> {
  return mockModules[courseId] || [];
}

export async function getAssignments(): Promise<Assignment[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("assignments")
        .select("*, courses(code, title)")
        .order("due_date", { ascending: true });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          courseId: row.course_id,
          courseCode: (row.courses as { code?: string })?.code || "CS-301",
          courseTitle: (row.courses as { title?: string })?.title || "Course",
          title: row.title,
          description: row.description || "",
          dueDate: row.due_date,
          totalPoints: row.total_points || 100,
          submissionsCount: 0,
          gradedCount: 0,
          status: row.status || "open",
        }));
      }
    } catch {
      // Graceful fallback to mock assignments
    }
  }
  return mockAssignments;
}

export async function getAssignmentById(id: string): Promise<Assignment | undefined> {
  const assignments = await getAssignments();
  return assignments.find((a) => a.id === id);
}

export async function getQuizzes(): Promise<Quiz[]> {
  return mockQuizzes;
}

export async function getQuizById(id: string): Promise<Quiz | undefined> {
  return mockQuizzes.find((q) => q.id === id);
}

export async function getGrades(): Promise<GradeItem[]> {
  return mockGrades;
}

export async function getAttendance(): Promise<AttendanceRecord[]> {
  return mockAttendance;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          title: row.title,
          content: row.content,
          authorName: "Academic Administration",
          authorRole: "admin",
          targetRole: (row.target_role as "all" | "faculty" | "student") || "all",
          createdAt: row.created_at,
          priority: (row.priority as "normal" | "urgent") || "normal",
        }));
      }
    } catch {
      // Graceful fallback to mock announcements
    }
  }
  return mockAnnouncements;
}

export async function getUsers(): Promise<UserProfile[]> {
  return mockUsers;
}

export async function getUserProfile(role: UserRole = "student"): Promise<UserProfile> {
  return mockUsers.find((u) => u.role === role) || mockUsers[0];
}
