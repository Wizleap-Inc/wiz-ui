import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/timeline.css";

import { WizVStack } from "@/components/base";

import { TimelineContext } from "./use-timeline";

import type { FC, ReactNode } from "react";

interface TimelineProps {
  device: "mobile" | "pc";
  children?: ReactNode;
}

const Timeline: FC<TimelineProps> = ({ device, children }) => {
  return (
    <TimelineContext.Provider value={{ device }}>
      <WizVStack gap={styles.TIMELINES_GAP}>{children}</WizVStack>
    </TimelineContext.Provider>
  );
};

Timeline.displayName = ComponentName.Timeline;

export const WizTimeline = Timeline;
