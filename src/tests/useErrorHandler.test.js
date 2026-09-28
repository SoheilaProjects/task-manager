// @vitest-environment jsdom

import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { useErrorHandler } from "@/composables/useErrorHandler.js";

describe("useErrorHandler", () => {
  it("sets the error message when handleError is called", () => {
    let handler;

    const TestComponent = defineComponent({
      setup() {
        handler = useErrorHandler();
        return {};
      },
      template: "<div></div>",
    });

    mount(TestComponent);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    handler.handleError(new Error("Test error"), "Test error message");

    expect(handler.errorMessage.value).toBe("Test error message");

    consoleErrorSpy.mockRestore();
  });

  it("clears the error message after 5 seconds", () => {
    vi.useFakeTimers();

    let handler;

    const TestComponent = defineComponent({
      setup() {
        handler = useErrorHandler();
        return {};
      },
      template: "<div></div>",
    });

    mount(TestComponent);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    handler.handleError(new Error("Test error"), "Test error message");

    expect(handler.errorMessage.value).toBe("Test error message");

    vi.advanceTimersByTime(5000);

    expect(handler.errorMessage.value).toBe("");

    vi.useRealTimers();
    consoleErrorSpy.mockRestore();
  });

  it("clears the error message when clearError is called", () => {
    let handler;

    const TestComponent = defineComponent({
      setup() {
        handler = useErrorHandler();
        return {};
      },
      template: "<div></div>",
    });

    mount(TestComponent);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    handler.handleError(new Error("Test error"), "Test error message", false);

    expect(handler.errorMessage.value).toBe("Test error message");

    handler.clearError();

    expect(handler.errorMessage.value).toBe("");

    consoleErrorSpy.mockRestore();
  });

  it("clears the timeout when the component is unmounted", () => {
    vi.useFakeTimers();

    let handler;

    const TestComponent = defineComponent({
      setup() {
        handler = useErrorHandler();
        return {};
      },
      template: "<div></div>",
    });

    const wrapper = mount(TestComponent);

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    handler.handleError(new Error("Test error"), "Test error message");

    expect(vi.getTimerCount()).toBe(1);

    wrapper.unmount();

    expect(vi.getTimerCount()).toBe(0);

    vi.useRealTimers();
    consoleErrorSpy.mockRestore();
  });
});
