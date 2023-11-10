import {
  ComponentName,
  FontSizeKeys,
  FontWeightKeys,
  THEME,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/tag.css";
import {
  fontSizeStyle,
  fontWeightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

import { TIcon, WizIcon } from "@/components";
type Props = {
  label: string;
  icon?: TIcon;
  variant?:
    | "info"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "mono"
    | "gray"
    | "darkGray"
    | "greenFill"
    | "white";
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  round?: boolean;
  width?: string;
} & ComponentProps<"div">;

const Tag = forwardRef(
  (
    {
      className,
      style,
      label,
      icon,
      variant = "info",
      fontSize = "md",
      fontWeight = "normal",
      round = false,
      width,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          styles.tagStyle,
          styles.tagColorStyle[variant],
          fontSizeStyle[fontSize],
          fontWeightStyle[fontWeight]
        )}
        style={{
          ...style,
          width: width || "max-content",
          borderRadius: round ? THEME.spacing.xl2 : THEME.spacing.xs2,
        }}
        {...props}
      >
        {icon && (
          <WizIcon
            icon={icon}
            color={styles.tagIconColorStyle[variant]}
            size={styles.convertTagIconSize(fontSize)}
          />
        )}
        {label}
      </div>
    );
  }
);

Tag.displayName = ComponentName.Tag;

export const WizTag = Tag;
