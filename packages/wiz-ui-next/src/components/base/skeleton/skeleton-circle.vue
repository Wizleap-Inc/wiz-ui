<template>
  <div
    :class="isLoading && [styles.skeletonStyle, styles.circleSkeletonStyle]"
    :style="{ width: size, height: size }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/skeleton.css";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.SkeletonText,
});

defineProps({
  size: {
    type: String as PropType<string>,
    default: "2.5rem",
    required: false,
  },
  isLoading: {
    type: Boolean as PropType<boolean>,
    default: true,
    required: false,
  },
});
</script>
