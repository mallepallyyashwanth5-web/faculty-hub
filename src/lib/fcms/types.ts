export type UserRole = "admin" | "faculty" | "student";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  department: string;
  avatarUrl?: string;
  joinedDate: string;
  status: "active" | "pending" | "inactive";
  phone?: string;
  officeLocation?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  facultyId: string;
  facultyName: string;
  credits: number;
  semester: string;
  enrolledCount: number;
  maxCapacity: number;
  description: string;
  status: "active" | "archived" | "upcoming";
  schedule: string;
  location: string;
}

export interface ModuleItem {
  id: string;
  courseId: string;
  week: number;
  title: string;
  description: string;
  materialsCount: number;
  materials: {
    id: string;
    title: string;
    type: "pdf" | "slides" | "code" | "video";
    size: string;
    url: string;
  }[];
}

export interface Assignment {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  submissionsCount: number;
  gradedCount: number;
  status: "open" | "closed" | "graded";
  submission?: {
    id: string;
    studentId: string;
    studentName: string;
    submittedAt: string;
    fileUrl?: string;
    fileName?: string;
    grade?: number;
    feedback?: string;
    status: "submitted" | "graded" | "late";
  };
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  passingScore: number;
  dueDate: string;
  userAttempt?: {
    score: number;
    completedAt: string;
    answers: Record<string, number>;
  };
}

export interface AttendanceRecord {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
}

export interface GradeItem {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  quizScore: number;
  assignmentScore: number;
  midtermScore: number;
  finalScore: number;
  overallScore: number;
  gradeLetter: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: UserRole;
  targetRole: "all" | "faculty" | "student";
  createdAt: string;
  priority: "normal" | "urgent";
}
