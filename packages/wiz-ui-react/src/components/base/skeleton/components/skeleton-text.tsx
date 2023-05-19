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
  const judgeOrder = (line: number) => {
    if (lines === 1) return "noLast";
    return line === lines ? "last" : "noLast";
  };
  const loadingStyle = clsx(
    styles.skeletonStyle,
    styles.normalSkeletonStyle,
    styles.textSkeletonStyle[judgeOrder(1)],
    fontSizeAsHeightStyle[fontSize]
  );
  return (
    <>
      {!isLoading ? (
        children
      ) : (
        <WizVStack gap={gap}>
          {Array.from({ length: lines }, (_, i) => (
            <div key={i} className={loadingStyle} />
          ))}
        </WizVStack>
      )}
    </>
  );
};

SkeletonText.displayName = ComponentName.SkeletonText;

export const WizSkeletonText = SkeletonText;
