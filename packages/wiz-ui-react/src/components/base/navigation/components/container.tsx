import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationContainerFooterStyle,
  navigationContainerItemsStyle,
  navigationContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { CSSProperties, FC, ReactNode } from "react";

interface Props {
  isOpen: boolean;
  width?: string;
  sticky?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}

const Container: FC<Props> = ({
  isOpen = true,
  width,
  sticky = false,
  children,
  footer,
}) => {
  const widthStyle = () => {
    if (width) return width;
    if (isOpen) return "180px";
    return `calc(${THEME.spacing.xl} * 2 + ${THEME.spacing.sm})`;
  };

  const stickyStyle = () => {
    const styles: CSSProperties = {};
    if (sticky) styles.position = "sticky";
    if (sticky) styles.top = `calc(${THEME.share.HEADER_HEIGHT} + 1px)`; // +1px for border of header
    if (sticky) styles.left = 0;
    if (sticky) styles.borderRight = `1px solid ${THEME.color.gray[400]}`;
    if (sticky)
      styles.height = `calc(100vh - ${THEME.share.HEADER_HEIGHT} - 1px)`;
    return styles;
  };

  return (
    <div
      className={navigationContainerStyle}
      style={{ ...stickyStyle(), width: widthStyle() }}
    >
      <div className={navigationContainerItemsStyle}>{children}</div>
      {isOpen && footer && (
        <div className={navigationContainerFooterStyle}>{footer}</div>
      )}
    </div>
  );
};
Container.displayName = ComponentName.NavigationContainer;

export const WizNavigationContainer = Container;
