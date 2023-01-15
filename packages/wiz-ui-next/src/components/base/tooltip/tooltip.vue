<template>
  <span :class="tooltipStyle">
    <slot />
    <span :class="tooltipContentStyle" v-if="content || slots.content">
      {{ content }}
      <slot v-if="!content" name="content" />
      <WizIChangeHistory :class="tooltipIconStyle" />
    </span>
  </span>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  tooltipStyle,
  tooltipContentStyle,
  tooltipIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tooltip.css";
import { useSlots } from "vue";

import { WizIChangeHistory } from "@/components/icons";

defineOptions({
  name: ComponentName.Tooltip,
});

defineProps({
  content: {
    type: String,
    required: false,
  },
});

const slots = useSlots();
</script>
