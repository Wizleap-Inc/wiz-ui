import { StoryFn } from "@storybook/vue";

import { COLOR_MAP_ACCESSORS } from "@/constants/styles/color";
import { SPACING_ACCESSORS } from "@/constants/styles/spacing";

import { WizAvatar } from ".";

export default {
  title: "Base/Avatar",
  component: WizAvatar,
  argTypes: {
    size: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    src: {
      control: { type: "text" },
    },
    alt: {
      control: { type: "text" },
    },
    fallback: {
      control: { type: "text" },
    },
    clickable: {
      control: { type: "boolean" },
    },
    onClick: {
      action: "onClick",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAvatar },
  template: `<WizAvatar v-bind="$props" @click="onClick" />`,
});

export const HaveImage = Template.bind({});
HaveImage.args = {
  src: "./public/images/avatar-1.png",
  alt: "avatar",
};

export const FailImage = Template.bind({});
FailImage.args = {
  src: "./public/images/avatar-0.png",
  alt: "avatar",
};

export const FailImageWithFallback = Template.bind({});
FailImageWithFallback.args = {
  src: "./public/images/avatar-0.png",
  alt: "avatar",
  fallback: "田",
};

export const Clickable = Template.bind({});
Clickable.args = {
  src: "./public/images/avatar-1.png",
  alt: "avatar",
  clickable: true,
};
