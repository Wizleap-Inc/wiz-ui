<template>
  <div :class="progressBarStyle">
    <div
      v-for="(content, i) in contents"
      :key="i"
      :class="progressBarItemStyle[i === 0 ? 'first' : 'default']"
    >
      <WizTooltip
        :content="content.status === 'none' ? undefined : content.tooltip"
      >
        <span :class="progressBarItemAnnotationStyle">
          <WizText fontSize="xs2" color="red.800" whiteSpace="nowrap">
            {{ content.annotation }}
          </WizText>
        </span>
        <WizProgressPoint :status="content.status" :value="content.value" />
        <span :class="progressBarItemLabelStyle">
          <WizText fontSize="xs2" color="gray.600" whiteSpace="nowrap">
            {{ content.label }}
          </WizText>
        </span>
      </WizTooltip>
      <WizProgressLine :active="content.progress" :isFirst="i === 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  progressBarStyle,
  progressBarItemStyle,
  progressBarItemLabelStyle,
  progressBarItemAnnotationStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/progress-bar.css";

import { WizText } from "@/components/base/text";
import { WizTooltip } from "@/components/base/tooltip";

import { WizProgressPoint, WizProgressLine } from ".";

import type { ProgressItem } from "./types";

defineOptions({
  name: ComponentName.ProgressBar,
});

interface Props {
  contents: ProgressItem[];
}

defineProps<Props>();
</script>
