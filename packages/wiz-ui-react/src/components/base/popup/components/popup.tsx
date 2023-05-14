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
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { WizPortal } from "@/components";
import { useClickOutside } from "@/hooks/use-click-outside";

import { DIRECTION_MAP, DirectionKeys } from "../types/direction";
import {
  PopupPlacementStyle,
  adjustDirection,
  fadeAnimation,
  getPlacementStyle,
} from "../utils";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  anchorElement: RefObject<HTMLElement>;
  usePortal?: boolean;
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
  setIsOpen,
  anchorElement,
  usePortal = false,
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

  const getStyle = useCallback((): PopupPlacementStyle => {
    const anchorRect = anchorElement.current?.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    const contentRect = popupRef.current?.getBoundingClientRect();
    const gapRem = getSpacingCss(gap) ?? "0";
    const dir = DIRECTION_MAP[direction];
    if (!anchorRect) return {};
    if (isDirectionFixed || !contentRect)
      // レンダリング前にgetStyleが呼ばれると、contentRectを取得できないため、回り込みロジックは適用されません。(!contentRect)
      return getPlacementStyle[dir]({
        anchor: anchorRect,
        usePortal: usePortal,
        gap: gapRem,
        content: contentRect,
      });
    const dir2 = adjustDirection[dir](bodyRect, contentRect, anchorRect);
    return getPlacementStyle[dir2]({
      anchor: anchorRect,
      usePortal: usePortal,
      content: contentRect,
      gap: gapRem,
    });
  }, [anchorElement, gap, direction, isDirectionFixed, usePortal]);

  useClickOutside(
    popupRef,
    () => closeOnBlur && setIsOpen(false),
    anchorElement
  );

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
    setPlacementStyle(getStyle());
    const handleResize = () => setPlacementStyle(getStyle());
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isActuallyOpen, direction, getStyle]);

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
  if (usePortal) return <WizPortal>{content}</WizPortal>;
  return content;
};

Popup.displayName = ComponentName.Popup;

export const WizPopup = Popup;
