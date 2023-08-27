import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/loading-overlay.css";
import { clsx } from "clsx";
import { FC } from "react";

interface Props {
  isLoading: boolean;
}

const LoadingOverlay: FC<Props> = ({ isLoading }) => {
  return (
    <div
      className={clsx(
        styles.LoadingOverlay,
        !isLoading && styles.LoadingOverlayHidden
      )}
    >
      <div className={styles.LoadingOverlayBar}>
        <div className={styles.LoadingOverlayBarInner} />
      </div>
    </div>
  );
};

LoadingOverlay.displayName = ComponentName.LoadingOverlay;

export const WizLoadingOverlay = LoadingOverlay;
