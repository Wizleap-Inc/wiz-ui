<template>
  <div :class="checkboxStyle">
    <WizStack :gap="gap" :direction="direction" wrap>
      <div
        v-for="(option, i) in options"
        :key="option.key"
        ref="radioRefs"
        :style="{
          width: `${radioWidths[i]}px`,
        }"
      >
        <label
          :class="[
            checkboxLabelStyle,
            checkboxValue.includes(option.value) && checkboxLabelCheckedStyle,
            (disabled || option.disabled) && checkboxLabelDisabledStyle,
            checkboxLabelCursorStyle[labelPointer(option.disabled)],
          ]"
          :for="option.key"
          @mouseenter="hoverOption = option.value"
          @mouseleave="hoverOption = null"
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
            @blur="
              () => {
                if (hoverOption === option.value) focusOption = null;
              }
            "
          />
          <span :class="checkboxIconContainerStyle">
            <WizICheck
              :class="[
                checkboxIconBaseStyle,
                checkboxIconVariantStyle[iconStyle(option.value)],
              ]"
            />
          </span>
          <span
            :class="[
              checkboxValue.includes(option.value) && checkboxBlockCheckedStyle,
              strikeThrough &&
                checkboxValue.includes(option.value) &&
                checkboxLabelStrikeThrough,
              hoverOption === option.value &&
                !disabled &&
                !option.disabled &&
                checkboxHoverStyle,
            ]"
          >
            {{ option.label }}
          </span>
        </label>
      </div>
    </WizStack>
  </div>
</template>

<script setup lang="ts">
import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  checkboxBlockCheckedStyle,
  checkboxHoverStyle,
  checkboxIconBaseStyle,
  checkboxIconContainerStyle,
  checkboxIconVariantStyle,
  checkboxInputStyle,
  checkboxLabelCheckedStyle,
  checkboxLabelCursorStyle,
  checkboxLabelDisabledStyle,
  checkboxLabelStrikeThrough,
  checkboxLabelStyle,
  checkboxStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import { PropType, computed, onMounted, ref, watch } from "vue";

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
const hoverOption = ref<number | null>(null);

const radioRefs = ref<HTMLElement[]>([]);
const radioWidths = ref<number[]>([]);
onMounted(() => {
  radioWidths.value = radioRefs.value.map(
    (ref) => ref.getBoundingClientRect().width
  );
});
watch(
  [props.options, radioRefs],
  () =>
    (radioWidths.value = radioRefs.value.map(
      (ref) => ref.getBoundingClientRect().width
    ))
);

const value2Option = computed(() =>
  props.options.reduce((acc, option) => {
    acc[option.value] = option;
    return acc;
  }, {} as Record<number, CheckBoxOption>)
);

const iconStyle = (value: number) => {
  if (props.disabled || value2Option.value[value].disabled) return "default";
  const isChecked = checkboxValue.value.includes(value);
  const isFocused = focusOption.value === value;
  if (isChecked && isFocused) return "checkedFocused";
  if (isChecked) return "checked";
  if (isFocused) return "focused";
  return "default";
};
</script>
