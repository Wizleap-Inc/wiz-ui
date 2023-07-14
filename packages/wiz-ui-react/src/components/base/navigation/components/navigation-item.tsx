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
import { ElementType, useCallback, useRef } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import { TIcon, WizPopup, WizPopupButtonGroup, WizTooltip } from "@/components";

import { ButtonGroupItem } from "../../popup-button-group/types";

type AnchorLinkProps = {
  as?: "a";
  href: string;
};

type ReactRouterLinkProps = {
  as: typeof ReactRouterLink;
  to: string;
};

type NavigationProps = {
  icon: TIcon;
  label: string;
  active: boolean;
  disabled?: boolean;
  tooltipText?: string;
  isPopupLocking?: boolean;
  buttons?: ButtonGroupItem[];
  isPopupOpen?: boolean;
  onTogglePopup: (isPopup: boolean) => void;
  onTogglePopupLocking: (lock: boolean) => void;
};

type Props = NavigationProps & (AnchorLinkProps | ReactRouterLinkProps);

/**
 * 現状、asには"a"またはreact-routerのLinkのみ対応。asを指定しない場合aタグになります。
 * ```tsx
 * import { Link } from "react-router-dom";
 * <WizNavigationItem as={Link} to="/page1" { ...otherProps } />
 * ```
 */
const NavigationItem = ({
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
  as = "a",
  ...linkProps
}: Props) => {
  const LinkComponent = as as ElementType;
  const popupAnchor = useRef<HTMLDivElement>(null);
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

  const linkComponentProps = () => {
    switch (LinkComponent) {
      case "a":
        return {
          href: disabled ? undefined : (linkProps as AnchorLinkProps).href,
          target: disabled ? undefined : "_blank",
          rel: disabled ? undefined : "noreferrer",
        };
      case ReactRouterLink:
        return {
          to: disabled ? undefined : (linkProps as ReactRouterLinkProps).to,
        };
    }
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
          {...linkComponentProps()}
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
