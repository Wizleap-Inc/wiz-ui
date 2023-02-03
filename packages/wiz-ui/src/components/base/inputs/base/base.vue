<template>
  <input
    :class="[
      baseInputStyle,
      baseInputPaddingStyle[spaceType],
      disabled && baseInputDisabledStyle,
      inputBorderStyle[state],
    ]"
    :style="{ width: computedWidth }"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="type"
    @focusin="hasFocus = true"
    @focusout="hasFocus = false"
    v-model="textValue"
    :id="id"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  baseInputStyle,
  baseInputDisabledStyle,
  baseInputPaddingStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/base-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, PropType, ref } from "vue";

defineOptions({
  name: ComponentName.BaseInput,
});

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  value: {
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
  spaceType: {
    type: String as PropType<"left" | "right" | "both" | "none">,
    required: false,
    default: "none",
  },
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
