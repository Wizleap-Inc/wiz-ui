import { expect, userEvent, waitFor, within } from "@storybook/test";
import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import WizTextArea from "./text-area.vue";

export default {
  title: "Base/TextArea",
  component: WizTextArea,
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
    resize: {
      control: {
        type: "select",
      },
      options: ["both", "horizontal", "vertical", "none"],
    },
    update: {
      action: "update:modelValue",
    },
  },
} as Meta<typeof WizTextArea>;

const Template: StoryFn<typeof WizTextArea> = (args) => ({
  components: { WizTextArea },
  setup() {
    const value = ref("");
    return { value, args };
  },
  template: `<WizTextArea v-bind="args" v-model="value" name="text-area" />`,
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

export const Row = Template.bind({});
Row.args = {
  rows: 5,
  placeholder: "入力してください",
};

export const Test = Template.bind({});
Test.args = {
  placeholder: "入力してください",
};

export const Resize = Template.bind({});
Resize.args = {
  resize: "both",
  placeholder: "入力してください",
  minWidth: "200px",
  maxWidth: "400px",
  minHeight: "100px",
  maxHeight: "200px",
};

Test.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByPlaceholderText("入力してください");
  await userEvent.click(textarea);
  await waitFor(() => expect(textarea).toHaveFocus());
  await userEvent.type(textarea, "Hoge");
  await waitFor(() => expect(textarea).toHaveValue("Hoge"));
  await userEvent.clear(textarea);
  await waitFor(() => expect(textarea).toHaveValue(""));
};

const PlaygroundTemplate: StoryFn<typeof WizTextArea> = (args) => ({
  components: { WizTextArea },
  setup() {
    const value = ref("");
    return { value, args };
  },
  template: `
    <div>
      <p>入力値：{{ value }}</p>
      <WizTextArea Placeholder="入力してください" v-model="value" name="text-area" @update:modelValue="args.update" />
    </div>
  `,
});

export const Playground = PlaygroundTemplate.bind({});
