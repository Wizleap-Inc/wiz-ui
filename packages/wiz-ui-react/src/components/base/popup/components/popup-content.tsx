import {
  ZIndexKeys,
  SpacingKeys,
  getSpacingCss,
  ComponentName,
  ERROR_MESSAGES,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  ComponentProps,
  ReactNode,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useClickOutside } from "@/hooks/use-click-outside";

import { WizPortal } from "../../portal";
import { Direction } from "../types/direction";

import { PopupContext } from "./popup-context";

type PopupPlacementStyle = {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
  transform?: string;
};

const getPlacementStyle: Record<
  Direction,
  (rect: DOMRect, gap?: string) => PopupPlacementStyle
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

const adjustDirection: Record<
  Direction,
  (body: DOMRect, content: DOMRect, trigger: DOMRect) => Direction
> = {
  bl: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const y =
      body.height < trigger.y + trigger.height + window.scrollY ? "t" : "b";
    const x =
      body.width < trigger.x + content.width + window.scrollX ? "r" : "l";
    return `${y}${x}` as Direction;
  },
  bc: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const y =
      body.height < trigger.y + trigger.height + window.scrollY ? "t" : "b";
    const r =
      body.width <
        trigger.x + (trigger.width + content.width) / 2 + window.scrollX && "r";
    const l =
      trigger.x - (trigger.width + content.width) / 2 + window.scrollX < 0 &&
      "l";
    return `${y}${l || r || "c"}` as Direction;
  },
  br: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const y =
      body.height < trigger.y + trigger.height + window.scrollY ? "t" : "b";
    const x =
      trigger.x + trigger.width - content.width + window.scrollX < 0
        ? "l"
        : "r";
    return `${y}${x}` as Direction;
  },
  tl: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const y = trigger.y - content.height + window.scrollY < 0 ? "b" : "t";
    const x =
      body.width < trigger.x + content.width + window.scrollX ? "r" : "l";
    return `${y}${x}` as Direction;
  },
  tc: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const y = trigger.y - content.height + window.scrollY < 0 ? "b" : "t";
    const r =
      body.width <
        trigger.x + (trigger.width + content.width) / 2 + window.scrollX && "r";
    const l =
      trigger.x - (trigger.width + content.width) / 2 + window.scrollX < 0 &&
      "l";
    return `${y}${l || r || "c"}` as Direction;
  },
  tr: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const y = trigger.y - content.height + window.scrollY < 0 ? "b" : "t";
    const x =
      trigger.x + trigger.width - content.width + window.scrollX < 0
        ? "l"
        : "r";
    return `${y}${x}` as Direction;
  },
  rt: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const x =
      body.width < trigger.x + trigger.width + content.width + window.scrollX
        ? "l"
        : "r";
    const y =
      body.height < trigger.y + content.height + window.scrollY ? "b" : "t";
    return `${x}${y}` as Direction;
  },
  rc: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const x =
      body.width < trigger.x + trigger.width + content.width + window.scrollX
        ? "l"
        : "r";
    const b =
      body.height <
        trigger.y + (trigger.width + content.height) / 2 + window.scrollY &&
      "b";
    const t =
      trigger.y - (trigger.width + content.height) / 2 + window.scrollY < 0 &&
      "t";
    return `${x}${t || b || "c"}` as Direction;
  },
  rb: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const x =
      body.width < trigger.x + trigger.width + content.width + window.scrollX
        ? "l"
        : "r";
    const y =
      trigger.y + trigger.height - content.height + window.scrollY < 0
        ? "t"
        : "b";
    return `${x}${y}` as Direction;
  },
  lt: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const x = trigger.x - content.width + window.scrollX < 0 ? "r" : "l";
    const y =
      body.height < trigger.y + content.height + window.scrollY ? "b" : "t";
    return `${x}${y}` as Direction;
  },
  lc: (body: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const x = trigger.x - content.width + window.scrollX < 0 ? "r" : "l";
    const b =
      body.height <
        trigger.y + (trigger.width + content.height) / 2 + window.scrollY &&
      "b";
    const t =
      trigger.y - (trigger.width + content.height) / 2 + window.scrollY < 0 &&
      "t";
    return `${x}${t || b || "c"}` as Direction;
  },
  lb: (_: DOMRect, content: DOMRect, trigger: DOMRect) => {
    const x = trigger.x - content.width + window.scrollX < 0 ? "r" : "l";
    const y =
      trigger.y + trigger.height - content.height + window.scrollY < 0
        ? "t"
        : "b";
    return `${x}${y}` as Direction;
  },
};

