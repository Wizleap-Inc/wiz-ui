import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/menu.css";
import { fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  ComponentProps,
  ForwardedRef,
  KeyboardEventHandler,
  MouseEventHandler,
  forwardRef,
  useState,
} from "react";

import { WizIcon, WizIChevronRight, WizHStack } from "@/components";

type Props = {
  label: string;
  width?: string;
  active?: boolean;
  clickable?: boolean;
  fontSize: FontSizeKeys;
} & ComponentProps<"div">;

const MenuItem = forwardRef(
  (
    {
      label,
      width = "10rem",
      active = false,
      clickable = true,
      fontSize = "md",
      onMouseOver,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      onClick,
      onKeyDown,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isHover, setIsHover] = useState(false);

    const [isPressed, setIsPressed] = useState(false);

    const iconColor: ColorKeys =
      clickable && (active || isHover) ? "green.800" : "gray.500";

    function getVariant() {
      if (!clickable) return "disabled";
      if (active || isPressed) return "active";
      if (isHover) return "hover";
      return "default";
    }

    const handleMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsHover(true);
      onMouseOver?.(e);
    };

    const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsHover(false);
      onMouseLeave?.(e);
    };

    /** activate */
    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsPressed(true);
      onMouseDown?.(e);
    };

    /** inactivate */
    const handleMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsPressed(false);
      onMouseUp?.(e);
    };

    /** inactivate */
    const handleMouseOut: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsPressed(false);
      onMouseOut?.(e);
    };

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
      if (clickable) onClick?.(e);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
      onKeyDown?.(e);
      if (e.key === "Enter" || e.key === " ") {
        if (clickable) {
          if (e.target instanceof HTMLElement) {
            e.stopPropagation();
            e.target.click();
          }
        }
      }
    };

    return (
      <div
        ref={ref}
        className={clsx(
          styles.menuItemStyle,
          styles.menuItemVariantStyle[getVariant()]
        )}
        style={{ width }}
        {...props}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={handleKeyDown}
      >
        <WizHStack align="center" justify="between">
          <div className={fontSizeStyle[fontSize]}>{label}</div>
          <WizIcon size="xl2" icon={WizIChevronRight} color={iconColor} />
        </WizHStack>
      </div>
    );
  }
);

MenuItem.displayName = ComponentName.MenuItem;

export const WizMenuItem = MenuItem;
