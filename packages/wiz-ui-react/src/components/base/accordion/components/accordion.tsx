import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/accordion.css";
import {
  backgroundStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, ReactNode, ComponentPropsWithoutRef } from "react";

import { WizHStack, WizIExpandMore, WizIcon } from "@/components";

import { useToggleAnimation } from "./use-toggle-animation";

type Props = ComponentPropsWithoutRef<"details"> & {
  isOpen: boolean;
  openMessage?: string;
  closeMessage?: string;
  width?: string;
  bgColor?: ColorKeys;
  fontColor?: ColorKeys;
  children?: ReactNode;
  onToggle?: () => void;
};

const Accordion: FC<Props> = ({
  className,
  style,
  isOpen,
  openMessage = "もっと見る",
  closeMessage = "閉じる",
  width = "20rem",
  bgColor,
  fontColor = "gray.600",
  children,
  onToggle,
  ...props
}) => {
  const { isActuallyOpen, isAnimating, contentRef } =
    useToggleAnimation(isOpen);

  return (
    <details
      {...props}
      open={isActuallyOpen}
      style={{ ...style, width }}
      className={clsx(
        className,
        styles.accordionDetailsStyle,
        bgColor && backgroundStyle[bgColor]
      )}
    >
      <summary
        className={styles.accordionSummaryStyle}
        onClick={(e) => {
          e.preventDefault();
          if (!isAnimating) {
            onToggle?.();
          }
        }}
      >
        <div
          className={clsx(
            styles.accordionMessageStyle,
            colorStyle[fontColor],
            bgColor && backgroundStyle[bgColor]
          )}
        >
          <WizHStack align="center" justify="between" gap="xs2">
            <div>{isOpen ? closeMessage : openMessage}</div>
            <div
              className={clsx(
                styles.accordionExpandIconStyle,
                isOpen && styles.accordionRotateIconStyle
              )}
            >
              <WizIcon icon={WizIExpandMore} size="xl2" color={fontColor} />
            </div>
          </WizHStack>
        </div>
      </summary>
      <div ref={contentRef} className={styles.accordionContentStyle}>
        {children}
      </div>
    </details>
  );
};

Accordion.displayName = ComponentName.Accordion;

export const WizAccordion = Accordion;
