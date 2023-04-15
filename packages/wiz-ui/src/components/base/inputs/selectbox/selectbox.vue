<template>
  <WizPopupContainer :expand="expand">
    <div
      :class="[
        styles.selectBoxStyle,
        commonStyles.inputBorderStyle[state],
        disabled && styles.selectBoxDisabledStyle,
        styles.selectBoxCursorStyle[selectBoxCursor],
      ]"
      :style="{ width: computedWidth }"
    >
      <div :class="styles.selectBoxInnerBoxStyle" @click="toggleSelectBox">
        <WizHStack align="center" justify="between" height="100%">
          <span
            v-if="!isValueMatched"
            :class="styles.selectBoxPlaceholderStyle"
            >{{ placeholder }}</span
          >
          <span
            v-for="(option, key) in options"
            v-show="option.value === value"
            :key="'selected' + key"
            :class="styles.selectBoxInnerBoxSelectedValueStyle"
          >
            {{ option.label }}
          </span>
          <WizIExpandLess
            v-if="openSelectBox"
            :class="styles.selectBoxInnerBoxLessStyle"
          />
          <WizIExpandMore
            v-else-if="!openSelectBox"
            :class="styles.selectBoxInnerBoxMoreStyle"
          />
        </WizHStack>
      </div>
    </div>
    <WizPopup :isOpen="openSelectBox" @onClose="openSelectBox = false">
      <div :class="styles.selectBoxSelectorStyle" :style="{ minWidth: width }">
        <WizVStack gap="xs2">
          <div
            :class="styles.selectBoxSelectorOptionStyle"
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
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/selectbox-input.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
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
});

const openSelectBox = ref(props.isOpen);
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
  emit("input", value);
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
