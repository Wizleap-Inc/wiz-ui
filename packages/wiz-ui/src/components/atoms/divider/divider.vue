<template>
  <hr
    :class="{
      'wiz-divider': true,
      'wiz-divider--variant-solid': variant === 'solid',
      'wiz-divider--variant-dashed': variant === 'dashed',
      'wiz-divider--variant-dotted': variant === 'dotted',
      'wiz-divider--direction-horizontal': direction === 'horizontal',
      'wiz-divider--direction-vertical': direction === 'vertical',
    }"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ColorKeys } from "@/types/styles/color";
import { getColorCss } from "@/utils/styles/color";

interface Props {
  color?: ColorKeys;
  variant?: "solid" | "dashed" | "dotted";
  direction?: "horizontal" | "vertical";
}

const props = withDefaults(defineProps<Props>(), {
  color: "gray.400",
  variant: "solid",
  direction: "horizontal",
});

const color = computed(() => getColorCss(props.color));
</script>

<style lang="scss" scoped>
.wiz-divider {
  border: 0;
  border-color: v-bind(color);

  &--variant {
    &-solid {
      border-style: solid;
    }
    &-dashed {
      border-style: dashed;
    }
    &-dotted {
      border-style: dotted;
    }
  }

  &--direction {
    &-horizontal {
      border-width: 0 0 1.5px 0;
      width: 100%;
    }
    &-vertical {
      border-width: 0 1.5px 0 0;
      height: 100%;
    }
  }
}
</style>
