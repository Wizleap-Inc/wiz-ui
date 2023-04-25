import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  ComponentProps,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useContext,
} from "react";

import { PopupContext } from "./popup-context";

type Props = {
  children: ReactNode;
} & ComponentProps<"button">;

const _PopupCloseButton = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const popupContext = useContext(PopupContext);
    if (!popupContext)
      throw new Error("PopupTrigger must be used inside PopupContainer");
    const { closePopup } = popupContext;
    return <button {...props} ref={ref} onClick={closePopup} />;
  }
);

_PopupCloseButton.displayName = ComponentName.PopupCloseButton;

export const WizPopupCloseButton = _PopupCloseButton;
