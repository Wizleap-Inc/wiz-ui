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

interface Props {
  direction?: "top" | "bottom" | "left" | "right";
  hover?: boolean;
  isDirectionFixed?: boolean;
  children: ReactNode;
  content?: ReactNode;
}

const Tooltip: FC<Props> = ({
  direction = "top",
  hover = false,
  isDirectionFixed = false,
  children,
  content,
}) => {
  const [isHover, setIsHover] = useState(false);
  const anchor = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => setIsHover(false), []);

  return (
    <>
      <div
        className={clsx(tooltipStyle)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        ref={anchor}
      >
        {children}
      </div>
      {content && (
        <WizPopup
          anchorElement={anchor}
          isOpen={isHover || hover}
          onClose={handleClose}
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
      )}
    </>
  );
};

Tooltip.displayName = ComponentName.Tooltip;

export const WizTooltip = Tooltip;
