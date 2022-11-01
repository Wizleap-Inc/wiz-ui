import { mount } from "@vue/test-utils";

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
      const wrapper = mount(GradientButton, {
        slots: {
          default: "Hello World!",
        },
      });
      expect(wrapper.html()).contains("Hello World!");
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
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
    });

    it("disabled時clickイベントが発火されないか", async () => {
      const wrapper = mount(GradientButton, {
        propsData: {
          disabled: true,
        },
      });
      await wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeFalsy();
    });
  });
});
