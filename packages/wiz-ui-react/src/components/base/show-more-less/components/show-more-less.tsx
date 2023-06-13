import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  showMoreLessContentStyle,
  showMoreLessDetailsStyle,
  showMoreLessExpandIconStyle,
  showMoreLessMessageStyle,
  showMoreLessRotateIconStyle,
  showMoreLessSummaryStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/show-more-less.css";
import {
  backgroundStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  FC,
  useRef,
  ReactNode,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

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
      className={clsx(
        showMoreLessDetailsStyle,
        bgColor && backgroundStyle[bgColor]
      )}
      style={{ width: width }}
    >
      <WizVStack>
        <div
          ref={contentRef}
          className={showMoreLessContentStyle}
          style={{ maxHeight: isOpen ? height : 0 }}
        >
          {children}
        </div>
        <div className={showMoreLessSummaryStyle} onClick={handleClick}>
          <div
            className={clsx(
              showMoreLessMessageStyle,
              bgColor && backgroundStyle[bgColor],
              colorStyle[fontColor]
            )}
          >
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
        </div>
      </WizVStack>
    </div>
  );
};

ShowMoreLess.displayName = ComponentName.ShowMoreLess;

export const WizShowMoreLess = ShowMoreLess;
