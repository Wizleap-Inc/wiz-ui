import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";

import { WizText } from "@/components";

import { ProgressItem } from "../types";

import { WizProgressPoint } from "./progress-point";

export const Progress = ({ content }: { content: ProgressItem }) => (
  <div className={styles.progressBarPointWrapperStyle}>
    <span className={styles.progressBarItemAnnotationStyle}>
      <WizText fontSize="xs2" color="red.800" whiteSpace="nowrap">
        {content.annotation}
      </WizText>
    </span>
    <WizProgressPoint status={content.status} value={content.value} />
    <span className={styles.progressBarItemLabelStyle}>
      <WizText fontSize="xs2" color="gray.600" whiteSpace="nowrap">
        {content.label}
      </WizText>
    </span>
  </div>
);
