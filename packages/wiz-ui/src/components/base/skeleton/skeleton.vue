<template>
  <div
    :class="
      isLoading && [
        skeletonStyle,
        normalSkeletonStyle,
        borderRadiusStyle[borderRadius],
      ]
    "
    :style="{ width, height }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  skeletonStyle,
  normalSkeletonStyle,
  borderRadiusStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/skeleton.css";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.Skeleton,
});

defineProps({
  width: {
    type: String as PropType<string>,
    default: "100%",
    required: false,
  },
  height: {
    type: String as PropType<string>,
    default: "100%",
    required: false,
  },
  borderRadius: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "no",
  },
  isLoading: {
    type: Boolean as PropType<boolean>,
    default: true,
    required: false,
  },
});
</script>
