import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import clsx from "clsx";
import { ReactNode, useContext, useRef } from "react";

import { useClickOutside } from "@/hooks/use-click-outside";

import { PopupContext } from "./popup-context";

export const WizPopupContent = (props: { children: ReactNode }) => {
  const popupContext = useContext(PopupContext);
  if (!popupContext)
    throw new Error("PopupContent must be used inside PopupContainer");
  const contentRef = useRef(null);
  const { isOpen, closePopup, triggerRef } = popupContext;
  useClickOutside(contentRef, closePopup, triggerRef);
  return (
    <>
      {isOpen && (
        <div
          className={clsx(styles.popupContainerStyle["default"])}
          ref={contentRef}
        >
          {props.children}
        </div>
      )}
    </>
  );
};
