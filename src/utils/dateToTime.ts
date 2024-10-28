import { formatDistanceToNow, parseISO } from "date-fns";
import { bn } from "date-fns/locale";

export function dateToTime(timestamp: string): string {
  try {
    const date = parseISO(timestamp);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const timeDifference = formatDistanceToNow(date, {
      addSuffix: true,
      locale: bn,
    });

    return timeDifference.replace("ago", "আগে");
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Invalid date";
  }
}
