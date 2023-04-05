import { ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/divider.css";
import { borderColorStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { memo } from "react";

export type Props = {
  color?: ColorKeys;
  variant?: "solid" | "dashed" | "dotted";
  direction?: "horizontal" | "vertical";
};

const _Divider = ({
  color = "gray.400",
  variant = "solid",
  direction = "horizontal",
}: Props) => (
  <hr
    className={`
     ${styles.dividerStyle[variant]}
     ${styles.dividerDirectionStyle[direction]} 
     ${borderColorStyle[color]}
    `}
  />
);

export const WizDivider = memo(_Divider);
