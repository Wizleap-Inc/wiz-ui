import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { THEME } from "@/constants/styles/index";

import WizTextInput from "./text.vue";

export default {
  title: "Atoms/Input/Text",
  component: WizTextInput,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    name: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    expand: {
      control: {
        type: "boolean",
      },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextInput },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `<WizTextInput v-bind="$props" v-model="value" name="text-input" />`,
});

export const Default = Template.bind({});
Default.args = {};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "入力してください",
};

export const Expand = Template.bind({});
Expand.args = {
  expand: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: "入力してください",
};

export const Test = Template.bind({});
Test.args = {
  placeholder: "入力してください",
};

Test.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByPlaceholderText("入力してください");
  userEvent.click(input);
  await waitFor(() => expect(input).toHaveFocus());
  await waitFor(() =>
    expect(input).toHaveStyle(`border: 1px solid ${THEME.color.green[800]};`)
  );
  userEvent.type(input, "Hoge");
  await waitFor(() => expect(input).toHaveValue("Hoge"));
  userEvent.clear(input);
  await waitFor(() => expect(input).toHaveValue(""));
};

const PlaygroundTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextInput },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `
    <div>
      <p>入力値：{{ value }}</p>
      <WizTextInput Placeholder="入力してください" v-model="value" name="text-input" />
    </div>
  `,
});

export const Playground = PlaygroundTemplate.bind({});
