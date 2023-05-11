import { StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

import { WizPopup } from "../components";

import { popupContentStyle } from "./common";

export const PlaygroundStory: StoryObj<typeof WizPopup> = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const anchor = useRef<HTMLButtonElement | null>(null);
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
          <button ref={anchor} onClick={() => setIsOpen((v) => !v)}>
            Toggle
          </button>
          <WizPopup
            {...args}
            anchorElement={anchor}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          >
            <div style={popupContentStyle}>
              <p>This is a popup content</p>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
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
