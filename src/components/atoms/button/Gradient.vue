<template>
  <button
    :class="{
      'gradient-btn': true,
      'gradient-btn--disabled': disabled,
    }"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { THEME } from "@/constants/styles";

interface Props {
  disabled?: boolean;
}

interface Emits {
  (e: "click"): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const onClick = () => {
  if (!props.disabled) emit("click");
};

const GRADIENT_COLOR = THEME.color.gradient;
</script>

<style lang="scss" scoped>
.gradient-btn {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 9999px;
  background: v-bind(GRADIENT_COLOR);
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &--disabled {
    background: #c0ccc8;
    cursor: not-allowed;
  }
}
</style>
