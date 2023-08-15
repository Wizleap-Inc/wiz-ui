import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/skeleton.css";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  width?: string;
  height?: string;
  borderRadius?: SpacingKeys;
  isLoading?: boolean;
  children?: ReactNode;
};

const Skeleton = ({
  width = "100%",
  height = "100%",
  borderRadius = "no",
  isLoading = true,
  children,
}: Props) => {
  const className = isLoading
    ? clsx(
        styles.skeletonStyle,
        styles.normalSkeletonStyle,
        styles.borderRadiusStyle[borderRadius]
      )
    : undefined;

  return (
    <div className={className} style={{ width, height }}>
      {children}
    </div>
  );
};

Skeleton.displayName = ComponentName.Skeleton;

export const WizSkeleton = Skeleton;
