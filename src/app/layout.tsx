import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FacultyHub - Faculty Course Management System",
  description: "Faculty Course Management System (FCMS) for academic workflows with Admin, Faculty, and Student consoles.",
  openGraph: {
    title: "FacultyHub - Faculty Course Management System",
    description: "Faculty Course Management System (FCMS) for academic workflows with Admin, Faculty, and Student consoles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-[#0d0e15] text-[#f8fafc] min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
