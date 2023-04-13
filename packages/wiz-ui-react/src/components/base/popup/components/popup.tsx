import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import clsx from "clsx";
import { ReactNode, memo, useRef, useState } from "react";

import { PopupContext } from "./popup-context";

type Props = {
  expand?: boolean;
  children?: ReactNode;
};
const _Popup = ({ ...props }: Props) => {
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
