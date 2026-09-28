// @vitest-environment jsdom

import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

vi.mock("@/supabase", () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
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

import { supabase } from "@/supabase";
import Signup from "@/views/auth/Signup.vue";

describe("Signup", () => {
  it("shows an error when signup fails", async () => {
    supabase.auth.signUp.mockResolvedValue({
      error: {
        message: "Email already registered",
      },
    });

    const wrapper = mount(Signup, {
      global: {
        stubs: {
          "router-link": true,
        },
      },
    });

    await wrapper
      .find('input[placeholder="Email"]')
      .setValue("test@example.com");

    await wrapper.find('input[placeholder="Password"]').setValue("12345678");

    await wrapper.find("form").trigger("submit");

    expect(wrapper.text()).toContain("Email already registered");
  });
});
