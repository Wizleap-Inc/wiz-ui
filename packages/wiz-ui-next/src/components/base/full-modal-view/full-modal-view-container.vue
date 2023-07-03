<template>
  <div ref="fullModalAnchorRef" :style="anchorStyle">
    <slot name="anchor" />
  </div>
  <slot name="content" />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { StyleValue, computed, provide, ref } from "vue";

import { FULL_MODAL_VIEW_KEY, useFullModalViewProvider } from "./provider";

defineOptions({
  name: ComponentName.FullModalView,
});

const props = defineProps({
  sticky: {
    type: Boolean,
    default: false,
  },
});

const fullModalAnchorRef = ref<HTMLElement | undefined>();
const provider = useFullModalViewProvider(fullModalAnchorRef);

const anchorStyle = computed(() =>
  props.sticky
    ? ({
        position: "sticky",
        top: 0,
        left: 0,
      } as StyleValue)
    : undefined
);

provide(FULL_MODAL_VIEW_KEY, provider);
</script>
