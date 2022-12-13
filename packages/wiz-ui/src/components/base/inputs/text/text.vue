<template>
  <PrivateBaseInput
    v-model="textValue"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :expand="expand"
    :width="width"
    type="text"
  />
</template>

<script setup lang="ts">
import { ComponentName } from "@wiz-ui/constants/component/name";
import { computed } from "vue";

import { PrivateBaseInput } from "../base";

defineOptions({
  name: ComponentName.TextInput,
});
interface Props {
  value: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  width?: string;
}

const props = defineProps<Props>();

interface Emit {
  (e: "input", value: string): void;
}

const emit = defineEmits<Emit>();

const textValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});
</script>
