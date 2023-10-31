import {
  ColorKeys,
  ComponentName,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/badge.css";
import {
  backgroundStyle,
  colorStyle,
  rightStyle,
  topStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, ReactNode } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  label?: string;
  hidden?: boolean;
  color?: ColorKeys;
  bgColor?: ColorKeys;
  offset?: SpacingKeys;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
};

const Badge: FC<Props> = ({
  className,
  style,
  label,
  hidden = false,
  color = "white.800",
  bgColor = "red.800",
  offset = "no",
  size = "md",
  children,
}: Props) => {
  return (
    <div className={clsx(className, styles.badgeContainerStyle)} style={style}>
      {children}
      {!hidden && (
        <div
          className={clsx(
            styles.badgeStyle,
            label && styles.badgeSizeStyle[size],
            colorStyle[color],
            backgroundStyle[bgColor],
            topStyle[offset],
            rightStyle[offset]
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
};

Badge.displayName = ComponentName.Badge;

export const WizBadge = Badge;
