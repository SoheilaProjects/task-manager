// @vitest-environment jsdom

import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

vi.mock("@/supabase", () => ({
  supabase: {
    from: vi.fn(),
  },
}));

import { supabase } from "@/supabase";

import TaskList from "@/components/dashboard/tasks/TaskList.vue";

describe("TaskList", () => {
  it("groups tasks by scheduled date", () => {
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getDate(),
      ).padStart(2, "0")}`;

    const tasks = [
      {
        id: 1,
        title: "Task today",
        description: "",
        scheduled_date: formatDate(today),
        completed: false,
      },
      {
        id: 2,
        title: "Task tomorrow",
        description: "",
        scheduled_date: formatDate(tomorrow),
        completed: false,
      },
    ];

    const wrapper = mount(TaskList, {
      props: { tasks },
      global: {
        stubs: {
          TaskCard: true,
          ErrorMessage: true,
        },
      },
    });

    expect(wrapper.text()).toContain("Today");
    expect(wrapper.text()).toContain("Tomorrow");
  });

  it("updates task status when a task is toggled", async () => {
    const eq = vi.fn().mockResolvedValue({
      error: null,
    });

    const update = vi.fn().mockReturnValue({
      eq,
    });

    supabase.from.mockReturnValue({
      update,
    });

    const task = {
      id: 1,
      title: "Test task",
      description: "",
      scheduled_date: "2026-09-25",
      completed: false,
    };

    const wrapper = mount(TaskList, {
      props: {
        tasks: [task],
      },
      global: {
        stubs: {
          TaskCard: true,
          ErrorMessage: true,
        },
      },
    });

    await wrapper.findComponent({ name: "TaskCard" }).vm.$emit("toggle", {
      id: 1,
      completed: true,
    });

    expect(supabase.from).toHaveBeenCalledWith("tasks");
    expect(update).toHaveBeenCalledWith({ completed: true });
    expect(eq).toHaveBeenCalledWith("id", 1);
    expect(task.completed).toBe(true);
  });
});
