<template>
  <td :class="[flatTdStyle, flatTdAlignStyle[align]]">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  flatTdStyle,
  flatTdAlignStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/flat-table.css";

defineOptions({
  name: ComponentName.FlatTd,
});

interface Props {
  align?: "left" | "center" | "right";
}

withDefaults(defineProps<Props>(), {
  align: "center",
});
</script>
