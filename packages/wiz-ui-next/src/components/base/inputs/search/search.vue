<template>
  <div :class="[searchStyle, searchExpandStyle[computedExpand]]">
    <input
      type="text"
      :class="[
        searchInputStyle,
        disabled && searchInputDisabledStyle,
        inputBorderStyle[state],
      ]"
      :style="{ width: computedWidth }"
      v-model="searchValue"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      @focusin="hasFocus = true"
      @focusout="hasFocus = false"
    />
    <WizISearch :class="searchInputIconStyle" />
  </div>
  <button @click="openPopup = !openPopup">test</button>
  <WizPopupContainer v-model="openPopup">
    <WizPopup layer="floating">
      <div v-for="(option, key) in options" :key="key" style="display: flex">
        <WizSearchPopup
          :option="option"
          :expand="expand"
          :isHover="isHover"
          @mouseover="onMouseover"
        ></WizSearchPopup>
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  searchStyle,
  searchInputStyle,
  searchExpandStyle,
  searchInputIconStyle,
  searchInputDisabledStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, watch, PropType } from "vue";

import {
  WizISearch,
  WizPopupContainer,
  WizPopup,
  WizSearchPopup,
} from "@/components";

import { SearchInputOption } from "./types";

defineOptions({
  name: ComponentName.SearchInput,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "click"): void;
}>();

const props = defineProps({
  options: {
    type: Array as PropType<SearchInputOption[]>,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  expand: {
    type: Boolean,
    required: false,
  },
  width: {
    type: String,
    required: false,
  },
});

const filteredOptions = ref<SearchInputOption[]>([]);
const openPopup = ref(false);
const isHover = ref();
const isShow = ref();
const isPressed = ref();

const searchValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

watch(searchValue, () => {
  filteredOptions.value = props.options.filter((option) => {
    return option.label.indexOf(searchValue.value[0]) !== -1;
  });
  if (filteredOptions.value.length) {
    openPopup.value = true;
  }
});

const onClick = (id: number) => {
  isShow.value = id;
};
const onMouseover = (id: number | null) => {
  console.log(id);
  isHover.value = id;
};
const onMouseout = () => (isHover.value = false);
const onMousedown = (index: number) => (isPressed.value = index);
const onMouseup = () => (isPressed.value = false);
const computedExpand = computed(() => (props.expand ? "expand" : "default"));
const computedWidth = computed(() => (props.expand ? "100%" : props.width));
const computedColor = (index: number) => {
  if (isPressed.value === index || isHover.value === index) {
    return "green.800";
  }
  return "gray.500";
};

const hasFocus = ref(false);
const state = computed(() => {
  if (hasFocus.value) return "active";
  return "default";
});
</script>
