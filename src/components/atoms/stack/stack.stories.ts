import { Story } from "@storybook/vue";
import Vue from "vue";

import { THEME } from "../../../constants";

import { SPACING_ACCESSORS } from "./../../../constants/styles/spacing";

import { WizStack } from ".";

const spacingControls = [
  "gap",
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
    ...spacingControls,
  },
};

const Box = Vue.component("Box", {
  template: `
    <div :style="{
      width: '8rem',
      height: '5rem',
      background: '${THEME.color.gradient}',
      boxShadow: '${THEME.shadow.md}',
      borderRadius: '${THEME.spacing.xs}'
    }"/>
  `,
});

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizStack, Box },
  template: `
    <WizStack v-bind="$props">
      <Box v-for="i in 5" :key="i"/>
    </WizStack>
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
