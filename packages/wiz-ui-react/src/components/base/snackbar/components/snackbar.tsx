import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/snackbar.css";
import clsx from "clsx";
import { FC, useCallback, useEffect, useState } from "react";

import { WizICircleCheck, WizIClose, WizIcon, WizText } from "@/components";

const ANIMATION_DURATION = 200;
const DISPLAY_DURATION = 3000;

type Props = {
  message: string;
  expand?: boolean;
  enableAnimation?: boolean;
  autoClose?: boolean;
  onClose: () => void;
};

const Snackbar: FC<Props> = ({
  message,
  expand = false,
  enableAnimation = false,
  autoClose = false,
  onClose,
}) => {
  const [isHidden, setIsHidden] = useState(enableAnimation ? true : false);
  const snackbarWidthType = expand ? "expand" : "default";

  useEffect(() => {
    if (enableAnimation) {
      // for fade-in animation
      setIsHidden(false);
    }
  }, [enableAnimation]);

  const handleClose = useCallback(() => {
    if (!enableAnimation) {
      onClose();
      return;
    }
    setIsHidden(true);
    setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);
  }, [enableAnimation, onClose]);

  useEffect(() => {
    if (!autoClose) {
      return;
    }
    setTimeout(() => {
      handleClose();
    }, DISPLAY_DURATION);
    // 初回のみ autoClose を設定し、以後 Props の変化で発火させないようにする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx(
        styles.snackbarStyle,
        styles.snackbarWidthStyle[snackbarWidthType],
        isHidden && styles.snackbarHiddenStyle
      )}
    >
      <div className={styles.snackbarContainerStyle}>
        <WizIcon icon={WizICircleCheck} color="white.800" />
        <div className={styles.snackbarMessageStyle}>
          <WizText color="white.800" fontSize="sm">
            {message}
          </WizText>
        </div>
        <button
          className={styles.snackbarCloseButtonStyle}
          onClick={handleClose}
        >
          <WizIcon icon={WizIClose} color="white.800" />
        </button>
      </div>
    </div>
  );
};

Snackbar.displayName = ComponentName.SnackBar;

export const WizSnackbar = Snackbar;
