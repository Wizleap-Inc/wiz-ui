<template>
  <span
    class="wiz-progress__point"
    :class="{
      'wiz-progress__point--done': status === 'done',
      'wiz-progress__point--active': status === 'active',
      'wiz-progress__point--inactive': status === 'inactive',
      'wiz-progress__point--pending': status === 'pending',
      'wiz-progress__point--dead': status === 'dead',
    }"
  >
    <span
      class="wiz-progress__point__value"
      :class="{
        'wiz-progress__point__value--active': status === 'active',
        'wiz-progress__point__value--inactive': status !== 'active',
      }"
    >
      {{ value }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { THEME, ComponentName } from "@wizleap-inc/wiz-ui-constants";

import { progressPointSize } from "./constants";

import type { ProgressStatus } from "./types";

defineOptions({
  name: ComponentName.ProgressPoint,
});

interface Props {
  status: ProgressStatus;
  value?: number;
}

defineProps<Props>();

const green300 = THEME.color.green[300];
const green800 = THEME.color.green[800];
const gray300 = THEME.color.gray[300];
const gray800 = THEME.color.gray[800];
const white800 = THEME.color.white[800];
const fontSizeXs2 = THEME.fontSize.xs2;
const _progressPointSize = progressPointSize;
</script>

<style lang="scss" scoped>
$point-dash-num: 8;
$point-dash-width: 2px;
$line-height: 1px;

.wiz-progress__point {
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(_progressPointSize);
  height: v-bind(_progressPointSize);
  border-radius: 50%;
  color: v-bind(white800);
  border-width: 2px;
  box-sizing: border-box;
  font-weight: bold;
  z-index: 1;
  position: relative;

  &__value {
    z-index: 2;
    font-size: v-bind(fontSizeXs2);

    &--active {
      color: v-bind(white800);
    }

    &--inactive {
      color: v-bind(gray800);
    }
  }

  &--done {
    background: v-bind(green300);
    border-color: v-bind(green800);
    border-style: solid;
  }

  &--active {
    background: v-bind(green800);
    border-color: v-bind(green800);
    border-style: solid;
  }

  &--inactive {
    background: v-bind(gray300);
    border-color: v-bind(gray300);
    border-style: solid;
  }

  &--pending {
    background: repeating-conic-gradient(
      v-bind(green800) 0 calc(360deg / $point-dash-num / 2),
      v-bind(green300) 0 calc(360deg / $point-dash-num)
    );
    position: relative;

    &::before {
      background: v-bind(green300);
    }
  }

  &--dead {
    background: repeating-conic-gradient(
      v-bind(gray800) 0 calc(360deg / $point-dash-num / 2),
      v-bind(gray300) 0 calc(360deg / $point-dash-num)
    );
    position: relative;

    &::before {
      background: v-bind(gray300);
    }
  }

  &::before {
    content: "";
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - $point-dash-width * 2);
    height: calc(100% - $point-dash-width * 2);
    border-radius: 50%;
  }
}
</style>
