<template>
  <WizVStack :gap="styles.TIMELINES_GAP">
    <slot />
  </WizVStack>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/timeline.css";
import { PropType, provide, toRef } from "vue";

import { WizVStack } from "@/components/base";
import { BreakpointVariant } from "@/hooks";

import { TIMELINE_KEY } from "./use-timeline";

defineOptions({
  name: ComponentName.Timeline,
});

const props = defineProps({
  bp: {
    type: String as PropType<BreakpointVariant>,
    required: true,
  },
});

const bp = toRef(props, "bp");

provide(TIMELINE_KEY, { bp });
</script>
