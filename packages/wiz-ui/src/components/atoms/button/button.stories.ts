import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn } from "@storybook/vue";

import WizButton from "./button.vue";

export default {
  title: "Atoms/Button",
  component: WizButton,
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
  components: { WizButton },
  template: `<WizButton v-bind="$props">{{ slot }}</WizButton>`,
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
  components: { WizButton },
  template: `
    <table>
      <tr style="border-bottom: 1px solid #ccc;">
        <td style="padding: 1rem;"><WizButton variant="primary">保存する</WizButton></td>
        <td style="padding: 1rem;">variant = primary</td>
      </tr>
      <tr>
        <td style="padding: 1rem;"><WizButton variant="sub">保存する</WizButton></td>
        <td style="padding: 1rem;">variant = sub</td>
      </tr>
    </table>
  `,
});

export const Variant = VariantTemplate.bind({});

const SizeTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizButton },
  template: `
    <table>
      <tr style="border-bottom: 1px solid #ccc;">
        <td style="padding: 1rem;"><WizButton size="sm">保存する</WizButton></td>
        <td style="padding: 1rem;">size = sm</td>
      </tr>
      <tr>
        <td style="padding: 1rem;"><WizButton size="md">保存する</WizButton></td>
        <td style="padding: 1rem;">size = md</td>
      </tr>
      <tr>
        <td style="padding: 1rem;"><WizButton size="lg">保存する</WizButton></td>
        <td style="padding: 1rem;">size = lg</td>
      </tr>
    </table>
  `,
});

export const Size = SizeTemplate.bind({});

export const Expand = Template.bind({});
Expand.args = {
  expand: true,
  slot: "保存する",
};