const fadeAnimation = {
  open: (target: HTMLDivElement, open: () => void) => {
    open();
    target.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      easing: "ease-in-out",
      fill: "forwards",
    });
  },
  close: (target: HTMLDivElement, close: () => void) => {
    const anime = target.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
      fill: "forwards",
      easing: "ease-in-out",
    });
    anime.onfinish = () => {
      close();
    };
  },
};

type Props = {
  direction?: Direction;
  closeOnBlur?: boolean;
  layer?: Exclude<ZIndexKeys, "dialog">;
  gap?: SpacingKeys;
  shadow?: boolean;
  animation?: boolean;
  /** Popupの表示領域を指定します。指定した場合、回り込みロジックによりPopupは指定した要素の内側に表示されます。 */
  bodyElement?: HTMLElement;
  children: ReactNode;
} & ComponentProps<"div">;

const _PopupContent = ({
  closeOnBlur = true,
  layer = "popover",
  gap = "no",
  direction = "bl",
  shadow = true,
  animation = false,
  ...props
}: Props) => {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error(ERROR_MESSAGES.POPUP.INVALID_POPUP_CONTENT_USAGE);

  const contentRef = useRef<HTMLDivElement | null>(null);
  if (closeOnBlur) useClickOutside(contentRef, ctx.closePopup, ctx.triggerRef);

  const getStyle = (): PopupPlacementStyle => {
    const gapRem = getSpacingCss(gap) ?? "0";
    const triggerRect = ctx.triggerRef.current?.getBoundingClientRect();
    if (!triggerRect) return {}; // triggerがない場合はPopupを表示しません
    const bodyRect = props.bodyElement?.getBoundingClientRect();
    const contentRect = contentRef.current?.getBoundingClientRect();
    if (!bodyRect || !contentRect)
      // Popupの表示領域の指定がない場合、回り込みロジックは適用されません。(!bodyRect)
      // レンダリング前にgetStyleが呼ばれると、contentRectを取得できないため、回り込みロジックは適用されません。(!contentRect)
      return getPlacementStyle[direction](triggerRect, gapRem);
    const dir = adjustDirection[direction](bodyRect, contentRect, triggerRect);
    return getPlacementStyle[dir](triggerRect, gapRem);
  };

  const [isActuallyOpen, setIsActuallyOpen] = useState(false);
  const [placementStyle, setPlacementStyle] = useState<PopupPlacementStyle>({});
  const handleResize = () => setPlacementStyle(getStyle());
  useEffect(() => {
    setPlacementStyle(getStyle());
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isActuallyOpen, direction]);

  useEffect(() => {
    if (!animation || !contentRef.current) {
      setIsActuallyOpen(ctx.isOpen);
      return;
    }
    if (ctx.isOpen)
      fadeAnimation.open(contentRef.current, () => setIsActuallyOpen(true));
    else
      fadeAnimation.close(contentRef.current, () => setIsActuallyOpen(false));
  }, [ctx.isOpen]);

  return (
    <WizPortal>
      <div
        className={clsx(
          styles.popupStyle,
          shadow && styles.popupShadowStyle,
          zIndexStyle[layer],
          !isActuallyOpen && styles.popupHiddenStyle
        )}
        ref={contentRef}
        style={{
          position: "absolute",
          ...placementStyle,
        }}
        {...props}
      >
        {props.children}
      </div>
    </WizPortal>
  );
};

_PopupContent.displayName = ComponentName.PopupContent;

export const WizPopupContent = memo(_PopupContent);
