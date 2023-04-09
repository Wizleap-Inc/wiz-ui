import { ColorKeys, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/badge.css";
import {
  backgroundStyle,
  colorStyle,
  topStyle,
  rightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, memo } from "react";

type Props = {
  label?: string;
  hidden?: boolean;
  color?: ColorKeys;
  bgColor?: ColorKeys;
  offset?: SpacingKeys;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
};

const _Badge = ({
  label,
  hidden = false,
  color = "white.800",
  bgColor = "red.800",
  offset = "no",
  size = "md",
  ...props
}: Props) => {
  return (
    <div className={styles.badgeContainerStyle}>
      {props.children}
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

export const WizBadge = memo(_Badge);
