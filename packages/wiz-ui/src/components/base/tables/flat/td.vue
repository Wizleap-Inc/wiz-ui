<template>
  <td
    class="wiz-flat-table__td"
    :class="{
      'wiz-flat-table__td--left': align === 'left',
      'wiz-flat-table__td--center': align === 'center',
      'wiz-flat-table__td--right': align === 'right',
    }"
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
import { THEME, ComponentName } from "@wizleap-inc/wiz-ui-constants";

defineOptions({
  name: ComponentName.FlatTd,
});
interface Props {
  align?: "left" | "center" | "right";
}

withDefaults(defineProps<Props>(), {
  align: "center",
});

const spacingSm = THEME.spacing.sm;
const fontSizeSm = THEME.fontSize.sm;
const colorGray300 = THEME.color.gray["300"];
const colorGray700 = THEME.color.gray["700"];
const colorWhite800 = THEME.color.white["800"];
</script>

<style lang="scss" scoped>
.wiz-flat-table__td {
  font-size: v-bind(fontSizeSm);
  padding: v-bind(spacingSm);
  color: v-bind(colorGray700);
  background: v-bind(colorWhite800);
  border: 1px solid v-bind(colorGray300);

  &--left {
    text-align: left;
  }

  &--center {
    text-align: center;
  }

  &--right {
    text-align: right;
  }
}
</style>
