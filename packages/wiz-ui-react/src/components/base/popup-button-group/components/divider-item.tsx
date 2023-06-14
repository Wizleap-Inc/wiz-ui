import { popupButtonGroupDividerStyle } from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import clsx from "clsx";
import { FC } from "react";

export const DividerItem: FC = () => {
  return (
    <div>
      <hr className={clsx(popupButtonGroupDividerStyle)} />
    </div>
  );
};
