import { ComponentName, ERROR_MESSAGES } from "@wizleap-inc/wiz-ui-constants";
import {
  ComponentProps,
  ForwardedRef,
  ReactNode,
  forwardRef,
  memo,
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
      throw new Error(ERROR_MESSAGES.POPUP.INVALID_POPUP_CLOSE_BUTTON_USAGE);
    const { closePopup } = popupContext;
    return <button {...props} ref={ref} onClick={closePopup} />;
  }
);

_PopupCloseButton.displayName = ComponentName.PopupCloseButton;

export const WizPopupCloseButton = memo(_PopupCloseButton);
