<template>
  <div class="wiz-progress">
    <div
      v-for="(content, i) in contents"
      :key="i"
      class="wiz-progress__item"
      :class="{
        'wiz-progress__item--first': i === 0,
      }"
    >
      <WizTooltip
        :content="content.status === 'none' ? undefined : content.tooltip"
      >
        <WizProgressPoint :status="content.status" :value="content.value" />
        <span class="wiz-progress__item__label">
          <WizText fontSize="xs2" color="gray.600" nowrap>
            {{ content.label }}
          </WizText>
        </span>
      </WizTooltip>
      <WizProgressLine :active="content.progress" :isFirst="i === 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { WizText } from "@/components/base/text";
import { WizTooltip } from "@/components/base/tooltip";
import { THEME } from "@/constants";

import { WizProgressPoint, WizProgressLine } from ".";

import type { ProgressItem } from "./types";

export interface Props {
  contents: ProgressItem[];
}

defineProps<Props>();

const spacingMd = THEME.spacing.md;
</script>

<style lang="scss" scoped>
.wiz-progress {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  &__item {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    width: 100%;

    &--first {
      width: auto;
    }

    &__label {
      position: absolute;
      bottom: calc(v-bind(spacingMd) * -1);
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
