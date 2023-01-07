<template>
  <component
    :is="as"
    :class="[
      textStyle,
      textFontWeightStyle[bold ? 'bold' : 'default'],
      maxLines && textWordBreakStyle,
      lineHeight ? lineHeightStyle[lineHeight] : textDefaultLineHeightStyle,
      fontSizeStyle[fontSize],
      colorStyle[color],
      whiteSpaceStyle[whiteSpace],
    ]"
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
import { computed } from "vue";

defineOptions({
  name: ComponentName.Text,
});

interface Props {
  as?: "p" | "span";
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  lineHeight?: FontSizeKeys;
  bold?: boolean;
  maxLines?: number;
  whiteSpace?: WhiteSpaceKeys;
  dummyValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: "p",
  color: "gray.900",
  fontSize: "md",
  whiteSpace: "normal",
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
