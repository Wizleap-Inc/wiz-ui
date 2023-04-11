import { ReactNode, useContext, useRef } from "react";

import { PopupContext } from "./popup-context";

export const WizPopupTrigger = (props: { children: ReactNode }) => {
  const popupContext = useContext(PopupContext);
  if (!popupContext)
    throw new Error("PopupTrigger must be used inside PopupContainer");
  const triggerButtonRef = useRef(null);
  const { isOpen, openPopup, closePopup } = popupContext;
  // setPopupInnerRef(triggerButtonRef);
  return (
    <div
      onClick={() => {
        if (isOpen) {
          console.log("closePopup");
          closePopup();
          console.log("isOpen=", isOpen);
        } else {
          console.log("openPopup");
          openPopup();
          console.log("isOpen=", isOpen);
        }
      }}
      ref={triggerButtonRef}
      style={{ width: "fit-content" }}
    >
      {props.children}
    </div>
  );
};
