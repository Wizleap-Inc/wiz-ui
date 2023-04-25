import {
  Children,
  MouseEventHandler,
  ReactNode,
  cloneElement,
  useContext,
} from "react";

import { PopupContext } from "./popup-context";

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler;
};

export const WizPopupTrigger = (props: Props) => {
  const popupContext = useContext(PopupContext);
  if (!popupContext)
    throw new Error("PopupTrigger must be used inside PopupContainer");
  const { isOpen, openPopup, closePopup, triggerRef } = popupContext;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const child: any = Children.only(props.children);
  const handleClick: MouseEventHandler = (e) => {
    if (isOpen) closePopup();
    else openPopup();
    props.onClick?.(e);
  };
  return cloneElement(child, {
    onClick: handleClick,
    ref: triggerRef,
  });
};
