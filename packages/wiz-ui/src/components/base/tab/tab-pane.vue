<template>
  <div
    :class="{
      'wiz-tab-panel': true,
      'wiz-tab-panel--active': active,
      'wiz-tab-panel--disabled': disabled,
    }"
    @click="onClick"
  >
    <span class="wiz-tab-panel__label">{{ label }}</span>
    <span v-if="notificationCount" class="wiz-tab-panel__notification">{{
      notificationCount
    }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { THEME } from "@/constants";
import { ComponentName } from "@/constants/component/name";

defineOptions({
  name: ComponentName.TabPane,
});

interface Props {
  label: string;
  active?: boolean;
  disabled?: boolean;
  notificationCount?: number;
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: "100%",
});

interface Emits {
  (event: "click"): void;
}

const emit = defineEmits<Emits>();

const onClick = () => props.disabled || emit("click");

const gray800 = THEME.color.gray[800];
const green800 = THEME.color.green[800];
const white500 = THEME.color.white[500];
const white800 = THEME.color.white[800];
const fontSizeXs2 = THEME.fontSize.xs2;
const fontSizeSm = THEME.fontSize.sm;
const fontSizeLg = THEME.fontSize.lg;
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingXl = THEME.spacing.xl;
const computedWidth = computed(() => props.width);
</script>

<style lang="scss" scoped>
.wiz-tab-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: v-bind(spacingXs) v-bind(spacingXl);
  font-size: v-bind(fontSizeSm);
  width: v-bind(computedWidth);
  cursor: pointer;
  color: v-bind(gray800);
  background: v-bind(white500);
  border-radius: v-bind(spacingXs2) v-bind(spacingXs2) 0 0;

  &--active {
    background: v-bind(white800);
    color: v-bind(green800);
    font-weight: bold;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__label {
    line-height: v-bind(fontSizeLg);
  }

  &__notification {
    line-height: v-bind(fontSizeLg);
    margin-left: 5px;
    width: v-bind(fontSizeLg);
    height: v-bind(fontSizeLg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff4d4f;
    color: #fff;
    font-size: v-bind(fontSizeXs2);
  }
}
</style>
