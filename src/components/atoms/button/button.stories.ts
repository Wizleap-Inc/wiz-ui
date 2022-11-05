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
    expand: {
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

export const Variant = ((args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: `
    <table>
      <tr style="border-bottom: 1px solid #ccc;">
        <td style="padding: 1rem;"><Button variant="primary">保存する</Button></td>
        <td style="padding: 1rem;">variant = primary</td>
      </tr>
      <tr>
        <td style="padding: 1rem;"><Button variant="sub">保存する</Button></td>
        <td style="padding: 1rem;">variant = sub</td>
      </tr>
    </table>
  `,
})).bind({});

export const Size = ((_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: `
    <table>
      <tr style="border-bottom: 1px solid #ccc;">
        <td style="padding: 1rem;"><Button size="sm">保存する</Button></td>
        <td style="padding: 1rem;">size = sm</td>
      </tr>
      <tr>
        <td style="padding: 1rem;"><Button size="md">保存する</Button></td>
        <td style="padding: 1rem;">size = md</td>
      </tr>
      <tr>
        <td style="padding: 1rem;"><Button size="lg">保存する</Button></td>
        <td style="padding: 1rem;">size = lg</td>
      </tr>
    </table>
  `,
})).bind({});

export const Expand = Template.bind({});
Expand.args = {
  expand: true,
  slot: "保存する",
};
