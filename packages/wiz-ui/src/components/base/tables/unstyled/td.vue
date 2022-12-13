<template>
  <td
    class="wiz-unstyled-table__td"
    :class="{
      'wiz-unstyled-table__td--left': align === 'left',
      'wiz-unstyled-table__td--center': align === 'center',
      'wiz-unstyled-table__td--right': align === 'right',
    }"
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
import { THEME } from "@/constants";
import { ComponentName } from "@/constants/component/name";

defineOptions({
  name: ComponentName.UnstyledTd,
});
interface Props {
  align?: "left" | "center" | "right";
}

withDefaults(defineProps<Props>(), {
  align: "center",
});

const fontSizeSm = THEME.fontSize.sm;
</script>

<style lang="scss" scoped>
.wiz-unstyled-table__td {
  font-size: v-bind(fontSizeSm);
  padding: 0;

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
