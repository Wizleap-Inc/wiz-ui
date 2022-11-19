import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizChatForm } from "@/components/molecules/chat-form";

export default {
  title: "Molecules/Chat/Form",
  component: WizChatForm,
  argTypes: {
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
    value: {
      control: {
        type: "text",
      },
    },
    input: {
      action: "input",
    },
    submit: {
      action: "submit",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizChatForm },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `<WizChatForm v-bind="$props" v-model="value" @input="input" @submit="submit" />`,
});

export const Default = Template.bind({});
Default.args = {};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "入力してください",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
