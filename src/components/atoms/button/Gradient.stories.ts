import { expect } from "@storybook/jest";
import { screen, userEvent, waitFor } from "@storybook/testing-library";

import GradientButton from "./Gradient.vue";

import type { Story } from "@storybook/vue";

export default {
  title: "Atoms/Button/Gradient",
  component: GradientButton,
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GradientButton },
  template: `<GradientButton v-bind="$props">{{ slot }}</GradientButton>`,
});

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  slot: "Hello World!",
};
Default.play = async () => {
  const button = screen.getByRole("button");
  userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  slot: "Hello World!",
};
