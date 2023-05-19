import {
  ComponentName,
  FontSizeKeys,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/skeleton.css";
import { fontSizeAsHeightStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode } from "react";

import { WizVStack } from "@/components";

type Props = {
  fontSize?: FontSizeKeys;
  gap?: SpacingKeys;
  lines?: number;
  isLoading?: boolean;
  children?: ReactNode;
};

const SkeletonText = ({
  fontSize = "lg",
  gap = "sm",
  lines = 1,
  isLoading = true,
  children,
}: Props) => {
  const getLastLineOrNot = (index: number) => {
    if (lines === 1) return "noLast";
    return index === lines - 1 ? "last" : "noLast";
  };

  return !isLoading ? (
    <>{children}</>
  ) : (
    <WizVStack gap={gap}>
      {Array.from({ length: lines }, (_, i) => {
        return (
          <div
            key={i}
            className={clsx(
              styles.skeletonStyle,
              styles.normalSkeletonStyle,
              styles.textSkeletonStyle[getLastLineOrNot(i)],
              fontSizeAsHeightStyle[fontSize]
            )}
          />
        );
      })}
    </WizVStack>
  );
};

SkeletonText.displayName = ComponentName.SkeletonText;

export const WizSkeletonText = SkeletonText;
