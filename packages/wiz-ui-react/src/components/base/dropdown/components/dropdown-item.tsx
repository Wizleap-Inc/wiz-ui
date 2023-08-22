import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/dropdown.css";
import { FC, MouseEventHandler, ReactNode, useState } from "react";

import { WizHStack, WizIcon } from "@/components";
import { TIcon } from "@/components/icons";

type Props = {
  icon?: TIcon;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const DropdownItem: FC<Props> = ({
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
      className={styles.dropdownItemStyle}
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
