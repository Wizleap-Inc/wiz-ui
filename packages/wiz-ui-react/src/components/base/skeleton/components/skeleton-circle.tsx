import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/skeleton.css";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  size: string;
  isLoading?: boolean;
  children?: ReactNode;
};

const SkeletonCircle = ({
  size = "2.5rem",
  isLoading = true,
  children,
}: Props) => {
  const className = isLoading
    ? clsx(styles.skeletonStyle, styles.circleSkeletonStyle)
    : undefined;

  return (
    <div className={className} style={{ width: size, height: size }}>
      {children}
    </div>
  );
};

SkeletonCircle.displayName = ComponentName.SkeletonCircle;

export const WizSkeletonCircle = SkeletonCircle;
