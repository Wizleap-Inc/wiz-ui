<template>
  <textarea
    v-model="textValue"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :class="{
      'wiz-text-area': true,
      'wiz-text-area--disabled': disabled,
      'wiz-text-area--expand': expand,
    }"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { THEME } from "@/constants";

interface Props {
  value: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
});

interface Emit {
  (e: "input", value: string): void;
}

const emit = defineEmits<Emit>();

const textValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const fontSizeSm = THEME.fontSize.sm;
const green800 = THEME.color.green["800"];
const gray300 = THEME.color.gray["300"];
const gray400 = THEME.color.gray["400"];
const gray700 = THEME.color.gray["700"];
const gray500 = THEME.color.gray["500"];
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
</script>

<style lang="scss" scoped>
.wiz-text-area {
  resize: none;
  border: 1px solid v-bind(gray400);
  border-radius: v-bind(spacingXs2);
  padding: v-bind(spacingXs);
  font-size: v-bind(fontSizeSm);
  line-height: 1.5;
  height: calc(1.5em * v-bind(rows));
  color: v-bind(gray700);

  &::placeholder {
    color: v-bind(gray500);
  }

  &:focus {
    outline: none;
    border-color: v-bind(green800);
  }

  &--disabled {
    background-color: v-bind(gray300);
    color: v-bind(gray500);
    cursor: not-allowed;
  }

  &--expand {
    width: calc(100% - 2 * v-bind(spacingXs));
  }
}
</style>
