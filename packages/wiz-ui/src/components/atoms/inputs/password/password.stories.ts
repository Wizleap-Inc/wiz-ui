import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { THEME } from "./../../../constants/styles/index";
import WizPasswordInput from "./password-input.vue";

export default {
  title: "Atoms/Input/Password",
  component: WizPasswordInput,
  argTypes: {
    visible: {
      control: { type: "boolean" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPasswordInput },
  template: `<WizPasswordInput v-bind="$props" />`,
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
  components: { WizPasswordInput },
  setup() {
    const hoge = ref("");
    return { hoge };
  },
  template: `
    <div>
      <p>入力値：{{ hoge }}</p>
      <WizPasswordInput Placeholder="入力してください" v-model="hoge" />
    </div>
  `,
});

export const Playground = PlaygroundTemplate.bind({});
