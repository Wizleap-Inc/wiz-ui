import { Meta, StoryObj } from "@storybook/react";

import { WizProvider } from "@/components/manager";

import {
  WizPopup,
  WizPopupClose,
  WizPopupContent,
  WizPopupTrigger,
} from "../components";
import { Direction } from "../types/direction";

const meta: Meta<typeof WizPopup> = {
  title: "Base/Popup",
  component: WizPopup,
  argTypes: {},
  decorators: [
    (Story) => (
      <WizProvider>
        <Story />
      </WizProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WizPopup>;

export const Default: Story = {
  render: (args) => {
    const patterns: { direction: Direction }[] = [
      { direction: "bl" },
      { direction: "bc" },
      { direction: "br" },
      { direction: "tl" },
      { direction: "tc" },
      { direction: "tr" },
      { direction: "lt" },
      { direction: "lc" },
      { direction: "lb" },
      { direction: "rt" },
      { direction: "rc" },
      { direction: "rb" },
    ];
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.5rem",
        }}
      >
        {patterns.map((pattern, i) => (
          <div key={i}>
            <div>aaa</div>
            <WizPopup {...args}>
              <WizPopupTrigger>
                <button>Click me {pattern.direction}</button>
              </WizPopupTrigger>
              <WizPopupContent {...pattern}>
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  }}
                >
                  <p>This is a popup content</p>
                  <button>
                    <WizPopupClose>close </WizPopupClose>
                  </button>
                </div>
              </WizPopupContent>
            </WizPopup>
            <div>bbbb</div>
          </div>
        ))}
      </div>
    );
  },
  args: {},
};
