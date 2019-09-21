export function formatDate(date: Date, format: string) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return [
    ["YYYY", year],
    ["YY", year.slice(-2)],
    ["MM", month.padStart(2, "0")],
    ["M", month],
    ["DD", day.padStart(2, "0")],
    ["D", day]
  ].reduce((str, [key, value]) => str.replace(key, value), format);
}

export function daysUntil(date: Date) {
  return Math.ceil((date.valueOf() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function sprintDateInfo(startDate: Date, endDate: Date) {
  const daysUntilStart = daysUntil(startDate);
  const daysUntilEnd = daysUntil(endDate);
  // Sprint has ended.
  if (daysUntilEnd <= 0) {
    return `Ended ${-daysUntilEnd} days ago`;
  }
  // Sprint is running.
  else if (daysUntilStart > 0) {
    return `Ending in ${daysUntilEnd} days`;
  } else {
    return `Starting in ${daysUntilStart} days`;
  }
}
