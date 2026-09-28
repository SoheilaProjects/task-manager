// @vitest-environment jsdom

import { describe, it, expect, vi } from "vitest";

vi.mock("@/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  RouterLink: {
    template: "<a><slot /></a>",
  },
}));

import { mount } from "@vue/test-utils";
import Login from "@/views/auth/Login.vue";
import { supabase } from "@/supabase";

describe("Login", () => {
  it("shows an error when fields are empty", async () => {
    const wrapper = mount(Login, {
      global: {
        stubs: {
          "router-link": true,
        },
      },
    });

    await wrapper.find("form").trigger("submit");

    expect(wrapper.text()).toContain("Please fill in all fields!!");
  });

  it("shows an error when login fails", async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({
      error: {
        message: "Invalid login credentials",
      },
    });

    const wrapper = mount(Login, {
      global: {
        stubs: {
          "router-link": true,
        },
      },
    });

    await wrapper
      .find('input[placeholder="Email"]')
      .setValue("test@example.com");
    await wrapper
      .find('input[placeholder="Password"]')
      .setValue("wrongpassword");

    await wrapper.find("form").trigger("submit");

    expect(wrapper.text()).toContain("Invalid login credentials");
  });
});
