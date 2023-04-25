import { StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  WizPopup,
  WizPopupTrigger,
  WizPopupContent,
  WizPopupCloseButton,
} from "../components";

import { Pattern, popupContentStyle } from "./common";

export const DefaultStory: StoryObj<typeof WizPopupContent> = {
  render: (args) => {
    const patterns: Pattern[] = [
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
    const Popup = ({ pattern }: { pattern: Pattern }) => {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <WizPopup isOpen={isOpen} setIsOpen={setIsOpen}>
          <WizPopupTrigger>
            <button>Click me {pattern.direction}</button>
          </WizPopupTrigger>
          <WizPopupContent {...args} {...pattern}>
            <div style={popupContentStyle}>
              <p>This is a popup content {pattern.direction}</p>
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
