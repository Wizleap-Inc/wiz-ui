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
  args: {
    width: "300px",
    height: "300px",
    bgColor: "gradient",
  },
  render: (args) => <WizBox {...args} />,
};

const blockBaseStyle = {
  width: "200px",
  height: "200px",
  scrollSnapAlign: "start",
  display: "grid",
  placeContent: "center",
  color: "white",
  fontSize: "2em",
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
                {i} , {j}
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
                {i} , {j}
              </div>
            ))}
          </div>
        ))}
      </WizBox>
    );
  },
};
