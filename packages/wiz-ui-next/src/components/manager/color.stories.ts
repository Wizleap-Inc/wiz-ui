import { StoryFn } from "@storybook/vue3";
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { defineComponent } from "vue";

export default {
  title: "Variables/Color",
};

const ColorCircle = defineComponent({
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    style() {
      return {
        width: "3rem",
        height: "3rem",
        borderRadius: "50%",
        background: this.color,
      };
    },
  },
  template: `<div :style="style"></div>`,
});

const Template: StoryFn = (args) => ({
  components: { ColorCircle },
  setup() {
    return { ...args };
  },
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; flex-direction: column; align-items: center;" v-for="color in colors" :key="color.key">
        <ColorCircle :color="color.value" />
        <span>{{ color.key }}</span>
      </div>
    </div>
  `,
});

export const Green = Template.bind({});
Green.args = {
  colors: Array.from(Object.entries(THEME.color.green)).map(([key, value]) => ({
    key: `color.green.${key}`,
    value,
  })),
};

export const Blue = Template.bind({});
Blue.args = {
  colors: Array.from(Object.entries(THEME.color.blue)).map(([key, value]) => ({
    key: `color.blue.${key}`,
    value,
  })),
};

export const Yellow = Template.bind({});
Yellow.args = {
  colors: Array.from(Object.entries(THEME.color.yellow)).map(
    ([key, value]) => ({
      key: `color.yellow.${key}`,
      value,
    })
  ),
};

export const Red = Template.bind({});
Red.args = {
  colors: Array.from(Object.entries(THEME.color.red)).map(([key, value]) => ({
    key: `color.red.${key}`,
    value,
  })),
};

export const Gray = Template.bind({});
Gray.args = {
  colors: Array.from(Object.entries(THEME.color.gray)).map(([key, value]) => ({
    key: `color.gray.${key}`,
    value,
  })),
};

export const Others = Template.bind({});
Others.args = {
  colors: [
    {
      key: "color.gradient",
      value: THEME.color.gradient,
    },
    {
      key: "color.transparent",
      value: THEME.color.transparent,
    },
    {
      key: "color.white.800",
      value: THEME.color.white["800"],
    },
    {
      key: "color.white.500",
      value: THEME.color.white["500"],
    },
  ],
};
