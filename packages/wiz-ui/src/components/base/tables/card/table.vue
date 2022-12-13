<template>
  <table class="wiz-card-table">
    <slot />
  </table>
</template>

<script setup lang="ts">
import { THEME } from "@wiz-ui/constants";
import { ComponentName } from "@wiz-ui/constants/component/name";

defineOptions({
  name: ComponentName.CardTable,
});

const spacingXs = THEME.spacing.xs;
const spacingXs2 = THEME.spacing.xs2;
</script>

<style lang="scss" scoped>
.wiz-card-table {
  border-collapse: separate;
  border-spacing: 0 calc(v-bind(spacingXs2) + v-bind(spacingXs) * 2);
}
</style>
