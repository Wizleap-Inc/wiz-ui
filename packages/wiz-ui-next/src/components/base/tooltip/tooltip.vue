<template>
  <div :class="tooltipStyle">
    <slot />
    <span :class="tooltipBlockStyle" v-if="content || slots.content">
      <span :class="tooltipContentStyle">
        {{ content }}
        <slot v-if="!content" name="content" />
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  tooltipStyle,
  tooltipBlockStyle,
  tooltipContentStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tooltip.css";
import { useSlots } from "vue";

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
