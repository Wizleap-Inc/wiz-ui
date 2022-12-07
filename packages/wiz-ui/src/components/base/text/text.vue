<template>
  <p v-if="computedIsP" class="wiz-text" :style="overflowStyles">
    <slot />
  </p>
  <span v-else-if="computedIsSpan" class="wiz-text" :style="overflowStyles">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ComponentName } from "@/constants/component/name";
import { FONT_SIZE_MAP } from "@/constants/styles/font-size";
import { ColorKeys } from "@/types/styles/color";
import { FontSizeKeys } from "@/types/styles/font-size";
import { WhiteSpaceKeys } from "@/types/styles/white-space";
import { getColorCss } from "@/utils/styles/color";

defineOptions({
  name: ComponentName.Text,
});

interface Props {
  as?: "p" | "span";
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  bold?: boolean;
  maxLines?: number;
  whiteSpace?: WhiteSpaceKeys;
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
const computedWhiteSpace = computed(() => props.whiteSpace);

const overflowStyles = computed(() => {
  if (!props.maxLines) return {};
  return {
    overflow: "hidden",
    display: "-webkit-box",
    webkitBoxOrient: "vertical",
    WebkitLineClamp: props.maxLines,
  };
});
</script>

<style lang="scss" scoped>
.wiz-text {
  line-height: 1.5;
  margin: 0;
  color: v-bind(computedColor);
  font-size: v-bind(computedFontSize);
  font-weight: v-bind(computedFontWeight);
  white-space: v-bind(computedWhiteSpace);
}
</style>
