import {
  isToday,
  isYesterday,
  isThisWeek,
  format,
  differenceInMinutes,
} from "date-fns";

export function formatLastMessageDate(date: Date | string, now: Date): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (differenceInMinutes(now, d) < 1) {
    return "now";
  }

  if (isToday(d)) {
    return format(date, "hh:mm a"); // 14:35
  }

  if (isYesterday(d)) {
    return "Yesterday";
  }

  if (isThisWeek(d)) {
    return format(date, "EEEE"); // Monday, Tuesday...
  }

  return format(d, "dd/MM/yyyy"); // 12/03/2024
}
