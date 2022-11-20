import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn } from "@storybook/vue";

import WizTextButton from "./text.vue";

export default {
  title: "Atoms/Buttons/Text",
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
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextButton },
  template: `<WizTextButton v-bind="$props">{{ slot }}</WizTextButton>`,
});

export const Default = Template.bind({});
Default.args = {
  slot: "保存する",
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");
  userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  slot: "保存する",
};

export const Rounded = Template.bind({});
Rounded.args = {
  rounded: true,
  slot: "保存する",
};

const VariantTemplate: StoryFn = (args, { argTypes }) => ({
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

export const Variant = VariantTemplate.bind({});

const SizeTemplate: StoryFn = (_, { argTypes }) => ({
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

export const Size = SizeTemplate.bind({});

export const Expand = Template.bind({});
Expand.args = {
  expand: true,
  slot: "保存する",
};
