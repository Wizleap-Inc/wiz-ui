import { THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  popupButtonGroupTitleBaseStyle,
  popupButtonGroupTitleVariantStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import clsx from "clsx";

import { BaseProps } from "@/types";

import { GroupItem as GroupItemType } from "../types";

import { WizPopupButtonGroup } from "./popup-button-group";

type Props<T> = BaseProps & {
  item: GroupItemType<T>;
  disabled: boolean;
  depth: number;
};

export const GroupItem = <T,>({
  className,
  style,
  item,
  disabled,
  depth,
}: Props<T>) => {
  return (
    <div className={className} style={style}>
      <span
        className={clsx(
          popupButtonGroupTitleBaseStyle,
          disabled
            ? popupButtonGroupTitleVariantStyle["disabled"]
            : popupButtonGroupTitleVariantStyle["enabled"]
        )}
        style={{
          paddingLeft: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
        }}
      >
        {item.title}
      </span>
      <WizPopupButtonGroup
        options={item.items}
        groupDivider={item.groupDivider}
        buttonDivider={item.buttonDivider}
        disabled={disabled}
        depth={depth + 1}
      />
    </div>
  );
};
