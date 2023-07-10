<template>
  <div :class="radioStyle">
    <WizStack :gap="gap" :direction="direction" wrap>
      <div v-for="option in options" :key="option.key">
        <input
          :class="radioInputStyle"
          type="radio"
          :name="option.key"
          :id="option.key"
          :value="option.value"
          v-model="radioValue"
          :disabled="disabled || option.disabled"
          @focus="focusOption = option.value"
          @blur="focusOption = null"
        />
        <label
          :class="[
            radioLabelStyle,
            radioValue === option.value && radioLabelCheckedStyle,
            (disabled || option.disabled) && radioLabelDisabledStyle,
            radioLabelColorStyle[radioLabelColor(option.value)],
            radioLabelCursorStyle[radioLabelCursor(option.disabled)],
            strikeThrough &&
              radioValue === option.value &&
              radioLabelStrikeThrough,
          ]"
          :for="option.key"
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
  radioLabelStrikeThrough,
} from "@wizleap-inc/wiz-ui-styles/bases/radio-input.css";
import { computed, PropType, ref } from "vue";

import WizStack from "@/components/base/stack/stack.vue";

import { RadioOption } from "./types";

const props = defineProps({
  options: {
    type: Array as PropType<RadioOption[]>,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  direction: {
    type: String as PropType<"horizontal" | "vertical">,
    required: false,
    default: "horizontal",
  },
  gap: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "xl",
  },
  strikeThrough: {
    type: Boolean,
    required: false,
    default: false,
  },
});

interface Emit {
  (e: "update:modelValue", value: number): void;
}

const focusOption = ref<number | null>(null);

const emit = defineEmits<Emit>();

const radioValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const radioLabelColor = (value: number) => {
  if (radioValue.value === value) return "checked";
  if (focusOption.value === value) return "focused";
  return "default";
};

const radioLabelCursor = (optionDisabled?: boolean) =>
  props.disabled || optionDisabled ? "disabled" : "default";
</script>
