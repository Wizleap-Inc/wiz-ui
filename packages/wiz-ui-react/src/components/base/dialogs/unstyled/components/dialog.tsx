import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/dialog.css";
import clsx from "clsx";
import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  isOpen: boolean;
  children?: ReactNode;
  onClose?: () => void;
};

const UnstyledDialog: FC<Props> = ({
  className,
  style,
  isOpen,
  children,
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

  return createPortal(
    <div
      className={clsx(
        className,
        styles.dialogStyle,
        isOpen && styles.dialogVisibleStyle
      )}
      style={{ ...style, zIndex: THEME.zIndex.dialog }}
    >
      <div
        className={styles.dialogMaskStyle}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose?.();
          }
        }}
      >
        {children}
      </div>
    </div>,
    portalRoot
  );
};

UnstyledDialog.displayName = ComponentName.UnstyledDialog;

export const WizUnstyledDialog = UnstyledDialog;
