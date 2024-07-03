import { popupButtonGroupDividerStyle } from "@wizleap-inc/wiz-ui-styles/bases/search-selector.css";
import { FC } from "react";

export const DividerItem: FC = () => {
  return (
    <div>
      <hr className={popupButtonGroupDividerStyle} />
    </div>
  );
};
