<template>
  <div :class="checkboxStyle">
    <WizStack :gap="gap" :direction="direction" wrap>
      <div v-for="option in options" :key="option.key">
        <input
          :class="checkboxInputStyle"
          type="checkbox"
          :id="option.key"
          :name="option.key"
          :value="option.value"
          v-model="checkboxValue"
          :disabled="disabled || option.disabled"
        />
        <label
          :class="[
            checkboxLabelStyle,
            checkboxValue.includes(option.value) && checkboxLabelCheckedStyle,
            (disabled || option.disabled) && checkboxLabelDisabledStyle,
            checkboxLabelCursorStyle[labelPointer(option.disabled)],
          ]"
          :for="option.key"
        >
          <WizICheck
            v-if="checkboxValue.includes(option.value)"
            :class="checkboxIconStyle"
          />
          <span
            :class="[
              checkboxValue.includes(option.value) && checkboxBlockCheckedStyle,
              strikeThrough &&
                checkboxValue.includes(option.value) &&
                checkboxLabelStrikeThrough,
            ]"
            >{{ option.label }}</span
          >
        </label>
      </div>
    </WizStack>
  </div>
</template>

<script setup lang="ts">
import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants/styles/spacing";
import {
  checkboxStyle,
  checkboxInputStyle,
  checkboxLabelStyle,
  checkboxLabelCheckedStyle,
  checkboxLabelDisabledStyle,
  checkboxLabelCursorStyle,
  checkboxIconStyle,
  checkboxBlockCheckedStyle,
  checkboxLabelStrikeThrough,
} from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import { computed, PropType } from "vue";

import WizStack from "@/components/base/stack/stack.vue";
import { WizICheck } from "@/components/icons";

import { CheckBoxOption } from "./types";

const props = defineProps({
  options: {
    type: Array as PropType<CheckBoxOption[]>,
    required: true,
  },
  value: {
    type: Array as PropType<number[]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
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
  (e: "input", value: number[]): void;
}
const emit = defineEmits<Emit>();

const checkboxValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const labelPointer = (optionDisabled?: boolean) =>
  props.disabled || optionDisabled ? "disabled" : "default";
</script>
