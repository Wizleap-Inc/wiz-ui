import { StoryFn } from "@storybook/vue";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants/styles/color";
import { FONT_SIZE_ACCESSORS } from "@wizleap-inc/wiz-ui-constants/styles/font-size";

import { WizINotification } from "@/components/icons";

import { WizIcon } from ".";

export default {
  title: "Base/Icon",
  component: WizIcon,
  argTypes: {
    size: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    badge: {
      control: { type: "text" },
    },
    badgeColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    badgeBgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    icon: {
      control: { type: "object" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizIcon },
  template: `<WizIcon v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {
  icon: WizINotification,
};

export const Badge = Template.bind({});
Badge.args = {
  icon: WizINotification,
  badge: "10",
};
