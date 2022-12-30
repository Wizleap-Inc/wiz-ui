<template>
  <WizPopupContainer v-model="openSelectBox" :expand="expand">
    <div
      :class="[
        selectBoxStyle,
        openSelectBox && selectBoxActiveStyle,
        disabled && selectBoxDisabledStyle,
        selectBoxCursorStyle[selectBoxCursor],
      ]"
      :style="{ width: computedWidth }"
    >
      <div
        :class="[
          selectBoxInnerBoxStyle,
          !!value && selectBoxInnerBoxSelectedStyle,
        ]"
        @click="toggleSelectBox"
      >
        <WizHStack align="center" justify="between" height="100%">
          <span v-if="!value">{{ placeholder }}</span>
          <span
            v-for="(option, key) in options"
            v-show="option.value === value"
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
      <div
        :class="selectBoxSelectorStyle"
        :style="{ 'min-width': `calc(${width} + ${BORDER_WIDTH} * 2)` }"
      >
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
  BORDER_WIDTH,
  selectBoxStyle,
  selectBoxActiveStyle,
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
import { ref, computed } from "vue";

import { WizPopupContainer, WizPopup } from "@/components";
import { WizIExpandLess, WizIExpandMore } from "@/components/icons";

import { WizHStack, WizVStack } from "../../stack";

import { Option } from "./types";

defineOptions({
  name: ComponentName.SelectBox,
});

interface Props {
  options: Option[];
  value: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  expand?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
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
  (e: "input", value: string): void;
}
const emit = defineEmits<Emit>();

const onSelect = (value: string) => {
  toggleSelectBox();
  emit("input", value);
};

const selectBoxCursor = computed(() =>
  props.disabled ? "disabled" : "default"
);

const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>
