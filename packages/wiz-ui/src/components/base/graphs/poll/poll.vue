<template>
  <div :class="PollGraphWrapperStyle" ref="pollWrapperRef">
    <Row
      v-for="(row, i) in data"
      :key="i"
      :label="row.label"
      :innerLabel="row.innerLabel"
      :labelWidth="labelWidth"
      :isColorFixed="isColorFixed"
      :barPercentage="row.percentage"
    />
    <Row
      v-for="(_, i) in Array(
        rowCount - data.length < 0 ? 0 : rowCount - data.length
      )"
      :key="-1 * i - 1"
      :labelWidth="labelWidth"
    />
    <span
      :class="PollGraphDividerStyle"
      :style="{
        left: `calc(${labelWidth} - ${DIVIDER_WIDTH})`,
        height: `${pollWrapperHeight}px`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  PollGraphWrapperStyle,
  PollGraphDividerStyle,
  DIVIDER_WIDTH,
} from "@wizleap-inc/wiz-ui-styles/bases/poll-graph.css";
import { onMounted, PropType, ref } from "vue";

import Row from "./row.vue";
import { PollGraphData } from "./types";

defineOptions({
  name: ComponentName.PollGraph,
});

defineProps({
  isColorFixed: {
    type: Boolean,
    required: false,
  },
  rowCount: {
    type: Number,
    required: false,
    default: 0,
  },
  data: {
    type: Array as PropType<PollGraphData[]>,
    required: true,
  },
  labelWidth: {
    type: String,
    required: false,
    default: "5rem",
  },
});

const pollWrapperRef = ref<HTMLElement>();
const pollWrapperHeight = ref(0);

const updatePollWrapperHeight = () => {
  if (!pollWrapperRef.value) return;
  pollWrapperHeight.value = pollWrapperRef.value.offsetHeight;
};

onMounted(() => {
  if (!pollWrapperRef.value) return;
  const ob = new ResizeObserver(() => updatePollWrapperHeight());
  ob.observe(pollWrapperRef.value);
});
</script>
