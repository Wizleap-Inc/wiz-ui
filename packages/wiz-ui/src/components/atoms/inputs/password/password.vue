<template>
  <div
    :class="{
      'wiz-password-input': true,
      'wiz-password-input--expand': expand,
    }"
  >
    <PrivateBaseInput
      v-model="passwordValue"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :expand="expand"
      :type="isPasswordVisible ? 'text' : 'password'"
    />
    <div
      :class="{
        'wiz-password-input__visible-icon': true,
        'wiz-password-input__visible-icon--active': isPasswordVisible,
      }"
      @click="isPasswordVisible = !isPasswordVisible"
    >
      <Eye />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { PrivateBaseInput } from "@/components/atoms/inputs/base";
import Eye from "@/components/icons/eye.vue";
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

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const isPasswordVisible = ref(false);

const passwordValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const accentColor = THEME.color.green["800"];
const defaultColor = THEME.color.gray["400"];
const fontSizeXl2 = THEME.fontSize.xl2;
const spacingSm = THEME.spacing.sm;
</script>

<style lang="scss" scoped>
.wiz-password-input {
  position: relative;
  width: fit-content;

  &--expand {
    width: 100%;
  }

  &__visible-icon {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: v-bind(fontSizeXl2);
    line-height: v-bind(fontSizeXl2);
    width: v-bind(fontSizeXl2);
    height: v-bind(fontSizeXl2);
    padding: v-bind(spacingSm);

    fill: v-bind(defaultColor);
    &--active > svg {
      fill: v-bind(accentColor);
    }
  }
}
</style>
