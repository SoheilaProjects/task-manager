// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TaskForm from "@/components/dashboard/tasks/TaskForm.vue";
import { getToday } from "@/utils/date.js";

describe("TaskForm", () => {
  it("does not emit submit when title is empty", async () => {
    const wrapper = mount(TaskForm, {
      props: {
        mode: "add",
      },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("submit")).toBeUndefined();
  });

  it("does not emit submit when title contains only spaces", async () => {
    const wrapper = mount(TaskForm, {
      props: {
        mode: "add",
      },
    });

    const titleInput = wrapper.find('input[placeholder="Add title"]');

    await titleInput.setValue("   ");
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("submit")).toBeUndefined();
  });

  it("emits submit when title is valid", async () => {
    const wrapper = mount(TaskForm, {
      props: {
        mode: "add",
      },
    });

    const titleInput = wrapper.find('input[placeholder="Add title"]');

    await titleInput.setValue("My task");
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("submit")).toHaveLength(1);
  });

  it("emits the correct scheduled_date in the submit payload", async () => {
    const wrapper = mount(TaskForm, {
      props: {
        mode: "add",
      },
    });

    const titleInput = wrapper.find('input[placeholder="Add title"]');
    const dateInput = wrapper.find('input[type="date"]');

    await titleInput.setValue("My task");
    await dateInput.setValue("2026-10-01");

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("submit")[0][0].scheduled_date).toBe("2026-10-01");
  });

  it("fills the form with task data in edit mode", () => {
    const task = {
      title: "Existing task",
      description: "Task description",
      scheduled_date: "2026-10-01",
      due_date: "2026-10-05",
    };

    const wrapper = mount(TaskForm, {
      props: {
        mode: "edit",
        task,
      },
    });

    expect(wrapper.find('input[placeholder="Add title"]').element.value).toBe(
      "Existing task",
    );

    expect(wrapper.find("textarea").element.value).toBe("Task description");

    expect(wrapper.findAll('input[type="date"]')[0].element.value).toBe(
      "2026-10-01",
    );

    expect(wrapper.findAll('input[type="date"]')[1].element.value).toBe(
      "2026-10-05",
    );
  });

  it("resets the form in add mode", () => {
    const wrapper = mount(TaskForm, {
      props: {
        mode: "add",
      },
    });

    expect(wrapper.find('input[placeholder="Add title"]').element.value).toBe(
      "",
    );

    expect(wrapper.find("textarea").element.value).toBe("");

    expect(wrapper.findAll('input[type="date"]')[0].element.value).toBe(
      getToday(),
    );

    expect(wrapper.findAll('input[type="date"]')[1].element.value).toBe("");
  });
});
