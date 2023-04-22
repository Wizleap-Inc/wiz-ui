import * as styles from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import clsx from "clsx";
import { ReactNode, memo, useRef } from "react";

import { PopupContext } from "./popup-context";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  expand?: boolean;
  children?: ReactNode;
};
const _Popup = ({ ...props }: Props) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const contextValue = {
    isOpen: props.isOpen,
    openPopup: () => props.setIsOpen(true),
    closePopup: () => props.setIsOpen(false),
    triggerRef,
  };

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
