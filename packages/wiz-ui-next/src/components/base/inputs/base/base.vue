<template>
  <input
    :class="[
      baseInputStyle,
      disabled && baseInputDisabledStyle,
      inputBorderStyle[state],
    ]"
    :style="{ width: computedWidth }"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :type="type"
    @focusin="hasFocus = true"
    @focusout="hasFocus = false"
    v-model="value"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  baseInputStyle,
  baseInputDisabledStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/base-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, ref, PropType } from "vue";

defineOptions({
  name: ComponentName.BaseInput,
});

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  expand: {
    type: Boolean,
    required: false,
  },
  type: {
    type: String as PropType<"text" | "password">,
    required: false,
  },
  width: {
    type: String,
    required: false,
    default: "10rem",
  },
  error: {
    type: Boolean,
    required: false,
  },
});

interface Emit {
  (e: "update:modelValue", value: string): void;
}

const emit = defineEmits<Emit>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const hasFocus = ref(false);

const computedWidth = computed(() => (props.expand ? "100%" : props.width));

const state = computed(() => {
  if (props.error) return "error";
  if (hasFocus.value) return "active";
  return "default";
});
</script>
