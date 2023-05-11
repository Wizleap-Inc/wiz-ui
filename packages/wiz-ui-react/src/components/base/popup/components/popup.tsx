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
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import { WizPortal } from "@/components";
import { useClickOutside } from "@/hooks/use-click-outside";

import { Direction } from "../types/direction";
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
  direction?: Direction;
  gap?: SpacingKeys;
  closeOnBlur?: boolean;
  layer?: Exclude<ZIndexKeys, "dialog">;
  animation?: boolean;
  shadow?: boolean;
  /** Popupの表示領域を指定します。指定した場合、回り込みロジックによりPopupは指定した要素の内側に表示されます。 */
  bodyElement?: HTMLElement;
  children: ReactNode;
} & ComponentProps<"div">;

const _Popup = ({
  isOpen,
  closeOnBlur = true,
  layer = "popover",
  gap = "no",
  direction = "bl",
  shadow = true,
  animation = false,
  ...props
}: Props) => {
  const [isActuallyOpen, setIsActuallyOpen] = useState(false);
  const [placementStyle, setPlacementStyle] = useState<PopupPlacementStyle>({});
  const popupRef = useRef<HTMLDivElement | null>(null);

  const getStyle = (): PopupPlacementStyle => {
    const anchorRect = props.anchorElement.current?.getBoundingClientRect();
    const bodyRect = props.bodyElement?.getBoundingClientRect();
    const contentRect = popupRef.current?.getBoundingClientRect();
    const gapRem = getSpacingCss(gap) ?? "0";
    if (!anchorRect) return {};
    if (!bodyRect || !contentRect)
      // Popupの表示領域の指定がない場合、回り込みロジックは適用されません。(!bodyRect)
      // レンダリング前にgetStyleが呼ばれると、contentRectを取得できないため、回り込みロジックは適用されません。(!contentRect)
      return getPlacementStyle[direction](anchorRect, gapRem);
    const dir = adjustDirection[direction](bodyRect, contentRect, anchorRect);
    return getPlacementStyle[dir](anchorRect, gapRem);
  };

  if (closeOnBlur)
    useClickOutside(
      popupRef,
      () => props.setIsOpen(false),
      props.anchorElement
    );

  useEffect(() => {
    if (!animation || !popupRef.current) {
      setIsActuallyOpen(isOpen);
      return;
    }
    if (isOpen)
      fadeAnimation.open(popupRef.current, () => setIsActuallyOpen(true));
    else fadeAnimation.close(popupRef.current, () => setIsActuallyOpen(false));
  }, [isOpen]);

  useEffect(() => {
    setPlacementStyle(getStyle());
    const handleResize = () => setPlacementStyle(getStyle());
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isActuallyOpen, direction]);

  return (
    <WizPortal>
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
        {props.children}
      </div>
    </WizPortal>
  );
};

_Popup.displayName = ComponentName.Popup;

export const WizPopup = memo(_Popup);
