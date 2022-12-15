<template>
  <WizHStack align="center" gap="xs">
    <WizTextArea
      v-model="textValue"
      :placeholder="placeholder"
      name="chat-form__textarea"
      :disabled="disabled"
      :rows="formRows"
      expand
    />
    <div>
      <WizIconButton :icon="WizISend" :disabled="disabled" @click="onSubmit" />
    </div>
  </WizHStack>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { computed } from "vue";

import { WizHStack, WizIconButton, WizTextArea, WizISend } from "@/components";

defineOptions({
  name: ComponentName.ChatForm,
});

interface Props {
  disabled?: boolean;
  placeholder?: string;
  value: string;
  formRows?: number;
}

const props = defineProps<Props>();

interface Emit {
  (e: "input", value: string): void;
  (e: "submit"): void;
}
const emits = defineEmits<Emit>();

const textValue = computed({
  get: () => props.value,
  set: (value) => emits("input", value),
});

const onSubmit = () => emits("submit");
</script>
