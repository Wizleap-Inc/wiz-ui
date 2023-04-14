import {
  ZIndexKeys,
  SpacingKeys,
  getSpacingCss,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, useContext, useRef } from "react";

import { useClickOutside } from "@/hooks/use-click-outside";

import { WizPortal } from "../../portal";
import { Direction } from "../types/direction";

import { PopupContext } from "./popup-context";

const getPlacementStyle: Record<
  Direction,
  (
    rect: DOMRect,
    gap?: string
  ) => {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
    transform?: string;
  }
> = {
  tl: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translateY(-100%) translate(0, -${gap})`,
  }),
  tc: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + rect.width / 2 + window.scrollX,
    transform: `translateY(-100%) translateX(-50%) translate(0, -${gap})`,
  }),
  tr: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translateY(-100%) translateX(-100%) translate(0, -${gap})`,
  }),
  bl: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translate(0, ${gap})`,
  }),
  bc: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + rect.width / 2 + window.scrollX,
    transform: `translateX(-50%) translate(0, ${gap})`,
  }),
  br: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translateX(-100%) translate(0, ${gap})`,
  }),
  rt: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translate(${gap}, 0)`,
  }),
  rc: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height / 2 + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translateY(-50%) translate(${gap}, 0)`,
  }),
  rb: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + rect.width + window.scrollX,
    transform: `translateY(-100%) translate(${gap}, 0)`,
  }),
  lt: (rect: DOMRect, gap?: string) => ({
    top: rect.y + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translateX(-100%) translate(-${gap}, 0)`,
  }),
  lc: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height / 2 + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translateY(-50%) translateX(-100%) translate(-${gap}, 0)`,
  }),
  lb: (rect: DOMRect, gap?: string) => ({
    top: rect.y + rect.height + window.scrollY,
    left: rect.x + window.scrollX,
    transform: `translateY(-100%) translateX(-100%) translate(-${gap}, 0)`,
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
  if (closeOnBlur) useClickOutside(contentRef, ctx.closePopup, ctx.triggerRef);
  const rect = ctx.triggerRef.current?.getBoundingClientRect();
  const gapRem = getSpacingCss(gap) ?? "0";
  if (!(ctx.isOpen && rect)) return null;
  return (
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
          ...getPlacementStyle[direction](rect, gapRem),
        }}
      >
        {props.children}
      </div>
    </WizPortal>
  );
};
