import {
  navigationItemActiveStyle,
  navigationItemDisabledStyle,
  navigationItemStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  isExternalLink: boolean;
  active: boolean;
  disabled: boolean;
  children: ReactNode;
  href: string;
}

export const NavigationItemLink: FC<Props> = ({
  isExternalLink,
  href,
  active,
  disabled,
  children,
}) => {
  const className = clsx(
    navigationItemStyle,
    disabled ? navigationItemDisabledStyle : active && navigationItemActiveStyle
  );

  if (isExternalLink || disabled) {
    return (
      <a
        href={disabled ? undefined : href}
        target={!disabled ? "_blank" : undefined}
        rel={!disabled ? "noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
};
