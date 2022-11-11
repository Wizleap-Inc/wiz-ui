<template>
  <div class="wiz-password-input">
    <WizTextInput v-model="" />
    <div
      class="wiz-password-input__visible-icon"
      @click="isPasswordVisible = !isPasswordVisible"
    >
      <Eye
        width="md"
        height="xs"
        :color="isPasswordVisible ? ACCENT_COLOR : '#C0CCC8'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import Eye from "@/components/atoms/icons/Eye.vue";
import { WizTextInput } from "@/components/atoms/text-input";
import { THEME } from "@/constants";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  name?: string;
}>();

const isPasswordVisible = ref(false);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const text = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const ACCENT_COLOR = THEME.color.green["800"];
</script>

<style lang="scss" scoped>
.password-input {
  position: relative;
  width: 100%;

  &__visible-icon {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: fit-content;
    width: fit-content;
    padding: 0.5rem;
    cursor: pointer;
  }
}
</style>
