export function getToday() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTaskGroupTitle(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const taskDate = new Date(year, month - 1, day);

  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (taskDate.toDateString() === today.toDateString()) return "Today";
  if (taskDate.toDateString() === yesterday.toDateString()) return "Yesterday";
  if (taskDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return taskDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getGroupPriority(dateString) {
  const taskDate = new Date(dateString);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(taskDate);
  compareDate.setHours(0, 0, 0, 0);

  const diffDays = Math.round((compareDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 0; // Today
  if (diffDays === 1) return 1; // Tomorrow
  if (diffDays > 1) return 2; // Future
  if (diffDays === -1) return 3; // Yesterday

  return 4; // Older
}

export function getDueStatus(date) {
  if (!date) return null;

  const today = new Date();
  const taskDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  taskDate.setHours(0, 0, 0, 0);

  if (taskDate < today) return "overdue";
  if (taskDate.getTime() === today.getTime()) return "today";
  return "future";
}

export function formatDate(dateString) {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
