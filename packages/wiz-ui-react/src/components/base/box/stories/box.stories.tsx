import { Meta, StoryObj } from "@storybook/react";

import { WizBox } from "../components/box";

const meta: Meta<typeof WizBox> = {
  title: "Base/Box",
  component: WizBox,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizBox>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <WizBox {...args}>
      <div
        style={{
          width: "50vw",
          height: "50vh",
          backgroundColor: "gray",
        }}
      >
        hoge
      </div>
    </WizBox>
  ),
};

const blockBaseStyle = {
  width: "200px",
  height: "200px",
  scrollSnapAlign: "start",
};

export const Overflow: Story = {
  args: {
    width: "400px",
    height: "400px",
    bgColor: "blue.800",
    overflow: "hidden",
  },
  render: (args) => {
    return (
      <WizBox {...args}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
            }}
          >
            {[...Array(5)].map((_, j) => (
              <div
                key={j}
                style={{
                  ...blockBaseStyle,
                  backgroundColor: (i + j) % 2 === 0 ? "gray" : "transparent",
                }}
              >
                {i}, {j}
              </div>
            ))}
          </div>
        ))}
      </WizBox>
    );
  },
};

export const Snap: Story = {
  args: {
    width: "400px",
    height: "400px",
    bgColor: "blue.800",
    snapScroll: "both",
  },
  render: (args) => {
    return (
      <WizBox {...args}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
            }}
          >
            {[...Array(5)].map((_, j) => (
              <div
                key={j}
                style={{
                  ...blockBaseStyle,
                  backgroundColor: (i + j) % 2 === 0 ? "gray" : "transparent",
                }}
              >
                {i}, {j}
              </div>
            ))}
          </div>
        ))}
      </WizBox>
    );
  },
};
