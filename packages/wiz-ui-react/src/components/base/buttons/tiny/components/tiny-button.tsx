import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/tiny-button.css";
import {
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";

import { TIcon, WizHStack, WizIcon } from "@/components";

type Props = {
  clickable?: boolean;
  active?: boolean;
  isHover?: boolean;
  p?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  icon?: TIcon;
  iconPosition?: "left" | "right";
  children: ReactNode;
} & ComponentProps<"button">;

const TinyButton = forwardRef(
  (
    {
      clickable = true,
      active = true,
      isHover = false,
      p,
      px,
      py,
      icon,
      iconPosition = "left",
      children,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const tinyButtonState = (() => {
      const selectable = clickable ? "clickable" : "unclickable";
      const activeState = active ? "active" : "inactive";
      return `${selectable}+${activeState}` as const;
    })();

    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          styles.tinyButtonBaseStyle,
          styles.tinyButtonSizeStyle,
          styles.tinyButtonVaraiantStyle[tinyButtonState],
          clickable && isHover && styles.tinyButtonHoverStyle,
          !p && !py && paddingYStyle["xs2"],
          !p && !px && paddingXStyle["sm"],
          p && paddingStyle[p],
          px && paddingXStyle[px],
          py && paddingYStyle[py]
        )}
        disabled={!clickable}
        {...props}
      >
        <WizHStack
          align="center"
          justify="center"
          gap="xs2"
          reverse={iconPosition === "right"}
        >
          {icon && <WizIcon icon={icon} color={"white.800"} size={"xs"} />}
          {children}
        </WizHStack>
      </button>
    );
  }
);

TinyButton.displayName = ComponentName.TinyButton;

export const WizTinyButton = TinyButton;
