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
  navigationPopupContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import clsx from "clsx";
import { FC, useCallback, useRef } from "react";

import { TIcon, WizPopup, WizPopupButtonGroup, WizTooltip } from "@/components";

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

  const handleClosePopup = useCallback(() => {
    onToggle(false);
    setLock(false);
  }, [onToggle, setLock]);

  const handleMouseEnterToPopup = () => {
    if (!lockingPopup) onToggle(true);
  };

  const handleMouseLeaveFromPopup = useCallback(() => {
    if (!lockingPopup) onToggle(false);
  }, [lockingPopup, onToggle]);

  const Body: FC = () => (
    <>
      <div
        ref={navItemRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: "inline-block" }}
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
            style={{ display: "flex", alignItems: "center" }}
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
            anchorElement={navItemRef}
            isOpen={isOpen}
            onClose={handleClosePopup}
            onMouseLeave={handleMouseLeaveFromPopup}
            direction="rightTop"
            layer="popover"
            isDirectionFixed
          >
            <div
              onMouseEnter={handleMouseEnterToPopup}
              className={navigationPopupContainerStyle}
            >
              <WizPopupButtonGroup
                options={buttons}
                p="xs"
                borderRadius="xs2"
                disabled={disabled}
              />
            </div>
          </WizPopup>
        </div>
      )}
    </>
  );

  if (!tooltipText) return <Body />;

  return (
    <WizTooltip content={tooltipText && <div>{tooltipText}</div>}>
      <Body />
    </WizTooltip>
  );
};

Item.displayName = ComponentName.NavigationItem;

export const WizNavigationItem = Item;
