import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns";

export const getTimeDifference = (date: string | Date) => {
  const postDate = new Date(date);

  if (isToday(postDate)) {
    return formatDistanceToNow(postDate, { addSuffix: true });
  }

  if (isYesterday(postDate)) {
    return "Yesterday";
  }

  if (new Date().getFullYear() === postDate.getFullYear()) {
    // If it's within the same year, show date without year
    return format(postDate, "MMM d");
  }

  // For older posts, include the year
  return format(postDate, "MMM d, yyyy");
};
