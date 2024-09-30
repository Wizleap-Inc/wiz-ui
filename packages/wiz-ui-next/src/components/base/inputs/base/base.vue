<template>
  <input
    :class="[
      baseInputStyle,
      baseInputPaddingStyle[spaceType],
      inputBorderStyle[state],
    ]"
    :style="{ width: computedWidth }"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="type"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    v-model="textValue"
    :id="id"
    :autocomplete="autocomplete"
  />
</template>

<script setup lang="ts">
import { AutoCompleteKeys, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  baseInputPaddingStyle,
  baseInputStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/base-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed } from "vue";

defineOptions({
  name: ComponentName.BaseInput,
});

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  modelValue: {
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
  autocomplete: {
    type: String as PropType<AutoCompleteKeys>,
    required: false,
    default: "off",
  },
});

interface Emit {
  (e: "update:modelValue", value: string): void;
  (e: "focusin", value: FocusEvent): void;
  (e: "focusout", value: FocusEvent): void;
}

const emit = defineEmits<Emit>();

const textValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const computedWidth = computed(() => (props.expand ? "100%" : props.width));

const state = computed(() => {
  if (props.error) return "error";
  return "default";
});

const onFocusIn = (e: FocusEvent) => {
  emit("focusin", e);
};
const onFocusOut = (e: FocusEvent) => {
  emit("focusout", e);
};
</script>
