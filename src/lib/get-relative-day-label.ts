import { format, isThisWeek, isToday, isYesterday } from "date-fns";

export function getRelativeDayLabel(dateString: string) {
  if (isToday(new Date(dateString))) return "Today";

  if (isYesterday(new Date(dateString))) return "Yesterday";

  if (isThisWeek(new Date(dateString)))
    return format(new Date(dateString), "EEEE");

  return format(new Date(dateString), "d MMM yyyy");
}
