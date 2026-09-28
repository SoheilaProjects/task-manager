// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FilterTask from "@/components/dashboard/tasks/FilterTask.vue";

describe("FilterTask", () => {
  it("emits filter-change when a filter is selected", async () => {
    const wrapper = mount(FilterTask);

    const buttons = wrapper.findAll("button");
    await buttons[1].trigger("click");

    expect(wrapper.emitted("filter-change")).toHaveLength(1);
    expect(wrapper.emitted("filter-change")[0]).toEqual(["pending"]);
  });

  it("opens search when the search button is clicked", async () => {
    const wrapper = mount(FilterTask);

    expect(wrapper.find('input[placeholder="Search tasks..."]').exists()).toBe(
      false,
    );

    await wrapper.find('button[title="Search tasks"]').trigger("click");

    expect(wrapper.find('input[placeholder="Search tasks..."]').exists()).toBe(
      true,
    );
  });

  it("emits search-change with the entered value", async () => {
    const wrapper = mount(FilterTask);

    await wrapper.find('button[title="Search tasks"]').trigger("click");

    const input = wrapper.find('input[placeholder="Search tasks..."]');

    await input.setValue("meeting");

    expect(wrapper.emitted("search-change")).toHaveLength(1);
    expect(wrapper.emitted("search-change")[0]).toEqual(["meeting"]);
  });

  it("clear search input when click on x mark", async () => {
    const wrapper = mount(FilterTask);

    await wrapper.find('button[title="Search tasks"]').trigger("click");

    const input = wrapper.find('input[placeholder="Search tasks..."]');

    await input.setValue("meeting");

    await wrapper.find('button[title="Clear search"]').trigger("click");

    expect(input.element.value).toBe("");
    expect(wrapper.emitted("search-change")[1]).toEqual([""]);
  });
});
