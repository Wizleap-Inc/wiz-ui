import { useRef, useState } from "react";

import { WizPopup } from "../../components";
import { popupContentStyle } from "../common";

import { absolutePositions } from "./positions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PopupWrapTemplate = (args: any) => {
  const Popup = () => {
    const [isOpen, setIsOpen] = useState(true);
    const anchor = useRef<HTMLButtonElement | null>(null);
    return (
      <div>
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
      </div>
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
};
