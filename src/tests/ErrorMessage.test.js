// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";

describe("ErrorMessage", () => {
  it("displays the provided error message", () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "Test error message",
      },
      attachTo: document.body,
    });

    expect(document.body.textContent).toContain("Test error message");

    wrapper.unmount();
  });

  it("shows the retry button when showRetry is true", () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "Test error message",
        showRetry: true,
      },
      attachTo: document.body,
    });

    expect(document.body.textContent).toContain("Try again");

    wrapper.unmount();
  });

  it("does not show the retry button when showRetry is false", () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "Test error message",
        showRetry: false,
      },
      attachTo: document.body,
    });

    expect(document.body.textContent).not.toContain("Try again");

    wrapper.unmount();
  });

  it("emits retry event when the retry button is clicked", () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "Test error message",
        showRetry: true,
      },
      attachTo: document.body,
    });

    const retryButton = document.body.querySelector("button");

    retryButton.click();

    expect(wrapper.emitted("retry")).toHaveLength(1);

    wrapper.unmount();
  });
});
