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

defineOptions({
  name: ComponentName.UnstyledTable,
});

interface Props {
  space?: SpacingKeys;
  spaceX?: SpacingKeys;
  spaceY?: SpacingKeys;
}

withDefaults(defineProps<Props>(), {
  space: "no",
});
</script>
