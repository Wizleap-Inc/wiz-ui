<template>
  <div>
    <WizVStack v-if="isLoading" :gap="gap">
      <div v-for="line in lines" :key="line">
        <div
          :class="[
            styles.skeletonStyle,
            styles.normalSkeletonStyle,
            styles.textSkeletonStyle[judgeOrder(line)],
            fontSizeAsHeightStyle[fontSize],
          ]"
        />
      </div>
    </WizVStack>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import {
  ComponentName,
  FontSizeKeys,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/skeleton.css";
import { fontSizeAsHeightStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

import { WizVStack } from "@/components";

defineOptions({
  name: ComponentName.SkeletonText,
});

const props = defineProps({
  fontSize: {
    type: String as PropType<FontSizeKeys>,
    default: "lg",
    required: false,
  },
  gap: {
    type: String as PropType<SpacingKeys>,
    default: "sm",
    required: false,
  },
  lines: {
    type: Number as PropType<number>,
    default: 1,
    required: false,
  },
  isLoading: {
    type: Boolean as PropType<boolean>,
    default: true,
    required: false,
  },
});

const judgeOrder = (line: number) => {
  if (props.lines === 1) return "noLast";
  return line === props.lines ? "last" : "noLast";
};
</script>
