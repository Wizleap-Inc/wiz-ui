import { StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  WizPopup,
  WizPopupTrigger,
  WizPopupContent,
  WizPopupCloseButton,
} from "../components";

import { popupContentStyle } from "./common";

export const Playground2Story: StoryObj<typeof WizPopupContent> = {
  args: {
    closeOnBlur: false,
  },
  render: (args) => {
    const absolutePositions = [
      {
        top: "0px",
        left: "0px",
        bottom: "initial",
        right: "initial",
        transform: "initial",
      },
      {
        top: "0px",
        left: "initial",
        bottom: "initial",
        right: "0px",
        transform: "initial",
      },
      {
        top: "initial",
        left: "0px",
        bottom: "0px",
        right: "initial",
        transform: "initial",
      },
      {
        top: "initial",
        left: "initial",
        bottom: "0px",
        right: "0px",
        transform: "initial",
      },
      {
        top: "50%",
        left: "50%",
        bottom: "initial",
        right: "initial",
        transform: "translate(-50%, -50%)",
      },
      {
        top: "50%",
        left: "0px",
        bottom: "initial",
        right: "initial",
        transform: "translate(0%, -50%)",
      },
      {
        top: "50%",
        left: "initial",
        bottom: "initial",
        right: "0px",
        transform: "translate(0%, -50%)",
      },
      {
        top: "0px",
        left: "50%",
        bottom: "initial",
        right: "initial",
        transform: "translate(-50%, 0%)",
      },
      {
        top: "initial",
        left: "50%",
        bottom: "0px",
        right: "initial",
        transform: "translate(-50%, 0%)",
      },
    ];
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "relative",
        }}
      >
        {absolutePositions.map((pattern, i) => {
          const [isOpen, setIsOpen] = useState(true);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pattern,
              }}
            >
              <WizPopup isOpen={isOpen} setIsOpen={setIsOpen}>
                <WizPopupTrigger>
                  <button>Toggle</button>
                </WizPopupTrigger>
                <WizPopupContent
                  {...args}
                  {...pattern}
                  bodyElement={
                    document.getElementById("storybook-root") || undefined
                  }
                >
                  <div style={popupContentStyle}>
                    <p>This is a popup content</p>
                    <WizPopupCloseButton>close</WizPopupCloseButton>
                  </div>
                </WizPopupContent>
              </WizPopup>
            </div>
          );
        })}
      </div>
    );
  },
};
