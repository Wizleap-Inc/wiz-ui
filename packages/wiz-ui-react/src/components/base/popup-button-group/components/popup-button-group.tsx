import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { FC } from "react";

interface Props {
  a?: number;
}

const PopupButtonGroup: FC<Props> = ({}) => {
  return <div className=""></div>;
};

PopupButtonGroup.displayName = ComponentName.PopupButtonGroup;

export const WizPopupButtonGroup = PopupButtonGroup;
