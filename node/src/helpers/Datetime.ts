export function getDayDifference(date: Date) {
  // Get the current time
  const now = (new Date()).getTime()

  // Calculate the difference in milliseconds
  const difference = now - date.getTime();

  // Calculate seconds, minutes, hours, and days
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return days;
}

export const isPastDate = (date: Date) => {
  const now = (new Date()).getTime();

  // Calculate the difference in milliseconds
  return now > date.getTime()
}