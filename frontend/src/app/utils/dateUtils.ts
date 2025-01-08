// Format date (e.g., Jun 01, 2024)
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

// Format time (e.g., 19:00)
export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

// Format date (e.g., 2025-01-01)
export const formatISODate = (date: Date) => {
  return date.toString().split("T")[0];
};
