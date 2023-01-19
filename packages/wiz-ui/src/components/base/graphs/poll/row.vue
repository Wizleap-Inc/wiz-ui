<template>
  <div :class="PollRowStyle">
    <span :class="PollLabelStyle" :style="{ width: labelWidth }">{{
      label
    }}</span>
    <div :class="PollStyle">
      <Bar
        v-if="barPercentage !== undefined"
        :isColorFixed="isColorFixed"
        :barPercentage="barPercentage"
        :innerLabel="innerLabel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PollRowStyle,
  PollStyle,
  PollLabelStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/poll-graph.css";
import { PropType } from "vue";

import Bar from "./bar.vue";

defineProps({
  isColorFixed: {
    type: Boolean as PropType<boolean>,
    required: false,
  },
  barPercentage: {
    type: Number as PropType<number>,
    required: false,
  },
  label: {
    type: String as PropType<string>,
    required: false,
  },
  innerLabel: {
    type: String as PropType<string>,
    required: false,
  },
  labelWidth: {
    type: String,
    required: true,
  },
});
</script>
