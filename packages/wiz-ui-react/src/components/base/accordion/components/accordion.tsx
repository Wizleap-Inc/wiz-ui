import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/accordion.css";
import {
  backgroundStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, ReactNode } from "react";

import { WizHStack, WizIExpandMore, WizIcon } from "@/components";

import { useToggleAnimation } from "./use-toggle-animation";

type Props = {
  isOpen: boolean;
  openMessage?: string;
  closeMessage?: string;
  width?: string;
  bgColor?: ColorKeys;
  fontColor?: ColorKeys;
  children?: ReactNode;
  className?: string;
  onToggle: (isOpen: boolean) => void;
};

const Accordion: FC<Props> = ({
  isOpen,
  openMessage = "もっと見る",
  closeMessage = "閉じる",
  width = "20rem",
  bgColor,
  fontColor = "gray.600",
  children,
  className,
  onToggle,
}) => {
  const { isActuallyOpen, isAnimating, contentRef } =
    useToggleAnimation(isOpen);

  return (
    <details
      open={isActuallyOpen}
      style={{ width }}
      className={clsx(
        styles.accordionDetailsStyle,
        bgColor && backgroundStyle[bgColor],
        className
      )}
    >
      <summary
        className={styles.accordionSummaryStyle}
        onClick={(e) => {
          e.preventDefault();
          if (!isAnimating) {
            onToggle(!isOpen);
          }
        }}
      >
        <WizHStack
          align="center"
          justify="between"
          gap="xs2"
          className={clsx(
            styles.accordionMessageStyle,
            colorStyle[fontColor],
            bgColor && backgroundStyle[bgColor]
          )}
        >
          <div>{isOpen ? closeMessage : openMessage}</div>
          <WizIcon
            icon={WizIExpandMore}
            size="xl2"
            color={fontColor}
            className={clsx(
              styles.accordionExpandIconStyle,
              isOpen && styles.accordionRotateIconStyle
            )}
          />
        </WizHStack>
      </summary>
      <div ref={contentRef} className={styles.accordionContentStyle}>
        {children}
      </div>
    </details>
  );
};

Accordion.displayName = ComponentName.Accordion;

export const WizAccordion = Accordion;
