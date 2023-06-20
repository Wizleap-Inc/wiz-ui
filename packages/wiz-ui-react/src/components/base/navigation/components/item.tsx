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
  lockingPopup?: boolean;
  buttons?: ButtonGroupItem[];
  isOpenPopup?: boolean;
  onSetIsOpenPopup: (isOpenPopup: boolean) => void;
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
  isOpenPopup = false,
  onSetIsOpenPopup,
  onSetLockingPopup,
}) => {
  const popupAnchoer = useRef<HTMLDivElement>(null);
  const popupBody = useRef<HTMLDivElement>(null);

  const isExternalLink = typeof href === "string" && href.startsWith("http");
  const existPopup = buttons && buttons.length > 0;

  const handleClick = () => {
    onSetIsOpenPopup(true);
    if (existPopup) onSetLockingPopup(true);
  };

  useEffect(() => {
    if (lockingPopup) return;

    const handleMouseEnter = (event: MouseEvent) => {
      if (!popupAnchoer.current?.contains(event.target as Node)) return;
      onSetIsOpenPopup(true);
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!popupAnchoer.current || !popupBody.current) return;
      if (popupAnchoer.current.contains(event.target as Node)) return;
      if (popupBody.current.contains(event.target as Node)) return;
      onSetIsOpenPopup(false);
    };

    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOut);
    };
  }, [lockingPopup, onSetIsOpenPopup]);

  const handleClosePopup = useCallback(() => {
    if (!isOpenPopup) return;
    onSetIsOpenPopup(false);
    onSetLockingPopup(false);
  }, [isOpenPopup, onSetIsOpenPopup, onSetLockingPopup]);

  const handleMouseLeaveFromPopup = useCallback(() => {
    if (!lockingPopup) onSetIsOpenPopup(false);
  }, [lockingPopup, onSetIsOpenPopup]);

  const Body: FC = () => (
    <>
      <div
        ref={popupAnchoer}
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
            anchorElement={popupAnchoer}
            isOpen={isOpenPopup}
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

Item.displayName = ComponentName.NavigationItem;

export const WizNavigationItem = Item;
