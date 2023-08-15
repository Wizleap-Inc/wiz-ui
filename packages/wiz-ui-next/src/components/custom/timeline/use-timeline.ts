import { InjectionKey, Ref } from "vue";

interface TimelineProvider {
  device: Ref<"mobile" | "pc">;
}

export const TIMELINE_KEY: InjectionKey<TimelineProvider> = Symbol("timeline");
