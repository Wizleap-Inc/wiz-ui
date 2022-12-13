<template>
  <div class="wiz-panel-switch">
    <label
      v-for="(item, key) in items"
      :key="key"
      class="wiz-panel-switch__block"
      :class="{
        'wiz-panel-switch__block-divider': key !== items.length - 1,
        'wiz-panel-switch__block-left': key === 0,
        'wiz-panel-switch__block-right': key === items.length - 1,
        'wiz-panel-switch__block--active': key === switchValue - 1,
      }"
      :for="`panel${key}`"
    >
      {{ item.label }}
      <input
        class="wiz-panel-switch__input"
        type="radio"
        :id="`panel${key}`"
        :name="`panel${key}`"
        :value="item.value"
        v-model="switchValue"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wiz-ui/constants/component/name";
import { THEME } from "@wiz-ui/constants/styles";
import { computed } from "vue";

import { panelItems } from "./types";

defineOptions({
  name: ComponentName.PanelSwitch,
});

interface Props {
  value: number;
  items: panelItems[];
}

const props = defineProps<Props>();

interface Emit {
  (e: "input", value: number): void;
}

const emit = defineEmits<Emit>();

const switchValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const spacingNo = THEME.spacing.no;
const spacingXs2 = THEME.spacing.xs2;
const spacingSm = THEME.spacing.sm;
const spacingXl = THEME.spacing.xl2;
const colorWhite800 = THEME.color.white["800"];
const colorGray400 = THEME.color.gray["400"];
const colorGray600 = THEME.color.gray["600"];
const colorGreen800 = THEME.color.green["800"];
const shadowSm = THEME.shadow.sm;
const fontSizeXs = THEME.fontSize.xs;
</script>

<style lang="scss" scoped>
$border-width: 1px;

.wiz-panel-switch {
  display: flex;
  width: max-content;
  height: v-bind(spacingXl);
  background-color: v-bind(colorWhite800);
  border-radius: v-bind(spacingXs2);
  box-shadow: v-bind(shadowSm);

  &__block {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: v-bind(spacingNo) v-bind(spacingSm);
    font-size: v-bind(fontSizeXs);
    color: v-bind(colorGray600);
    border-top: $border-width solid v-bind(colorGray400);
    border-bottom: $border-width solid v-bind(colorGray400);
    cursor: pointer;

    &-divider {
      border-right: $border-width solid v-bind(colorGray400);
    }

    &-left {
      border-top: $border-width solid v-bind(colorGray400);
      border-bottom: $border-width solid v-bind(colorGray400);
      border-left: $border-width solid v-bind(colorGray400);
      border-top-left-radius: v-bind(spacingXs2);
      border-bottom-left-radius: v-bind(spacingXs2);
    }

    &-right {
      border-top: $border-width solid v-bind(colorGray400);
      border-bottom: $border-width solid v-bind(colorGray400);
      border-right: $border-width solid v-bind(colorGray400);
      border-top-right-radius: v-bind(spacingXs2);
      border-bottom-right-radius: v-bind(spacingXs2);
    }

    &--active {
      color: v-bind(colorWhite800);
      background-color: v-bind(colorGreen800);
    }
  }

  &__input {
    display: none;
  }
}
</style>
