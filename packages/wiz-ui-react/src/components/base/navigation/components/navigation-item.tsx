import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationItemIconStyle,
  navigationItemIconActiveStyle,
  navigationItemTextStyle,
  navigationItemTextActiveStyle,
  navigationItemIconDisabledStyle,
  navigationPopupContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import clsx from "clsx";
import { FC, useCallback, useRef } from "react";

import { TIcon, WizPopup, WizPopupButtonGroup, WizTooltip } from "@/components";

import { ButtonGroupItem } from "../../popup-button-group/types";

import { NavigationItemLink } from "./navigation-item-link";

interface Props {
  icon: TIcon;
  label: string;
  active: boolean;
  href: string;
  disabled?: boolean;
  tooltipText?: string;
  isPopupLocking?: boolean;
  buttons?: ButtonGroupItem[];
  isPopupOpen?: boolean;
  onTogglePopup: (isPopup: boolean) => void;
  onTogglePopupLocking: (lock: boolean) => void;
}

const NavigationItem: FC<Props> = ({
  icon: Icon,
  label,
  active,
  href,
  disabled = false,
  tooltipText = null,
  isPopupLocking = true,
  buttons,
  isPopupOpen = false,
  onTogglePopup,
  onTogglePopupLocking,
}) => {
  const popupAnchor = useRef<HTMLDivElement>(null);

  const isExternalLink = href.startsWith("http");
  const existPopup = buttons && buttons.length > 0;

  const handleClick = () => {
    onTogglePopup(true);
    if (existPopup) onTogglePopupLocking(true);
  };

  const handleMouseEnter = () => {
    if (!isPopupLocking) onTogglePopup(true);
  };

  const handleMouseLeave = () => {
    if (!isPopupLocking) onTogglePopup(false);
  };

  const handleClosePopup = useCallback(() => {
    if (!isPopupOpen) return;
    onTogglePopup(false);
    onTogglePopupLocking(false);
  }, [isPopupOpen, onTogglePopup, onTogglePopupLocking]);

  const handleMouseEnterToPopup = () => {
    if (!isPopupLocking) onTogglePopup(true);
  };

  const handleMouseLeaveFromPopup = () => {
    if (!isPopupLocking) onTogglePopup(false);
  };

  const body = (
    <>
      <div
        ref={popupAnchor}
        onClick={handleClick}
        style={{ display: tooltipText ? "block" : "inline-block" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NavigationItemLink
          isExternalLink={isExternalLink}
          href={href}
          active={active}
          disabled={disabled}
        >
          <>
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
          </>
        </NavigationItemLink>
      </div>
      {existPopup && (
        <div>
          <WizPopup
            anchorElement={popupAnchor}
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            direction="rightTop"
            layer="popover"
            isDirectionFixed
          >
            <div
              className={navigationPopupContainerStyle}
              onMouseEnter={handleMouseEnterToPopup}
              onMouseLeave={handleMouseLeaveFromPopup}
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

  if (!tooltipText) return body;

  return (
    <WizTooltip content={tooltipText && <div>{tooltipText}</div>}>
      {body}
    </WizTooltip>
  );
};

NavigationItem.displayName = ComponentName.NavigationItem;

export const WizNavigationItem = NavigationItem;
