<template>
  <textarea
    v-model="textValue"
    :placeholder="placeholder"
    :id="id"
    :disabled="disabled"
    :rows="rows"
    :class="[
      textAreaStyle,
      textAreaVariantStyle[disabled ? 'disabled' : 'default'],
      expand && textAreaExpandStyle,
      inputBorderStyle[state],
    ]"
    @focusin="hasFocus = true"
    @focusout="hasFocus = false"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  textAreaStyle,
  textAreaVariantStyle,
  textAreaExpandStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/text-area.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, inject, ref } from "vue";

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
const hasFocus = ref(false);

const state = computed(() => {
  if (isError.value) return "error";
  if (hasFocus.value) return "active";
  return "default";
});
</script>
