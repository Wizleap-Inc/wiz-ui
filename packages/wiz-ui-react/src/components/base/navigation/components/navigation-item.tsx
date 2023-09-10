import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationItemIconStyle,
  navigationItemIconActiveStyle,
  navigationItemTextStyle,
  navigationItemTextActiveStyle,
  navigationItemIconDisabledStyle,
  navigationPopupContainerStyle,
  navigationItemStyle,
  navigationItemActiveStyle,
  navigationItemDisabledStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import clsx from "clsx";
import { ComponentProps, ElementType, useCallback, useRef } from "react";

import { TIcon, WizPopup, WizPopupButtonGroup, WizTooltip } from "@/components";

import { ButtonGroupItem } from "../../popup-button-group/types";

type Props<T extends ElementType> = {
  icon: TIcon;
  label: string;
  active: boolean;
  disabled?: boolean;
  tooltipText?: string;
  isPopupLocking?: boolean;
  buttons?: ButtonGroupItem[];
  isPopupOpen?: boolean;
  onTogglePopup?: (isPopup: boolean) => void;
  onTogglePopupLocking?: (lock: boolean) => void;
} & (
  | {
      href: string;
      as?: never;
      asProps?: never;
    }
  | {
      href?: never;
      as: T;
      asProps: ComponentProps<T>;
    }
);

/**
 * aタグでの使い方
 * ```tsx
 * <WizNavigationItem href="https://xxx" { ...otherProps } />
 * ```
 *
 * `react-router`での使い方
 * ```tsx
 * import { Link } from "react-router-dom";
 * <WizNavigationItem as={Link} asProps={{ to: "/page1" }} { ...otherProps } />
 * ```
 */
const NavigationItem = <T extends ElementType>({
  icon: Icon,
  label,
  active,
  disabled = false,
  tooltipText,
  isPopupLocking = true,
  buttons,
  isPopupOpen = false,
  onTogglePopup,
  onTogglePopupLocking,
  ...props
}: Props<T>) => {
  const isAnchor = "href" in props;
  const LinkComponent = isAnchor ? "a" : props.as;
  const linkProps = isAnchor
    ? { href: disabled ? undefined : props.href }
    : props.asProps;
  const popupAnchor = useRef<HTMLDivElement>(null);
  const existPopup = buttons && buttons.length > 0;

  const handleClick = () => {
    onTogglePopup?.(true);
    if (existPopup) onTogglePopupLocking?.(true);
  };

  const handleMouseEnter = () => {
    if (!isPopupLocking) onTogglePopup?.(true);
  };

  const handleMouseLeave = () => {
    if (!isPopupLocking) onTogglePopup?.(false);
  };

  const handleClosePopup = useCallback(() => {
    if (!isPopupOpen) return;
    onTogglePopup?.(false);
    onTogglePopupLocking?.(false);
  }, [isPopupOpen, onTogglePopup, onTogglePopupLocking]);

  const handleMouseEnterToPopup = () => {
    if (!isPopupLocking) onTogglePopup?.(true);
  };

  const handleMouseLeaveFromPopup = () => {
    if (!isPopupLocking) onTogglePopup?.(false);
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
        <LinkComponent
          {...linkProps}
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
        </LinkComponent>
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
