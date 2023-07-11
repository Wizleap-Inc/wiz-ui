import { createContext } from "react";

import { BreakpointVariant } from "@/hooks";

interface TimelineProvider {
  bp: BreakpointVariant;
}

export const TimelineContext = createContext<TimelineProvider | undefined>(
  undefined
);
