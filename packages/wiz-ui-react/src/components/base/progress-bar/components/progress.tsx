import { ColorKeys, FontSizeKeys } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";

import { WizText } from "@/components";

import { ProgressItem } from "../types";

import { WizProgressPoint } from "./progress-point";

type Props = {
  content: ProgressItem;
  labelColor: ColorKeys;
  labelSize: FontSizeKeys;
  annotationColor: ColorKeys;
  annotationSize: FontSizeKeys;
};

export const Progress = ({
  content,
  labelColor,
  labelSize,
  annotationColor,
  annotationSize,
}: Props) => (
  <div className={styles.progressBarPointWrapperStyle}>
    <span className={styles.progressBarItemAnnotationStyle}>
      <WizText
        fontSize={content.annotationSize ?? annotationSize}
        color={content.annotationColor ?? annotationColor}
        whiteSpace="nowrap"
      >
        {content.annotation}
      </WizText>
    </span>
    <WizProgressPoint status={content.status} value={content.value} />
    <span className={styles.progressBarItemLabelStyle}>
      <WizText
        fontSize={content.labelSize ?? labelSize}
        color={content.labelColor ?? labelColor}
        whiteSpace="nowrap"
      >
        {content.label}
      </WizText>
    </span>
  </div>
);
