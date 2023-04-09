import {
  ColorKeys,
  FontSizeKeys,
  FontWeightKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/anchor.css";
import {
  colorStyle,
  fontSizeStyle,
  fontWeightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ReactNode, memo, useMemo } from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  // icon?: TIcon;
  iconPosition?: "left" | "right";
  openInNewTab?: boolean;
  nowrap?: boolean;
  children: ReactNode;
};

const _Anchor = ({
  to,
  color = "blue.800",
  fontSize = "md",
  fontWeight = "normal",
  // icon,
  iconPosition = "left",
  openInNewTab = false,
  nowrap = false,
  ...props
}: Props) => {
  const isRouterLink = useMemo(() => {
    if (openInNewTab) return false;
    return !to.startsWith("http");
  }, []);

  const AnchorContent = ({ children }: { children: ReactNode }) => (
    <>
      {/* icon left */}
      {children}
      {/* icon right */}
    </>
  );

  const anchorStyle = clsx([
    styles.anchorStyle,
    colorStyle[color],
    fontSizeStyle[fontSize],
    fontWeightStyle[fontWeight],
    nowrap && styles.anchorNoWrapStyle,
  ]);

  return (
    <div>
      {isRouterLink ? (
        <Link
          className={anchorStyle}
          to={to}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          <AnchorContent>{props.children}</AnchorContent>
        </Link>
      ) : (
        <a
          className={anchorStyle}
          href={to}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          <AnchorContent>{props.children}</AnchorContent>
        </a>
      )}
    </div>
  );
};

export const WizAnchor = memo(_Anchor);
