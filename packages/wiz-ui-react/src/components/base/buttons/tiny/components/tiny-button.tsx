import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/tiny-button.css";
import {
  gapStyle,
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { ComponentProps, ReactNode, memo, useMemo, useState } from "react";

import { TIcon, WizIcon } from "@/components";

type Props = {
  clickable?: boolean;
  active?: boolean;
  hover?: boolean;
  p?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  icon?: TIcon;
  iconPosition?: "left" | "right";
  children: ReactNode;
} & ComponentProps<"button">;

const _TinyButton = ({
  clickable = true,
  active = true,
  hover = false,
  p,
  px,
  py,
  icon,
  iconPosition = "left",
  ...props
}: Props) => {
  const [isHover, setIsHover] = useState(false);

  const tinyButtonState = useMemo(() => {
    const selectable = clickable ? "clickable" : "unclickable";
    const activeState = active ? "active" : "inactive";
    return `${selectable}+${activeState}` as const;
  }, [clickable, active]);

  return (
    <button
      {...props}
      className={clsx(
        styles.tinyButtonBaseStyle,
        styles.tinyButtonSizeStyle,
        styles.tinyButtonVaraiantStyle[tinyButtonState],
        clickable && (isHover || hover) && styles.tinyButtonHoverStyle,
        p && paddingStyle[p],
        px && paddingXStyle[px],
        py && paddingYStyle[py]
      )}
      disabled={!clickable}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={clsx(
          gapStyle["xs2"],
          styles.textButtonStackStyle[
            iconPosition === "right" ? "reverse" : "default"
          ]
        )}
      >
        {icon && <WizIcon icon={icon} color={"white.800"} size={"xs"} />}
        {props.children}
      </div>
    </button>
  );
};

export const WizTinyButton = memo(_TinyButton);
