import { ReactNode, useContext } from "react";

import { PopupContext } from "./popup-context";

export const WizPopupClose = (props: { children: ReactNode }) => {
  const popupContext = useContext(PopupContext);
  if (!popupContext)
    throw new Error("PopupTrigger must be used inside PopupContainer");
  const { closePopup } = popupContext;
  return <div onClick={closePopup}>{props.children}</div>;
};
