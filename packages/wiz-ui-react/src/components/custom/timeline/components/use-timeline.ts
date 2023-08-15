import { createContext } from "react";

interface TimelineProvider {
  device: "mobile" | "pc";
}

export const TimelineContext = createContext<TimelineProvider | undefined>(
  undefined
);
