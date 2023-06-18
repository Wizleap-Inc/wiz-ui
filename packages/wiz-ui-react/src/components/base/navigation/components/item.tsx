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
  onSetIsOpen: (isOpen: boolean) => void;
  onSetLockingPopup: (lock: boolean) => void;
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
  onSetIsOpen,
  onSetLockingPopup,
}) => {
  const popupAnchoer = useRef<HTMLDivElement>(null);

  const existPopup = buttons && buttons.length > 0;

  const handleClick = () => {
    onSetIsOpen(true);
    if (existPopup) onSetLockingPopup(true);
  };

  const handleMouseEnter = () => {
    if (!lockingPopup) onSetIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!lockingPopup) onSetIsOpen(false);
  };

  const handleClosePopup = useCallback(() => {
    onSetIsOpen(false);
    onSetLockingPopup(false);
  }, [onSetIsOpen, onSetLockingPopup]);

  const handleMouseEnterToPopup = () => {
    if (!lockingPopup) onSetIsOpen(true);
  };

  const handleMouseLeaveFromPopup = useCallback(() => {
    if (!lockingPopup) onSetIsOpen(false);
  }, [lockingPopup, onSetIsOpen]);

  const Body: FC = () => (
    <>
      <div
        ref={popupAnchoer}
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
        <div onMouseLeave={handleMouseLeaveFromPopup}>
          <WizPopup
            anchorElement={popupAnchoer}
            isOpen={isOpen}
            onClose={handleClosePopup}
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
