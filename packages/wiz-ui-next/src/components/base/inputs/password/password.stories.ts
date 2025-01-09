import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { Meta, StoryFn } from "@storybook/vue3";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import WizPasswordInput from "./password.vue";

export default {
  title: "Base/Input/Password",
  component: WizPasswordInput,
  argTypes: {
    modelValue: {
      control: {
        type: "text",
      },
    },
    id: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    input: {
      action: "input",
    },
  },
} as Meta<typeof WizPasswordInput>;

const Template: StoryFn<typeof WizPasswordInput> = (args) => ({
  components: { WizPasswordInput },
  setup() {
    const value = ref("");
    return { value, args };
  },
  template: `<WizPasswordInput v-bind="args" v-model="value" name="text-input" @update:modelValue="args.input"/>`,
});

export const Default = Template.bind({});
Default.args = {};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "パスワードを入力",
};

export const Expand = Template.bind({});
Expand.args = {
  expand: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: "パスワードを入力",
};

export const Test = Template.bind({});
Test.args = {
  placeholder: "パスワードを入力",
};

Test.play = async ({ canvasElement }) => {
  const DUMMY_PASSWORD = "example";
  const canvas = within(canvasElement);
  const input = canvas.getByPlaceholderText("パスワードを入力");
  const visibleToggle = canvas.getByLabelText(
    ARIA_LABELS.PASSWORD_VISIBLE_TOGGLE
  );

  await userEvent.click(input);
  await waitFor(() => expect(input).toHaveFocus());
  await userEvent.type(input, DUMMY_PASSWORD);
  await waitFor(() => expect(input).toHaveAttribute("type", "password"));
  await waitFor(() => expect(input).toHaveValue(DUMMY_PASSWORD));
  await userEvent.click(visibleToggle);
  await waitFor(() => expect(input).toHaveAttribute("type", "text"));
  await waitFor(() => expect(input).toHaveValue(DUMMY_PASSWORD));
};

const PlaygroundTemplate: StoryFn = (args) => ({
  components: { WizPasswordInput },
  setup() {
    const value = ref("");
    return { value, args };
  },
  template: `
    <div>
      <p>入力値：{{ value }}</p>
      <WizPasswordInput v-bind="args" v-model="value" name="text-input" />
    </div>
  `,
});

export const Playground = PlaygroundTemplate.bind({});
