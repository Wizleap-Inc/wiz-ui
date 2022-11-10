<template>
  <input
    :class="{
      'wiz-input': true,
      'wiz-input--disabled': disabled,
      'wiz-input--expand': expand,
    }"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :value="value"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { THEME } from "@/constants";
interface Props {
  value: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  expand?: boolean;
}
interface Emit {
  (e: "input", value: string): void;
}
defineProps<Props>();
const emit = defineEmits<Emit>();
const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("input", target.value);
};
const fontSizeSm = THEME.fontSize.sm;
const green800 = THEME.color.green["800"];
const grey300 = THEME.color.gray["300"];
const grey400 = THEME.color.gray["400"];
const grey700 = THEME.color.gray["700"];
const grey500 = THEME.color.gray["500"];
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingMd = THEME.spacing.md;
</script>

<style lang="scss" scoped>
.wiz-input {
  border: 1px solid v-bind(grey400);
  border-radius: v-bind(spacingXs2);
  padding: v-bind(spacingXs) v-bind(spacingMd);
  font-size: v-bind(fontSizeSm);
  line-height: 1.5;
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
    cursor: not-allowed;
  }
  &--expand {
    width: calc(100% - 2 * v-bind(spacingMd));
  }
}
</style>
