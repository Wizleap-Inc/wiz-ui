import { ReactNode, useContext } from "react";

import { PopupContext } from "./popup-context";

export const WizPopupTrigger = (props: { children: ReactNode }) => {
  const popupContext = useContext(PopupContext);
  if (!popupContext)
    throw new Error("PopupTrigger must be used inside PopupContainer");
  const { isOpen, openPopup, closePopup, triggerRef } = popupContext;
  return (
    <div
      onClick={() => {
        if (isOpen) {
          closePopup();
        } else {
          openPopup();
        }
      }}
      ref={triggerRef}
      style={{ width: "fit-content" }}
    >
      {props.children}
    </div>
  );
};
