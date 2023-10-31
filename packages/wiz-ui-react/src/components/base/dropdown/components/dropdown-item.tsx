import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/dropdown.css";
import clsx from "clsx";
import { FC, MouseEventHandler, ReactNode, useState } from "react";

import { WizHStack, WizIcon } from "@/components";
import { TIcon } from "@/components/icons";
import { BaseProps } from "@/types";
type Props = BaseProps & {
  icon?: TIcon;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const DropdownItem: FC<Props> = ({
  className,
  style,
  icon,
  disabled = false,
  onClick,
  children,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  function getIconColor() {
    if (isPressed) {
      return "white.800";
    }
    if (isHover) {
      return "green.800";
    }
    return undefined;
  }

  return (
    <button
      type="button"
      className={clsx(className, styles.dropdownItemStyle)}
      style={style}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <WizHStack align="center">
        {children}
        {icon && <WizIcon icon={icon} size="md" color={getIconColor()} />}
      </WizHStack>
    </button>
  );
};

DropdownItem.displayName = ComponentName.DropdownItem;

export const WizDropdownItem = DropdownItem;
