import {
  ARIA_LABELS,
  ComponentName,
  getSpacingCss,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/full-modal-view.css";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

import {
  WizDivider,
  WizHStack,
  WizIClose,
  WizIconButton,
  WizPortal,
  WizText,
  WizVStack,
} from "@/components";

type Props = {
  isOpen: boolean;
  title: string;
  header?: ReactNode;
  children: ReactNode;
  onClose: () => void;
};

const FullModalView: FC<Props> = ({
  isOpen,
  title,
  header,
  children,
  onClose,
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isActuallyOpen, setIsActuallyOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // Move-in animation
      setIsActuallyOpen(true);
      modalRef.current?.animate(
        [
          {
            transform: "translateY(100vh)",
          },
          {
            transform: "translateY(0)",
          },
        ],
        {
          duration: 300,
          easing: "ease",
          fill: "forwards",
        }
      );
    } else {
      // Move-out animation
      const animation = modalRef.current?.animate(
        [
          {
            transform: "translateY(0)",
          },
          {
            transform: "translateY(100vh)",
          },
        ],
        {
          duration: 300,
          easing: "ease",
          fill: "forwards",
        }
      );
      if (animation) {
        animation.onfinish = () => {
          // Ensure the container is hidden after the animation is complete
          setIsActuallyOpen(false);
        };
      }
    }
  }, [isOpen]);

  return (
    <WizPortal container={document.body}>
      <div
        ref={modalRef}
        className={styles.containerStyle}
        style={{
          bottom: 0,
          display: isActuallyOpen ? undefined : "none",
        }}
      >
        <WizVStack>
          <div className={styles.headerStyle}>
            <WizHStack
              justify="between"
              align="center"
              height={getSpacingCss("xl3")}
            >
              <WizText bold>{title}</WizText>
              <WizHStack gap="md">
                {header}
                <WizIconButton
                  onClick={onClose}
                  icon={WizIClose}
                  variant="transparent"
                  aria-label={ARIA_LABELS.FULL_MODAL_VIEW.CLOSE}
                />
              </WizHStack>
            </WizHStack>
          </div>
          <WizDivider color="gray.300" />
          <div className={styles.contentStyle}>{children}</div>
        </WizVStack>
      </div>
    </WizPortal>
  );
};

FullModalView.displayName = ComponentName.FullModalView;

export const WizFullModalView = FullModalView;
