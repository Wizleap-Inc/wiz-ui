import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationItemActiveStyle,
  navigationItemDisabledStyle,
  navigationItemIconActiveStyle,
  navigationItemIconDisabledStyle,
  navigationItemIconStyle,
  navigationItemStyle,
  navigationItemTextActiveStyle,
  navigationItemTextStyle,
  navigationPopupContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import clsx from "clsx";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  useCallback,
  useMemo,
  useRef,
} from "react";

import {
  TIcon,
  WizHStack,
  WizIChevronRight,
  WizIcon,
  WizPopup,
  WizPopupButtonGroup,
  WizTooltip,
} from "@/components";

import { ButtonGroupItem, ButtonItem } from "../../popup-button-group/types";

type Props<T extends ElementType> = ComponentPropsWithoutRef<"div"> & {
  icon: TIcon;
  label: string;
  active: boolean;
  disabled?: boolean;
  tooltipText?: string;
  /** @deprecated このプロパティは削除予定です */
  isPopupLocking?: boolean;
  buttons?: ButtonGroupItem[];
  isPopupOpen?: boolean;
  /**
   * @example
   * ```tsx
   * onTogglePopup={setIsPopupOpen}
   * ```
   */
  onTogglePopup?: (isPopup: boolean) => void;
  /** @deprecated このプロパティは削除予定です */
  onTogglePopupLocking?: (lock: boolean) => void;
} & (
    | {
        href?: string;
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
  style,
  icon: Icon,
  label,
  active,
  disabled = false,
  tooltipText,
  buttons,
  isPopupOpen = false,
  href,
  as,
  asProps,
  onTogglePopup,
  ...props
}: Props<T>) => {
  const isAnchor = href && as === undefined;
  const LinkComponent = as || "a";
  const isExternalLink = !!href?.startsWith("http");
  const linkProps = isAnchor
    ? {
        href: disabled ? undefined : (href ?? ""),
        target: !disabled && isExternalLink ? "_blank" : undefined,
      }
    : {
        ...asProps,
        style: {
          cursor: disabled ? "not-allowed" : "pointer",
          ...asProps?.style,
        },
      };
  const popupAnchor = useRef<HTMLDivElement>(null);
  const existPopup = buttons && buttons.length > 0;

  const handleClosePopup = useCallback(() => {
    onTogglePopup?.(false);
  }, [onTogglePopup]);

  const handleClick = () => {
    onTogglePopup?.(!isPopupOpen);
  };

  const buttonsWithClickOnClose = useCallback(
    (buttons: ButtonGroupItem[]): ButtonGroupItem[] => {
      return buttons.map((button) => {
        if (button.kind === "divider") return button;
        if (button.kind === "button") {
          const buttonWithClickOnClose: ButtonItem = {
            kind: "button",
            option: {
              ...button.option,
              onClick: () => {
                button.option.onClick();
                handleClosePopup();
              },
            },
          };
          return buttonWithClickOnClose;
        }
        return {
          ...button,
          items: buttonsWithClickOnClose(button.items),
        };
      });
    },
    [handleClosePopup]
  );

  const popupButtons = useMemo(() => {
    if (!buttons) return [];
    return buttonsWithClickOnClose(buttons);
  }, [buttons, buttonsWithClickOnClose]);

  const body = (
    <div
      {...props}
      ref={popupAnchor}
      onClick={handleClick}
      style={{ ...style, display: tooltipText ? "block" : "inline-block" }}
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
        <WizHStack justify="between" align="center" width="100%" nowrap>
          <WizHStack nowrap gap="sm">
            <div
              className={clsx(
                navigationItemIconStyle,
                disabled
                  ? navigationItemIconDisabledStyle
                  : active && navigationItemIconActiveStyle
              )}
              style={{ display: "flex", alignItems: "center" }}
            >
              <WizIcon icon={Icon} color="inherit" />
            </div>
            <div
              className={clsx(
                navigationItemTextStyle,
                !disabled && active && navigationItemTextActiveStyle
              )}
            >
              {label}
            </div>
          </WizHStack>
          {existPopup && (
            <WizIcon
              icon={WizIChevronRight}
              color={!disabled && active ? "green.800" : "gray.700"}
            />
          )}
        </WizHStack>
      </LinkComponent>
    </div>
  );

  return (
    <>
      {tooltipText ? (
        <WizTooltip content={<div>{tooltipText}</div>}>{body}</WizTooltip>
      ) : (
        <> {body} </>
      )}
      {existPopup && (
        <WizPopup
          anchorElement={popupAnchor}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          direction="rightTop"
          layer="popover"
          isDirectionFixed
        >
          <div className={navigationPopupContainerStyle}>
            <WizPopupButtonGroup
              options={popupButtons}
              p="xs"
              borderRadius="xs2"
              disabled={disabled}
            />
          </div>
        </WizPopup>
      )}
    </>
  );
};

NavigationItem.displayName = ComponentName.NavigationItem;

export const WizNavigationItem = NavigationItem;
