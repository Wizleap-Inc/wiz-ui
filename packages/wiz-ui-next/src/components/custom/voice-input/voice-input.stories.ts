import { expect, userEvent, waitFor, within } from "@storybook/test";
import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import WizVoiceInput from "./voice-input.vue";

export default {
  title: "Custom/VoiceInput",
  component: WizVoiceInput,
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
    micDisabled: {
      control: {
        type: "boolean",
      },
    },
    expand: {
      control: {
        type: "boolean",
      },
    },
    rows: {
      control: {
        type: "number",
      },
    },
    resize: {
      control: {
        type: "select",
      },
      options: ["vertical", "none"],
    },
    isListening: {
      control: {
        type: "boolean",
      },
    },
    maxWidth: {
      control: {
        type: "text",
      },
    },
    minWidth: {
      control: {
        type: "text",
      },
    },
    onMicClick: {
      action: "micClick",
    },
  },
} as Meta<typeof WizVoiceInput>;

const Template: StoryFn<typeof WizVoiceInput> = (args) => ({
  components: { WizVoiceInput },
  setup() {
    const value = ref("");
    const handleMicClick = () => {
      console.log("Mic clicked");
    };
    return { value, args, handleMicClick };
  },
  template: `<WizVoiceInput v-bind="args" v-model="value" name="voice-input" @micClick="handleMicClick" />`,
});

export const Default = Template.bind({});
Default.args = {
  micDisabled: false,
  isListening: false,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "入力してください",
  micDisabled: false,
  isListening: false,
};

export const Expand = Template.bind({});
Expand.args = {
  expand: true,
  micDisabled: false,
  isListening: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: "入力してください",
  micDisabled: false,
  isListening: false,
};

export const Row = Template.bind({});
Row.args = {
  rows: 5,
  placeholder: "入力してください",
  micDisabled: false,
  isListening: false,
};

export const Listening = Template.bind({});
Listening.args = {
  placeholder: "音声入力中...",
  micDisabled: false,
  isListening: true,
};

export const Test = Template.bind({});
Test.args = {
  placeholder: "入力してください",
  micDisabled: false,
  isListening: false,
};

export const Resize = Template.bind({});
Resize.args = {
  resize: "vertical",
  placeholder: "入力してください",
  maxWidth: "400px",
  micDisabled: false,
  isListening: false,
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

const PlaygroundTemplate: StoryFn<typeof WizVoiceInput> = () => ({
  components: { WizVoiceInput },
  setup() {
    const value = ref("");
    const isListening = ref(false);

    const handleMicClick = () => {
      isListening.value = !isListening.value;
      if (isListening.value) {
        setTimeout(() => {
          isListening.value = false;
        }, 3000);
      }
    };

    return { value, isListening, handleMicClick };
  },
  template: `
    <div>
      <p>入力値：{{ value }}</p>
      <WizVoiceInput
        placeholder="入力してください"
        v-model="value"
        :mic-disabled="false"
        :is-listening="isListening"
        @micClick="handleMicClick"
      />
    </div>
  `,
});

export const Playground = PlaygroundTemplate.bind({});
