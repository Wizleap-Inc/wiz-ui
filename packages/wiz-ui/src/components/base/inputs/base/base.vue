<template>
  <input
    :class="[baseInputStyle, disabled && baseInputDisabledStyle]"
    :style="{ width: computedWidth }"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :value="value"
    @input="onInput"
    :type="type"
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

const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>
