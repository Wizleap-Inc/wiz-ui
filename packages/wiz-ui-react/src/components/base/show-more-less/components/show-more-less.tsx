import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  showMoreLessContentStyle,
  showMoreLessDetailsStyle,
  showMoreLessExpandIconStyle,
  showMoreLessMessageStyle,
  showMoreLessRotateIconStyle,
  showMoreLessSummaryStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/show-more-less.css";
import { backgroundStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  FC,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
  ComponentPropsWithoutRef,
} from "react";

import { WizHStack, WizIExpandMore, WizIcon, WizVStack } from "@/components";
type Props = ComponentPropsWithoutRef<"div"> & {
  isOpen: boolean;
  openMessage?: string;
  closeMessage?: string;
  width?: string;
  variant?: "pc" | "mobile";
  bgColor?: "transparent";
  onToggle?: () => void;
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
  bgColor,
  onToggle,
  children,
  ...props
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    onToggle?.();
  };

  useEffect(() => {
    if (!contentRef.current) return;

    setHeight(contentRef.current.scrollHeight + "px");
  }, [contentRef]);

  return (
    <div
      {...props}
      className={clsx(
        className,
        showMoreLessDetailsStyle,
        bgColor && backgroundStyle[bgColor]
      )}
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
          className={clsx(
            showMoreLessSummaryStyle[variant],
            bgColor && backgroundStyle[bgColor]
          )}
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
