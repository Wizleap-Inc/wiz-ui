import { StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { WizPopup } from "../components";

import { Pattern, popupContentStyle } from "./common";

export const GapStory: StoryObj<typeof WizPopup> = {
  render: (args) => {
    const patterns: Pattern[] = [
      { direction: "rightTop", gap: "no" },
      { direction: "rightTop", gap: "xs2" },
      { direction: "rightTop", gap: "xs" },
      { direction: "rightTop", gap: "sm" },
      { direction: "rightTop", gap: "md" },
      { direction: "rightTop", gap: "lg" },
      { direction: "rightTop", gap: "xl" },
      { direction: "rightTop", gap: "xl2" },
      { direction: "rightTop", gap: "xl3" },
      { direction: "rightTop", gap: "xl4" },
    ];

    const Popup = ({ pattern }: { pattern: Pattern }) => {
      const [isOpen, setIsOpen] = useState(true);
      const anchor = useRef<HTMLButtonElement | null>(null);
      return (
        <>
          <button
            ref={anchor}
            style={{ width: "5rem", height: "2rem" }}
            onClick={() => setIsOpen((v) => !v)}
          >
            Gap {pattern.gap}
          </button>
          <WizPopup
            {...args}
            {...pattern}
            anchorElement={anchor}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div style={popupContentStyle}>
              <div>{pattern.gap}</div>
              <button style={{}} onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </WizPopup>
        </>
      );
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8rem",
          paddingBottom: "4rem",
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
