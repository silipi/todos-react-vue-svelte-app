export function formatDateToAgo(date: Date): string {
  const diffMilliseconds = new Date().getTime() - new Date(date).getTime();
  const diffSeconds = diffMilliseconds / 1000;
  const diffMinutes = diffSeconds / 60;
  const diffHours = diffMinutes / 60;

  if (diffSeconds < 10) return `now`;
  if (diffSeconds < 60) return `${diffSeconds.toFixed(0)}s ago`;
  if (diffMinutes < 60) return `${diffMinutes.toFixed(0)}m ago`;
  if (diffHours < 24) return `${diffHours.toFixed(0)}m ago`;
  if (diffHours > 24)
    return `${Math.floor(diffHours / 24)} ${
      diffHours / 24 < 2 ? "day" : "days"
    } ago`;
}
