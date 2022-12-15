<template>
  <th class="wiz-card-table__th">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { THEME, ComponentName } from "@wizleap-inc/wiz-ui-constants";

defineOptions({
  name: ComponentName.CardTh,
});

interface Props {
  width?: string;
}

withDefaults(defineProps<Props>(), {
  width: "auto",
});

const colorGray500 = THEME.color.gray["500"];
const fontSizeXs2 = THEME.fontSize.xs2;
</script>

<style lang="scss" scoped>
.wiz-card-table__th {
  color: v-bind(colorGray500);
  width: v-bind(width);
  font-size: v-bind(fontSizeXs2);
  font-weight: normal;
}
</style>
