<template>
  <div :class="graphBarStyle">
    <span :class="graphBarLabelStyle">{{ label }}</span>
    <div
      v-for="bar in bars"
      :class="[graphBarItemStyle, graphBarItemIndexStyle['current']]"
      :style="{
        height: `${bar.y * 100}%`,
        width: `${barWidth * (1 - barGap) * 100}%`,
        left: `${(bar.x - barGroupWidth / 2) * 200}%`,
      }"
    >
      <span
        :class="graphBarNumberStyle"
        v-if="bar.y !== 0"
        :style="{
          padding: '8px 0',
        }"
      >
        {{ bar.freq }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  graphBarItemIndexStyle,
  graphBarItemStyle,
  graphBarLabelStyle,
  graphBarStyle,
  graphBarNumberStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/compare-graph.css";
import { PropType, computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  frequencies: {
    type: Array as PropType<number[]>,
    required: true,
  },
  maxFrequency: {
    type: Number,
    required: true,
  },
  /** バーの間隔に影響します。0~1の値を指定してください。 */
  barGap: {
    type: Number,
    required: false,
    default: 0.1,
  },
  /** バーの太さに影響します。0~1の値を指定してください。 */
  barGroupWidth: {
    type: Number,
    required: false,
    default: 0.8,
  },
});

const barWidth = computed(() => props.barGroupWidth / props.frequencies.length);
const bars = computed(() =>
  props.frequencies.map((freq, i) => {
    return {
      x: barWidth.value * (i + 0.5),
      y: freq / props.maxFrequency,
      freq: freq,
    };
  })
);
</script>
