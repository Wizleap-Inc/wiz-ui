import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
  FontWeightKeys,
  getRelativeFontSize,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/anchor.css";
import {
  colorStyle,
  fontSizeStyle,
  fontWeightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ForwardedRef, ReactNode, forwardRef, memo, useMemo } from "react";
import { Link } from "react-router-dom";

import { TIcon, WizIcon } from "@/components";

type Props = {
  to: string;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  icon?: TIcon;
  iconPosition?: "left" | "right";
  openInNewTab?: boolean;
  nowrap?: boolean;
  children: ReactNode;
};

const _Anchor = forwardRef(
  (
    {
      to,
      color = "blue.800",
      fontSize = "md",
      fontWeight = "normal",
      icon,
      iconPosition = "left",
      openInNewTab = false,
      nowrap = false,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const isRouterLink = useMemo(() => {
      if (openInNewTab) return false;
      return !to.startsWith("http");
    }, []);

    const AnchorContent = ({ children }: { children: ReactNode }) => (
      <>
        {icon && iconPosition === "left" && (
          <WizIcon
            icon={icon}
            size={getRelativeFontSize(fontSize, 3)}
            color={color}
          />
        )}
        {children}
        {icon && iconPosition === "right" && (
          <WizIcon
            icon={icon}
            size={getRelativeFontSize(fontSize, 3)}
            color={color}
          />
        )}
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
            ref={ref}
            className={anchorStyle}
            to={to}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
          >
            <AnchorContent>{props.children}</AnchorContent>
          </Link>
        ) : (
          <a
            ref={ref}
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
  }
);

_Anchor.displayName = ComponentName.Anchor;

export const WizAnchor = memo(_Anchor);
