<template>
  <table
    :class="[
      spaceX && borderSpacingXStyle[spaceX],
      spaceY && borderSpacingYStyle[spaceY],
      !spaceX && !spaceY && borderSpacingStyle[space],
      fixed && unstyledTableFixedStyle,
    ]"
  >
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { unstyledTableFixedStyle } from "@wizleap-inc/wiz-ui-styles/bases/unstyled-table.css";
import {
  borderSpacingStyle,
  borderSpacingXStyle,
  borderSpacingYStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

defineOptions({
  name: ComponentName.UnstyledTable,
});

defineProps({
  space: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "no",
  },
  spaceX: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  spaceY: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
