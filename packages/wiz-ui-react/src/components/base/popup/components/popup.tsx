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
import { PlacementStyle } from "../types/placement";
import { getPopupStyles } from "../utils/popup-position";

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
  const [placementStyle, setPlacementStyle] = useState<PlacementStyle>({});

  useClickOutside([popupRef, anchorElement], () => closeOnBlur && onClose());

  useEffect(() => {
    const anchor = anchorElement.current;
    const content = popupRef.current;
    if (!isActuallyOpen || !anchor || !content) {
      return;
    }
    const updatePlacementStyle = () => {
      const fontSize = window.getComputedStyle(document.body).fontSize;
      const contentRect = content.getBoundingClientRect();

      const styles = getPopupStyles({
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
          x: window.scrollX,
          y: window.scrollY,
        },
        isDirectionFixed,
      });
      setPlacementStyle(styles);
    };

    updatePlacementStyle();
    window.addEventListener("resize", updatePlacementStyle);
    const anchorResizeObserver = new ResizeObserver(updatePlacementStyle);
    anchorResizeObserver.observe(anchor);
    return () => {
      window.removeEventListener("resize", updatePlacementStyle);
      anchorResizeObserver.disconnect();
    };
  }, [anchorElement, direction, gap, isActuallyOpen, isDirectionFixed]);

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
          position: "absolute",
          ...placementStyle,
        }}
      >
        {children}
      </div>
    </WizPortal>
  );
};

Popup.displayName = ComponentName.Popup;

export const WizPopup = Popup;
