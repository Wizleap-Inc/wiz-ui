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
import {
  DIRECTION_MAP,
  DirectionKeys,
  DirectionValues,
} from "../types/direction";
import { PlacementStyle } from "../types/placement";
import { placeOnPortalStyle, wrapDirection } from "../utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  anchorElement: RefObject<HTMLElement>;
  direction?: DirectionKeys;
  gap?: SpacingKeys;
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
  isDirectionFixed = true,
  children,
}: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const isActuallyOpen = usePopupAnimation(animation, popupRef, isOpen);
  const [placementStyle, setPlacementStyle] = useState<PlacementStyle>({});

  useClickOutside([popupRef, anchorElement], () => closeOnBlur && onClose());

  useEffect(() => {
    const popupPlacement = () => {
      if (!anchorElement.current) return {};
      const anchorRect = anchorElement.current?.getBoundingClientRect();
      const contentRect = popupRef.current?.getBoundingClientRect();
      const wrapOutOfBound = (dir: DirectionValues) => {
        if (isDirectionFixed || !contentRect) return dir;
        const bodyRect = document.body.getBoundingClientRect();
        return wrapDirection[dir]({
          bound: bodyRect,
          content: contentRect,
          anchor: anchorRect,
          window: { scrollX: window.scrollX, scrollY: window.scrollY },
        });
      };
      return placeOnPortalStyle[wrapOutOfBound(DIRECTION_MAP[direction])]({
        anchor: anchorRect,
        gap: getSpacingCss(gap) ?? "0",
        content: contentRect,
        window: { scrollX: window.scrollX, scrollY: window.scrollY },
      });
    };
    setPlacementStyle(popupPlacement());
    const handleResize = () => setPlacementStyle(popupPlacement());
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isActuallyOpen, direction, gap, anchorElement, isDirectionFixed]);

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
