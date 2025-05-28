<template>
  <WizPopupContainer :width="computedWidth">
    <div
      :class="[
        selectBoxStyle,
        inputBorderStyle[state],
        disabled && selectBoxDisabledStyle,
        selectBoxCursorStyle[selectBoxCursor],
      ]"
      style="width: 100%"
    >
      <div :class="selectBoxInnerBoxStyles[variant]" @click="toggleSelectBox">
        <WizHStack align="center" justify="between" height="100%">
          <span v-if="!isValueMatched" :class="selectBoxPlaceholderStyle">{{
            placeholder
          }}</span>
          <span
            v-if="selectedOption"
            :class="selectBoxInnerBoxSelectedValueStyle"
          >
            {{ selectedOption.label }}
            {{
              showExLabel && selectedOption.exLabel
                ? " " + selectedOption.exLabel
                : ""
            }}
          </span>
          <WizIExpandLess
            v-if="openSelectBox"
            :class="selectBoxInnerBoxLessStyle"
          />
          <WizIExpandMore
            v-else-if="!openSelectBox"
            :class="selectBoxInnerBoxMoreStyle"
          />
        </WizHStack>
      </div>
    </div>
    <WizPopup
      :isOpen="openSelectBox"
      @onClose="openSelectBox = false"
      :isDirectionFixed="isDirectionFixed"
    >
      <div
        :class="selectBoxSelectorStyle"
        :style="{ minWidth: width, maxHeight: dropdownMaxHeight }"
      >
        <WizVStack>
          <button
            type="button"
            :class="selectBoxSelectorOptionStyle"
            :disabled="option.disabled"
            v-for="(option, key) in options"
            :key="'option' + key"
            :aria-label="`selectbox-${option.label}`"
            @click="onSelect(option.value)"
          >
            <span>
              {{ option.label }}
            </span>
            <span v-if="option.exLabel">
              {{ option.exLabel }}
            </span>
          </button>
        </WizVStack>
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts" generic="T = number">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  selectBoxCursorStyle,
  selectBoxDisabledStyle,
  selectBoxInnerBoxLessStyle,
  selectBoxInnerBoxMoreStyle,
  selectBoxInnerBoxSelectedValueStyle,
  selectBoxInnerBoxStyles,
  selectBoxPlaceholderStyle,
  selectBoxSelectorOptionStyle,
  selectBoxSelectorStyle,
  selectBoxStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/selectbox-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, inject, ref } from "vue";

import { WizPopup, WizPopupContainer } from "@/components";
import { WizIExpandLess, WizIExpandMore } from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { WizHStack, WizVStack } from "../../stack";

import { SelectBoxOption } from "./types";

defineOptions({
  name: ComponentName.SelectBox,
});

type Props<T> = {
  options: SelectBoxOption<T>[];
  modelValue: T;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  /**
   * @deprecated このプロパティは将来のバージョンで削除される予定です。代わりに `width="100%"` を使用してください。
   */
  expand?: boolean;
  isOpen?: boolean;
  isDirectionFixed?: boolean;
  showExLabel?: boolean;
  dropdownMaxHeight?: string;
  variant?: "regular" | "mini";
};

const props = withDefaults(defineProps<Props<T>>(), {
  placeholder: "選択してください",
  width: "10rem",
  disabled: false,
  expand: false,
  isOpen: false,
  isDirectionFixed: false,
  showExLabel: false,
  variant: "regular",
});

const openSelectBox = ref(props.isOpen);
const toggleSelectBox = () => {
  if (props.disabled) {
    return;
  }
  openSelectBox.value = !openSelectBox.value;
};

const emit = defineEmits<{ "update:modelValue": [value: T] }>();

const onSelect = (value: T) => {
  toggleSelectBox();
  emit("update:modelValue", value);
};

const selectBoxCursor = computed(() =>
  props.disabled ? "disabled" : "default"
);

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const computedWidth = computed(() => (props.expand ? "100%" : props.width));

const state = computed(() => {
  if (isError.value) return "error";
  if (openSelectBox.value) return "active";
  return "default";
});

const isValueMatched = computed(() => {
  return props.options.some((option) => option.value === props.modelValue);
});

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.modelValue);
});
</script>
