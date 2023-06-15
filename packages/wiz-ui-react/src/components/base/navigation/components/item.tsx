import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { FC, useRef } from "react";

import { TIcon, WizTooltip } from "@/components";

import { ButtonGroupItem } from "../../popup-button-group/types";

interface Props {
  icon: TIcon;
  label: string;
  active: boolean;
  href: string;
  disabled?: boolean;
  tooltipText?: string;
  lockingPopup?: boolean;
  buttons?: ButtonGroupItem[];
  isOpen?: boolean;
  onToggle: (isOpen: boolean) => void;
  setLock: (lock: boolean) => void;
}

const Item: FC<Props> = ({
  icon,
  label,
  active,
  href,
  disabled = false,
  tooltipText = null,
  lockingPopup = true,
  buttons,
  isOpen,
  onToggle,
  setLock,
}) => {
  const navItemRef = useRef<HTMLDivElement>(null);

  const existPopup = buttons && buttons.length > 0;

  const navItemOnClick = () => {
    onToggle(true);
    if (existPopup) setLock(true);
  };

  const navItemMouseEnter = () => {
    if (!lockingPopup) onToggle(true);
  };

  const navItemMouseLeave = () => {
    if (!lockingPopup) onToggle(false);
  };

  return (
    <WizTooltip content={<div>{tooltipText}</div>}>
      <div
        ref={navItemRef}
        onClick={navItemOnClick}
        onMouseEnter={navItemMouseEnter}
        onMouseLeave={navItemMouseLeave}
      >
        <a href={href}></a>
      </div>
    </WizTooltip>
  );
};
Item.displayName = ComponentName.NavigationItem;

export const WizNavigationItem = Item;
