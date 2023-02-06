<template>
  <component
    :is="as"
    :class="[
      textStyle,
      textFontWeightStyle[bold ? 'bold' : 'default'],
      (maxLines || breakAll) && textWordBreakStyle,
      lineHeight ? lineHeightStyle[lineHeight] : textDefaultLineHeightStyle,
      fontSizeStyle[fontSize],
      colorStyle[color],
      whiteSpaceStyle[whiteSpace],
    ]"
    :for="htmlFor"
    :style="overflowStyles"
  >
    <span :class="textDummyStyle" v-if="dummyValue">{{ dummyValue }}</span>
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  FontSizeKeys,
  WhiteSpaceKeys,
} from "@wizleap-inc/wiz-ui-constants";
import {
  textStyle,
  textDummyStyle,
  textDefaultLineHeightStyle,
  textFontWeightStyle,
  textWordBreakStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/text.css";
import {
  lineHeightStyle,
  fontSizeStyle,
  colorStyle,
  whiteSpaceStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, PropType } from "vue";

defineOptions({
  name: ComponentName.Text,
});

const props = defineProps({
  as: {
    type: String as PropType<"p" | "span" | "label">,
    required: false,
    default: "p",
  },
  htmlFor: {
    type: String,
    required: false,
  },
  color: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "gray.900",
  },
  fontSize: {
    type: String as PropType<FontSizeKeys>,
    required: false,
    default: "md",
  },
  lineHeight: {
    type: String as PropType<FontSizeKeys>,
    required: false,
  },
  bold: {
    type: Boolean,
    required: false,
  },
  maxLines: {
    type: Number,
    required: false,
  },
  whiteSpace: {
    type: String as PropType<WhiteSpaceKeys>,
    required: false,
    default: "normal",
  },
  dummyValue: {
    type: String,
    required: false,
  },
  breakAll: {
    type: Boolean,
    required: false,
  },
});

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
