import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/loading-overlay.css";
import { clsx } from "clsx";
import { FC } from "react";

import { BaseProps } from "@/types";
type Props = BaseProps & {
  isLoading: boolean;
};

const LoadingOverlay: FC<Props> = ({ className, style, isLoading }) => {
  return (
    <div
      className={clsx(
        className,
        styles.LoadingOverlay,
        !isLoading && styles.LoadingOverlayHidden
      )}
      style={style}
    >
      <div className={styles.LoadingOverlayBar}>
        <div className={styles.LoadingOverlayBarInner} />
      </div>
    </div>
  );
};

LoadingOverlay.displayName = ComponentName.LoadingOverlay;

export const WizLoadingOverlay = LoadingOverlay;
