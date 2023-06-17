import { Meta, StoryObj } from "@storybook/react";
import { SPACING_ACCESSORS, THEME } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizStack } from "../components/stack";

import { spacingKeys } from "./fixture";

const spacingControls = spacingKeys.reduce((acc, key) => {
  acc[key] = {
    control: { type: "select" },
    options: SPACING_ACCESSORS,
  };
  return acc;
}, {} as Record<string, unknown>);

const meta: Meta<typeof WizStack> = {
  title: "Base/Stack/Stack",
  component: WizStack,
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
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
  decorators: [
    (Story) => {
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
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof WizStack>;

const Box = ({ index }: { index: number }) => (
  <div
    style={{
      width: index + 4 + "rem",
      height: index + 2 + "rem",
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

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [boxCount, setBoxCount] = useState(5);
    return (
      <>
        <label htmlFor="boxCountInput">箱の数（デバッグ用）</label>
        <input
          type="number"
          id="boxCountInput"
          value={boxCount}
          onChange={(e) => setBoxCount(parseInt(e.target.value))}
          style={{ marginBottom: THEME.spacing.lg }}
        />
        <WizStack {...args}>
          <Boxes count={boxCount} />
        </WizStack>
      </>
    );
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [boxCount, setBoxCount] = useState(5);
    return (
      <>
        <label htmlFor="boxCountInput">箱の数（デバッグ用）</label>
        <input
          type="number"
          id="boxCountInput"
          value={boxCount}
          onChange={(e) => setBoxCount(parseInt(e.target.value))}
          style={{ marginBottom: THEME.spacing.lg }}
        />
        <WizStack {...args}>
          <Boxes count={boxCount} />
        </WizStack>
      </>
    );
  },
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [boxCount, setBoxCount] = useState(5);
    return (
      <>
        <label htmlFor="boxCountInput">箱の数（デバッグ用）</label>
        <input
          type="number"
          id="boxCountInput"
          value={boxCount}
          onChange={(e) => setBoxCount(parseInt(e.target.value))}
          style={{ marginBottom: THEME.spacing.lg }}
        />
        <WizStack {...args}>
          <Boxes count={boxCount} />
        </WizStack>
      </>
    );
  },
};
