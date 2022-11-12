<template>
  <PrivateBaseInput
    v-model="textValue"
    :placeholder="placeholder"
    :name="name"
    :disabled="disabled"
    :expand="expand"
    type="text"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { PrivateBaseInput } from "@/components/atoms/inputs/base";

interface Props {
  value: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  expand?: boolean;
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
