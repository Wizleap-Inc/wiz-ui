<template>
  <input
    :class="{
      'wiz-text-input': true,
      'wiz-text-input--disabled': disabled,
    }"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :value="value"
    @input="onInput"
    :type="type"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { ComponentName, THEME } from "@/constants";

defineOptions({
  name: ComponentName.BaseInput,
});

interface Props {
  value: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  type: "text" | "password";
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: "10rem",
});

interface Emit {
  (e: "input", value: string): void;
}

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
const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>

<style lang="scss" scoped>
.wiz-text-input {
  border: 1px solid v-bind(grey400);
  border-radius: v-bind(spacingXs2);
  padding: v-bind(spacingXs) v-bind(spacingMd);
  font-size: v-bind(fontSizeSm);
  line-height: 1.5;
  color: v-bind(grey700);
  box-sizing: border-box;
  width: v-bind(computedWidth);

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
}
</style>
