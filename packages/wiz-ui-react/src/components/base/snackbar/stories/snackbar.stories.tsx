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

export const Default: Story = {
  args: {
    message: "Hello World Hello World Hello World Hello World",
  },
};

export const Expand: Story = {
  args: {
    message: "Hello World Hello World Hello World Hello World",
    expand: true,
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
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story: `WizSnackbarProviderとuseSnackbarを用いて、showSnackbar関数にmessageを渡すとSnackbarが表示されます。`,
      },
    },
  },
};

export const UseSnackbarWithExpand: Story = {
  decorators: [
    (Story) => (
      <WizSnackbarProvider>
        <Story />
      </WizSnackbarProvider>
    ),
  ],
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { showSnackbar } = useSnackbar();

    return (
      <div>
        <input ref={inputRef} defaultValue="Hello World" />
        <button
          onClick={() =>
            inputRef.current && showSnackbar(inputRef.current.value, true)
          }
        >
          Show
        </button>
      </div>
    );
  },
  parameters: {
    layout: "centered",
  },
};
