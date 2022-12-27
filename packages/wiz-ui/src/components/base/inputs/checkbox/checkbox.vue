<template>
  <div :class="checkboxStyle">
    <WizStack :gap="gap" :direction="direction" wrap>
      <div v-for="(option, key) in options" :key="key">
        <input
          :class="checkboxInputStyle"
          type="checkbox"
          :id="`checkbox${key}`"
          :name="`checkbox${key}`"
          :value="option.value"
          v-model="checkboxValue"
          :disabled="disabled || disabledKey === key"
        />
        <label
          :class="[
            checkboxLabelStyle,
            checkboxValue.includes(option.value) && checkboxLabelCheckedStyle,
            (disabled || disabledKey === key) && checkboxLabelDisabledStyle,
          ]"
          :for="`checkbox${key}`"
          :style="{ cursor: labelPointer(key) }"
        >
          <span
            :class="[
              checkboxBlockStyle,
              checkboxValue.includes(option.value) && checkboxBlockCheckedStyle,
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
  checkboxBlockStyle,
  checkboxBlockCheckedStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import { computed } from "vue";

import WizStack from "@/components/base/stack/stack.vue";

import { CheckBoxOption } from "./types";

interface Props {
  options: CheckBoxOption[];
  value: number[];
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
  (e: "input", value: number[]): void;
}
const emit = defineEmits<Emit>();

const checkboxValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const labelPointer = (key: number) => {
  if (props.disabled || props.disabledKey === key) return "not-allowed";
  return "pointer";
};
</script>
