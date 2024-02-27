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
  FC,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { WizPortal } from "@/components";
import { useClickOutside } from "@/hooks/use-click-outside";
import { BaseProps } from "@/types";

import { usePopupAnimation } from "../hooks/use-popup-animation";
import { DirectionKey } from "../types/direction";
import { getPopupPosition } from "../utils";

type Props = BaseProps & {
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

/** 与えられた要素が、fixedまたはstickyの要素上にあるかどうかを返します。 */
const hasFixedOrStickyParent = (el: HTMLElement | null): boolean => {
  if (!el) {
    return false;
  }
  const position = window.getComputedStyle(el).position;
  if (position === "fixed" || position === "sticky") {
    return true;
  }
  return hasFixedOrStickyParent(el.parentElement);
};

const Popup: FC<Props> = ({
  className,
  style,
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
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const isActuallyOpen = usePopupAnimation(animation, popupRef, isOpen);
  const [popupPosition, setPopupPosition] = useState<{
    top?: number;
    left?: number;
  }>({});

  useClickOutside([popupRef, anchorElement], () => closeOnBlur && onClose());

  const isPopupFixed = hasFixedOrStickyParent(anchorElement.current);

  const updatePopupPosition = useCallback(() => {
    if (!anchorElement.current || !popupRef.current) {
      return;
    }

    const fontSize = window.getComputedStyle(document.body).fontSize;
    const contentRect = popupRef.current.getBoundingClientRect();

    setPopupPosition(
      getPopupPosition({
        anchorRect: anchorElement.current.getBoundingClientRect(),
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
  }, [anchorElement, direction, gap, isDirectionFixed, isPopupFixed]);

  useEffect(() => {
    const anchor = anchorElement.current;
    const content = popupRef.current;
    if (!isActuallyOpen || !anchor || !content) {
      return;
    }
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
  }, [anchorElement, isActuallyOpen, updatePopupPosition]);

  useLayoutEffect(() => {
    if (children) {
      updatePopupPosition();
    }
  }, [children, updatePopupPosition]);

  return (
    <WizPortal container={document.body}>
      <div
        ref={popupRef}
        className={clsx(
          className,
          styles.popupStyle,
          shadow && styles.popupShadowStyle,
          zIndexStyle[layer],
          !isActuallyOpen && styles.popupHiddenStyle
        )}
        style={{
          ...style,
          animationName: "fade",
          position: isPopupFixed ? "fixed" : "absolute",
          transform: "translateZ(0)", // Safariで影が消えない問題の対策
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
