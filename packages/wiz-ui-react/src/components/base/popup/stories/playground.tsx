import { StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import {
  WizPopup,
  WizPopupTrigger,
  WizPopupContent,
  WizPopupCloseButton,
} from "../components";

import { popupContentStyle } from "./common";

export const PlaygroundStory: StoryObj<typeof WizPopupContent> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [maxX, setMaxX] = useState(0);
    const [maxY, setMaxY] = useState(0);
    const sbRoot = document.getElementById("storybook-root");
    if (!sbRoot) return <></>;
    const updateMax = () => {
      setMaxX(sbRoot.clientWidth);
      setMaxY(sbRoot.clientHeight);
    };
    useEffect(() => {
      updateMax();
      window.addEventListener("resize", updateMax);
    }, []);
    return (
      <div
        style={{
          height: "90vh",
          width: "90vw",
          display: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: y + "px",
            left: x + "px",
          }}
        >
          <WizPopup isOpen={isOpen} setIsOpen={setIsOpen}>
            <WizPopupTrigger>
              <button>Toggle</button>
            </WizPopupTrigger>
            <WizPopupContent {...args}>
              <div style={popupContentStyle}>
                <p>This is a popup content</p>
                <WizPopupCloseButton>close</WizPopupCloseButton>
              </div>
            </WizPopupContent>
          </WizPopup>
        </div>
        <input
          type="range"
          min={0}
          max={maxX}
          onChange={(e) => setX(parseInt(e.target.value))}
        />
        <input
          type="range"
          min={0}
          max={maxY}
          onChange={(e) => setY(parseInt(e.target.value))}
        />
      </div>
    );
  },
  args: {},
};
