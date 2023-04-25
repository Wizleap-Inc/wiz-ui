import { StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  WizPopup,
  WizPopupTrigger,
  WizPopupContent,
  WizPopupCloseButton,
} from "../components";

import { Pattern, popupContentStyle } from "./common";

export const GapStory: StoryObj<typeof WizPopupContent> = {
  render: (args) => {
    const patterns: Pattern[] = [
      { direction: "rt", gap: "no" },
      { direction: "rt", gap: "xs2" },
      { direction: "rt", gap: "xs" },
      { direction: "rt", gap: "sm" },
      { direction: "rt", gap: "md" },
      { direction: "rt", gap: "lg" },
      { direction: "rt", gap: "xl" },
      { direction: "rt", gap: "xl2" },
      { direction: "rt", gap: "xl3" },
      { direction: "rt", gap: "xl4" },
    ];

    const Popup = ({ pattern }: { pattern: Pattern }) => {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <WizPopup isOpen={isOpen} setIsOpen={setIsOpen}>
          <WizPopupTrigger>
            <button>
              Click me {pattern.direction} {pattern.gap}
            </button>
          </WizPopupTrigger>
          <WizPopupContent {...args} {...pattern}>
            <div style={popupContentStyle}>
              <p>
                This is a popup content {pattern.direction} {pattern.gap}
              </p>
              <WizPopupCloseButton>close</WizPopupCloseButton>
            </div>
          </WizPopupContent>
        </WizPopup>
      );
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15rem",
        }}
      >
        {patterns.map((pattern, i) => (
          <div key={i}>
            <Popup pattern={pattern} />
          </div>
        ))}
      </div>
    );
  },
  args: {},
};
