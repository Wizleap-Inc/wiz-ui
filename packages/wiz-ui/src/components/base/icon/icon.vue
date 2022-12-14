<template>
  <div class="wiz-icon">
    <component :is="icon" />
    <div class="wiz-icon__badge" v-if="badge">
      <span class="wiz-icon__badge__text">{{ badge }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  THEME,
  ComponentName,
  ColorKeys,
  getColorCss,
  FontSizeKeys,
  getFontSizeCss,
} from "@wizleap-inc/wiz-ui-constants";
import { computed } from "vue";

import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.Icon,
});
interface Props {
  size?: FontSizeKeys;
  color?: ColorKeys;
  badge?: string;
  badgeBgColor?: ColorKeys;
  badgeColor?: ColorKeys;
  icon: TIcon;
}

const props = withDefaults(defineProps<Props>(), {
  size: "xl2",
  badgeColor: "white.800",
  badgeBgColor: "red.800",
});

const computedSize = computed(() => getFontSizeCss(props.size));
const computedColor = computed(() =>
  props.color ? getColorCss(props.color) : "currentColor"
);
const computedBadgeColor = computed(() => getColorCss(props.badgeColor));
const computedBadgeBgColor = computed(() => getColorCss(props.badgeBgColor));

const spacingMax = THEME.spacing.max;
const fontSizeXl2 = THEME.fontSize.xl2;
const fontSizeXs2 = THEME.fontSize.xs2;
</script>

<style lang="scss" scoped>
.wiz-icon {
  line-height: 1;
  position: relative;
  width: fit-content;
  height: fit-content;

  & > svg {
    font-size: v-bind(computedSize);
    fill: v-bind(computedColor);
  }

  &__badge {
    position: absolute;
    top: -40%;
    right: -40%;
    width: v-bind(fontSizeXl2);
    height: v-bind(fontSizeXl2);
    background-color: v-bind(computedBadgeBgColor);
    border-radius: v-bind(spacingMax);
    display: flex;
    align-items: center;
    justify-content: center;

    &__text {
      font-size: v-bind(fontSizeXs2);
      color: v-bind(computedBadgeColor);
    }
  }
}
</style>
