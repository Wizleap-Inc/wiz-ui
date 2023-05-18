import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/menu.css";
import clsx from "clsx";
import {
  ComponentProps,
  ForwardedRef,
  MouseEventHandler,
  forwardRef,
  memo,
  useState,
} from "react";

import { WizIcon, WizIChevronRight, WizHStack } from "@/components";

type Props = {
  label: string;
  width?: string;
  active?: boolean;
  clickable?: boolean;
} & ComponentProps<"div">;

const _MenuItem = forwardRef(
  (
    {
      label,
      width = "10rem",
      active = false,
      clickable = true,
      onMouseOver,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      onClick,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isHover, setIsHover] = useState(false);

    const [isPressed, setIsPressed] = useState(false);

    const iconColor: ColorKeys =
      clickable && (active || isHover) ? "green.800" : "gray.500";

    const componentStatus = (() => {
      if (!clickable) return "disabled";
      if (active || isPressed) return "active";
      if (isHover) return "hover";
      return "default";
    })();

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

    return (
      <div
        ref={ref}
        className={clsx(
          styles.menuItemStyle,
          styles.menuItemVariantStyle[componentStatus]
        )}
        style={{ width }}
        {...props}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        <WizHStack align="center" justify="between">
          <div>{label}</div>
          <WizIcon size="xl2" icon={WizIChevronRight} color={iconColor} />
        </WizHStack>
      </div>
    );
  }
);

_MenuItem.displayName = ComponentName.MenuItem;

export const WizMenuItem = memo(_MenuItem);
