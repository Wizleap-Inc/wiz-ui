import { ZIndexKeys, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, useContext, useRef } from "react";

import { useClickOutside } from "@/hooks/use-click-outside";

import { Direction } from "../types/direction";

import { PopupContext } from "./popup-context";

const direction2style: Record<
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

type Props = {
  direction?: Direction;
  closeOnBlur?: boolean;
  layer?: Exclude<ZIndexKeys, "dialog">;
  gap?: SpacingKeys;
  shadow?: boolean;
  animation?: boolean;
  onMouseLeave?: () => void;
  children: ReactNode;
};

export const WizPopupContent = ({
  closeOnBlur = true,
  layer = "popover",
  gap = "no",
  direction = "bl",
  shadow = true,
  animation = false,
  ...props
}: Props) => {
  const popupContext = useContext(PopupContext);
  if (!popupContext)
    throw new Error("PopupContent must be used inside PopupContainer");
  const contentRef = useRef(null);
  const ctx = popupContext;
  useClickOutside(contentRef, ctx.closePopup, ctx.triggerRef);
  return (
    <div
      className={clsx(
        styles.popupStyle,
        shadow && styles.popupShadowStyle,
        zIndexStyle[layer],
        !ctx.isOpen && styles.popupHiddenStyle
      )}
      ref={contentRef}
      style={{
        position: "absolute",
        width: "max-content",
        height: "max-content",
        ...direction2style[direction],
      }}
    >
      {props.children}
    </div>
  );
};
