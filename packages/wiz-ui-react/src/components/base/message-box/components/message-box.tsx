import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/message-box.css";
import clsx from "clsx";
import { ForwardedRef, ReactNode, forwardRef } from "react";

import { TIcon, WizIcon, WizVStack } from "@/components";
import { BaseProps } from "@/types";

const iconFontColor: Record<string, ColorKeys> = {
  information: "green.800",
  caution: "yellow.800",
  warning: "red.800",
};

type Props = BaseProps & {
  title: string;
  variant?: "information" | "caution" | "warning";
  icon?: TIcon;
  expand?: boolean;
  children?: ReactNode;
};

const MessageBox = forwardRef(
  (
    {
      className,
      style,
      title,
      variant = "information",
      icon,
      expand = false,
      children,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const width = expand ? "expand" : "default";
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          styles.messageBoxStyle,
          styles.messageBoxWidthStyle[width],
          styles.messageBoxVariantStyle[variant]
        )}
        style={style}
      >
        {icon && (
          <div className={styles.messageBoxIconStyle}>
            <WizIcon icon={icon} color={iconFontColor[variant]} />
          </div>
        )}
        <WizVStack gap="xs">
          <div className={styles.messageBoxTitleStyle}>{title}</div>
          {children && (
            <div className={styles.messageBoxBodyStyle}>{children}</div>
          )}
        </WizVStack>
      </div>
    );
  }
);

MessageBox.displayName = ComponentName.MessageBox;

export const WizMessageBox = MessageBox;
