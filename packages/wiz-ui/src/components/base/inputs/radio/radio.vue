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
        />
        <label
          :class="[
            radioLabelStyle,
            radioValue === option.value && radioLabelCheckedStyle,
            (disabled || option.disabled) && radioLabelDisabledStyle,
            radioLabelColorStyle[radioLabelColor(radioValue === option.value)],
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
import { computed, PropType } from "vue";

import WizStack from "@/components/base/stack/stack.vue";

import { RadioOption } from "./types";

const props = defineProps({
  options: {
    type: Array as PropType<RadioOption[]>,
    required: true,
  },
  value: {
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
  (e: "input", value: number): void;
}

const emit = defineEmits<Emit>();

const radioValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const radioLabelColor = (isChecked: boolean) =>
  isChecked ? "checked" : "default";

const radioLabelCursor = (optionDisabled?: boolean) =>
  props.disabled || optionDisabled ? "disabled" : "default";
</script>
