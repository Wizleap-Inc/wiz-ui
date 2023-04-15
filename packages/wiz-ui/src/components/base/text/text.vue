<template>
  <component
    :is="as"
    :class="[
      styles.textStyle,
      styles.textFontWeightStyle[bold ? 'bold' : 'default'],
      styles.textAlignStyle[textAlign],
      (maxLines || breakAll) && styles.textWordBreakStyle,
      lineHeight
        ? commonStyles.lineHeightStyle[lineHeight]
        : styles.textDefaultLineHeightStyle,
      commonStyles.fontSizeStyle[fontSize],
      commonStyles.colorStyle[color],
      commonStyles.whiteSpaceStyle[whiteSpace],
      lineThrough && styles.textLineThroughStyle,
    ]"
    :for="htmlFor"
    :style="overflowStyles"
  >
    <span :class="styles.textDummyStyle" v-if="dummyValue">{{
      dummyValue
    }}</span>
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
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/text.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
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
  textAlign: {
    type: String as PropType<"start" | "end" | "left" | "right" | "center">,
    required: false,
    default: "start",
  },
  lineThrough: {
    type: Boolean,
    required: false,
    default: false,
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
