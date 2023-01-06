import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn } from "@storybook/vue";

import { WizIAdd } from "@/components/icons";

import WizTextButton from "./text.vue";

export default {
  title: "Base/Buttons/Text",
  component: WizTextButton,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    rounded: {
      control: { type: "boolean" },
    },
    expand: {
      control: { type: "boolean" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "sub"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    icon: {
      control: { type: "object" },
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    onClick: {
      action: "onClick",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextButton },
  template: `<WizTextButton v-bind="$props" @click="onClick">{{ "保存する" }}</WizTextButton>`,
});

export const Default = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");
  await userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Angled = Template.bind({});
Angled.args = {
  rounded: false,
};

export const Expand = Template.bind({});
Expand.args = {
  expand: true,
};

export const Icon = Template.bind({});
Icon.args = {
  icon: WizIAdd,
};

export const IconPosition = Template.bind({});
IconPosition.args = {
  icon: WizIAdd,
  iconPosition: "right",
};

export const Variant: StoryFn = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextButton },
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <WizTextButton variant="primary">保存する</WizTextButton>
      <div>variant = primary</div>
      <WizTextButton variant="sub">保存する</WizTextButton>
      <div>variant = sub</div>
    </div>
  `,
});

export const Size: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextButton },
  template: `
    <div style="display: grid; grid-template-columns: max-content max-content; grid-gap: 1rem; align-items: center;">
      <WizTextButton size="sm">保存する</WizTextButton>
      <div>size = sm</div>
      <WizTextButton size="md">保存する</WizTextButton>
      <div>size = md</div>
      <WizTextButton size="lg">保存する</WizTextButton>
      <div>size = lg</div>
    </div>
  `,
});
