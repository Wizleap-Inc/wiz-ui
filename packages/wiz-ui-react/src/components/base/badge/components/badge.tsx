import {
  ColorKeys,
  ComponentName,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/badge.css";
import {
  backgroundStyle,
  colorStyle,
  topStyle,
  rightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, ReactNode } from "react";

type Props = {
  label?: string;
  hidden?: boolean;
  color?: ColorKeys;
  bgColor?: ColorKeys;
  offset?: SpacingKeys;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
};

const Badge: FC<Props> = ({
  label,
  hidden = false,
  color = "white.800",
  bgColor = "red.800",
  offset = "no",
  size = "md",
  children,
}: Props) => {
  return (
    <div className={styles.badgeContainerStyle}>
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
