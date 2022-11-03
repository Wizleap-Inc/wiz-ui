import { expect } from "@storybook/jest";
import { screen, userEvent, waitFor } from "@storybook/testing-library";

import Button from "./button.vue";

import type { Story } from "@storybook/vue";

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    rounded: {
      control: {
        type: "boolean",
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["primary", "sub"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
  },
};

const Template: Story = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: `<Button v-bind="$props">{{ slot }}</Button>`,
});

export const Default = Template.bind({});
Default.args = {
  slot: "保存する",
};
Default.play = async () => {
  const button = screen.getByRole("button");
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

export const VariantPrimary = Template.bind({});
VariantPrimary.args = {
  variant: "primary",
  slot: "保存する",
};

export const VariantSub = Template.bind({});
VariantSub.args = {
  variant: "sub",
  slot: "保存する",
};
