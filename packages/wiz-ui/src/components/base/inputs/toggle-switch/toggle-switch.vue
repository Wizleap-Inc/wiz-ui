<template>
  <label class="wiz-toggle-switch">
    <input
      class="wiz-toggle-switch__input"
      type="checkbox"
      v-model="switchValue"
    />
    <span class="wiz-toggle-switch__slider"></span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { THEME } from "@/constants/styles";

interface Props {
  value: boolean;
}

const props = defineProps<Props>();

interface Emit {
  (e: "input", value: boolean): void;
}

const emit = defineEmits<Emit>();

const switchValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const colorGreen800 = THEME.color.green["800"];
const colorWhite800 = THEME.color.white["800"];
const spacingXs2 = THEME.spacing.xs2;
const spacingLg = THEME.spacing.lg;
const spacingXl = THEME.spacing.xl;
const spacingXl3 = THEME.spacing.xl3;
const spacingMax = THEME.spacing.max;
</script>

<style lang="scss" scoped>
$border-width: 1px;
$switch-width: v-bind(spacingXl3);
$switch-height: v-bind(spacingLg);

.wiz-toggle-switch {
  position: relative;
  display: inline-block;
  width: $switch-width;
  height: $switch-height;

  &__input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .wiz-toggle-switch__slider:before {
      -webkit-transform: translateX(
        calc(
          $switch-width - calc((v-bind(spacingXs2) + $border-width) * 2) -
            calc($switch-width / 3)
        )
      );
      -ms-transform: translateX(
        calc(
          $switch-width - calc((v-bind(spacingXs2) + $border-width) * 2) -
            calc($switch-width / 3)
        )
      );
      transform: translateX(
        calc(
          $switch-width - calc((v-bind(spacingXs2) + $border-width) * 2) -
            calc($switch-width / 3)
        )
      );
    }
  }

  &__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: v-bind(colorWhite800);
    border: $border-width solid v-bind(colorGreen800);
    border-radius: v-bind(spacingXl);
    box-sizing: border-box;

    &:before {
      position: absolute;
      content: "";
      height: calc($switch-width / 3);
      width: calc($switch-width / 3);
      top: calc(
        (calc($switch-height - $border-width * 2) - calc($switch-width / 3)) / 2
      );
      left: v-bind(spacingXs2);
      background-color: v-bind(colorGreen800);
      border-radius: v-bind(spacingMax);
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
}
</style>
