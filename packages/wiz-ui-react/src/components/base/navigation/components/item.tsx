import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { FC } from "react";

const Item: FC = () => {
  // WizToolTip実装後に対応
  return <div className=""></div>;
};

Item.displayName = ComponentName.NavigationItem;

export const WizNavItem = Item;
