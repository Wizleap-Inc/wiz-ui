<template>
  <input
    :class="[baseInputStyle, disabled && baseInputDisabledStyle]"
    :style="{ width: computedWidth }"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :type="type"
    v-model="value"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  baseInputStyle,
  baseInputDisabledStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/base-input.css";
import { computed } from "vue";

defineOptions({
  name: ComponentName.BaseInput,
});

interface Props {
  modelValue: string;
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
  (e: "update:modelValue", value: string): void;
}

const emit = defineEmits<Emit>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>
