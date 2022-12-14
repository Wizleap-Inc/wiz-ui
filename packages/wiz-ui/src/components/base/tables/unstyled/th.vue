<template>
  <th class="wiz-unstyled-table__th">
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
}

withDefaults(defineProps<Props>(), {
  width: "auto",
});

const fontSizeSm = THEME.fontSize.sm;
</script>

<style lang="scss" scoped>
.wiz-unstyled-table__th {
  width: v-bind(width);
  font-size: v-bind(fontSizeSm);
  font-weight: bold;
}
</style>
