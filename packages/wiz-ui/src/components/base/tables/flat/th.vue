<template>
  <th
    class="wiz-flat-table__th"
    :class="{
      'wiz-flat-table__th--col': scope === 'col',
      'wiz-flat-table__th--row': scope === 'row',
    }"
  >
    <slot />
  </th>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";

defineOptions({
  name: ComponentName.FlatTh,
});

interface Props {
  width?: string;
  scope?: "col" | "row";
}

withDefaults(defineProps<Props>(), {
  width: "auto",
  scope: "col",
});

const colorWhite800 = THEME.color.white["800"];
const colorGreen800 = THEME.color.green["800"];
const colorGray300 = THEME.color.gray["300"];
const colorGray400 = THEME.color.gray["400"];
const colorGray700 = THEME.color.gray["700"];
const fontSizeSm = THEME.fontSize.sm;
const spacingSm = THEME.spacing.sm;
</script>

<style lang="scss" scoped>
.wiz-flat-table__th {
  width: v-bind(width);
  font-size: v-bind(fontSizeSm);
  font-weight: bold;
  padding: v-bind(spacingSm);

  &--col {
    color: v-bind(colorWhite800);
    background: v-bind(colorGreen800);
    border: 1px solid v-bind(colorGray300);
    text-align: center;
  }

  &--row {
    color: v-bind(colorGray700);
    background: v-bind(colorGray300);
    border: 1px solid v-bind(colorGray400);
    text-align: left;
  }
}
</style>
