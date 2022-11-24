import { StoryFn } from "@storybook/vue";

import { WizDivider } from "@/components";
import { COLOR_MAP_ACCESSORS } from "@/constants/styles/color";

export default {
  title: "Atoms/Divider",
  component: WizDivider,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: COLOR_MAP_ACCESSORS,
      },
    },
    direction: {
      control: {
        type: "select",
        options: ["horizontal", "vertical"],
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["solid", "dashed", "dotted"],
      },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizDivider },
  template: `
    <div style="width: 300px; height: 300px; display: flex; flex-direction: column; justify-content: space-between;">
      <WizDivider v-bind="$props" />
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
