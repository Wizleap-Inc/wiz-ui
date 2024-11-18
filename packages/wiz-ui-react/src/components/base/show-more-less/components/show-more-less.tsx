import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  showMoreLessContentStyle,
  showMoreLessDetailsStyle,
  showMoreLessExpandIconStyle,
  showMoreLessMessageStyle,
  showMoreLessRotateIconStyle,
  showMoreLessSummaryStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/show-more-less.css";
import clsx from "clsx";
import {
  FC,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { WizHStack, WizIExpandMore, WizIcon, WizVStack } from "@/components";
import { BaseProps } from "@/types";
type Props = BaseProps & {
  isOpen: boolean;
  openMessage?: string;
  closeMessage?: string;
  width?: string;
  variant?: "pc" | "mobile";
  onToggle: () => void;
  children: ReactNode;
};

const ShowMoreLess: FC<Props> = ({
  className,
  style,
  isOpen,
  openMessage = "もっと見る",
  closeMessage = "閉じる",
  width = "20rem",
  variant = "pc",
  onToggle,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    onToggle();
  };

  useEffect(() => {
    if (!contentRef.current) return;

    setHeight(contentRef.current.scrollHeight + "px");
  }, [contentRef]);

  return (
    <div
      className={clsx(className, showMoreLessDetailsStyle)}
      style={{ ...style, width: width }}
    >
      <WizVStack>
        <div
          ref={contentRef}
          className={showMoreLessContentStyle}
          style={{ maxHeight: isOpen ? height : 0, width }}
        >
          {children}
        </div>
        <div
          className={showMoreLessSummaryStyle[variant]}
          onClick={handleClick}
          style={{ width }}
        >
          <div className={clsx(showMoreLessMessageStyle)}>
            <WizHStack align="center" justify="between" gap="xs2">
              <div>{isOpen ? closeMessage : openMessage}</div>
              <div
                className={clsx(
                  showMoreLessExpandIconStyle,
                  isOpen && showMoreLessRotateIconStyle
                )}
              >
                <WizIcon size="xl2" icon={WizIExpandMore} color="inherit" />
              </div>
            </WizHStack>
          </div>
        </div>
      </WizVStack>
    </div>
  );
};

ShowMoreLess.displayName = ComponentName.ShowMoreLess;

export const WizShowMoreLess = ShowMoreLess;
