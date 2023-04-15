<template>
  <div :class="styles.stepBarStyle">
    <div
      v-for="(content, i) in contents"
      :key="i"
      :class="styles.stepBarItemStyle[i === 0 ? 'first' : 'default']"
    >
      <WizVStack align="center" gap="xl">
        <WizStepPoint :status="content.status" />
        <span :class="styles.progressBarItemLabelStyle">
          <WizVStack align="center" gap="xs2">
            <WizText
              fontSize="sm"
              whiteSpace="nowrap"
              :bold="true"
              :color="content.status === 'done' ? 'green.800' : 'gray.800'"
            >
              {{ content.label }}
            </WizText>
            <WizText
              fontSize="xs"
              whiteSpace="nowrap"
              :color="content.status === 'done' ? 'green.800' : 'gray.800'"
            >
              {{ content.description }}
            </WizText>
          </WizVStack>
        </span>
      </WizVStack>
      <WizStepLine :active="content.progress" :isFirst="i === 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/step-bar.css";
import { PropType } from "vue";

import { WizText, WizVStack } from "@/components";

import { WizStepPoint, WizStepLine } from ".";

import type { StepItem } from "./types";

defineOptions({
  name: ComponentName.StepBar,
});

defineProps({
  contents: {
    type: Array as PropType<StepItem[]>,
    required: true,
  },
});
</script>
