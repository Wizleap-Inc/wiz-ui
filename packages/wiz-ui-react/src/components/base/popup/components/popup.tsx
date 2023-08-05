import {
  ComponentName,
  SpacingKeys,
  ZIndexKeys,
  getSpacingCss,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  ComponentProps,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import { WizPortal } from "@/components";
import { useClickOutside } from "@/hooks/use-click-outside";

import { usePopupAnimation } from "../hooks/use-popup-animation";
import { DirectionKey } from "../types/direction";
import { getPopupPosition } from "../utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  anchorElement: RefObject<HTMLElement>;
  direction?: DirectionKey;
  gap?: Exclude<SpacingKeys, "at">;
  closeOnBlur?: boolean;
  layer?: Exclude<ZIndexKeys, "dialog">;
  animation?: boolean;
  shadow?: boolean;
  /** Popupの表示位置を固定するかどうかを指定します。
   * `false`の場合、回り込みロジックが適用されます。
   * @default: true
   */
  isDirectionFixed?: boolean;
  children: ReactNode;
} & ComponentProps<"div">;

const Popup = ({
  isOpen,
  onClose,
  anchorElement,
  closeOnBlur = true,
  layer = "popover",
  gap = "no",
  direction = "bottomLeft",
  shadow = true,
  animation = false,
  isDirectionFixed = false,
  children,
}: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const isActuallyOpen = usePopupAnimation(animation, popupRef, isOpen);
  const [popupPosition, setPopupPosition] = useState<{
    top?: number;
    left?: number;
  }>({});

  useClickOutside([popupRef, anchorElement], () => closeOnBlur && onClose());

  const existsFixedOrStickyParent = (
    el: HTMLElement | null
  ): HTMLElement | null => {
    if (!el) return null;
    const position = window.getComputedStyle(el).position;
    if (position === "fixed" || position === "sticky") return el;
    return existsFixedOrStickyParent(el.parentElement);
  };

  const isPopupFixed = !!existsFixedOrStickyParent(anchorElement.current);

  useEffect(() => {
    const anchor = anchorElement.current;
    const content = popupRef.current;
    if (!isActuallyOpen || !anchor || !content) {
      return;
    }
    const updatePopupPosition = () => {
      const fontSize = window.getComputedStyle(document.body).fontSize;
      const contentRect = content.getBoundingClientRect();

      setPopupPosition(
        getPopupPosition({
          anchorRect: anchor.getBoundingClientRect(),
          popupSize: {
            width: contentRect.width,
            height: contentRect.height,
          },
          directionKey: direction,
          gap: parseFloat(getSpacingCss(gap) || "0") * parseFloat(fontSize),
          screenSize: {
            width: document.body.clientWidth,
            height: Math.max(document.body.clientHeight, window.innerHeight),
          },
          scroll: {
            x: isPopupFixed ? 0 : window.scrollX,
            y: isPopupFixed ? 0 : window.scrollY,
          },
          isDirectionFixed,
        })
      );
    };

    updatePopupPosition();
    window.addEventListener("scroll", updatePopupPosition);
    window.addEventListener("resize", updatePopupPosition);
    const anchorResizeObserver = new ResizeObserver(updatePopupPosition);
    anchorResizeObserver.observe(anchor);
    return () => {
      window.removeEventListener("resize", updatePopupPosition);
      window.removeEventListener("scroll", updatePopupPosition);
      anchorResizeObserver.disconnect();
    };
  }, [
    anchorElement,
    direction,
    gap,
    isActuallyOpen,
    isDirectionFixed,
    isPopupFixed,
  ]);

  return (
    <WizPortal container={document.body}>
      <div
        ref={popupRef}
        className={clsx(
          styles.popupStyle,
          shadow && styles.popupShadowStyle,
          zIndexStyle[layer],
          !isActuallyOpen && styles.popupHiddenStyle
        )}
        style={{
          position: isPopupFixed ? "fixed" : "absolute",
          transform: "translateZ(0)",
          ...popupPosition,
        }}
      >
        {children}
      </div>
    </WizPortal>
  );
};

Popup.displayName = ComponentName.Popup;

export const WizPopup = Popup;
