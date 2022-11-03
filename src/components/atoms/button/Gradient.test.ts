import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GradientButton from "./Gradient.vue";

describe("GradientButton", () => {
  describe("Mount", () => {
    it("正常にレンダリングされるか", () => {
      const wrapper = mount(GradientButton);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("Slot", () => {
    it("テキストが正しく表示されるか", () => {
      const slotText = "Hello World!";
      const wrapper = mount(GradientButton, {
        slots: {
          default: slotText,
        },
      });
      expect(wrapper.html()).toContain(slotText);
    });
  });

  describe("Props", () => {
    it("disabledが正しく設定されるか", () => {
      const wrapper = mount(GradientButton, {
        propsData: {
          disabled: true,
        },
      });
      expect(wrapper.classes()).toContain("gradient-btn--disabled");
    });
  });

  describe("Emits", () => {
    it("clickイベントが発火されるか", async () => {
      const wrapper = mount(GradientButton);
      const button = wrapper.find("button");
      await button.trigger("click");
      expect(button.emitted("click")).toBeTruthy();
    });

    it("disabled時clickイベントが発火されないか", async () => {
      const wrapper = mount(GradientButton, {
        propsData: {
          disabled: true,
        },
      });
      const button = wrapper.find("button");
      await button.trigger("click");
      expect(button.emitted("click")).toBeFalsy();
    });
  });
});
