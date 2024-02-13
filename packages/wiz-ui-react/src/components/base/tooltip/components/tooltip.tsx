import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  tooltipContentStyle,
  tooltipIconDirectionStyle,
  tooltipIconStyle,
  tooltipPopupStyle,
  tooltipPositionStyle,
  tooltipStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tooltip.css";
import clsx from "clsx";
import { FC, ReactNode, useCallback, useRef, useState } from "react";

import { WizIChangeHistory, WizPopup } from "@/components";
import { BaseProps } from "@/types";
type Props = BaseProps & {
  direction?: "top" | "bottom" | "left" | "right";
  isOpen?: boolean;
  isDirectionFixed?: boolean;
  children: ReactNode;
  content: ReactNode;
  expand: boolean;
};

const Tooltip: FC<Props> = ({
  className,
  style,
  direction = "top",
  isOpen = false,
  isDirectionFixed = false,
  children,
  content,
  expand,
}) => {
  const [isHover, setIsHover] = useState(false);
  const anchor = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div
        className={clsx(className, tooltipStyle)}
        style={{
          ...style,
          width: expand ? "100%" : "initial",
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        ref={anchor}
      >
        {children}
      </div>
      <WizPopup
        anchorElement={anchor}
        isOpen={isHover || isOpen}
        onClose={useCallback(() => setIsHover(false), [])}
        direction={direction}
        shadow={false}
        animation
        gap="xs2"
        isDirectionFixed={isDirectionFixed}
      >
        <div
          className={clsx(tooltipPositionStyle[direction], tooltipPopupStyle)}
        >
          <div className={clsx(tooltipContentStyle)}>{content}</div>
          <div
            className={clsx(
              tooltipIconStyle,
              tooltipIconDirectionStyle[direction]
            )}
          >
            <WizIChangeHistory />
          </div>
        </div>
      </WizPopup>
    </>
  );
};

Tooltip.displayName = ComponentName.Tooltip;

export const WizTooltip = Tooltip;
