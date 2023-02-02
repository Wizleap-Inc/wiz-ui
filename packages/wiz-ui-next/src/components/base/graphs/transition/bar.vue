<template>
  <div :class="graphBarStyle" ref="barRef">
    <span :class="graphBarLabelStyle">{{ label }}</span>
    <div
      :class="graphBarTransitionStyle"
      ref="barTransitionRef"
      :style="{
        display: isFirst ? 'none' : 'block',
        height: `${
          Math.abs(lastAbsoluteFrequency - currentAbsoluteFrequency) * 100
        }%`,
        top: `${Math.min(
          (1 - lastAbsoluteFrequency) * 100,
          (1 - currentAbsoluteFrequency) * 100
        )}%`,
      }"
    >
      <div
        :class="graphBarTransitionLineStyle"
        ref="barTransitionLineRef"
        :style="{
          display: frequency === 0 && lastFrequency === 0 ? 'none' : 'block',
          transformOrigin:
            transitionRelativeFrequency <= 0 ? 'left top' : 'left bottom',
          top: transitionRelativeFrequency <= 0 ? '0' : '100%',
        }"
      ></div>
      <div :class="graphBarTransitionLabelStyle" ref="barTransitionLabelRef">
        {{
          frequency === 0 && lastFrequency === 0
            ? "―"
            : Math.abs(Math.floor(transitionRelativeFrequency))
        }}%
        <br />
        {{ transitionRelativeFrequency <= 0 ? "Dropped" : "Gained" }}
      </div>
    </div>
    <div
      :class="[graphBarItemStyle, graphBarItemIndexStyle['last']]"
      :style="{ height: `${lastAbsoluteFrequency * 100}%` }"
    ></div>
    <div
      :class="[graphBarItemStyle, graphBarItemIndexStyle['current']]"
      ref="barItemCurrentRef"
      :style="{ height: `${currentAbsoluteFrequency * 100}%` }"
    >
      <span
        :class="graphBarNumberStyle"
        ref="barItemCurrentFrequencyRef"
        v-if="frequency !== 0"
      >
        {{ frequency }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  graphBarItemIndexStyle,
  graphBarItemStyle,
  graphBarLabelStyle,
  graphBarNumberStyle,
  graphBarStyle,
  graphBarTransitionLabelStyle,
  graphBarTransitionLineStyle,
  graphBarTransitionStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/transition-graph.css";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isFirst: {
    type: Boolean,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
  },
  lastFrequency: {
    type: Number,
    required: true,
  },
  maxFrequency: {
    type: Number,
    required: true,
  },
});

const barRef = ref<HTMLElement>();
const barTransitionRef = ref<HTMLElement>();
const barTransitionLineRef = ref<HTMLElement>();
const barTransitionLabelRef = ref<HTMLElement>();
const barItemCurrentRef = ref<HTMLElement>();
const barItemCurrentFrequencyRef = ref<HTMLElement>();

const lastAbsoluteFrequency = computed(() => {
  if (props.maxFrequency === 0) return 0;
  return props.lastFrequency / props.maxFrequency;
});

const currentAbsoluteFrequency = computed(() => {
  if (props.maxFrequency === 0) return 0;
  return props.frequency / props.maxFrequency;
});

const transitionRelativeFrequency = computed(() => {
  if (props.lastFrequency === 0) return 0;
  return (props.frequency / props.lastFrequency - 1) * 100;
});

const updateBarTransitionLineWidth = () => {
  const barElm = barRef.value;
  const barTransitionElm = barTransitionRef.value;
  const barTransitionLineElm = barTransitionLineRef.value;
  const barTransitionLabelElm = barTransitionLabelRef.value;

  if (
    !barElm ||
    !barTransitionElm ||
    !barTransitionLineElm ||
    !barTransitionLabelElm
  )
    return;
  const barTransitionWidth = barTransitionElm.offsetWidth;
  const barTransitionHeight = barTransitionElm.offsetHeight;
  const barTransitionLineWidth = Math.sqrt(
    Math.pow(barTransitionWidth, 2) + Math.pow(barTransitionHeight, 2)
  );
  const barTransitionLineTilt =
    props.frequency < props.lastFrequency
      ? Math.atan(barTransitionHeight / barTransitionWidth)
      : -1 * Math.atan(barTransitionHeight / barTransitionWidth);
  barTransitionLineElm.style.width = `${barTransitionLineWidth}px`;
  barTransitionLineElm.style.transform = `rotate(${barTransitionLineTilt}rad)`;

  if (
    barTransitionElm.offsetHeight +
      barTransitionElm.offsetTop +
      barTransitionLabelElm.offsetHeight <
    barElm.offsetHeight
  ) {
    barTransitionLabelElm.style.top = "100%";
    barTransitionLabelElm.style.bottom = "auto";
  } else {
    barTransitionLabelElm.style.top = "auto";
    barTransitionLabelElm.style.bottom = "100%";
  }
};

const updateBarItemCurrentHeight = () => {
  const barItemCurrentElm = barItemCurrentRef.value;
  const barItemCurrentFrequencyElm = barItemCurrentFrequencyRef.value;

  if (!barItemCurrentElm || !barItemCurrentFrequencyElm) return;

  if (
    barItemCurrentFrequencyElm.offsetHeight + 16 <
    barItemCurrentElm.offsetHeight
  ) {
    barItemCurrentFrequencyElm.style.padding = "8px 0";
    return;
  }
  barItemCurrentFrequencyElm.style.padding = "0";
  if (
    barItemCurrentFrequencyElm.offsetHeight < barItemCurrentElm.offsetHeight
  ) {
    barItemCurrentFrequencyElm.style.top =
      (barItemCurrentElm.offsetHeight -
        barItemCurrentFrequencyElm.offsetHeight) /
        2 +
      "px";
    return;
  }
  barItemCurrentFrequencyElm.style.top =
    barItemCurrentFrequencyElm.offsetHeight * -1 + "px";
  barItemCurrentFrequencyElm.style.color = "#606166";
};

onMounted(() => {
  const barItemCurrentResizeObserver = new ResizeObserver(() => {
    updateBarItemCurrentHeight();
  });
  if (barItemCurrentRef.value)
    barItemCurrentResizeObserver.observe(barItemCurrentRef.value);

  const barTransitionLineResizeObserver = new ResizeObserver(() => {
    updateBarTransitionLineWidth();
  });
  if (barTransitionRef.value)
    barTransitionLineResizeObserver.observe(barTransitionRef.value);
});
</script>
