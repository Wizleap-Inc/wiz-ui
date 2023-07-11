import { InjectionKey, Ref } from "vue";

import { BreakpointVariant } from "@/hooks";

interface TimelineProvider {
  bp: Ref<BreakpointVariant>;
}

export const TIMELINE_KEY: InjectionKey<TimelineProvider> = Symbol("timeline");
