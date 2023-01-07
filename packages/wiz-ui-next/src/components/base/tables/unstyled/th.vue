<template>
  <th :class="unstyledTh" :style="{ width }">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { unstyledTh } from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";

defineOptions({
  name: ComponentName.FlatTh,
});

interface Props {
  width?: string;
}

withDefaults(defineProps<Props>(), {
  width: "auto",
});
</script>
