<template>
  <p v-if="computedIsP" class="wiz-text" :style="overflowStyles">
    <span class="wiz-text__dummy" v-if="dummyValue">{{ dummyValue }}</span>
    <slot v-else />
  </p>
  <span v-else-if="computedIsSpan" class="wiz-text" :style="overflowStyles">
    <span class="wiz-text__dummy" v-if="dummyValue">{{ dummyValue }}</span>
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { ComponentName } from "@wiz-ui/constants/component/name";
import { ColorKeys } from "@wiz-ui/constants/styles/color";
import { getColorCss } from "@wiz-ui/constants/styles/color";
import { FontSizeKeys } from "@wiz-ui/constants/styles/font-size";
import { getFontSizeCss } from "@wiz-ui/constants/styles/font-size";
import { WhiteSpaceKeys } from "@wiz-ui/constants/styles/white-space";
import { getWhiteSpaceCss } from "@wiz-ui/constants/styles/white-space";
import { computed } from "vue";

defineOptions({
  name: ComponentName.Text,
});

interface Props {
  as?: "p" | "span";
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  lineHeight?: FontSizeKeys | number;
  bold?: boolean;
  maxLines?: number;
  whiteSpace?: WhiteSpaceKeys;
  dummyValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: "p",
  color: "gray.900",
  fontSize: "md",
  lineHeight: 1.5,
  whiteSpace: "normal",
});

const computedIsP = computed(() => props.as === "p");
const computedIsSpan = computed(() => props.as === "span");
const computedColor = computed(() => getColorCss(props.color));
const computedFontSize = computed(() => getFontSizeCss(props.fontSize));
const computedLineHeight = computed(() => {
  if (typeof props.lineHeight === "number") return props.lineHeight;
  return getFontSizeCss(props.lineHeight);
});
const computedFontWeight = computed(() => (props.bold ? "bold" : "normal"));
const computedWhiteSpace = computed(() => getWhiteSpaceCss(props.whiteSpace));

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
  line-height: v-bind(computedLineHeight);
  margin: 0;
  color: v-bind(computedColor);
  font-size: v-bind(computedFontSize);
  font-weight: v-bind(computedFontWeight);
  white-space: v-bind(computedWhiteSpace);

  &__dummy {
    filter: blur(0.25rem);
  }
}
</style>
