import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return String(dateString);
    const year = d.getUTCFullYear();
    const month = MONTHS[d.getUTCMonth()];
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${month} ${day}, ${year}`;
  } catch {
    return String(dateString);
  }
}

export function formatDateTime(dateString?: string | null): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return String(dateString);
    const year = d.getUTCFullYear();
    const month = MONTHS[d.getUTCMonth()];
    const day = String(d.getUTCDate()).padStart(2, "0");
    const hours = String(d.getUTCHours()).padStart(2, "0");
    const minutes = String(d.getUTCMinutes()).padStart(2, "0");
    return `${month} ${day}, ${year} ${hours}:${minutes} UTC`;
  } catch {
    return String(dateString);
  }
}
