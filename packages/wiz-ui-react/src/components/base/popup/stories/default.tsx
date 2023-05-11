import { StoryObj } from "@storybook/react";
import { useState, useRef, CSSProperties } from "react";

import { WizPopup } from "../components";

import { Pattern } from "./common";

export const DefaultStory: StoryObj<typeof WizPopup> = {
  render: (args) => {
    const patterns: Pattern[] = [
      { direction: "topLeft" },
      { direction: "top" },
      { direction: "topRight" },
      { direction: "leftTop" },
      { direction: "left" },
      { direction: "leftBottom" },
      { direction: "rightTop" },
      { direction: "right" },
      { direction: "rightBottom" },
      { direction: "bottomLeft" },
      { direction: "bottom" },
      { direction: "bottomRight" },
    ];
    const Popup = ({ pattern }: { pattern: Pattern }) => {
      const [isOpen, setIsOpen] = useState(true);
      const anchor = useRef<HTMLButtonElement | null>(null);
      return (
        <>
          <button
            ref={anchor}
            onClick={() => setIsOpen((v) => !v)}
            style={{
              width: "6rem",
              height: "2rem",
            }}
          >
            {pattern.direction}
          </button>
          <WizPopup
            {...args}
            {...pattern}
            anchorElement={anchor}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            shadow={true}
          >
            <div
              style={{
                padding: "1rem",
                width: "6rem",
                height: "2.5rem",
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            >
              <div>content</div>
              <button style={{}} onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </WizPopup>
        </>
      );
    };
    const tbStyle: CSSProperties = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingLeft: "70px",
      paddingRight: "70px",
    };
    const lrStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      gap: "5rem",
    };
    return (
      <div
        style={{
          width: "40rem",
          justifyContent: "center",
          alignItems: "center",
          inset: "0",
          margin: "auto",
          padding: "5rem 10rem",
        }}
      >
        <div style={tbStyle}>
          <Popup pattern={patterns[0]} />
          <Popup pattern={patterns[1]} />
          <Popup pattern={patterns[2]} />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "40px",
            paddingBottom: "40px",
          }}
        >
          <div style={lrStyle}>
            <Popup pattern={patterns[3]} />
            <Popup pattern={patterns[4]} />
            <Popup pattern={patterns[5]} />
          </div>
          <div style={lrStyle}>
            <Popup pattern={patterns[6]} />
            <Popup pattern={patterns[7]} />
            <Popup pattern={patterns[8]} />
          </div>
        </div>
        <div style={tbStyle}>
          <Popup pattern={patterns[9]} />
          <Popup pattern={patterns[10]} />
          <Popup pattern={patterns[11]} />
        </div>
      </div>
    );
  },
  args: {},
};
