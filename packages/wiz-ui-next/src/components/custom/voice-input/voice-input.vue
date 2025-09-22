<template>
  <label
    :class="[
      voiceInputStyle,
      expand && voiceInputExpandStyle,
      disabled && voiceInputDisabledStyle,
      inputBorderStyle[state],
    ]"
    :style="{ maxWidth, minWidth }"
  >
    <textarea
      v-model="textValue"
      name="voice-input"
      :placeholder="computedPlaceholder"
      :disabled="disabled"
      :rows="rows"
      :style="{ resize }"
      :class="[voiceInputTextAreaStyle]"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <button
      type="button"
      :class="voiceInputButtonStyle"
      :disabled="disabled"
      :aria-label="isListening ? '音声入力を停止' : '音声入力を開始'"
      @click="onMicClick"
    >
      <WizIcon
        :icon="micDisabled || disabled ? WizIMicOffFilled : WizIMicBold"
        :color="micColor"
      />
    </button>
  </label>
</template>

<script setup lang="ts">
import { WizIcon, WizIMicBold, WizIMicOffFilled } from "@/components";
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  voiceInputExpandStyle,
  voiceInputStyle,
  voiceInputTextAreaStyle,
  voiceInputDisabledStyle,
  voiceInputButtonStyle,
} from "@wizleap-inc/wiz-ui-styles/customs/voice-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, inject, ref } from "vue";

import { formControlKey } from "@/hooks/use-form-control-provider";

defineOptions({
  name: ComponentName.VoiceInput,
});

const textValue = defineModel<string>({ required: true });

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  micDisabled: {
    type: Boolean,
    required: false,
    default: false,
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
  isListening: {
    type: Boolean,
    required: false,
    default: false,
  },
});

interface Emit {
  (e: "micClick"): void;
}

const emit = defineEmits<Emit>();

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

// Focus state
const isFocused = ref(false);

const state = computed(() => {
  if (isError.value) return "error";
  if (props.isListening || isFocused.value) return "active";
  return "default";
});

const micColor = computed(() => {
  if (props.isListening) return "green.800";
  if (props.micDisabled || props.disabled) return "gray.500";

  return "gray.800";
});

const computedPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder;
  return props.disabled
    ? "入力できません"
    : props.placeholder || "入力してください";
});

const onMicClick = () => {
  if (props.disabled) return;
  emit("micClick");
};
</script>
