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

import { WizIcon, WizIChevronRight } from "@/components";

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

    const onMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsHover(true);
      props.onMouseOver?.(e);
    };

    const onMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsHover(false);
      props.onMouseLeave?.(e);
    };

    /** activate */
    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsPressed(true);
      props.onMouseDown?.(e);
    };

    /** inactivate */
    const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsPressed(false);
      props.onMouseUp?.(e);
    };

    /** inactivate */
    const onMouseOut: MouseEventHandler<HTMLDivElement> = (e) => {
      setIsPressed(false);
      props.onMouseOut?.(e);
    };

    const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
      if (clickable) props.onClick?.(e);
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
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        onClick={onClick}
      >
        <div className={styles.menuStackStyle}>
          <div>{label}</div>
          <WizIcon size="xl2" icon={WizIChevronRight} color={iconColor} />
        </div>
      </div>
    );
  }
);

_MenuItem.displayName = ComponentName.MenuItem;

export const WizMenuItem = memo(_MenuItem);
