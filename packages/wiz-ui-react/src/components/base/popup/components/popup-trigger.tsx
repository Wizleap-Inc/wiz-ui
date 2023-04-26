import { ComponentName, ERROR_MESSAGES } from "@wizleap-inc/wiz-ui-constants";
import {
  Children,
  MouseEventHandler,
  ReactNode,
  cloneElement,
  memo,
  useContext,
} from "react";

import { PopupContext } from "./popup-context";

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler;
};

const _PopupTrigger = (props: Props) => {
  const popupContext = useContext(PopupContext);
  if (!popupContext)
    throw new Error(ERROR_MESSAGES.POPUP.INVALID_POPUP_CLOSE_BUTTON_USAGE);
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

_PopupTrigger.displayName = ComponentName.PopupTrigger;

export const WizPopupTrigger = memo(_PopupTrigger);
