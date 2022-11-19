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
const grey300 = THEME.color.gray["300"];
const grey400 = THEME.color.gray["400"];
const grey700 = THEME.color.gray["700"];
const grey500 = THEME.color.gray["500"];
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
</script>

<style lang="scss" scoped>
.wiz-text-area {
  resize: none;
  border: 1px solid v-bind(grey400);
  border-radius: v-bind(spacingXs2);
  padding: v-bind(spacingXs);
  font-size: v-bind(fontSizeSm);
  line-height: 1.5;
  height: calc(1.5em * v-bind(rows));
  color: v-bind(grey700);

  &::placeholder {
    color: v-bind(grey500);
  }

  &:focus {
    outline: none;
    border-color: v-bind(green800);
  }

  &--disabled {
    background-color: v-bind(grey300);
    color: v-bind(grey500);
    cursor: not-allowed;

    &::placeholder {
      color: v-bind(grey500);
    }
  }

  &--expand {
    width: calc(100% - 2 * v-bind(spacingXs));
  }
}
</style>
