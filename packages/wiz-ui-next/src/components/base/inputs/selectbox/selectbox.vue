<template>
  <WizPopupContainer v-model="openSelectBox" :expand="expand">
    <div
      :class="[
        selectBoxStyle,
        selectBoxBorderColorStyle[state],
        disabled && selectBoxDisabledStyle,
        selectBoxCursorStyle[selectBoxCursor],
      ]"
      :style="{ width: computedWidth }"
    >
      <div
        :class="[
          selectBoxInnerBoxStyle,
          !!modelValue && selectBoxInnerBoxSelectedStyle,
        ]"
        @click="toggleSelectBox"
      >
        <WizHStack align="center" justify="between" height="100%">
          <span v-if="!modelValue">{{ placeholder }}</span>
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
    <WizPopup layer="popover">
      <div :class="selectBoxSelectorStyle" :style="{ minWidth: width }">
        <WizVStack gap="xs2">
          <div
            :class="selectBoxSelectorOptionStyle"
            v-for="(option, key) in options"
            :key="'option' + key"
            @click="onSelect(option.value)"
          >
            {{ option.label }}
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
  selectBoxBorderColorStyle,
  selectBoxDisabledStyle,
  selectBoxCursorStyle,
  selectBoxInnerBoxStyle,
  selectBoxInnerBoxSelectedValueStyle,
  selectBoxInnerBoxLessStyle,
  selectBoxInnerBoxMoreStyle,
  selectBoxInnerBoxSelectedStyle,
  selectBoxSelectorStyle,
  selectBoxSelectorOptionStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/selectbox-input.css";
import { ref, computed, inject } from "vue";

import { WizPopupContainer, WizPopup } from "@/components";
import { WizIExpandLess, WizIExpandMore } from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { WizHStack, WizVStack } from "../../stack";

import { SelectBoxOption } from "./types";

defineOptions({
  name: ComponentName.SelectBox,
});

interface Props {
  options: SelectBoxOption[];
  modelValue: number;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  expand?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "選択してください",
  width: "10rem",
  disabled: false,
});

const openSelectBox = ref(false);
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
</script>
