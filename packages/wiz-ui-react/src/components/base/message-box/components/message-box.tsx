import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/message-box.css";
import clsx from "clsx";
import { ForwardedRef, ReactNode, forwardRef, memo } from "react";

import { TIcon, WizIcon } from "@/components";

const iconFontColor: Record<string, ColorKeys> = {
  information: "green.800",
  caution: "yellow.800",
  warning: "red.800",
};

type Props = {
  title: string;
  variant?: "information" | "caution" | "warning";
  icon?: TIcon;
  expand?: boolean;
  children?: ReactNode;
};

const _MessageBox = forwardRef(
  (
    { title, variant = "information", icon, expand = false, ...props }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const width = expand ? "expand" : "default";
    return (
      <div
        ref={ref}
        className={clsx(
          styles.messageBoxStyle,
          styles.messageBoxWidthStyle[width],
          styles.messageBoxVariantStyle[variant]
        )}
      >
        {icon && (
          <div className={styles.messageBoxIconStyle}>
            <WizIcon icon={icon} color={iconFontColor[variant]} />
          </div>
        )}
        <div>
          <div className={styles.messageBoxTitleStyle}>{title}</div>
          {props.children}
        </div>
      </div>
    );
  }
);

_MessageBox.displayName = ComponentName.MessageBox;

export const WizMessageBox = memo(_MessageBox);
