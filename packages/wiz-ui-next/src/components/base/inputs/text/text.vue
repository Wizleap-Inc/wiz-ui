<template>
  <PrivateBaseInput
    v-model="value"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :expand="expand"
    :width="width"
    type="text"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { computed } from "vue";

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
</script>
