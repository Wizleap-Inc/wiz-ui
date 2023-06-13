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
  onClose: () => void;
};

const Dialog: FC<Props> = ({
  isOpen,
  maxWidth = "600px",
  title,
  footer,
  children,
  align,
  onClose,
}) => {
  const portalRoot = useRef<HTMLDivElement>(
    document.createElement("div")
  ).current;

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
    if (!isOpen) {
      return;
    }
    // スクロールバーが表示されている場合
    if (document.body.scrollHeight > window.innerHeight) {
      // スクロール位置を記憶して body をスクロール不可に設定
      const { scrollY } = window;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add(styles.dialogBlockScrollStyle);

      return () => {
        // スタイルとスクロール位置を戻す
        document.body.classList.remove(styles.dialogBlockScrollStyle);
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      };
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
      className={clsx(styles.dialogStyle, isOpen && styles.dialogVisibleStyle)}
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
