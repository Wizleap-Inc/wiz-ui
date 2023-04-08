import { ColorKeys, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card.css";
import {
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
  backgroundStyle,
  gapStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  title?: string;
  hint?: string;
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
};

const _CardHeader = ({ children }: { children: ReactNode }) => (
  <div className={styles.cardHeaderStyle}>
    <div>{children}</div>
  </div>
);

const _CardBody = ({ children }: { children: ReactNode }) => (
  <div className={styles.cardBodyStyle}> {children}</div>
);

const _CardFooter = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

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
  ...props
}: Props) => {
  return (
    <div
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
      <div
        className={clsx(
          styles.cardStackBase,
          gapStyle[gap],
          styles.cardStackAlignStyle[align]
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

_Card.Header = _CardHeader;
_Card.Body = _CardBody;
_Card.Footer = _CardFooter;

export const WizCard = _Card;
