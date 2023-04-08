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
    return <WizCard {...args}>defaultスロット</WizCard>;
  },
};

export const Shadow: Story = {
  args: {
    shadow: true,
    gap: "md",
  },
  render: (args) => {
    return <WizCard {...args}>defaultスロット</WizCard>;
  },
  parameters: {
    docs: {
      description: {
        story: "`shadow` を指定することができます。",
      },
      source: {
        code: `<WizCard shadow>defaultスロット</WizCard>`,
      },
    },
  },
};

export const Border: Story = {
  args: {
    border: true,
  },
  render: (args) => {
    return <WizCard {...args}>defaultスロット</WizCard>;
  },
  parameters: {
    docs: {
      description: {
        story: "`border` を指定することができます。",
      },
      source: {
        code: `<WizCard border>defaultスロット</WizCard>`,
      },
    },
  },
};

export const Align: Story = {
  args: {
    align: "center",
  },
  render: (args) => {
    return <WizCard {...args}>defaultスロット</WizCard>;
  },
  parameters: {
    docs: {
      description: {
        story:
          "`align` を指定することができます。選択肢は `start`, `center`, `end` の中から選択できます。",
      },
      source: {
        code: `<WizCard border>defaultスロット</WizCard>`,
      },
    },
  },
};

export const Gap: Story = {
  args: {
    gap: "xl",
  },
  render: (args) => {
    return <WizCard {...args}>defaultスロット</WizCard>;
  },
  parameters: {
    docs: {
      description: {
        story:
          "`gap` を指定することができます。選択肢はSpacingKeysの中から選択できます。",
      },
      source: {
        code: `<WizCard gap="xl">defaultスロット</WizCard>`,
      },
    },
  },
};

export const Compound: Story = {
  render: (args) => {
    return (
      <WizCard {...args}>
        <WizCard.Header>
          <div>Main Header</div>
          <div>Sub Header</div>
        </WizCard.Header>
        <WizCard.Body>Body</WizCard.Body>
        <WizCard.Footer>Footer</WizCard.Footer>
      </WizCard>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "カード内部に Header, Body, Footerを設定できます。",
      },
      source: {
        code: `
        <WizCard {...args}>
          <WizCard.Header>
            <div>Main</div>
            <div>Sub</div>
          </WizCard.Header>
          <WizCard.Body>Body</WizCard.Body>
          <WizCard.Footer>Footer</WizCard.Footer>
        </WizCard>
        `,
      },
    },
  },
};
