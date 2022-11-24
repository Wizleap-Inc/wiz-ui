<template>
  <WizHStack align="center" gap="xs">
    <WizTextArea
      v-model="textValue"
      :placeholder="placeholder"
      name="chat-form__textarea"
      :disabled="disabled"
      expand
    />
    <div>
      <WizIconButton :icon="WizISend" :disabled="disabled" @click="onSubmit" />
    </div>
  </WizHStack>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { WizHStack, WizIconButton, WizTextArea } from "@/components/atoms";
import { WizISend } from "@/components/icons";

interface Props {
  disabled?: boolean;
  placeholder?: string;
  value: string;
}

const props = defineProps<Props>();

interface Emit {
  (e: "input", value: string): void;
  (e: "submit"): void;
}
const emits = defineEmits<Emit>();

const value = ref("");
const textValue = computed({
  get: () => props.value,
  set: (value) => emits("input", value),
});

const onSubmit = () => emits("submit");
</script>
