import { THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  popupButtonGroupButtonBaseStyle,
  popupButtonGroupButtonVariantStyle,
  popupButtonGroupDisabledCursorStyle,
  popupButtonGroupInnerContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import clsx from "clsx";
import { FC, KeyboardEvent, useMemo, useState } from "react";

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

  const iconColor = useMemo(() => {
    if (item.option.value === isClicking) {
      return "white.800";
    } else if (disabled || item.option.disabled) {
      return "gray.400";
    } else if (item.option.value === isHover) {
      return "green.800";
    }
    return item.option.iconDefaultColor ?? "gray.500";
  }, [
    disabled,
    isClicking,
    isHover,
    item.option.disabled,
    item.option.iconDefaultColor,
    item.option.value,
  ]);

  const popupButtonMouseDown = (item: ButtonItemType) => {
    if (disabled || item.option.disabled) return;
    item.option.onClick();
  };

  const popupButtonMouseOver = (item: ButtonItemType) => {
    if (disabled || item.option.disabled) return;
    setIsHover(item.option.value);
  };

  const popupButtonMouseOut = (item: ButtonItemType) => {
    if (disabled || item.option.disabled) return;
    setIsHover(null);
  };

  const popupButtonKeyPress = (
    e: KeyboardEvent<HTMLDivElement>,
    item: ButtonItemType
  ) => {
    if (e.key !== "Enter") return;
    if (disabled || item.option.disabled) return;
    item.option.onClick();
  };

  const onHoldClick = (item: ButtonItemType) => {
    if (disabled || item.option.disabled) return;
    setIsClicking(item.option.value);
    const mouseup = () => {
      setIsClicking(null);
      document.removeEventListener("mouseup", mouseup);
    };
    document.addEventListener("mouseup", mouseup);
  };

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
        onClick={() => popupButtonMouseDown(item)}
        onMouseOver={() => popupButtonMouseOver(item)}
        onMouseOut={() => popupButtonMouseOut(item)}
        onMouseDown={() => onHoldClick(item)}
        onKeyDown={(e) => popupButtonKeyPress(e, item)}
        tabIndex={0}
      >
        <span className={clsx(popupButtonGroupInnerContainerStyle)}>
          <span>{item.option.label}</span>
          {!!item.option.icon && (
            <WizIcon icon={item.option.icon} color={iconColor} size="md" />
          )}
        </span>
      </div>
    </div>
  );
};
