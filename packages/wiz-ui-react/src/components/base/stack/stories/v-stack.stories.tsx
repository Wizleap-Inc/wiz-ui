import { Meta, StoryObj } from "@storybook/react";
import { SPACING_ACCESSORS, THEME } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizVStack } from "../components/v-stack";

import { spacingKeys } from "./fixture";

const spacingControls = spacingKeys.reduce((acc, key) => {
  acc[key] = {
    control: { type: "select" },
    options: SPACING_ACCESSORS,
  };
  return acc;
}, {} as Record<string, unknown>);

const meta: Meta<typeof WizVStack> = {
  title: "Base/Stack/VStack",
  component: WizVStack,
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
type Story = StoryObj<typeof WizVStack>;

const Boxes = (props: { count: number }) => (
  <>
    {Array.from({ length: props.count }, (_, i) => (
      <div
        key={i}
        style={{
          width: 5 + "rem",
          height: 5 + "rem",
          background: THEME.color.gradient,
          boxShadow: THEME.shadow.md,
          borderRadius: THEME.spacing.xs,
        }}
      />
    ))}
  </>
);

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
        <WizVStack {...args}>
          <Boxes count={boxCount} />
        </WizVStack>
      </div>
    );
  },
};
