<template>
  <td class="wiz-card-table__td">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { THEME } from "@/constants";
import { ComponentName } from "@/constants/component/name";

defineOptions({
  name: ComponentName.CardTd,
});

const spacingXs2 = THEME.spacing.xs2;
const spacingSm = THEME.spacing.sm;
const colorGray300 = THEME.color.gray["300"];
</script>

<style lang="scss" scoped>
.wiz-card-table__td {
  padding: v-bind(spacingXs2) v-bind(spacingSm);
  border-left: 1px solid v-bind(colorGray300);

  &:first-child {
    border-left: none;
  }
}
</style>
