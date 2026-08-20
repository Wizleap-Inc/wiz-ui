<template>
  <div :class="progressBarStyle">
    <div
      v-for="(content, i) in contents"
      :key="i"
      :class="progressBarItemStyle[i === 0 ? 'first' : 'default']"
    >
      <WizTooltip>
        <template v-if="content.tooltip" #content>
          {{ content.status === "none" ? undefined : content.tooltip }}
        </template>
        <div :class="progressBarPointWrapperStyle">
          <span :class="progressBarItemAnnotationStyle">
            <WizText
              :font-size="content.annotationSize ?? annotationSize"
              :color="content.annotationColor ?? annotationColor"
              white-space="nowrap"
            >
              {{ content.annotation }}
            </WizText>
          </span>
          <WizProgressPoint :status="content.status" :value="content.value" />
          <span :class="progressBarItemLabelStyle">
            <WizText
              :font-size="content.labelSize ?? labelSize"
              :color="content.labelColor ?? labelColor"
              white-space="nowrap"
            >
              {{ content.label }}
            </WizText>
          </span>
        </div>
      </WizTooltip>
      <WizProgressLine :state="content.progress" :is-first="i === 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ColorKeys,
  ComponentName,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import {
  progressBarStyle,
  progressBarItemStyle,
  progressBarItemLabelStyle,
  progressBarItemAnnotationStyle,
  progressBarPointWrapperStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";
import { PropType } from "vue";

import { WizText } from "@/components/base/text";
import { WizTooltip } from "@/components/base/tooltip";

import { WizProgressPoint, WizProgressLine } from ".";

import type { ProgressItem } from "./types";

defineOptions({
  name: ComponentName.ProgressBar,
});

defineProps({
  contents: {
    type: Array as PropType<ProgressItem[]>,
    required: true,
  },
  labelColor: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "gray.600",
  },
  labelSize: {
    type: String as PropType<FontSizeKeys>,
    required: false,
    default: "xs2",
  },
  annotationColor: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "red.800",
  },
  annotationSize: {
    type: String as PropType<FontSizeKeys>,
    required: false,
    default: "xs2",
  },
});
</script>
