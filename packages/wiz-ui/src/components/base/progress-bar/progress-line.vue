<template>
  <span
    class="wiz-progress-line"
    :class="{
      'wiz-progress-line--active': active,
      'wiz-progress-line--inactive': !active,
      'wiz-progress-line--first': isFirst,
    }"
  />
</template>

<script setup lang="ts">
import { THEME } from "@wiz-ui/constants";
import { ComponentName } from "@wiz-ui/constants/component/name";

import { progressPointSize } from "./constants";

defineOptions({
  name: ComponentName.ProgressLine,
});
interface Props {
  active?: boolean;
  isFirst: boolean;
}

defineProps<Props>();

const _progressPointSize = progressPointSize;
const green800 = THEME.color.green[800];
const gray300 = THEME.color.gray[300];
</script>

<style lang="scss" scoped>
$line-height: 1px;
.wiz-progress-line {
  position: absolute;
  width: 100%;
  top: calc(v-bind(_progressPointSize) / 2);
  right: calc(v-bind(_progressPointSize) / 2);
  height: $line-height;

  &--active {
    background: v-bind(green800);
  }

  &--inactive {
    background: v-bind(gray300);
  }

  &--first {
    width: 0;
  }
}
</style>
