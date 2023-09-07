/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";

import { WizIPublic } from "@/components/icons";

import { WizSearchInput } from "..";

import {
  normalOptions,
  longLabelOptions,
  debugOptions,
  emptyMessageOptions,
} from "./dummy-data";

const meta: Meta<typeof WizSearchInput> = {
  title: "Base/Input/SearchInput",
  component: WizSearchInput,
};

export default meta;
type Story = StoryObj<typeof WizSearchInput>;

const Template: Story = {
  render: (args) => {
    const [values, setValues] = useState<number[]>([]);
    return (
      <div>
        values:[{values.join(", ")}]
        <WizSearchInput
          {...args}
          values={values}
          onChangeValues={(changed) => setValues(changed)}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = canvas.getByRole("textbox");
    userEvent.click(textbox);
    textbox.blur();
  },
};

export const Default: Story = {
  ...Template,
  args: {
    options: normalOptions,
    placeholder: "氏名・ID・電話番号で検索",
    inputWidth: "15rem",
  },
};

export const LongLabel: Story = {
  ...Template,
  args: {
    options: longLabelOptions,
    placeholder: "氏名・ID・電話番号で検索",
    inputWidth: "15rem",
    popupWidth: "10rem",
  },
};

export const Expand: Story = {
  ...Template,
  args: {
    options: normalOptions,
    placeholder: "氏名・ID・電話番号で検索",
    expand: true,
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    options: normalOptions,
    placeholder: "氏名・ID・電話番号で検索",
    inputWidth: "15rem",
    disabled: true,
  },
};

export const IsDirectionFixed: Story = {
  ...Template,
  args: {
    options: normalOptions,
    placeholder: "氏名・ID・電話番号で検索",
    inputWidth: "15rem",
    isDirectionFixed: true,
  },
};

export const Icon: Story = {
  ...Template,
  args: {
    options: normalOptions,
    placeholder: "氏名・ID・電話番号で検索",
    inputWidth: "15rem",
    isDirectionFixed: true,
    icon: WizIPublic,
  },
};

export const Debug: Story = {
  ...Template,
  args: {
    options: debugOptions,
    placeholder: "氏名・ID・電話番号で検索",
    inputWidth: "15rem",
    popupWidth: "25rem",
  },
};

export const EmptyMessage: Story = {
  ...Template,
  args: {
    options: emptyMessageOptions,
    placeholder: "氏名・ID・電話番号で検索",
    inputWidth: "15rem",
  },
};
