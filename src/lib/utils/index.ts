import { format, isThisYear, isToday, isYesterday, differenceInMinutes, differenceInDays } from "date-fns";

export const getTimeDifference = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();

  const diffInMinutes = differenceInMinutes(now, dateObj);
  const diffInDays = differenceInDays(now, dateObj);

  // Less than 1 minute
  if (diffInMinutes < 1) {
    return "Just now";
  }

  // Less than 1 hour
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  // Today (but more than 1 hour ago)
  if (isToday(dateObj)) {
    return format(dateObj, "h:mm a");
  }

  // Yesterday
  if (isYesterday(dateObj)) {
    return "Yesterday";
  }

  // Less than 7 days (but not today/yesterday)
  if (diffInDays < 7) {
    return `${diffInDays}d`;
  }

  // This year (but more than 7 days ago)
  if (isThisYear(dateObj)) {
    return format(dateObj, "MMM d");
  }

  // Older than this year
  return format(dateObj, "MMM d, yyyy");
};
