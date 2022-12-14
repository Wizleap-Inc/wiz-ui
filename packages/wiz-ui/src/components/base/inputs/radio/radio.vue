<template>
  <div class="wiz-radio">
    <WizStack :gap="gap" :direction="direction" wrap>
      <div v-for="(option, key) in options" :key="key">
        <input
          class="wiz-radio__input"
          type="radio"
          :name="`radio${key}`"
          :id="`radio${key}`"
          :value="option.value"
          v-model="radioValue"
          :disabled="disabled || disabledKey === key"
        />
        <label
          :class="{
            'wiz-radio__label': true,
            'wiz-radio__label--disabled': disabled || disabledKey === key,
          }"
          :for="`radio${key}`"
        >
          {{ option.label }}
        </label>
      </div>
    </WizStack>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import WizStack from "@/components/base/stack/stack.vue";
import { THEME } from "@/constants/styles";
import { SpacingKeys } from "@/types/styles/spacing";

import { RadioOption } from "./types";

interface Props {
  options: RadioOption[];
  value: number;
  disabled?: boolean;
  disabledKey: number;
  direction?: "horizontal" | "vertical";
  gap: SpacingKeys;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  direction: "horizontal",
  gap: "xl",
});

interface Emit {
  (e: "input", value: number): void;
}

const emit = defineEmits<Emit>();

const radioValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const colorWhite800 = THEME.color.white["800"];
const colorGray400 = THEME.color.gray["400"];
const colorGray600 = THEME.color.gray["600"];
const colorGreen800 = THEME.color.green["800"];
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingSm = THEME.spacing.sm;
const spacingMd = THEME.spacing.md;
const spacingMax = THEME.spacing.max;
</script>

<style lang="scss" scoped>
$border-width: 1px;

.wiz-radio {
  width: fit-content;

  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;

    &:checked {
      + .wiz-radio__label {
        position: relative;
        color: v-bind(colorGreen800);

        &:before {
          border: $border-width solid v-bind(colorGreen800);
        }

        &:after {
          position: absolute;
          content: "";
          width: v-bind(spacingXs);
          height: v-bind(spacingXs);
          left: v-bind(spacingXs2);
          background: v-bind(colorGreen800);
          border-radius: v-bind(spacingMax);
        }
      }
    }
  }

  &__label {
    display: flex;
    align-items: center;
    color: v-bind(colorGray600);
    gap: v-bind(spacingSm);
    cursor: pointer;

    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &:before {
      content: "";
      background: v-bind(colorWhite800);
      border: $border-width solid v-bind(colorGray400);
      border-radius: v-bind(spacingMax);
      width: v-bind(spacingMd);
      height: v-bind(spacingMd);
      box-sizing: border-box;
      display: inline-block;
    }
  }
}
</style>
