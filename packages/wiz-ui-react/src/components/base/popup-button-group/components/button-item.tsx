import { THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  popupButtonGroupButtonBaseStyle,
  popupButtonGroupButtonVariantStyle,
  popupButtonGroupDisabledCursorStyle,
  popupButtonGroupInnerContainerStyle,
  popupButtonGroupInnerContainerLabel,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import clsx from "clsx";
import { FC, KeyboardEvent, useMemo, useState } from "react";

import { WizIcon } from "@/components";

import { ButtonItem as ButtonItemType } from "../types";

interface Props {
  item: ButtonItemType;
  disabled: boolean;
  depth: number;
  showExLabel?: boolean;
}

export const ButtonItem: FC<Props> = ({
  item,
  disabled,
  depth,
  showExLabel,
}) => {
  const [isClicking, setIsClicking] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const isDisabled = disabled || item.option.disabled;

  const iconColor = useMemo(() => {
    if (isClicking) {
      return "white.800";
    } else if (isDisabled) {
      return "gray.400";
    } else if (isHover) {
      return "green.800";
    }
    return item.option.iconDefaultColor ?? "gray.500";
  }, [isClicking, isDisabled, isHover, item.option.iconDefaultColor]);

  const handleClick = () => {
    if (isDisabled) return;
    item.option.onClick();
  };

  const handleMouseOver = () => {
    if (isDisabled) return;
    setIsHover(true);
  };

  const handleMouseOut = () => {
    if (isDisabled) return;
    setIsHover(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    if (isDisabled) return;
    item.option.onClick();
  };

  const handleMouseDown = () => {
    if (isDisabled) return;
    setIsClicking(true);
    const mouseup = () => {
      setIsClicking(false);
      document.removeEventListener("mouseup", mouseup);
    };
    document.addEventListener("mouseup", mouseup);
  };

  return (
    <div>
      <div
        className={clsx(
          popupButtonGroupButtonBaseStyle,
          isDisabled
            ? popupButtonGroupButtonVariantStyle["disabled"]
            : popupButtonGroupButtonVariantStyle["enabled"],
          item.option.disabled && popupButtonGroupDisabledCursorStyle
        )}
        style={{
          paddingLeft: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
          paddingRight: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
        }}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <span className={popupButtonGroupInnerContainerStyle}>
          <span
            className={showExLabel ? popupButtonGroupInnerContainerLabel : ""}
          >
            {item.option.label}
          </span>
          {item.option.icon && (
            <WizIcon icon={item.option.icon} color={iconColor} size="md" />
          )}
        </span>
        {item.option.exLabel && <span>{item.option.exLabel}</span>}
      </div>
    </div>
  );
};
