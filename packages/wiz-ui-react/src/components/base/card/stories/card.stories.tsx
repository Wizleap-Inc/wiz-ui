import { Meta, StoryObj } from "@storybook/react";
import {
  COLOR_MAP_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizCard } from "../components/card";

const meta: Meta<typeof WizCard> = {
  title: "Base/Card",
  component: WizCard,
  argTypes: {
    p: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    px: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    py: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    backgroundColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    shadow: {
      control: { type: "boolean" },
    },
    border: {
      control: { type: "boolean" },
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizCard>;

export const Default: Story = {
  render: (args) => {
    return <WizCard {...args}>Card の Body</WizCard>;
  },
};

export const Shadow: Story = {
  args: {
    shadow: true,
    gap: "md",
  },
  render: (args) => {
    return <WizCard {...args}>Card の Body</WizCard>;
  },
  parameters: {
    docs: {
      description: {
        story: "`shadow` を指定することができます。",
      },
    },
  },
};

export const Border: Story = {
  args: {
    border: true,
  },
  render: (args) => {
    return <WizCard {...args}>Card の Body</WizCard>;
  },
  parameters: {
    docs: {
      description: {
        story: "`border` を指定することができます。",
      },
    },
  },
};

export const Align: Story = {
  args: {
    align: "center",
  },
  render: (args) => {
    return <WizCard {...args}>Card の Body</WizCard>;
  },
  parameters: {
    docs: {
      description: {
        story:
          "`align` を指定することができます。選択肢は `start`, `center`, `end` の中から選択できます。",
      },
    },
  },
};

export const Gap: Story = {
  args: {
    gap: "xl",
  },
  render: (args) => {
    return <WizCard {...args}>Card の Body</WizCard>;
  },
  parameters: {
    docs: {
      description: {
        story:
          "`gap` を指定することができます。選択肢はSpacingKeysの中から選択できます。",
      },
    },
  },
};

export const Compound: Story = {
  render: (args) => {
    return (
      <WizCard
        {...args}
        mainHeaderArea={<div>Main Header</div>}
        subHeaderArea={<div>Sub Header</div>}
        footerArea={<div>Footer</div>}
      >
        Card の Body
      </WizCard>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "カード内部に Header, Body, Footerを設定できます。",
      },
    },
  },
};
