import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationContainerFooterStyle,
  navigationContainerItemsStyle,
  navigationContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import clsx from "clsx";
import { CSSProperties, FC, ReactNode } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  isOpen: boolean;
  width?: string;
  sticky?: boolean;
  children: ReactNode;
  footer?: ReactNode;
};

const NavigationContainer: FC<Props> = ({
  className,
  style,
  isOpen,
  width,
  sticky = false,
  children,
  footer,
}) => {
  const widthStyle =
    width ??
    (isOpen ? "180px" : `calc(${THEME.spacing.xl} * 2 + ${THEME.spacing.sm})`);

  const stickyStyle: CSSProperties = sticky
    ? {
        position: "sticky",
        top: `calc(${THEME.share.HEADER_HEIGHT} + 1px)`,
        left: 0,
        borderRight: `1px solid ${THEME.color.gray[400]}`,
        height: `calc(100vh - ${THEME.share.HEADER_HEIGHT} - 1px)`,
      }
    : {};

  return (
    <div
      className={clsx(className, navigationContainerStyle)}
      style={{ ...style, ...stickyStyle, width: widthStyle }}
    >
      <div className={navigationContainerItemsStyle}>{children}</div>
      {isOpen && footer && (
        <div className={navigationContainerFooterStyle}>{footer}</div>
      )}
    </div>
  );
};
NavigationContainer.displayName = ComponentName.NavigationContainer;

export const WizNavigationContainer = NavigationContainer;
