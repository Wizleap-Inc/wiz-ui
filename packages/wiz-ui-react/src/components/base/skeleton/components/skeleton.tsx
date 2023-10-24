import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/skeleton.css";
import clsx from "clsx";
import { ReactNode } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  width?: string;
  height?: string;
  borderRadius?: SpacingKeys;
  isLoading?: boolean;
  children?: ReactNode;
};

const Skeleton = ({
  className,
  style,
  width = "100%",
  height = "100%",
  borderRadius = "no",
  isLoading = true,
  children,
}: Props) => {
  const skeletonStyle = isLoading
    ? clsx(
        className,
        styles.skeletonStyle,
        styles.normalSkeletonStyle,
        styles.borderRadiusStyle[borderRadius]
      )
    : className;

  return (
    <div className={skeletonStyle} style={{ ...style, width, height }}>
      {children}
    </div>
  );
};

Skeleton.displayName = ComponentName.Skeleton;

export const WizSkeleton = Skeleton;
