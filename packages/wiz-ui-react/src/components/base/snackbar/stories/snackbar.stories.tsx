/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

import { WizSnackbarProvider, WizSnackbar, useSnackbar } from "..";

const meta: Meta<typeof WizSnackbar> = {
  title: "Base/Snackbar",
  component: WizSnackbar,
};

export default meta;
type Story = StoryObj<typeof WizSnackbar>;

export const SnackBar: Story = {
  args: {
    message: "Hello World Hello World Hello World Hello World",
  },
};

export const UseSnackbar: Story = {
  decorators: [
    (Story) => (
      <WizSnackbarProvider>
        <Story />
      </WizSnackbarProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { showSnackbar } = useSnackbar();

    return (
      <div>
        <input ref={inputRef} defaultValue="Hello World" />
        <button
          onClick={() =>
            inputRef.current && showSnackbar(inputRef.current.value)
          }
        >
          Show
        </button>
      </div>
    );
  },
};
