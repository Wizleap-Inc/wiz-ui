<template>
  <h1 v-if="level === 1" class="wiz-heading wiz-heading--level-1">
    <slot />
  </h1>
  <h2 v-else-if="level === 2" class="wiz-heading wiz-heading--level-2">
    <slot />
  </h2>
  <h3 v-else-if="level === 3" class="wiz-heading wiz-heading--level-3">
    <slot />
  </h3>
  <h4 v-else-if="level === 4" class="wiz-heading wiz-heading--level-4">
    <slot />
  </h4>
  <h5 v-else-if="level === 5" class="wiz-heading wiz-heading--level-5">
    <slot />
  </h5>
  <h6 v-else-if="level === 6" class="wiz-heading wiz-heading--level-6">
    <slot />
  </h6>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

import { FontSizeKeys } from "@/constants/styles/fontSize";
import { ColorKeys } from "@/types/styles/color";

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
}

withDefaults(defineProps<Props>(), {
  level: 1,
});
</script>

<style lang="scss" scoped></style>
