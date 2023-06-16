import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationItemStyle,
  navigationItemActiveStyle,
  navigationItemIconStyle,
  navigationItemIconActiveStyle,
  navigationItemTextStyle,
  navigationItemTextActiveStyle,
  navigationItemDisabledStyle,
  navigationItemIconDisabledStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import clsx from "clsx";
import { FC, useRef } from "react";

import { TIcon, WizPopup, WizTooltip } from "@/components";

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
  icon: Icon,
  label,
  active,
  href,
  disabled = false,
  tooltipText = null,
  lockingPopup = true,
  buttons,
  isOpen = false,
  onToggle,
  setLock,
}) => {
  const navItemRef = useRef<HTMLDivElement>(null);

  const existPopup = buttons && buttons.length > 0;

  const handleClick = () => {
    onToggle(true);
    if (existPopup) setLock(true);
  };

  const handleMouseEnter = () => {
    if (!lockingPopup) onToggle(true);
  };

  const handleMouseLeave = () => {
    if (!lockingPopup) onToggle(false);
  };

  return (
    <WizTooltip content={<div>{tooltipText}</div>}>
      <div
        ref={navItemRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href={disabled ? undefined : href}
          target={disabled ? undefined : "_blank"}
          rel={disabled ? undefined : "noreferrer"}
          className={clsx(
            navigationItemStyle,
            disabled
              ? navigationItemDisabledStyle
              : active && navigationItemActiveStyle
          )}
        >
          <div
            className={clsx(
              navigationItemIconStyle,
              disabled
                ? navigationItemIconDisabledStyle
                : active && navigationItemIconActiveStyle
            )}
          >
            <Icon />
          </div>
          <div
            className={clsx(
              navigationItemTextStyle,
              !disabled && active && navigationItemTextActiveStyle
            )}
          >
            {label}
          </div>
        </a>
      </div>
      {existPopup && (
        <div>
          <WizPopup
            isOpen={isOpen}
            onClose={}
            direction="rightTop"
            layer="popover"
            isDirectionFixed
          >
            <div className="">a</div>
          </WizPopup>
        </div>
      )}
    </WizTooltip>
  );
};

Item.displayName = ComponentName.NavigationItem;

export const WizNavigationItem = Item;
