import { ZIndexKeys, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, memo, useRef, useState } from "react";

import { PopupContext } from "./popup-context";

type Direction =
  | "tl"
  | "tr"
  | "tc"
  | "bl"
  | "br"
  | "bc"
  | "rt"
  | "rb"
  | "rc"
  | "lt"
  | "lb"
  | "lc";
type DirectionChar = Direction extends `${infer X}${infer Y}` ? X | Y : never;

type Props = {
  // isOpen: boolean;
  closeOnBlur?: boolean;
  layer?: Exclude<ZIndexKeys, "dialog">;
  gap?: SpacingKeys;
  direction?: Direction;
  shadow?: boolean;
  animation?: boolean;
  children?: ReactNode;
  onMouseLeave?: () => void;
};
const _Popup = ({
  // isOpen,
  closeOnBlur = true,
  layer = "popover",
  gap = "no",
  direction = "bl",
  shadow = true,
  animation = false,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => {
    setIsOpen(true);
    console.log("popup open", isOpen);
  };
  const closePopup = () => {
    setIsOpen(false);
    console.log("popup close", isOpen);
  };
  const containerRef = useRef(null);
  // useClickOutside(containerRef, closePopup);

  const contextValue = {
    isOpen,
    openPopup,
    closePopup,
  };
  return (
    <PopupContext.Provider value={contextValue}>
      <div
        className={clsx(
          styles.popupStyle,
          shadow && styles.popupShadowStyle,
          zIndexStyle[layer]
        )}
        onMouseLeave={props.onMouseLeave}
        ref={containerRef}
      >
        {props.children}
      </div>
    </PopupContext.Provider>
  );
};

export const WizPopup = memo(_Popup);
