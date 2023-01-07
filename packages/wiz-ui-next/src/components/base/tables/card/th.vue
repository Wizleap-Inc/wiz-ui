<template>
  <th :class="cardThStyle" :style="{ width }">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { cardThStyle } from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

defineOptions({
  name: ComponentName.CardTh,
});

interface Props {
  width?: string;
}

withDefaults(defineProps<Props>(), {
  width: "auto",
});
</script>
