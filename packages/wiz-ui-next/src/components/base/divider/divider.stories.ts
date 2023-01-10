import { StoryFn, Meta } from "@storybook/vue3";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizDivider } from "@/components";

export default {
  title: "Base/Divider",
  component: WizDivider,
  argTypes: {
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: { type: "select" },
      options: ["solid", "dashed", "dotted"],
    },
  },
} as Meta<typeof WizDivider>;

const Template: StoryFn<typeof WizDivider> = (args) => ({
  components: { WizDivider },
  setup: () => ({ args }),
  template: `
    <div style="width: 300px; height: 300px; display: flex; flex-direction: column; justify-content: space-between;">
      <WizDivider v-bind="args" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: "horizontal",
};

export const Vertical = Template.bind({});
Vertical.args = {
  direction: "vertical",
};

export const Solid = Template.bind({});
Solid.args = {
  variant: "solid",
};

export const Dashed = Template.bind({});
Dashed.args = {
  variant: "dashed",
};

export const Dotted = Template.bind({});
Dotted.args = {
  variant: "dotted",
};
