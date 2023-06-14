import { THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  popupButtonGroupButtonBaseStyle,
  popupButtonGroupButtonVariantStyle,
  popupButtonGroupDisabledCursorStyle,
  popupButtonGroupInnerContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import clsx from "clsx";
import { FC, useState } from "react";

import { WizIcon } from "@/components";

import { ButtonItem as ButtonItemType } from "../types";

interface Props {
  item: ButtonItemType;
  disabled: boolean;
  depth: number;
}

export const ButtonItem: FC<Props> = ({ item, disabled, depth }) => {
  const [isClicking, setIsClicking] = useState<number | null>(null);
  const [isHover, setIsHover] = useState<number | null>(null);

  return (
    <div>
      <div
        className={clsx(
          popupButtonGroupButtonBaseStyle,
          disabled || item.option.disabled
            ? popupButtonGroupButtonVariantStyle["disabled"]
            : popupButtonGroupButtonVariantStyle["enabled"],
          item.option.disabled && popupButtonGroupDisabledCursorStyle
        )}
        style={{
          paddingLeft: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
        }}
        // onClick={}
      >
        <span className={clsx(popupButtonGroupInnerContainerStyle)}>
          <span>{item.option.label}</span>
          {!!item.option.icon && (
            <WizIcon
              icon={item.option.icon}
              color={
                item.option.value === isClicking
                  ? "white.800"
                  : disabled || item.option.disabled
                  ? "gray.400"
                  : item.option.value === isHover
                  ? "green.800"
                  : item.option.iconDefaultColor ?? "gray.500"
              }
              size="md"
            />
          )}
        </span>
      </div>
    </div>
  );
};
