import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { ref } from "vue";

import { THEME } from "./../../../constants/styles/index";
import WizTextInput from "./text-input.vue";

import type { Story } from "@storybook/vue";

export default {
  title: "Atoms/TextInput",
  component: WizTextInput,
  argTypes: {
    value: {
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

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextInput },
  template: `<WizTextInput v-bind="$props">{{ slot }}</WizTextInput>`,
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

Test.play = async () => {
  const canvasElement = document.querySelector("#root") as HTMLElement;
  await new Promise((resolve) => setTimeout(resolve, 0));
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

export const Playground = ((_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextInput },
  setup() {
    const hoge = ref("");
    return { hoge };
  },
  template: `
    <div>
      <p>入力値：{{ hoge }}</p>
      <WizTextInput Placeholder="入力してください" v-model="hoge" />
    </div>
  `,
})).bind({});
