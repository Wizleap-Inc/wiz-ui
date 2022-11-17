<template>
  <table class="wiz-card-table">
    <slot />
  </table>
</template>

<script setup lang="ts">
import { THEME } from "@/constants";

const spacingXs = THEME.spacing.xs;
const spacingXs2 = THEME.spacing.xs2;
</script>

<style lang="scss" scoped>
.wiz-card-table {
  border-collapse: separate;
  border-spacing: 0 calc(v-bind(spacingXs2) + v-bind(spacingXs) * 2);
}
</style>
