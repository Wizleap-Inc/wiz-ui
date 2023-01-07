<template>
  <PrivateBaseInput
    v-model="value"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :expand="expand"
    :width="width"
    :error="isError"
    type="text"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { computed, inject } from "vue";

import { formControlKey } from "@/hooks/use-form-control-provider";

import { PrivateBaseInput } from "../base";

defineOptions({
  name: ComponentName.TextInput,
});

interface Props {
  modelValue: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  width?: string;
}

const props = defineProps<Props>();

interface Emit {
  (e: "update:modelValue", value: string): void;
}

const emit = defineEmits<Emit>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));
</script>
