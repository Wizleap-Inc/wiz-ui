import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Button from "./button.vue";

describe("Button", () => {
  describe("Mount", () => {
    it("正常にレンダリングされるか", () => {
      const wrapper = mount(Button);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("Slot", () => {
    it("テキストが正しく表示されるか", () => {
      const slotText = "Hello World!";
      const wrapper = mount(Button, {
        slots: {
          default: slotText,
        },
      });
      expect(wrapper.html()).toContain(slotText);
    });
  });

  describe("Props", () => {
    it("disabledが正しく設定されるか", () => {
      const wrapper = mount(Button, {
        propsData: {
          disabled: true,
        },
      });
      expect(wrapper.classes()).toContain("wiz-button--disabled");
    });
  });

  describe("Emits", () => {
    it("clickイベントが発火されるか", async () => {
      const wrapper = mount(Button);
      const button = wrapper.find("button");
      await button.trigger("click");
      expect(button.emitted("click")).toBeTruthy();
    });

    it("disabled時clickイベントが発火されないか", async () => {
      const wrapper = mount(Button, {
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
