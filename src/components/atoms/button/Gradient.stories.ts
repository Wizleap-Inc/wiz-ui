import { userEvent, within, waitFor } from "@storybook/testing-library";
import type { Story } from "@storybook/vue";

import GradientButton from "./Gradient.vue";

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
Default.play = async ({ canvasElement }) => {
  const button = within(canvasElement).getByRole("button");
  userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  slot: "Hello World!",
};
