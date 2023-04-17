import {
  ZIndexKeys,
  SpacingKeys,
  getSpacingCss,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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

type DivProps = React.HTMLAttributes<HTMLDivElement>;

type Props = DivProps & {
  direction?: Direction;
  closeOnBlur?: boolean;
  layer?: Exclude<ZIndexKeys, "dialog">;
  gap?: SpacingKeys;
  shadow?: boolean;
  animation?: boolean;
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
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("PopupContent must be used inside PopupContainer");

  const contentRef = useRef<HTMLDivElement>(null);
  if (closeOnBlur) useClickOutside(contentRef, ctx.closePopup, ctx.triggerRef);
  const rect = ctx.triggerRef.current?.getBoundingClientRect();
  const gapRem = getSpacingCss(gap) ?? "0";

  const [isActuallyOpen, setIsActuallyOpen] = useState(false);

  useEffect(() => {
    if (!animation) {
      setIsActuallyOpen(ctx.isOpen);
      return;
    }
    if (ctx.isOpen) {
      setIsActuallyOpen(true);
      if (!contentRef.current) return; // contentRef.current is null
      contentRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        easing: "ease-in-out",
        fill: "forwards",
      });
    } else {
      if (!contentRef.current) return;
      const anime = contentRef.current.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
          duration: 200,
          fill: "forwards",
          easing: "ease-in-out",
        }
      );
      anime.onfinish = () => {
        setIsActuallyOpen(false);
      };
    }
  }, [ctx.isOpen]);

  if (!isActuallyOpen) return null;
  return (
    <WizPortal>
      <div
        className={clsx(
          styles.popupStyle,
          shadow && styles.popupShadowStyle,
          zIndexStyle[layer],
          animation && ctx.isOpen && styles.popupFadeInStyle
        )}
        ref={contentRef}
        style={{
          position: "absolute",
          ...(rect && getPlacementStyle[direction](rect, gapRem)),
        }}
        {...props}
      >
        {props.children}
      </div>
    </WizPortal>
  );
};
