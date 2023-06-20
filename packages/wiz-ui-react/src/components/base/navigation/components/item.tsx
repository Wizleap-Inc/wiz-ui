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

  const existPopup = buttons && buttons.length > 0;

  const handleClick = () => {
    onSetIsOpenPopup(true);
    if (existPopup) onSetLockingPopup(true);
  };

  // ホバー時の動作
  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      if (popupAnchoer.current?.contains(event.target as Node))
        onSetIsOpenPopup(true);
    };
    document.addEventListener("mouseover", handleMouseEnter);
    return () => document.removeEventListener("mouseover", handleMouseEnter);
  }, [onSetIsOpenPopup]);

  // ホバーを外した時の動作
  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      if (!popupAnchoer.current?.contains(event.target as Node))
        onSetIsOpenPopup(false);
    };
    document.addEventListener("mouseover", handleMouseOut);
    return () => document.removeEventListener("mouseover", handleMouseOut);
  }, [onSetIsOpenPopup]);

  const handleClosePopup = useCallback(() => {
    onSetIsOpenPopup(false);
    onSetLockingPopup(false);
  }, [onSetIsOpenPopup, onSetLockingPopup]);

  const handleMouseEnterToPopup = () => {
    if (!lockingPopup) onSetIsOpenPopup(true);
  };

  const handleMouseLeaveFromPopup = useCallback(() => {
    if (!lockingPopup) onSetIsOpenPopup(false);
  }, [lockingPopup, onSetIsOpenPopup]);

  const Body: FC = () => (
    <>
      <div
        ref={popupAnchoer}
        onClick={handleClick}
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
            isOpen={isOpenPopup}
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
