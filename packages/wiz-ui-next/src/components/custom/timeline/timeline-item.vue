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
      <WizIcon :size="iconSize" :icon="icon" color="white.800" />
    </div>
    <div
      :class="[
        styles.card,
        disabled && styles.disabled,
        backgroundStyle[backgroundColor],
      ]"
    >
      <div :class="styles.contents">
        <div :class="styles.header">
          <template v-if="device === 'pc'">
            <WizHStack nowrap justify="between" gap="xs">
              <WizVStack gap="xs">
                <WizHStack gap="xs" align="center">
                  <WizTag
                    v-if="tag"
                    font-size="xs"
                    :label="tag"
                    font-weight="bold"
                    :variant="TAG_COLOR_MAP[variant]"
                  />
                  <div :class="styles.title">{{ title }}</div>
                </WizHStack>
                <slot name="header" />
              </WizVStack>
              <div :class="styles.annotation">
                {{ annotation }}
                <slot name="annotation" />
              </div>
            </WizHStack>
          </template>
          <template v-else>
            <WizVStack gap="xs">
              <WizHStack nowrap justify="between" align="center">
                <WizTag
                  v-if="tag"
                  font-size="xs"
                  :label="tag"
                  font-weight="bold"
                  :variant="TAG_COLOR_MAP[variant]"
                />
                <span v-else :class="styles.title">{{ title }}</span>
                <div :class="styles.annotation">
                  {{ annotation }}
                  <slot name="annotation" />
                </div>
              </WizHStack>
              <div v-if="tag" :class="styles.title">
                {{ title }}
              </div>
              <slot name="header" />
            </WizVStack>
          </template>
        </div>
        <div v-if="slot.default" :class="styles.body">
          <slot />
        </div>
      </div>
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ColorKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { backgroundStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/timeline.css";
import { PropType, computed, inject, useSlots } from "vue";

import { WizHStack, WizIcon, WizTag, WizVStack } from "@/components/base";
import { TIcon, WizICalendar } from "@/components/icons";

import { TIMELINE_KEY } from "./use-timeline";

defineOptions({
  name: ComponentName.TimelineItem,
});

type TimelineVariant = "success" | "failure" | "yellow" | "gray";

defineProps({
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
   * このプロパティは非推奨です。代わりに`slot name="annotation"`を使用してください。
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
  icon: {
    type: Object as PropType<TIcon>,
    default: WizICalendar,
  },
  backgroundColor: {
    type: String as PropType<Extract<ColorKeys, "white.800" | "gray.200">>,
    required: false,
    default: "white.800",
  },
});

const TAG_COLOR_MAP = {
  success: "green",
  failure: "red",
  yellow: "yellow",
  gray: "gray",
} as const;

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
</script>
