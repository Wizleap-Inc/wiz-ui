import { ZIndexKeys, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { zIndexStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, memo, useRef, useState } from "react";

import { Direction } from "../types/direction";

import { PopupContext } from "./popup-context";

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
  const triggerRef = useRef(null);

  const contextValue = {
    isOpen,
    openPopup,
    closePopup,
    triggerRef,
    placement: direction,
  };
  return (
    <PopupContext.Provider value={contextValue}>
      <div
        className={clsx(
          styles.popupStyle,
          shadow && styles.popupShadowStyle,
          zIndexStyle[layer]
          // styles.popupHiddenStyle
        )}
        style={{ position: "relative" }}
        onMouseLeave={props.onMouseLeave}
        ref={containerRef}
      >
        {props.children}
      </div>
    </PopupContext.Provider>
  );
};

export const WizPopup = memo(_Popup);
