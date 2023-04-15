<template>
  <td :class="[styles.flatTdStyle, styles.flatTdAlignStyle[align]]">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.FlatTd,
});

defineProps({
  align: {
    type: String as PropType<"left" | "center" | "right">,
    required: false,
    default: "center",
  },
});
</script>
