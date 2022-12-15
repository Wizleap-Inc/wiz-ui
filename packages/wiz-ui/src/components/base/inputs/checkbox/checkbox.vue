<template>
  <div class="wiz-checkbox">
    <WizStack :gap="gap" :direction="direction" wrap>
      <div v-for="(option, key) in options" :key="key">
        <input
          class="wiz-checkbox__input"
          type="checkbox"
          :id="`checkbox${key}`"
          :name="`checkbox${key}`"
          :value="option.value"
          v-model="checkboxValue"
          :disabled="disabled || disabledKey === key"
        />
        <label
          :class="{
            'wiz-checkbox__label': true,
            'wiz-checkbox__label--disabled': disabled || disabledKey === key,
          }"
          :for="`checkbox${key}`"
        >
          <span class="wiz-checkbox__block">{{ option.label }}</span>
        </label>
      </div>
    </WizStack>
  </div>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants/styles/spacing";
import { computed } from "vue";

import WizStack from "@/components/base/stack/stack.vue";

import { CheckBoxOption } from "./types";

interface Props {
  options: CheckBoxOption[];
  value: number[];
  disabled?: boolean;
  disabledKey?: number;
  direction?: "horizontal" | "vertical";
  gap?: SpacingKeys;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  direction: "horizontal",
  gap: "xl",
});

interface Emit {
  (e: "input", value: number[]): void;
}
const emit = defineEmits<Emit>();

const checkboxValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const fontSizeSm = THEME.fontSize.sm;
const spacingXs2 = THEME.spacing.xs2;
const spacingSm = THEME.spacing.sm;
const colorGray400 = THEME.color.gray["400"];
const colorGray600 = THEME.color.gray["600"];
const colorGreen800 = THEME.color.green["800"];
</script>

<style lang="scss" scoped>
$border-width: 1px;

.wiz-checkbox {
  width: fit-content;

  &__input {
    position: absolute;
    display: none;
    cursor: pointer;

    &:checked {
      + .wiz-checkbox__label {
        position: relative;

        &:before {
          border: $border-width solid v-bind(colorGreen800);
        }

        > .wiz-checkbox__block {
          color: v-bind(colorGreen800);

          &:before {
            display: block;
          }

          &:after {
            display: block;
          }
        }
      }
    }
  }

  &__label {
    display: flex;
    align-items: center;
    color: v-bind(colorGray600);
    font-size: v-bind(fontSizeSm);
    gap: v-bind(spacingSm);
    cursor: pointer;

    &:before {
      content: "";
      border: $border-width solid v-bind(colorGray400);
      border-radius: calc(v-bind(spacingXs2) / 2);
      width: v-bind(spacingSm);
      height: v-bind(spacingSm);
      display: inline-block;
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__block {
    &:before {
      content: "";
      position: absolute;
      display: none;
      height: 1px;
      width: 4px;
      top: 11px;
      left: 2px;
      background: v-bind(colorGreen800);
      border-radius: v-bind(spacingXs2);
      transform: rotate(45deg);
    }

    &:after {
      content: "";
      position: absolute;
      display: none;
      height: 1px;
      width: 8px;
      top: 10px;
      left: 4px;
      background: v-bind(colorGreen800);
      border-radius: v-bind(spacingXs2);
      transform: rotate(-45deg);
    }
  }
}
</style>
