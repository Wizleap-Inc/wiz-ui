import { Story } from "@storybook/vue";
import Vue from "vue";
import { ref } from "vue";

import { THEME } from "../../../constants";

import { SPACING_ACCESSORS } from "./../../../constants/styles/spacing";

import { WizStack } from ".";

const spacingControls = [
  "gap",
  "gx",
  "gy",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
].reduce((acc, key) => {
  acc[key] = {
    control: {
      type: "select",
      options: SPACING_ACCESSORS,
    },
  };
  return acc;
}, {});

export default {
  title: "Atoms/Stack",
  component: WizStack,
  argTypes: {
    direction: {
      control: {
        type: "select",
        options: ["horizontal", "vertical"],
      },
    },
    align: {
      control: {
        type: "select",
        options: ["start", "center", "end", "stretch"],
      },
    },
    justify: {
      control: {
        type: "select",
        options: ["start", "center", "end", "between", "around", "evenly"],
      },
    },
    wrap: {
      control: {
        type: "boolean",
      },
    },
    ...spacingControls,
  },
};

const Box = Vue.component("Box", {
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  template: `
    <div :style="{
      width: index + 4 + 'rem',
      height: index + 2 + 'rem',
      background: '${THEME.color.gradient}',
      boxShadow: '${THEME.shadow.md}',
      borderRadius: '${THEME.spacing.xs}'
    }"/>
  `,
});

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizStack, Box },
  setup() {
    const boxCount = ref<number>(5);
    return {
      boxCount,
    };
  },
  template: `
    <div style="width: 100%; height: 100%; background: ${THEME.color.gray[300]}; padding: ${THEME.spacing.xl2}; box-sizing: border-box;">
      <label for="boxCountInput">箱の数（デバッグ用）</label>
      <input type="number" id="boxCountInput" v-model="boxCount" style="margin-bottom: ${THEME.spacing.lg};"/>
      <WizStack v-bind="$props">
        <Box v-for="i in +boxCount > 0 ? +boxCount : 1" :index="i" :key="i"/>
      </WizStack>
    </div>
  `,
});

export const Default = Template.bind({});

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: "horizontal",
};

export const Vertical = Template.bind({});
Vertical.args = {
  direction: "vertical",
};
