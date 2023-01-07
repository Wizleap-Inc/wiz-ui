<template>
  <td :class="[unstyledTdStyle, unstyledTdAlignStyle[align]]">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  unstyledTdStyle,
  unstyledTdAlignStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";

defineOptions({
  name: ComponentName.UnstyledTd,
});
interface Props {
  align?: "left" | "center" | "right";
}

withDefaults(defineProps<Props>(), {
  align: "center",
});
</script>
