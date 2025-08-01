<template>
  <div ref="pollRef" :class="PollGraphStyle">
    <div
      ref="barRef"
      :class="[PollBodyStyle, backgroundStyle[barColor]]"
      :style="{
        backgroundColor: barColor,
      }"
    >
      <span ref="innerLabelRef" :class="PollGraphInnerLabelStyle">{{
        innerLabel
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PollGraphStyle,
  PollBodyStyle,
  PollGraphInnerLabelStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/poll-graph.css";
import { backgroundStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  isColorFixed: {
    type: Boolean as PropType<boolean>,
    required: false,
  },
  barPercentage: {
    type: Number as PropType<number>,
    required: true,
  },
  innerLabel: {
    type: String as PropType<string>,
    required: false,
  },
});
const pollRef = ref<HTMLElement>();
const barRef = ref<HTMLElement>();
const innerLabelRef = ref<HTMLElement>();

const barColor = computed(() => {
  if (props.isColorFixed) return "green.700";
  if (props.barPercentage >= 75) return "green.700";
  if (props.barPercentage >= 50) return "blue.700";
  if (props.barPercentage >= 25) return "yellow.700";
  return "red.700";
});

const updateBarWidth = () => {
  const pollElm = pollRef.value;
  const barElm = barRef.value;
  const barLabelElm = innerLabelRef.value;
  const labelHorizontalPadding = 10;
  if (!pollElm || !barElm || !barLabelElm) return 0;
  const barWidth = (pollElm.offsetWidth * props.barPercentage) / 100;
  if (props.barPercentage === 0) {
    barElm.style.width = "0px";
  } else {
    barElm.style.width =
      (barLabelElm.offsetWidth > barWidth - labelHorizontalPadding * 2
        ? barLabelElm.offsetWidth
        : barWidth) + "px";
    barLabelElm.style.right =
      (barLabelElm.offsetWidth > barWidth - labelHorizontalPadding * 2
        ? "0"
        : labelHorizontalPadding) + "px";
  }
};
onMounted(() => {
  const resizeObserver = new ResizeObserver(() => {
    updateBarWidth();
  });
  if (innerLabelRef.value) {
    resizeObserver.observe(innerLabelRef.value);
  }
  if (pollRef.value) {
    resizeObserver.observe(pollRef.value);
  }
});

watch(props, () => {
  updateBarWidth();
});
</script>
