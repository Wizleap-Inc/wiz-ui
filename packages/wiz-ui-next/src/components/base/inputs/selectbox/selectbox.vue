<template>
  <WizPopupContainer :expand="expand">
    <div
      :class="[
        selectBoxStyle,
        inputBorderStyle[state],
        disabled && selectBoxDisabledStyle,
        selectBoxCursorStyle[selectBoxCursor],
      ]"
      :style="{ width: computedWidth }"
    >
      <div :class="selectBoxInnerBoxStyle" @click="toggleSelectBox">
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
        <WizVStack gap="xs2">
          <div
            :class="selectBoxSelectorOptionStyle"
            v-for="(option, key) in options"
            :key="'option' + key"
            @click="onSelect(option.value)"
          >
            <span>
              {{ option.label }}
            </span>
            <span v-if="option.exLabel">
              {{ option.exLabel }}
            </span>
          </div>
        </WizVStack>
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  selectBoxCursorStyle,
  selectBoxDisabledStyle,
  selectBoxInnerBoxLessStyle,
  selectBoxInnerBoxMoreStyle,
  selectBoxInnerBoxSelectedValueStyle,
  selectBoxInnerBoxStyle,
  selectBoxPlaceholderStyle,
  selectBoxSelectorOptionStyle,
  selectBoxSelectorStyle,
  selectBoxStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/selectbox-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, inject, ref } from "vue";

import { WizPopup, WizPopupContainer } from "@/components";
import { WizIExpandLess, WizIExpandMore } from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { WizHStack, WizVStack } from "../../stack";

import { SelectBoxOption } from "./types";

defineOptions({
  name: ComponentName.SelectBox,
});

const props = defineProps({
  options: {
    type: Array as PropType<SelectBoxOption[]>,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "選択してください",
  },
  width: {
    type: String,
    required: false,
    default: "10rem",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  expand: {
    type: Boolean,
    required: false,
  },
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDirectionFixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  showExLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
  dropdownMaxHeight: {
    type: String,
    required: false,
  },
});

const openSelectBox = ref(props.isOpen);
const toggleSelectBox = () => {
  if (props.disabled) {
    return;
  }
  openSelectBox.value = !openSelectBox.value;
};

interface Emit {
  (e: "update:modelValue", value: number): void;
}
const emit = defineEmits<Emit>();

const onSelect = (value: number) => {
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
