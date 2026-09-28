import { describe, it, expect } from "vitest";
import {
  getToday,
  getDueStatus,
  getTaskGroupTitle,
  getGroupPriority,
  formatDate,
} from "@/utils/date.js";

describe("getDueStatus", () => {
  it("returns overdue for a past date", () => {
    const result = getDueStatus("2020-01-01");

    expect(result).toBe("overdue");
  });

  it("returns today for today's date", () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const result = getDueStatus(`${year}-${month}-${day}`);

    expect(result).toBe("today");
  });

  it("returns future for a future date", () => {
    const future = new Date();
    future.setDate(future.getDate() + 1);

    const year = future.getFullYear();
    const month = String(future.getMonth() + 1).padStart(2, "0");
    const day = String(future.getDate()).padStart(2, "0");

    const result = getDueStatus(`${year}-${month}-${day}`);

    expect(result).toBe("future");
  });

  it("returns null when date is empty", () => {
    const result = getDueStatus("");

    expect(result).toBeNull();
  });
});

describe("getToday", () => {
  it("returns today's date in YYYY-MM-DD format", () => {
    const result = getToday();

    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("returns the correct date for today", () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const expected = `${year}-${month}-${day}`;

    expect(getToday()).toBe(expected);
  });
});

describe("getTaskGroupTitle", () => {
  it("returns Today for today's date", () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const todayString = `${year}-${month}-${day}`;

    expect(getTaskGroupTitle(todayString)).toBe("Today");
  });

  it("returns Yesterday for yesterday's date", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");

    const yesterdayString = `${year}-${month}-${day}`;

    expect(getTaskGroupTitle(yesterdayString)).toBe("Yesterday");
  });

  it("returns Tomorrow for tomorrow's date", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    const tomorrowString = `${year}-${month}-${day}`;

    expect(getTaskGroupTitle(tomorrowString)).toBe("Tomorrow");
  });

  it("returns formatted date for a regular date", () => {
    const date = "2026-10-01";

    const result = getTaskGroupTitle(date);

    expect(result).toBe("Thu, Oct 1");
  });
});

describe("getGroupPriority", () => {
  it("returns 0 for today", () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const todayString = `${year}-${month}-${day}`;

    expect(getGroupPriority(todayString)).toBe(0);
  });

  it("returns 1 for tomorrow", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    const tomorrowString = `${year}-${month}-${day}`;

    expect(getGroupPriority(tomorrowString)).toBe(1);
  });

  it("returns 2 for a future date", () => {
    const future = new Date();
    future.setDate(future.getDate() + 3);

    const year = future.getFullYear();
    const month = String(future.getMonth() + 1).padStart(2, "0");
    const day = String(future.getDate()).padStart(2, "0");

    const futureString = `${year}-${month}-${day}`;

    expect(getGroupPriority(futureString)).toBe(2);
  });

  it("returns 3 for yesterday", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, "0");
    const day = String(yesterday.getDate()).padStart(2, "0");

    const yesterdayString = `${year}-${month}-${day}`;

    expect(getGroupPriority(yesterdayString)).toBe(3);
  });

  it("returns 4 for an older date", () => {
    const older = new Date();
    older.setDate(older.getDate() - 3);

    const year = older.getFullYear();
    const month = String(older.getMonth() + 1).padStart(2, "0");
    const day = String(older.getDate()).padStart(2, "0");

    const olderString = `${year}-${month}-${day}`;

    expect(getGroupPriority(olderString)).toBe(4);
  });
});

describe("formatDate", () => {
  it("returns formatted date", () => {
    const result = formatDate("2026-10-01");

    expect(result).toBe("Thu, Oct 1");
  });

  it("returns an empty string when date is missing", () => {
    const result = formatDate("");

    expect(result).toBe("");
  });
});
