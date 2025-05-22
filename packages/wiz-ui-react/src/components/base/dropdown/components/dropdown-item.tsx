import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/dropdown.css";
import clsx from "clsx";
import { ComponentPropsWithoutRef, FC, ReactNode, useState } from "react";

import { WizHStack, WizIcon } from "@/components";
import { TIcon } from "@/components/icons";

type Props = ComponentPropsWithoutRef<"button"> & {
  icon?: TIcon;
  children: ReactNode;
};

const DropdownItem: FC<Props> = ({
  className,
  icon,
  onClick,
  children,
  ...props
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
      {...props}
      type="button"
      className={clsx(className, styles.dropdownItemStyle)}
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
