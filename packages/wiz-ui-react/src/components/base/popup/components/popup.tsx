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

import {
  DIRECTION_MAP,
  DirectionKeys,
  DirectionValues,
} from "../types/direction";
import {
  PopupPlacementStyle,
  fadeAnimation,
  getPlacementStyle,
  wrapDirection,
} from "../utils";

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
  const [isActuallyOpen, setIsActuallyOpen] = useState(false);
  const [placementStyle, setPlacementStyle] = useState<PopupPlacementStyle>({});
  const popupRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(popupRef, () => closeOnBlur && onClose(), anchorElement);

  useEffect(() => {
    if (!animation || !popupRef.current) {
      setIsActuallyOpen(isOpen);
      return;
    }
    if (isOpen)
      fadeAnimation.open(popupRef.current, () => setIsActuallyOpen(true));
    else fadeAnimation.close(popupRef.current, () => setIsActuallyOpen(false));
  }, [animation, isOpen]);

  useEffect(() => {
    const popupPlacement = () => {
      const anchorRect = anchorElement.current?.getBoundingClientRect();
      if (!anchorRect) return {};
      const contentRect = popupRef.current?.getBoundingClientRect();
      const wrapOutOfBound = (dir: DirectionValues) => {
        if (isDirectionFixed || !contentRect) return dir;
        const bodyRect = document.body.getBoundingClientRect();
        return wrapDirection[dir](bodyRect, contentRect, anchorRect);
      };
      return getPlacementStyle[wrapOutOfBound(DIRECTION_MAP[direction])]({
        anchor: anchorRect,
        usePortal: true,
        gap: getSpacingCss(gap) ?? "0",
        content: contentRect,
      });
    };
    setPlacementStyle(popupPlacement());
    const handleResize = () => setPlacementStyle(popupPlacement());
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isActuallyOpen, direction, gap, anchorElement, isDirectionFixed]);

  const content = (
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
  );
  return <WizPortal>{content}</WizPortal>;
};

Popup.displayName = ComponentName.Popup;

export const WizPopup = Popup;
