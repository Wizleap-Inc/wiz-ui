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
import { DIRECTION_MAP, DirectionKey } from "../types/direction";
import { PlacementOption, PlacementStyle } from "../types/placement";
import { placeOnPortalStyle, wrapOutOfBound } from "../utils";

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
    if (!isActuallyOpen || !anchor) {
      return;
    }
    const getPopupPlacementStyle = () => {
      const anchorRect = anchor.getBoundingClientRect();
      const contentRect = popupRef.current?.getBoundingClientRect();
      const placementOption: PlacementOption = {
        anchor: anchorRect,
        gap: getSpacingCss(gap) ?? "0",
        content: contentRect,
        window: { scrollX: window.scrollX, scrollY: window.scrollY },
      };
      if (isDirectionFixed || !contentRect)
        return placeOnPortalStyle[DIRECTION_MAP[direction]](placementOption);
      const fontSize = window.getComputedStyle(document.body).fontSize;
      const gapPx =
        parseFloat(getSpacingCss(gap) || "0") * parseFloat(fontSize);
      const dir = wrapOutOfBound(DIRECTION_MAP[direction], {
        bound: {
          width: document.body.clientWidth,
          height: Math.max(document.body.clientHeight, window.innerHeight),
        },
        content: contentRect,
        anchor: anchorRect,
        gap: gapPx,
        window: { scrollX: window.scrollX, scrollY: window.scrollY },
      });
      return placeOnPortalStyle[dir](placementOption);
    };

    const updatePlacementStyle = () => {
      setPlacementStyle(getPopupPlacementStyle());
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
