<template>
  {{ isHover }}
  <div
    v-if="!option.children.length"
    :class="[searchPopupItemStyle, searchPopupItemExpandStyle[computedExpand]]"
    style="
      background-color: white;
      border-right: 1px solid #d3d8d7;
      height: fit-content;
    "
  >
    <input
      :class="checkboxInputStyle"
      type="checkbox"
      :id="`checkbox${option.value}`"
      :name="`checkbox${option.value}`"
      :value="option.value"
      v-model="values"
    />
    <label
      :class="[
        checkboxLabelStyle,
        values.includes(option.value) && checkboxLabelCheckedStyle,
        checkboxLabelCursorStyle['default'],
      ]"
      :for="`checkbox${option.value}`"
    >
      <WizICheck
        v-if="values.includes(option.value)"
        :class="checkboxIconStyle"
      />
      <span
        :class="[values.includes(option.value) && checkboxBlockCheckedStyle]"
        >{{ option.label }}</span
      >
    </label>
    <WizDivider :class="searchDividerStyle" color="gray.300" />
  </div>
  <div
    v-else
    :class="[searchPopupItemStyle, searchPopupItemExpandStyle[computedExpand]]"
    style="
      background-color: white;
      border-right: 1px solid #d3d8d7;
      height: fit-content;
    "
  >
    <WizHStack
      align="center"
      justify="between"
      :class="searchDropItemStyle"
      @mouseover="onMouseover(option.value)"
      @mousedown="onMousedown(option.value)"
      @mouseup="onMouseup"
    >
      {{ option.label }}value:{{ option.value }}
      <WizIcon
        size="xl2"
        :icon="WizIChevronRight"
        :color="computedColor(option.value)"
      />
    </WizHStack>
    <WizDivider :class="searchDividerStyle" color="gray.300" />
  </div>
  <div v-if="isHover === option.value">
    <div v-for="(children, key) in option.children" :key="key">
      <WizSearchPopup :option="children" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  checkboxInputStyle,
  checkboxLabelStyle,
  checkboxLabelCheckedStyle,
  checkboxLabelCursorStyle,
  checkboxIconStyle,
  checkboxBlockCheckedStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/checkbox-input.css";
import {
  searchDividerStyle,
  searchPopupItemStyle,
  searchPopupItemExpandStyle,
  searchDropItemStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { ref, computed, PropType } from "vue";

import { WizHStack, WizDivider, WizIcon, WizSearchPopup } from "@/components";
import { WizIChevronRight, WizICheck } from "@/components/icons";

import { SearchInputOption } from "./types";

defineOptions({
  name: ComponentName.SearchPopup,
});

const props = defineProps({
  option: {
    type: Object as PropType<SearchInputOption>,
    required: true,
  },
  expand: {
    type: Boolean,
    required: false,
  },
  isHover: {
    type: Number,
    required: false,
  },
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "mouseover", id: number | null): void;
}>();

const values = ref<number[]>([]);
const isPressed = ref();
const onMouseover = (value: number) => {
  emit("mouseover", value);
};
const onMousedown = (key: number) => (isPressed.value = key);
const onMouseup = () => (isPressed.value = false);
const computedExpand = computed(() => (props.expand ? "expand" : "default"));
const computedColor = (key: number) => {
  if (isPressed.value === key || props.isHover === key) {
    return "green.800";
  }
  return "gray.500";
};
</script>
