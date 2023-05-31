import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  showMoreLessContentStyle,
  showMoreLessDetailsStyle,
  showMoreLessExpandIconStyle,
  showMoreLessRotateIconStyle,
  showMoreLessSummaryStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/show-more-less.css";
import { backgroundStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, useMemo, useRef, ReactNode, MouseEventHandler } from "react";

import { WizHStack, WizIExpandMore, WizIcon, WizVStack } from "@/components";

interface Props {
  isOpen: boolean;
  openMessage?: string;
  closeMessage?: string;
  width?: string;
  bgColor?: ColorKeys;
  fontColor?: ColorKeys;
  onToggle: () => void;
  children: ReactNode;
}

const ShowMoreLess: FC<Props> = ({
  isOpen,
  openMessage = "もっと見る",
  closeMessage = "閉じる",
  width = "20rem",
  bgColor,
  fontColor = "gray.600",
  onToggle,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleHeight = useMemo(() => {
    const content = contentRef.current;
    return content?.scrollHeight + "px";
  }, [contentRef]);

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault();
    onToggle();
  };

  return (
    <div
      className={clsx(
        showMoreLessDetailsStyle,
        bgColor && backgroundStyle[bgColor]
      )}
    >
      <WizVStack width={width}>
        <div
          ref={contentRef}
          className={showMoreLessContentStyle}
          style={{ maxHeight: isOpen ? toggleHeight : 0 }}
        >
          {children}
        </div>
        <div className={showMoreLessSummaryStyle} onClick={handleClick}>
          <WizHStack align="center" justify="between" gap="xs2">
            <div>{isOpen ? closeMessage : openMessage}</div>
            <div
              className={clsx(
                showMoreLessExpandIconStyle,
                isOpen && showMoreLessRotateIconStyle
              )}
            >
              <WizIcon size="xl2" icon={WizIExpandMore} color={fontColor} />
            </div>
          </WizHStack>
        </div>
      </WizVStack>
    </div>
  );
};

ShowMoreLess.displayName = ComponentName.ShowMoreLess;

export const WizShowMoreLess = ShowMoreLess;
