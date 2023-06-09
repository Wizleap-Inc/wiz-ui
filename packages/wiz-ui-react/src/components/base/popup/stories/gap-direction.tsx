import { StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { WizPopup } from "../components";

import { Pattern, popupContentStyle } from "./common";

export const GapDirectionStory: StoryObj<typeof WizPopup> = {
  render: (args) => {
    const patterns: Pattern[] = [
      { direction: "bottomLeft", gap: "md" },
      { direction: "bottom", gap: "md" },
      { direction: "bottomRight", gap: "md" },
      { direction: "leftTop", gap: "md" },
      { direction: "left", gap: "md" },
      { direction: "leftBottom", gap: "md" },
      { direction: "rightTop", gap: "md" },
      { direction: "right", gap: "md" },
      { direction: "rightBottom", gap: "md" },
      { direction: "topLeft", gap: "md" },
      { direction: "top", gap: "md" },
      { direction: "topRight", gap: "md" },
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
              <div>direction: {pattern.gap}</div>
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
