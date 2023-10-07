import { Meta, StoryObj } from "@storybook/react";

import { WizIClose } from "@/components";

import { WizTag } from "../components/tag";

const meta: Meta<typeof WizTag> = {
  title: "Base/Tag",
  component: WizTag,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizTag>;

const variants = [
  "info",
  "red",
  "green",
  "yellow",
  "blue",
  "mono",
  "gray",
  "darkGray",
  "greenFill",
  "white",
] as const;

const fontSizes = ["xs2", "xs", "sm", "md", "lg", "xl", "xl2"] as const;

export const Default: Story = {
  args: {
    label: "タグ",
  },
  render: (args) => <WizTag {...args} />,
};

export const Catalog: Story = {
  args: {
    label: "タグ",
  },
  render: (args) => {
    return (
      <>
        <div
          style={{
            height: "25rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "row",
            marginBottom: "3rem",
          }}
        >
          {variants.map((variant) => (
            <>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {fontSizes.map((fontSize) => {
                  return (
                    <WizTag
                      {...args}
                      variant={variant}
                      fontSize={fontSize}
                      key={variant + fontSize}
                    />
                  );
                })}
              </div>
            </>
          ))}
        </div>
        <div
          style={{
            height: "25rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "row",
            marginBottom: "3rem",
          }}
        >
          {variants.map((variant) => (
            <>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {fontSizes.map((fontSize) => {
                  return (
                    <WizTag
                      {...args}
                      variant={variant}
                      fontSize={fontSize}
                      key={variant + fontSize + "round_icon"}
                      round
                      icon={WizIClose}
                    />
                  );
                })}
              </div>
            </>
          ))}
        </div>
      </>
    );
  },
};
export const Bold: Story = {
  args: {
    label: "タグ",
    fontWeight: "bold",
  },
  render: (args) => <WizTag {...args} />,
};

export const WithIcon: Story = {
  args: {
    label: "タグ",
    icon: WizIClose,
  },
  render: (args) => <WizTag {...args} />,
};

export const Width: Story = {
  args: {
    label: "タグ",
    width: "100px",
  },
  render: (args) => <WizTag {...args} />,
};

export const Variant: Story = {
  args: {
    label: "タグ",
    icon: WizIClose,
  },
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content max-content",
        gridGap: "1rem",
        alignItems: "center",
      }}
    >
      <WizTag {...args} label="必須" variant="info" />
      <div>variant={'"info"'}</div>
      <WizTag {...args} label="自動失注" variant="red" />
      <div>variant={'"red"'}</div>
      <WizTag {...args} label="申請完了" variant="green" />
      <div>variant={'"green"'}</div>
      <WizTag {...args} label="準備中" variant="yellow" />
      <div>variant={'"yellow"'}</div>
      <WizTag {...args} label="完了" variant="blue" />
      <div>variant={'"blue"'}</div>
      <WizTag {...args} label="11/11(月)" variant="mono" />
      <div>variant={'"mono"'}</div>
      <WizTag {...args} label="11/11(月)" variant="gray" />
      <div>variant={'"gray"'}</div>
      <WizTag {...args} label="11/11(月)" variant="darkGray" />
      <div>variant={'"darkGray"'}</div>
      <WizTag {...args} label="11/11(月)" variant="greenFill" />
      <div>variant={'"greenFill"'}</div>
      <WizTag {...args} label="11/11(月)" variant="white" />
      <div>variant={'"white"'}</div>
    </div>
  ),
};
