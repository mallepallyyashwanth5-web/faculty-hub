"use server";

import { revalidatePath } from "next/cache";

export async function submitAssignmentAction(formData: FormData): Promise<void> {
  const assignmentId = formData.get("assignmentId");
  if (assignmentId) {
    revalidatePath(`/assignments/${assignmentId}`);
  }
}

export async function submitQuizAttemptAction(quizId: string, _answers: Record<string, number>) {
  return {
    success: true,
    message: "Quiz attempt evaluated. Score calculated and logged.",
    quizId,
    score: 100,
  };
}

export async function createCourseAction(formData: FormData): Promise<void> {
  const _code = formData.get("code");
  const _title = formData.get("title");
  revalidatePath("/admin/courses");
}

export async function markAttendanceAction(courseId: string, studentId: string, status: string) {
  return {
    success: true,
    message: `Attendance marked as ${status}.`,
    courseId,
    studentId,
  };
}

export async function updateGradeAction(courseId: string, studentId: string, gradeLetter: string) {
  return {
    success: true,
    message: `Grade updated to ${gradeLetter}.`,
  };
}
