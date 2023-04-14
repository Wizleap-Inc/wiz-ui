import { ZIndexKeys, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, useContext, useRef } from "react";

import { useClickOutside } from "@/hooks/use-click-outside";

import { WizPortal } from "../../portal";
import { Direction } from "../types/direction";

import { PopupContext } from "./popup-context";

const direction2style: Record<
  Direction,
  (rect: DOMRect) => {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
    transform?: string;
  }
> = {
  tl: (rect: DOMRect) => ({
    top: rect.y + window.scrollY,
    left: rect.x + window.scrollX,
    transform: "translateY(-100%)",
  }),
  tc: (rect: DOMRect) => ({
    top: rect.y + window.scrollY,
    left: rect.x + rect.width / 2 + window.scrollX,
    transform: "translateY(-100%) translateX(-50%)",
  }),
  tr: (rect: DOMRect) => ({
    top: rect.y + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: "translateY(-100%) translateX(-100%)",
  }),
  bl: (rect: DOMRect) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + window.scrollX,
  }),
  bc: (rect: DOMRect) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + rect.width / 2 + window.scrollX,
    transform: "translateX(-50%)",
  }),
  br: (rect: DOMRect) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: "translateX(-100%)",
  }),
  rt: (rect: DOMRect) => ({
    top: rect.y + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
  }),
  rc: (rect: DOMRect) => ({
    top: rect.y + rect.height / 2 + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: "translateY(-50%)",
  }),
  rb: (rect: DOMRect) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: "translateY(-100%)",
  }),
  lt: (rect: DOMRect) => ({
    top: rect.y + window.scrollY,
    left: rect.x + window.scrollX,
    transform: "translateX(-100%)",
  }),
  lc: (rect: DOMRect) => ({
    top: rect.y + rect.height / 2 + window.scrollY,
    left: rect.x + window.scrollX,
    transform: "translateY(-50%) translateX(-100%)",
  }),
  lb: (rect: DOMRect) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + window.scrollX,
    transform: "translateY(-100%) translateX(-100%)",
  }),
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
  const rect = ctx.triggerRef.current?.getBoundingClientRect();
  return !(ctx.isOpen && rect) ? null : (
    <WizPortal>
      <div
        className={clsx(
          styles.popupStyle,
          shadow && styles.popupShadowStyle,
          zIndexStyle[layer]
        )}
        ref={contentRef}
        style={{
          position: "absolute",
          ...direction2style[direction](rect),
        }}
      >
        {props.children}
      </div>
    </WizPortal>
  );
};
