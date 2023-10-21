import { StoryObj } from "@storybook/react";
import { ComponentProps, ReactNode, useRef, useState } from "react";

import { WizHeader } from "../../header";
import { WizPopup } from "../components";

import { popupContentStyle } from "./common";

const PopupButton = ({
  children,
  ...props
}: ComponentProps<typeof WizPopup> & { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const anchor = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <button ref={anchor} onClick={() => setIsOpen((v) => !v)}>
        Toggle
      </button>
      <WizPopup
        {...props}
        anchorElement={anchor}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div style={popupContentStyle}>
          <p>{children}</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </WizPopup>
    </>
  );
};

export const FixedStory: StoryObj<typeof WizPopup> = {
  render: (args) => {
    return (
      <div
        style={{
          height: "150vh",
        }}
      >
        <WizHeader
          onToggle={() => undefined}
          sticky
          rightContent={
            <div>
              <PopupButton {...args}>Sticky Parent</PopupButton>
            </div>
          }
        />
        <h1>Scroll Area</h1>
        <PopupButton {...args}>Scroll Parent</PopupButton>
        <div
          style={{
            position: "fixed",
            inset: "0 0 0 0",
            margin: "auto",
            backgroundColor: "rgba(0,0,0,0.1)",
            width: "15rem",
            height: "15rem",
          }}
        >
          <PopupButton {...args}>Fixed Parent</PopupButton>
        </div>
      </div>
    );
  },
  args: {
    isOpen: true,
    closeOnBlur: false,
  },
};
