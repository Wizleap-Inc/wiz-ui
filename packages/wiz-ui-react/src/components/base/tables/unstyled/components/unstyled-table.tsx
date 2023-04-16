import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import {
  borderSpacingStyle,
  borderSpacingXStyle,
  borderSpacingYStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo } from "react";
type Props = {
  space?: SpacingKeys;
  spaceX?: SpacingKeys;
  spaceY?: SpacingKeys;
  fixed?: boolean;
  width?: string;
  borderCollapse?: "collapse" | "separate";
  children?: ReactNode;
} & ComponentProps<"table">;
const _UnstyledTable = ({
  space = "no",
  spaceX,
  spaceY,
  fixed = false,
  width,
  borderCollapse,
  ...props
}: Props) => {
  return (
    <table
      className={clsx([
        spaceX && borderSpacingXStyle[spaceX],
        spaceY && borderSpacingYStyle[spaceY],
        !spaceX && !spaceY && borderSpacingStyle[space],
        fixed && styles.unstyledTableFixedStyle,
        borderCollapse &&
          styles.unstyledTableBorderCollapseStyle[borderCollapse],
      ])}
      style={{ width }}
      {...props}
    >
      {props.children}
    </table>
  );
};

_UnstyledTable.displayName = ComponentName.UnstyledTable;

export const WizUnstyledTable = memo(_UnstyledTable);
