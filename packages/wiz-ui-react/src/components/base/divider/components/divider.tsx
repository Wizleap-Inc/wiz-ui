import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/divider.css";
import { borderColorStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { clsx } from "clsx";
import { memo } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  color?: ColorKeys;
  variant?: "solid" | "dashed" | "dotted";
  direction?: "horizontal" | "vertical";
};

const _Divider = ({
  className,
  style,
  color = "gray.400",
  variant = "solid",
  direction = "horizontal",
}: Props) => (
  <hr
    className={clsx(
      className,
      styles.dividerStyle[variant],
      styles.dividerDirectionStyle[direction],
      borderColorStyle[color]
    )}
    style={style}
  />
);

export const WizDivider = memo(_Divider);
