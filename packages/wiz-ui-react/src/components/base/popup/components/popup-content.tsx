import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import clsx from "clsx";
import { ReactNode, useContext, useRef } from "react";

import { useClickOutside } from "@/hooks/use-click-outside";

import { Direction } from "../types/direction";

import { PopupContext } from "./popup-context";

const placementMap: Record<
  Direction,
  {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
    transform?: string;
  }
> = {
  tl: {
    bottom: "100%",
    left: "0",
  },
  tc: {
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
  },
  tr: {
    bottom: "100%",
    right: "0",
  },
  bl: {
    left: "0%",
  },
  bc: {
    left: "50%",
    transform: "translateX(-50%)",
  },
  br: {
    right: "0",
  },
  rt: {
    left: "100%",
    top: "0",
  },
  rc: {
    left: "100%",
    top: "50%",
    transform: "translateY(-50%)",
  },
  rb: {
    left: "100%",
    bottom: "0",
  },
  lt: {
    top: "0%",
    right: "100%",
  },
  lb: {
    bottom: "0%",
    right: "100%",
  },
  lc: {
    top: "50%",
    right: "100%",
    transform: "translateY(-50%)",
  },
};

export const WizPopupContent = (props: { children: ReactNode }) => {
  const popupContext = useContext(PopupContext);
  if (!popupContext)
    throw new Error("PopupContent must be used inside PopupContainer");
  const contentRef = useRef(null);
  const { isOpen, closePopup, triggerRef, placement } = popupContext;
  useClickOutside(contentRef, closePopup, triggerRef);

  return (
    <div
      className={clsx(styles.popupContainerStyle["default"])}
      ref={contentRef}
      style={{
        position: "absolute",
        display: isOpen ? "block" : "none",
        width: "max-content",
        height: "max-content",
        ...placementMap[placement],
      }}
    >
      {props.children}
    </div>
  );
};
