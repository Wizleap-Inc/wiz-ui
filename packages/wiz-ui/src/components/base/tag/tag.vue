<template>
  <span class="wiz-tag">
    <component v-if="icon" :is="icon" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import Vue, { computed } from "vue";

import { THEME } from "@/constants";
import { ComponentName } from "@/constants/component/name";
import { FONT_SIZE_MAP } from "@/constants/styles/font-size";
import { ColorKeys } from "@/types/styles/color";
import { FontSizeKeys } from "@/types/styles/font-size";
import { getColorCss } from "@/utils/styles/color";

defineOptions({
  name: ComponentName.Tag,
});

interface Props {
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: "normal" | "bold";
  backgroundColor?: ColorKeys;
  icon?: Vue;
  label: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "white.800",
  backgroundColor: "blue.800",
  fontSize: "md",
  fontWeight: "normal",
});

const computedColor = computed(() => getColorCss(props.color));

const computedBackgroundColor = computed(() =>
  getColorCss(props.backgroundColor)
);

const computedFontSize = computed(() => FONT_SIZE_MAP[props.fontSize]);

const computedFontWeight = computed(() => props.fontWeight);

const spaceXs = THEME.spacing.xs;
const spaceXs2 = THEME.spacing.xs2;
</script>

<style lang="scss" scoped>
.wiz-tag {
  border-radius: v-bind(spaceXs2);
  padding: v-bind(spaceXs2) v-bind(spaceXs);
  color: v-bind(computedColor);
  font-size: v-bind(computedFontSize);
  font-weight: v-bind(computedFontWeight);
  background-color: v-bind(computedBackgroundColor);
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;

  & > svg {
    fill: v-bind(computedColor);
  }
}
</style>
