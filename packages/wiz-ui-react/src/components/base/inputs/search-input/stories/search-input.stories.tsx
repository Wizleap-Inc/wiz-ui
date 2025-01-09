/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent, within } from "@storybook/testing-library";
import { useState } from "react";

import { WizIPublic } from "@/components/icons";

import { WizSearchInput } from "..";

import {
  debugOptions,
  emptyMessageOptions,
  longLabelOptions,
  normalOptions,
  taggedOptions,
} from "./dummy-data";

const meta: Meta<typeof WizSearchInput> = {
  title: "Base/Input/SearchInput",
  component: WizSearchInput,
};

export default meta;
type Story = StoryObj<typeof WizSearchInput<number>>;

const Template: Story = {
  render: (args) => {
    const [values, setValues] = useState<number[]>(args.values || []);
    return (
      <div>
        <div>values:[{values.join(", ")}]</div>
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

export const Tag: Story = {
  ...Template,
  args: {
    options: taggedOptions,
    placeholder: "氏名・ID・電話番号で検索",
    inputWidth: "15rem",
    popupWidth: "20rem",
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

export const DisabledWithValues: Story = {
  ...Template,
  args: {
    values: [2, 3],
    options: normalOptions,
    placeholder: "氏名・ID・電話番号で検索",
    inputWidth: "15rem",
    disabled: true,
    showSelectedItem: true,
  },
};

export const SingleSelect: Story = {
  ...Template,
  args: {
    options: normalOptions,
    placeholder: "氏名・ID・電話番号で検索",
    singleSelect: true,
    inputWidth: "15rem",
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
  play: async (args) => {
    await Template.play?.(args);
    userEvent.hover(screen.getByText("テスト会社1"));
  },
};

export const ShowSelectedItemTag: Story = {
  ...Template,
  args: {
    options: normalOptions,
    placeholder: "氏名・ID・電話番号で検索",
    singleSelect: true,
    inputWidth: "15rem",
    showSelectedItem: true,
  },
};

export const ShowParentLabel: Story = {
  ...Template,
  args: {
    options: normalOptions,
    placeholder: "氏名・ID・電話番号で検索",
    singleSelect: true,
    inputWidth: "15rem",
    showSelectedItem: true,
    showParentLabel: true,
  },
};
