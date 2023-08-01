import {
  ComponentName,
  FontSizeKeys,
  FontWeightKeys,
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
  variant?: "info" | "red" | "green" | "yellow" | "blue" | "mono";
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  width?: string;
} & ComponentProps<"div">;

const Tag = forwardRef(
  (
    {
      label,
      icon,
      variant = "info",
      fontSize = "md",
      fontWeight = "normal",
      width,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.tagStyle,
          styles.tagColorStyle[variant],
          fontSizeStyle[fontSize],
          fontWeightStyle[fontWeight]
        )}
        style={{
          width: width || "max-content",
        }}
        {...props}
      >
        {icon && (
          <WizIcon
            icon={icon}
            color={styles.tagIconColorStyle[variant]}
            size={fontSize}
          />
        )}
        {label}
      </div>
    );
  }
);

Tag.displayName = ComponentName.Tag;

export const WizTag = Tag;
