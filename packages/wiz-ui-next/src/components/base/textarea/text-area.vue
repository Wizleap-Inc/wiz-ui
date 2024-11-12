<template>
  <textarea
    v-model="textValue"
    :placeholder="placeholder"
    :id="id"
    :disabled="disabled"
    :rows="rows"
    :class="[
      textAreaStyle,
      expand && textAreaExpandStyle,
      inputBorderStyle[state],
    ]"
    :style="{ resize, maxWidth, minWidth, maxHeight, minHeight }"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  textAreaExpandStyle,
  textAreaStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, inject } from "vue";

import { formControlKey } from "@/hooks/use-form-control-provider";

defineOptions({
  name: ComponentName.TextArea,
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
  rows: {
    type: Number,
    required: false,
    default: 3,
  },
  resize: {
    type: String as PropType<"none" | "both" | "horizontal" | "vertical">,
    default: "none",
  },
  maxWidth: {
    type: String,
    required: false,
  },
  minWidth: {
    type: String,
    required: false,
  },
  maxHeight: {
    type: String,
    required: false,
  },
  minHeight: {
    type: String,
    required: false,
  },
});

interface Emit {
  (e: "update:modelValue", value: string): void;
}

const emit = defineEmits<Emit>();

const textValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const state = computed(() => {
  if (isError.value) return "error";
  return "default";
});
</script>
