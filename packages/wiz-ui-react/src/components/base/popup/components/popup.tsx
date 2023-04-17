import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import clsx from "clsx";
import { ReactNode, memo, useEffect, useRef, useState } from "react";

import { PopupContext } from "./popup-context";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  expand?: boolean;
  children?: ReactNode;
};
const _Popup = ({ ...props }: Props) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const contextValue = {
    isOpen: props.isOpen,
    openPopup: () => props.setIsOpen(true),
    closePopup: () => props.setIsOpen(false),
    triggerRef,
  };

  const [_, setWindowSize] = useState({});
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    if (props.isOpen) handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <PopupContext.Provider value={contextValue}>
      <div
        className={clsx(
          styles.popupContainerStyle[props.expand ? "expanded" : "default"]
        )}
      >
        {props.children}
      </div>
    </PopupContext.Provider>
  );
};

export const WizPopup = memo(_Popup);
