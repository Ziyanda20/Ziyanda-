const getMonths = () => [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatTime(date: Date) {
  // Get the current time
  const now = Date.now()

  // Calculate the difference in milliseconds
  const difference = now - date.getTime();

  // Handle negative difference (future date)
  if (difference < 0) {
    return "Invalid date";
  }

  // Calculate seconds, minutes, hours, and days
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Determine the unit and format the time string
  let unit;
  let formattedTime;
  if (days > 0) {
    unit = days === 1 ? "day" : "days";
    formattedTime = days + " " + unit + " ago";
  } else if (hours > 0) {
    unit = hours === 1 ? "hour" : "hours";
    formattedTime = hours + " " + unit + " ago";
  } else if (minutes > 0) {
    unit = minutes === 1 ? "minute" : "minutes";
    formattedTime = minutes + " " + unit + " ago";
  } else {
    unit = seconds === 1 ? "second" : "seconds";
    formattedTime = seconds + " " + unit + " ago";
  }

  return formattedTime;
}

export default (date: Date): string => {
  const day = date.getDate(),
    month = getMonths()[date.getMonth()],
    year = date.getFullYear().toString();

  return `${day} ${month} ${year}`;
};
