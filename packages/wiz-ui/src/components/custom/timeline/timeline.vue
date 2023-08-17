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

import { TIMELINE_KEY } from "./use-timeline";

defineOptions({
  name: ComponentName.Timeline,
});

const props = defineProps({
  device: {
    type: String as PropType<"mobile" | "pc">,
    default: "pc",
    required: false,
  },
});

const device = toRef(props, "device");

provide(TIMELINE_KEY, { device });
</script>
