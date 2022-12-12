<template>
  <WizHStack class="wiz-radio" gap="xl2">
    <div v-for="(option, key) in options" :key="key">
      <input
        class="wiz-radio__input"
        type="radio"
        :name="`radio${key}`"
        :id="`radio${key}`"
        :value="option.value"
        v-model="radioValue"
        :disabled="disabled"
      />
      <label class="wiz-radio__label" :for="`radio${key}`">
        {{ option.label }}
      </label>
    </div>
  </WizHStack>
</template>

<script setup lang="ts">
import { computed } from "vue";

import WizHStack from "@/components/base/stack/h-stack.vue";
import { THEME } from "@/constants/styles";

interface Option {
  label: string;
  value: number;
}

interface Props {
  options: Option[];
  value: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
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
