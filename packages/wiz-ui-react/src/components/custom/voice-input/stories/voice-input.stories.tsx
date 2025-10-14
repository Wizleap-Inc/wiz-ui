import { Meta, StoryFn } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useState } from "react";

import { WizVoiceInput } from "../components";

export default {
  title: "Custom/VoiceInput",
  component: WizVoiceInput,
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
  },
} as Meta<typeof WizVoiceInput>;

const Template: StoryFn<typeof WizVoiceInput> = (args) => {
  const [value, setValue] = useState("");
  return (
    <WizVoiceInput
      {...args}
      value={value}
      onChange={setValue}
      onMicClick={() => console.log("Mic clicked")}
    />
  );
};

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

export const Resize = Template.bind({});
Resize.args = {
  resize: "vertical",
  placeholder: "入力してください",
  maxWidth: "400px",
  micDisabled: false,
  isListening: false,
};

export const Test = Template.bind({});
Test.args = {
  placeholder: "入力してください",
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

const PlaygroundTemplate: StoryFn<typeof WizVoiceInput> = () => {
  const [value, setValue] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleMicClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  return (
    <div>
      <p>入力値：{value}</p>
      <WizVoiceInput
        placeholder="入力してください"
        value={value}
        onChange={setValue}
        micDisabled={false}
        isListening={isListening}
        onMicClick={handleMicClick}
      />
    </div>
  );
};

export const Playground = PlaygroundTemplate.bind({});
