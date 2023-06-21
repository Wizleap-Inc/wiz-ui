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
import { FC, useCallback, useEffect, useRef } from "react";

import { TIcon, WizPopup, WizPopupButtonGroup, WizTooltip } from "@/components";

import { ButtonGroupItem } from "../../popup-button-group/types";

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
  const popupBody = useRef<HTMLDivElement>(null);

  const isExternalLink = href.startsWith("http");
  const existPopup = buttons && buttons.length > 0;

  const handleClick = () => {
    onTogglePopup(true);
    if (existPopup) onTogglePopupLocking(true);
  };

  useEffect(() => {
    if (isPopupLocking) return;

    const handleMouseOver = (event: MouseEvent) => {
      if (!popupAnchor.current?.contains(event.target as Node)) return;
      onTogglePopup(true);
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!popupAnchor.current || !popupBody.current) return;
      if (popupAnchor.current.contains(event.target as Node)) return;
      if (popupBody.current.contains(event.target as Node)) return;
      onTogglePopup(false);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseover", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseover", handleMouseOut);
    };
  }, [isPopupLocking, onTogglePopup]);

  const handleClosePopup = useCallback(() => {
    if (!isPopupOpen) return;
    onTogglePopup(false);
    onTogglePopupLocking(false);
  }, [isPopupOpen, onTogglePopup, onTogglePopupLocking]);

  const handleMouseLeaveFromPopup = useCallback(() => {
    if (!isPopupLocking) onTogglePopup(false);
  }, [isPopupLocking, onTogglePopup]);

  const Body: FC = () => (
    <>
      <div
        ref={popupAnchor}
        onClick={handleClick}
        style={{ display: tooltipText ? "block" : "inline-block" }}
      >
        <a
          href={disabled ? undefined : href}
          target={!disabled && isExternalLink ? "_blank" : undefined}
          rel={!disabled && isExternalLink ? "noreferrer" : undefined}
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
            anchorElement={popupAnchor}
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            onMouseLeave={handleMouseLeaveFromPopup}
            direction="rightTop"
            layer="popover"
            isDirectionFixed
          >
            <div ref={popupBody} className={navigationPopupContainerStyle}>
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

NavigationItem.displayName = ComponentName.NavigationItem;

export const WizNavigationItem = NavigationItem;
