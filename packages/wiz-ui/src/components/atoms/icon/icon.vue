<template>
  <div class="wiz-icon">
    <component :is="icon" />
  </div>
</template>

<script setup lang="ts">
import Vue, { computed } from "vue";

import { ColorKeys } from "@/types/styles/color";
import { FontSizeKeys } from "@/types/styles/fontSize";
import { getColorCss } from "@/utils/styles/color";
import { getFontSizeCss } from "@/utils/styles/fontSize";

interface Props {
  size?: FontSizeKeys;
  color?: ColorKeys;
  icon: Vue;
}
const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "gray.900",
});

const computedSize = computed(() => getFontSizeCss(props.size));
const computedColor = computed(() => getColorCss(props.color));
</script>

<style lang="scss" scoped>
.wiz-icon {
  line-height: 1;
  & > svg {
    font-size: v-bind(computedSize);
    fill: v-bind(computedColor);
  }
}
</style>
