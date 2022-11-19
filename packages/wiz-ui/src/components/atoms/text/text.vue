<template>
  <p v-if="computedIsP" class="wiz-text">
    <slot />
  </p>
  <span v-else-if="computedIsSpan" class="wiz-text">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { FONT_SIZE_MAP } from "@/constants/styles/fontSize";
import { ColorKeys } from "@/types/styles/color";
import { FontSizeKeys } from "@/types/styles/fontSize";
import { getColorCss } from "@/utils/styles/color";

interface Props {
  as?: "p" | "span";
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  bold?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "p",
  color: "gray.900",
  fontSize: "md",
});

const computedIsP = computed(() => props.as === "p");
const computedIsSpan = computed(() => props.as === "span");
const computedColor = computed(() => getColorCss(props.color));
const computedFontSize = computed(() => FONT_SIZE_MAP[props.fontSize]);
const computedFontWeight = computed(() => (props.bold ? "bold" : "normal"));
</script>

<style lang="scss" scoped>
.wiz-text {
  line-height: 1.5;
  margin: 0;
  color: v-bind(computedColor);
  font-size: v-bind(computedFontSize);
  font-weight: v-bind(computedFontWeight);
}
</style>
