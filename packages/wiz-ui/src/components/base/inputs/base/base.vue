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
    v-model="textValue"
    :type="type"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  baseInputStyle,
  baseInputDisabledStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/base-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, ref } from "vue";

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
  error?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: "10rem",
});

interface Emit {
  (e: "input", value: string): void;
}

const emit = defineEmits<Emit>();

const textValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const hasFocus = ref(false);

const computedWidth = computed(() => (props.expand ? "100%" : props.width));

const state = computed(() => {
  if (props.error) return "error";
  if (hasFocus.value) return "active";
  return "default";
});
</script>
