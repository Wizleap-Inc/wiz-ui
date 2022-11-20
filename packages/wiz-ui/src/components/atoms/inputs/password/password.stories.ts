import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import WizPasswordInput from "./password.vue";

export default {
  title: "Atoms/Input/Password",
  component: WizPasswordInput,
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
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPasswordInput },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `<WizPasswordInput v-bind="$props" v-model="value" name="text-input" />`,
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
  name: "password-input",
  placeholder: "パスワードを入力",
};

Test.play = async ({ canvasElement }) => {
  // const canvas = within(canvasElement);
  // const input = canvas.getByPlaceholderText("パスワードを入力");
  // userEvent.click(input);
  // // 1. focus check
  // await waitFor(() => expect(input).toHaveFocus());
  // // 2. type check
  // userEvent.type(input, "password");
  // await waitFor(() => expect(input).toHaveValue("password"));
  // const password = canvas.getByText("password");
  // // 3. password is hidden
  // expect(password).not.toBeVisible();
  // const showPassword = canvas.getAllByRole("div", {
  //   name: "password-input",
  // })[1];
  // console.log(showPassword);
  // // 4. click visible button
  // userEvent.click(showPassword);
  // // 5. password is visible
  // await waitFor(() => expect(password).toBeVisible());
};

const PlaygroundTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPasswordInput },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `
    <div>
      <p>入力値：{{ value }}</p>
      <WizPasswordInput Placeholder="パスワードを入力" v-model="value" name="text-input" />
    </div>
  `,
});

export const Playground = PlaygroundTemplate.bind({});
