<template>
  <details>
    <summary>{{ summary }}</summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";

defineOptions({
  name: ComponentName.Accordion,
});

defineProps({
  summary: {
    type: String,
    requried: true,
  },
});
</script>
