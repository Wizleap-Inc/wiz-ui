<template>
  <div :class="graphBarStyle" ref="graphRef">
    <span :class="graphBarLabelStyle" ref="labelRef">{{ label }}</span>
    <div
      v-for="bar in bars"
      :key="bar.id"
      :class="[graphBarItemStyle, bar.bgColorStyle]"
      ref="barRefs"
      :style="{
        height: `${bar.y * 100}%`,
        width: `${barWidth * (1 - barGap) * 100}%`,
        left: `${(bar.x - barGroupWidth / 2) * 200}%`,
      }"
    >
      <span
        :class="[graphBarNumberStyle, bar.numberColorStyle]"
        v-if="bar.y !== 0"
        ref="barFrequencyRefs"
      >
        {{ bar.frequency }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  graphBarItemStyle,
  graphBarLabelStyle,
  graphBarStyle,
  graphBarNumberStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/compare-graph.css";
import {
  backgroundStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import {
  PropType,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

import { CompareGraphData } from "./types";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  data: {
    type: Object as PropType<CompareGraphData>,
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
  /** バーの傾き(rad)を指定します。*/
  theta: {
    type: Number,
    required: false,
    default: 0,
  },
});

const barRefs = ref<HTMLElement[]>();
const barFrequencyRefs = ref<HTMLElement[]>();
const labelRef = ref<HTMLElement>();
const graphRef = ref<HTMLElement>();

const updateLabelTransformStyle = () => {
  if (!labelRef.value) return;
  const d = labelRef.value.clientWidth / 2;
  labelRef.value.style.transform = `
    translateX(-50%)
    translateY(${d * Math.abs(Math.sin(props.theta))}px)
    rotate(-${props.theta}rad)`;
};

const updateBarItemCurrentHeight = () => {
  const barElms = barRefs.value;
  const barFrequencyElms = barFrequencyRefs.value;

  if (!barElms || !barFrequencyElms) return;
  Array.from({ length: barFrequencyElms.length }).forEach((_, i) => {
    const barFrequencyElm = barFrequencyElms[i];
    const barElm = barElms[i];
    if (barFrequencyElm.offsetHeight + 16 < barElm.offsetHeight) {
      barFrequencyElm.style.padding = "8px 0";
      return;
    }
    barFrequencyElm.style.padding = "0";
    if (barFrequencyElm.offsetHeight < barElm.offsetHeight) {
      barFrequencyElm.style.top =
        (barElm.offsetHeight - barFrequencyElm.offsetHeight) / 2 + "px";
      return;
    }
    barFrequencyElm.style.top = barFrequencyElm.offsetHeight * -1 + "px";
    barFrequencyElm.style.color = "#606166";
  });
};

const barItemCurrentResizeObserver = new ResizeObserver(
  updateBarItemCurrentHeight
);

const graphResizeObserver = new ResizeObserver(updateLabelTransformStyle);

watch(() => props.theta, updateLabelTransformStyle);

onMounted(() => {
  if (barRefs.value)
    barRefs.value.forEach((barItemCurrentRef) => {
      barItemCurrentResizeObserver.observe(barItemCurrentRef);
    });
  if (graphRef.value) graphResizeObserver.observe(graphRef.value);
});

onBeforeUnmount(() => {
  barItemCurrentResizeObserver.disconnect();
  graphResizeObserver.disconnect();
});

const barWidth = computed(() => props.barGroupWidth / props.data.data.length);
const bars = computed(() =>
  props.data.data.map((data, i) => {
    return {
      id: data.id,
      x: barWidth.value * (i + 0.5),
      y: data.frequency / props.maxFrequency,
      bgColorStyle: backgroundStyle[data.barColor ?? "green.800"],
      numberColorStyle: colorStyle[data.numberColor ?? "white.800"],
      frequency: data.frequency,
    };
  })
);
</script>
