<template>
  <div :class="styles.graphContainerStyle">
    <div :class="styles.graphSideStyle">
      <span
        v-if="annotationUnit"
        :class="[
          styles.graphSideLabelStyle,
          styles.graphSideLabelPositionStyle['unit'],
        ]"
      >
        ({{ annotationUnit }})
      </span>
      <span
        :class="[
          styles.graphSideLabelStyle,
          styles.graphSideLabelPositionStyle['max'],
        ]"
      >
        {{ maxFrequency }}{{ labelUnit }}
      </span>
      <span
        :class="[
          styles.graphSideLabelStyle,
          styles.graphSideLabelPositionStyle['half'],
        ]"
      >
        {{ Math.ceil(maxFrequency / 2) }}{{ labelUnit }}
      </span>
    </div>
    <div :class="styles.graphContainerBodyStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/transition-graph.css";

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
