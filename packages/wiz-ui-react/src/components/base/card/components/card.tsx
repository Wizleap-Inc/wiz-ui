import {
  ColorKeys,
  ComponentName,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card.css";
import {
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
  backgroundStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

import { WizVStack } from "@/components";

type Props = {
  p?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  backgroundColor?: ColorKeys;
  shadow?: boolean;
  border?: boolean;
  align?: "start" | "center" | "end" | "stretch";
  fit?: boolean;
  maxWidth?: string;
  gap?: SpacingKeys;
  children?: ReactNode;
  mainHeaderArea?: ReactNode;
  subHeaderArea?: ReactNode;
  footerArea?: ReactNode;
} & ComponentProps<"div">;

const _Card = ({
  p = "md",
  px,
  py,
  backgroundColor = "white.800",
  shadow,
  border,
  align = "end",
  fit,
  maxWidth,
  gap = "md",
  children,
  mainHeaderArea,
  subHeaderArea,
  footerArea,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={clsx([
        styles.cardStyle,
        fit && styles.cardFitStyle,
        shadow && styles.cardShadowStyle,
        border && styles.cardBorderStyle,
        px && paddingXStyle[px],
        py && paddingYStyle[py],
        !px && !py && paddingStyle[p],
        backgroundStyle[backgroundColor],
      ])}
      style={{ maxWidth }}
    >
      <WizVStack gap={gap} align={align}>
        {(mainHeaderArea || subHeaderArea) && (
          <div className={styles.cardHeaderStyle}>
            <div>{mainHeaderArea}</div>
            <div>{subHeaderArea}</div>
          </div>
        )}
        <div className={styles.cardBodyStyle}>{children}</div>
        {footerArea && <div>{footerArea}</div>}
      </WizVStack>
    </div>
  );
};

_Card.displayName = ComponentName.Card;
export const WizCard = _Card;
