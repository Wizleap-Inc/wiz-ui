import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/timeline.css";

import { WizVStack } from "@/components/base";
import { BreakpointVariant } from "@/hooks";

import { TimelineContext } from "./use-timeline";

import type { FC, ReactNode } from "react";

interface TimelineProps {
  bp: BreakpointVariant;
  children: ReactNode;
}

const Timeline: FC<TimelineProps> = ({ bp, children }) => {
  return (
    <TimelineContext.Provider value={{ bp }}>
      <WizVStack gap={styles.TIMELINES_GAP}>{children}</WizVStack>
    </TimelineContext.Provider>
  );
};

Timeline.displayName = ComponentName.Timeline;

export const WizTimeline = Timeline;
