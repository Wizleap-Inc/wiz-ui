import { Meta, StoryObj } from "@storybook/react";
import { SPACING_ACCESSORS, THEME } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { Props, WizHStack } from "../components/h-stack";

const spacingKeys = [
  "gap",
  "gx",
  "gy",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
];

const spacingControls = spacingKeys.reduce((acc, key) => {
  acc[key] = {
    control: { type: "select" },
    options: SPACING_ACCESSORS,
  };
  return acc;
}, {} as Record<string, any>);

const meta: Meta<typeof WizHStack> = {
  title: "Base/Stack/HStack",
  component: WizHStack,
  argTypes: {
    align: {
      control: { type: "select" },
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: { type: "select" },
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: {
      control: { type: "boolean" },
    },
    reverse: {
      control: { type: "boolean" },
    },
    position: {
      control: { type: "select" },
      options: ["relative", "absolute", "fixed", "sticky", "static"],
    },
    ...spacingControls,
  },
};

export default meta;
type Story = StoryObj<typeof WizHStack>;

const Box = ({ index }: { index: number }) => (
  <div
    style={{
      width: 5 + "rem",
      height: 5 + "rem",
      background: THEME.color.gradient,
      boxShadow: THEME.shadow.md,
      borderRadius: THEME.spacing.xs,
    }}
  />
);

const Boxes = (props: { count: number }) => (
  <>
    {Array.from({ length: props.count }, (_, i) => (
      <Box index={i} key={i} />
    ))}
  </>
);

const Template = (args: Props) => {
  const [boxCount, setBoxCount] = useState(5);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: THEME.color.gray[300],
        padding: THEME.spacing.xl2,
        boxSizing: "border-box",
      }}
    >
      <label htmlFor="boxCountInput">箱の数（デバッグ用）</label>
      <input
        type="number"
        id="boxCountInput"
        value={boxCount}
        onChange={(e) => setBoxCount(parseInt(e.target.value))}
        style={{ marginBottom: THEME.spacing.lg }}
      />
      <WizHStack {...args}>
        <Boxes count={boxCount} />
      </WizHStack>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
};
