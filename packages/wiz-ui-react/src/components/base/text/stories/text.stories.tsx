import { Meta, StoryObj } from "@storybook/react";
import {
  FONT_SIZE_ACCESSORS,
  COLOR_MAP_ACCESSORS,
  WHITE_SPACE_MAP_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizText, Props } from "../components/text";

const meta: Meta<typeof WizText> = {
  title: "Base/Text",
  component: WizText,
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["p", "span", "label"],
    },
    htmlFor: {
      control: { type: "text" },
    },
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    bold: {
      control: { type: "boolean" },
    },
    maxLines: {
      control: { type: "number" },
    },
    lineHeight: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    whiteSpace: {
      control: { type: "select" },
      options: WHITE_SPACE_MAP_ACCESSORS,
    },
    dummyValue: {
      control: { type: "text" },
    },
    textAlign: {
      control: { type: "select" },
      options: ["start", "end", "left", "right", "center"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizText>;

const Template = (args: Props) => <WizText {...args} />;

const MaxLinesTemplate = (args: Props) => (
  <div style={{ display: "flex", gap: "1rem" }}>
    <div style={{ width: "200px" }}>
      <WizText {...args}>
        これはとても長いテキストです。投稿内容に依存して高さが大きくズレるため、テキストの最大行数を指定し3点ドットで対応することにします。
      </WizText>
    </div>
    <div style={{ width: "200px" }}>
      <WizText {...args}>
        WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.WhenMaxLinesIsSet,WizTextWillSetWordBreakToBreakAll.
      </WizText>
    </div>
  </div>
);

export const Paragraph: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    as: "p",
  },
};

export const Span: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    as: "span",
  },
};

export const Label: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    as: "label",
  },
};

export const Bold: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    as: "p",
    bold: true,
  },
};

export const WhiteSpace: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    as: "p",
    whiteSpace: "preLine",
  },
};

export const LineHeight: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    as: "p",
    whiteSpace: "preLine",
    lineHeight: "xl",
  },
};

export const FontSize: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    as: "p",
    fontSize: "xl",
  },
};

export const Color: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    as: "p",
    color: "blue.800",
  },
};

export const DummyValue: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    dummyValue: "ABCDEFG",
  },
};

export const lineThrough: Story = {
  render: (args) => (
    <Template {...args}>
      {"これはテキストです。\nこれはテキストです。"}
    </Template>
  ),
  args: {
    as: "p",
    lineThrough: true,
  },
};

export const MaxLines: Story = {
  render: (args) => <MaxLinesTemplate {...args} />,
  args: {
    as: "p",
    maxLines: 5,
  },
};
