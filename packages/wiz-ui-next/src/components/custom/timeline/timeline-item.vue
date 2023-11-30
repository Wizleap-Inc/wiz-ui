<template>
  <div
    :class="[
      styles.container,
      styles.timelineItemVariant[device],
      styles.TIMELINE_ITEM_IDENTIFIER_CLASS,
    ]"
  >
    <div
      :class="[
        styles.icon,
        styles.iconVariant[variant],
        disabled && styles.disabled,
      ]"
    >
      <WizIcon :size="iconSize" :icon="WizICalendar" color="white.800" />
    </div>
    <div :class="[styles.card, disabled && styles.disabled]">
      <div :class="styles.contents">
        <div :class="styles.header">
          <div :class="styles.headerRow">
            <span :class="styles.titleContainer">
              <WizTag
                v-if="tag"
                fontSize="xs"
                :label="tag"
                fontWeight="bold"
                :variant="variant === 'success' ? 'green' : 'red'"
              />
              <span v-if="!isTitleEscape" :class="styles.title">
                {{ title }}
              </span>
            </span>
            <span :class="styles.annotation">
              {{ annotation }}
              <slot name="annotation" />
            </span>
          </div>
          <span v-if="isTitleEscape" :class="styles.title">
            {{ title }}
          </span>
        </div>
        <div :class="styles.body" v-if="slot.default">
          <slot />
        </div>
      </div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/timeline.css";
import { PropType, computed, inject, useSlots } from "vue";

import { WizIcon, WizTag } from "@/components/base";
import { WizICalendar } from "@/components/icons";

import { TIMELINE_KEY } from "./use-timeline";

defineOptions({
  name: ComponentName.TimelineItem,
});

type TimelineVariant = "success" | "failure" | "warning" | "neutral";

const props = defineProps({
  variant: {
    type: String as PropType<TimelineVariant>,
    required: false,
    default: "success",
  },
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: false,
  },
  /**
   * @deprecated
   * このプロパティは非推奨です。代わりにslot="annotation"を使用してください。
   */
  annotation: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const slot = useSlots();

const injected = inject(TIMELINE_KEY);

if (injected === undefined) {
  throw new Error(
    "TimelineItemはTimelineの子コンポーネントとして使用してください。"
  );
}

const { device } = injected;

const iconSize = computed(() =>
  injected.device.value === "mobile" ? "md" : "xl2"
);
const isTitleEscape = computed(
  () => injected.device.value === "mobile" && props.tag
);
</script>
