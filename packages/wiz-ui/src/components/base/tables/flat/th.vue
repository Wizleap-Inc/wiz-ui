<template>
  <th :class="[flatTh, flatThVariantStyle[scope]]" :style="{ width }">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  flatTh,
  flatThVariantStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";

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
</script>
