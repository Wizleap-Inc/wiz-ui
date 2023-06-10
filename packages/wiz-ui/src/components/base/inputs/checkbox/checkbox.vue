<template>
  <div :class="checkboxStyle">
    <WizStack :gap="gap" :direction="direction" wrap>
      <div v-for="option in options" :key="option.key">
        <label
          :class="[
            checkboxLabelStyle,
            checkboxValue.includes(option.value) && checkboxLabelCheckedStyle,
            (disabled || option.disabled) && checkboxLabelDisabledStyle,
            checkboxLabelCursorStyle[labelPointer(option.disabled)],
          ]"
          :for="option.key"
        >
          <input
            :class="checkboxInputStyle"
            type="checkbox"
            :id="option.key"
            :name="option.key"
            :value="option.value"
            v-model="checkboxValue"
            :disabled="disabled || option.disabled"
            @focus="focusOption = option.value"
            @blur="focusOption = null"
          />
          <span :class="checkboxIconContainerStyle">
            <WizICheck
              :class="[
                checkboxIconBaseStyle,
                checkboxValue.includes(option.value)
                  ? checkboxIconVariantStyle['checked']
                  : checkboxIconVariantStyle['default'],
                checkboxLabelFocusStyle(option.value),
              ]"
            />
          </span>
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
import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  checkboxStyle,
  checkboxInputStyle,
  checkboxLabelStyle,
  checkboxLabelCheckedStyle,
  checkboxLabelDisabledStyle,
  checkboxLabelCursorStyle,
  checkboxIconBaseStyle,
  checkboxBlockCheckedStyle,
  checkboxLabelStrikeThrough,
  checkboxIconVariantStyle,
  checkboxIconFocusedColorStyle,
  checkboxIconContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import { computed, PropType, ref } from "vue";

import { WizStack } from "@/components";
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
  (e: "input", value: number[]): void;
}
const emit = defineEmits<Emit>();

const checkboxValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const labelPointer = (optionDisabled?: boolean) =>
  props.disabled || optionDisabled ? "disabled" : "default";

const focusOption = ref<number | null>(null);

const value2Option = computed(() =>
  props.options.reduce((acc, option) => {
    acc[option.value] = option;
    return acc;
  }, {} as Record<number, CheckBoxOption>)
);
const checkboxLabelFocusStyle = computed(() => (n: number) => {
  if (props.disabled || value2Option.value[n].disabled) return;
  if (focusOption.value !== n) return;
  return checkboxValue.value.includes(n)
    ? checkboxIconFocusedColorStyle["checked"]
    : checkboxIconFocusedColorStyle["default"];
});
</script>
