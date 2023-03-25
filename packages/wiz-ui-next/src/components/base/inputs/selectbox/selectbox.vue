<template>
  <WizPopupContainer :expand="expand">
    <div
      :tabIndex="0"
      @keyup.up="onKeyUp"
      @keyup.down="onKeyDown"
      @blur="onBlur"
      @keyup.enter="onSelect(currentSelectOption + 1)"
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
            v-for="(option, key) in options"
            v-show="option.value === modelValue"
            :key="'selected' + key"
            :class="selectBoxInnerBoxSelectedValueStyle"
          >
            {{ option.label }}
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
      <div :class="selectBoxSelectorStyle" :style="{ minWidth: width }">
        <WizVStack gap="xs2">
          <div
            :class="[
              selectBoxSelectorOptionStyle,
              currentSelectOption === key && selectBoxSelectorOptionSelectStyle,
            ]"
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
  selectBoxStyle,
  selectBoxDisabledStyle,
  selectBoxCursorStyle,
  selectBoxInnerBoxStyle,
  selectBoxInnerBoxSelectedValueStyle,
  selectBoxInnerBoxLessStyle,
  selectBoxInnerBoxMoreStyle,
  selectBoxSelectorStyle,
  selectBoxSelectorOptionStyle,
  selectBoxPlaceholderStyle,
  selectBoxSelectorOptionSelectStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/selectbox-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, inject, PropType } from "vue";

import { WizPopupContainer, WizPopup } from "@/components";
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
});

const openSelectBox = ref(props.isOpen);
const currentSelectOption = ref(-1);

const toggleSelectBox = () => {
  if (props.disabled) {
    return;
  }
  openSelectBox.value = !openSelectBox.value;
};

const onKeyUp = () => {
  if (currentSelectOption.value > 0) currentSelectOption.value--;
};

const onKeyDown = () => {
  if (currentSelectOption.value < props.options.length - 1)
    currentSelectOption.value++;
};

const onBlur = () => {
  currentSelectOption.value = -1;
};
interface Emit {
  (e: "update:modelValue", value: number): void;
}
const emit = defineEmits<Emit>();

const onSelect = (value: number) => {
  toggleSelectBox();
  if (value < 0) return;
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
</script>
