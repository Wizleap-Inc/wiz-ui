<template>
  <div
    :class="[styles.LoadingOverlay, !isLoading && styles.LoadingOverlayHidden]"
  >
    <div :class="styles.LoadingOverlayBar">
      <div :class="styles.LoadingOverlayBarInner" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/loading-overlay.css";

defineOptions({
  name: ComponentName.LoadingOverlay,
});

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});
</script>
