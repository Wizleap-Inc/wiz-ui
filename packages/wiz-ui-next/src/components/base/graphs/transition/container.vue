<template>
  <div :class="graphContainerStyle">
    <div :class="graphSideStyle">
      <span
        v-if="annotationUnit"
        :class="[graphSideLabelStyle, graphSideLabelPositionStyle['unit']]"
      >
        ({{ annotationUnit }})
      </span>
      <span :class="[graphSideLabelStyle, graphSideLabelPositionStyle['max']]">
        {{ maxFrequency }}{{ labelUnit }}
      </span>
      <span :class="[graphSideLabelStyle, graphSideLabelPositionStyle['half']]">
        {{ Math.ceil(maxFrequency / 2) }}{{ labelUnit }}
      </span>
    </div>
    <div :class="graphContainerBodyStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  graphContainerStyle,
  graphSideStyle,
  graphSideLabelStyle,
  graphSideLabelPositionStyle,
  graphContainerBodyStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/transition-graph.css";

defineProps({
  maxFrequency: {
    type: Number,
    required: true,
  },
  labelUnit: {
    type: String,
    required: false,
  },
  annotationUnit: {
    type: String,
    required: false,
  },
});
</script>
