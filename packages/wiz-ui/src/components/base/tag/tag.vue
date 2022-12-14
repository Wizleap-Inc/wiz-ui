<template>
  <span class="wiz-tag">
    <component v-if="icon" :is="icon" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";
import { ColorKeys } from "@wizleap-inc/wiz-ui-constants/styles/color";
import { getColorCss } from "@wizleap-inc/wiz-ui-constants/styles/color";
import { FONT_SIZE_MAP } from "@wizleap-inc/wiz-ui-constants/styles/font-size";
import { FontSizeKeys } from "@wizleap-inc/wiz-ui-constants/styles/font-size";
import { computed } from "vue";

import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.Tag,
});

interface Props {
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: "normal" | "bold";
  backgroundColor?: ColorKeys;
  icon?: TIcon;
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
