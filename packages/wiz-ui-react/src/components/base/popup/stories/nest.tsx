import { StoryObj } from "@storybook/react";
import { useState, useRef, CSSProperties } from "react";

import { WizPopup } from "../components";

import { Pattern } from "./common";

export const NextStory: StoryObj<typeof WizPopup> = {
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
    const triggerStyle = {
      width: "5rem",
      height: "2rem",
    };
    const popupContentStyle = {
      padding: "1rem",
      width: "5rem",
      height: "2rem",
      backgroundColor: "white",
      borderRadius: "4px",
    };
    const Popup = ({
      isRoot,
      deps,
      pattern,
    }: {
      isRoot: boolean;
      deps: number;
      pattern: Pattern;
    }) => {
      const [isOpen, setIsOpen] = useState(true);
      const anchor = useRef<HTMLButtonElement | null>(null);
      if (deps === 0) {
        return (
          <div>
            <button
              ref={anchor}
              onClick={() => setIsOpen((v) => !v)}
              style={triggerStyle}
            >
              {pattern.direction}
            </button>
            <WizPopup
              {...args}
              {...pattern}
              anchorElement={anchor}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              usePortal={isRoot && args.usePortal}
            >
              <div style={popupContentStyle}>
                <div>content</div>
                <button style={{}} onClick={() => setIsOpen(false)}>
                  Close
                </button>
              </div>
            </WizPopup>
          </div>
        );
      }
      return (
        <div>
          <div>
            <button
              ref={anchor}
              onClick={() => setIsOpen((v) => !v)}
              style={triggerStyle}
            >
              {pattern.direction}
            </button>
          </div>
          <WizPopup
            {...args}
            {...pattern}
            anchorElement={anchor}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            usePortal={isRoot && args.usePortal}
          >
            <div style={popupContentStyle}>
              {<Popup isRoot={false} deps={deps - 1} pattern={pattern} />}
            </div>
          </WizPopup>
        </div>
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
      gap: "6rem",
    };
    const deps = 2;
    return (
      <div
        style={{
          width: "40rem",
          justifyContent: "center",
          alignItems: "center",
          inset: "0",
          margin: "auto",
          padding: "15rem 25rem",
        }}
      >
        <div style={tbStyle}>
          <Popup isRoot={true} deps={deps} pattern={patterns[0]} />
          <Popup isRoot={true} deps={deps} pattern={patterns[1]} />
          <Popup isRoot={true} deps={deps} pattern={patterns[2]} />
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
            <Popup isRoot={true} deps={deps} pattern={patterns[3]} />
            <Popup isRoot={true} deps={deps} pattern={patterns[4]} />
            <Popup isRoot={true} deps={deps} pattern={patterns[5]} />
          </div>
          <div style={lrStyle}>
            <Popup isRoot={true} deps={deps} pattern={patterns[6]} />
            <Popup isRoot={true} deps={deps} pattern={patterns[7]} />
            <Popup isRoot={true} deps={deps} pattern={patterns[8]} />
          </div>
        </div>
        <div style={tbStyle}>
          <Popup isRoot={true} deps={deps} pattern={patterns[9]} />
          <Popup isRoot={true} deps={deps} pattern={patterns[10]} />
          <Popup isRoot={true} deps={deps} pattern={patterns[11]} />
        </div>
      </div>
    );
  },
  args: {},
};
