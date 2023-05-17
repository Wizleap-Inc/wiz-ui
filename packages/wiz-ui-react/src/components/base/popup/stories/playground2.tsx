import { StoryObj } from "@storybook/react";
import { CSSProperties, useRef, useState } from "react";

import { WizPopup } from "../components";

import { popupContentStyle } from "./common";

const absolutePositions: CSSProperties[] = [
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

export const Playground2Story: StoryObj<typeof WizPopup> = {
  args: {
    closeOnBlur: false,
    isDirectionFixed: false,
  },
  render: (args) => {
    const Popup = () => {
      const [isOpen, setIsOpen] = useState(true);
      const anchor = useRef<HTMLButtonElement | null>(null);
      return (
        <>
          <button ref={anchor} onClick={() => setIsOpen((v) => !v)}>
            Toggle
          </button>
          <WizPopup
            {...args}
            anchorElement={anchor}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div style={popupContentStyle}>
              <p>This is a popup content</p>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </WizPopup>
        </>
      );
    };
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "relative",
        }}
      >
        {absolutePositions.map((position, i) => {
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                ...position,
              }}
            >
              <Popup />
            </div>
          );
        })}
      </div>
    );
  },
};
