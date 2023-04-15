import { Meta, StoryFn } from "@storybook/vue3";
import { THEME, SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { defineComponent, ref } from "vue";

import { WizStack } from ".";

const spacingKeys = [
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
];

const spacingControls = spacingKeys.reduce((acc, key) => {
  acc[key] = {
    control: { type: "select" },
    options: SPACING_ACCESSORS,
  };
  return acc;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, {} as Record<string, any>);

export default {
  title: "Base/Stack",
  component: WizStack,
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: { type: "select" },
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: {
      control: { type: "boolean" },
    },
    reverse: {
      control: { type: "boolean" },
    },
    position: {
      control: { type: "select" },
      options: ["relative", "absolute", "fixed", "sticky", "static"],
    },
    ...spacingControls,
  },
} as Meta<typeof WizStack>;

const Box = defineComponent({
  props: {
    // eslint-disable-next-line vue/no-unused-properties
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

const Template: StoryFn<typeof WizStack> = (args) => ({
  components: { WizStack, Box },
  setup() {
    const boxCount = ref<number>(5);
    return {
      args,
      boxCount,
    };
  },
  template: `
    <div style="width: 100%; height: 100%; background: ${THEME.color.gray[300]}; padding: ${THEME.spacing.xl2}; box-sizing: border-box;">
      <label for="boxCountInput">箱の数（デバッグ用）</label>
      <input type="number" id="boxCountInput" v-model="boxCount" style="margin-bottom: ${THEME.spacing.lg};"/>
      <WizStack v-bind="args">
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
