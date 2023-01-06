<template>
  <div :class="radioStyle">
    <WizStack :gap="gap" :direction="direction" wrap>
      <div v-for="(option, key) in options" :key="key">
        <input
          :class="radioInputStyle"
          type="radio"
          :name="`radio${key}`"
          :id="`radio${key}`"
          :value="option.value"
          v-model="radioValue"
          :disabled="disabled || disabledKey === key"
        />
        <label
          :class="[
            radioLabelStyle,
            radioValue === option.value && radioLabelCheckedStyle,
            (disabled || disabledKey === key) && radioLabelDisabledStyle,
            radioLabelColorStyle[radioLabelColor(radioValue === option.value)],
            radioLabelCursorStyle[radioLabelCursor(key)],
          ]"
          :for="`radio${key}`"
        >
          {{ option.label }}
        </label>
      </div>
    </WizStack>
  </div>
</template>

<script setup lang="ts">
import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  radioStyle,
  radioInputStyle,
  radioLabelStyle,
  radioLabelCheckedStyle,
  radioLabelDisabledStyle,
  radioLabelColorStyle,
  radioLabelCursorStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/radio-input.css";
import { computed } from "vue";

import WizStack from "@/components/base/stack/stack.vue";

import { RadioOption } from "./types";

interface Props {
  options: RadioOption[];
  modelValue: number;
  disabled?: boolean;
  disabledKey?: number;
  direction?: "horizontal" | "vertical";
  gap?: SpacingKeys;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  direction: "horizontal",
  gap: "xl",
});

interface Emit {
  (e: "update:modelValue", value: number): void;
}

const emit = defineEmits<Emit>();

const radioValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const radioLabelColor = (isChecked: boolean) =>
  isChecked ? "checked" : "default";

const radioLabelCursor = (key: number) =>
  props.disabled || props.disabledKey === key ? "disabled" : "default";
</script>
