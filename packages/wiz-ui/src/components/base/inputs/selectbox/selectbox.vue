<template>
  <WizPopupContainer :expand="expand">
    <div
      :tabIndex="0"
      @keyup.up="onKeyUp"
      @keyup.down="onKeyDown"
      @blur="onBlur"
      @keyup.enter="onSelect(currentSelectOptionIndex)"
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
            v-show="option.value === value"
            :key="'selected' + key"
            :class="selectBoxInnerBoxSelectedValueStyle"
          >
            {{ option.label }}
            {{ showExLabel && option.exLabel ? " " + option.exLabel : "" }}
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
              currentSelectOptionIndex === key &&
                selectBoxSelectorOptionSelectStyle,
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
  selectBoxCursorStyle,
  selectBoxDisabledStyle,
  selectBoxInnerBoxLessStyle,
  selectBoxInnerBoxMoreStyle,
  selectBoxInnerBoxSelectedValueStyle,
  selectBoxInnerBoxStyle,
  selectBoxPlaceholderStyle,
  selectBoxSelectorOptionSelectStyle,
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
  value: {
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
});

const openSelectBox = ref(props.isOpen);
const currentSelectOptionIndex = ref(-1);

const toggleSelectBox = () => {
  if (props.disabled) {
    return;
  }
  openSelectBox.value = !openSelectBox.value;
};

interface Emit {
  (e: "input", value: number): void;
}
const emit = defineEmits<Emit>();

const onSelect = (value: number) => {
  toggleSelectBox();
  if (value < 0) return;
  emit("input", props.options[value].value);
};

const onKeyUp = () => {
  if (openSelectBox.value && currentSelectOptionIndex.value > 0)
    currentSelectOptionIndex.value--;
};

const onKeyDown = () => {
  if (
    openSelectBox.value &&
    currentSelectOptionIndex.value < props.options.length - 1
  )
    currentSelectOptionIndex.value++;
};

const onBlur = () => {
  currentSelectOptionIndex.value = -1;
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
  return props.options.some((option) => option.value === props.value);
});
</script>
