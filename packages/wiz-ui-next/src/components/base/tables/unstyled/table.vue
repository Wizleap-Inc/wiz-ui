<template>
  <table
    :class="[
      spaceX && borderSpacingXStyle[spaceX],
      spaceY && borderSpacingYStyle[spaceY],
      !spaceX && !spaceY && borderSpacingStyle[space],
    ]"
  >
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
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
});
</script>
