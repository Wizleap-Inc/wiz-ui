import { ZIndexKeys, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
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
  expand?: boolean;
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
  const triggerRef = useRef(null);

  const contextValue = {
    isOpen,
    openPopup,
    closePopup,
    triggerRef,
    direction,
    closeOnBlur,
    layer,
    gap,
    shadow,
    animation,
  };
  return (
    <PopupContext.Provider value={contextValue}>
      <div
        className={clsx(
          styles.popupContainerStyle[props.expand ? "expanded" : "default"]
        )}
        style={{ position: "relative" }}
      >
        {props.children}
      </div>
    </PopupContext.Provider>
  );
};

export const WizPopup = memo(_Popup);
