import {
  ColorKeys,
  ComponentName,
  getColorCss,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card.css";
import {
  backgroundStyle,
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

import { WizVStack } from "@/components";
import { BaseProps } from "@/types";
type Props = BaseProps & {
  p?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  backgroundColor?: ColorKeys;
  shadow?: boolean;
  border?: boolean;
  borderColor?: ColorKeys;
  align?: "start" | "center" | "end" | "stretch";
  fit?: boolean;
  maxWidth?: string;
  gap?: SpacingKeys;
  children?: ReactNode;
  mainHeaderArea?: ReactNode;
  subHeaderArea?: ReactNode;
  footerArea?: ReactNode;
} & ComponentProps<"div">;

const Card = ({
  className,
  style,
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
  borderColor = "gray.400",
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={clsx([
        className,
        styles.cardStyle,
        fit && styles.cardFitStyle,
        shadow && styles.cardShadowStyle,
        border && styles.cardBorderStyle,
        px && paddingXStyle[px],
        py && paddingYStyle[py],
        !px && !py && paddingStyle[p],
        backgroundStyle[backgroundColor],
      ])}
      style={{
        ...style,
        maxWidth,
        borderColor: border ? getColorCss(borderColor) : undefined,
      }}
    >
      <WizVStack gap={gap} align={align} nowrap={true}>
        {(mainHeaderArea || subHeaderArea) && (
          <div className={styles.cardHeaderStyle}>
            <div>{mainHeaderArea}</div>
            <div>{subHeaderArea}</div>
          </div>
        )}
        {children && <div className={styles.cardBodyStyle}>{children}</div>}
        {footerArea && <div>{footerArea}</div>}
      </WizVStack>
    </div>
  );
};

Card.displayName = ComponentName.Card;
export const WizCard = Card;
