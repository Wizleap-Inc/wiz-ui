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
      <WizIconButton
        :icon="WizISend"
        :disabled="disabled"
        :aria-label="ARIA_LABELS.CHAT_FORM.SEND"
        @click="onSubmit"
      />
    </div>
  </WizHStack>
</template>

<script setup lang="ts">
import { ComponentName, ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { computed } from "vue";

import { WizHStack, WizIconButton, WizTextArea, WizISend } from "@/components";

defineOptions({
  name: ComponentName.ChatForm,
});

const props = defineProps({
  disabled: {
    type: Boolean,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    required: true,
  },
  formRows: {
    type: Number,
    required: false,
  },
});

interface Emit {
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
}
const emits = defineEmits<Emit>();

const textValue = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

const onSubmit = () => emits("submit");
</script>
