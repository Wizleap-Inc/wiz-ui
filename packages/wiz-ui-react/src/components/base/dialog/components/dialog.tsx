import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/dialog.css";
import clsx from "clsx";
import { FC, ReactNode, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

import { WizCard, WizIClose, WizIconButton } from "@/components";

type Props = {
  isOpen: boolean;
  maxWidth?: string;
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
  onClose: () => void;
};

const Dialog: FC<Props> = ({
  isOpen,
  maxWidth = "600px",
  title,
  footer,
  children,
  align,
  className,
  onClose,
}) => {
  const portalRoot = useRef<HTMLDivElement>(
    document.createElement("div")
  ).current;
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!portalRoot) {
      return;
    }
    document.body.appendChild(portalRoot);
    return () => {
      document.body.removeChild(portalRoot);
    };
  }, [portalRoot]);

  useEffect(() => {
    if (isOpen) {
      // スクロールバーが表示されている場合
      if (document.body.scrollHeight > window.innerHeight) {
        scrollYRef.current = window.scrollY;
        document.body.style.top = `-${scrollYRef.current}px`;
        document.body.classList.add(styles.dialogBlockScrollStyle);
      }
    } else {
      document.body.classList.remove(styles.dialogBlockScrollStyle);
      document.body.style.top = "";
      window.scrollTo(0, scrollYRef.current);
      scrollYRef.current = 0;
    }
  }, [isOpen]);

  const closeButton = useMemo(
    () => (
      <WizIconButton
        icon={WizIClose}
        variant="transparent"
        onClick={() => onClose()}
      />
    ),
    [onClose]
  );

  return createPortal(
    <div
      className={clsx(
        styles.dialogStyle,
        isOpen && styles.dialogVisibleStyle,
        className
      )}
      style={{ zIndex: THEME.zIndex.dialog }}
    >
      <div
        className={styles.dialogMaskStyle}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <WizCard
          p="xl"
          maxWidth={maxWidth}
          align={align}
          mainHeaderArea={title}
          subHeaderArea={closeButton}
          footerArea={footer}
          role="dialog"
          aria-modal={true}
        >
          {children}
        </WizCard>
      </div>
    </div>,
    portalRoot
  );
};

Dialog.displayName = ComponentName.Dialog;

export const WizDialog = Dialog;
