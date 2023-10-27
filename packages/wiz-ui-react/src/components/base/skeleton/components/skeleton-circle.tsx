import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/skeleton.css";
import clsx from "clsx";
import { ReactNode } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  size: string;
  isLoading?: boolean;
  children?: ReactNode;
};

const SkeletonCircle = ({
  className,
  style,
  size = "2.5rem",
  isLoading = true,
  children,
}: Props) => {
  const skeletonStyle = isLoading
    ? clsx(className, styles.skeletonStyle, styles.circleSkeletonStyle)
    : className;

  return (
    <div
      className={skeletonStyle}
      style={{ ...style, width: size, height: size }}
    >
      {children}
    </div>
  );
};

SkeletonCircle.displayName = ComponentName.SkeletonCircle;

export const WizSkeletonCircle = SkeletonCircle;
