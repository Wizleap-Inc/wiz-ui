<template>
  <div>
    <div :class="searchStyle">
      <input
        type="text"
        :class="[
          searchInputStyle,
          disabled && searchInputDisabledStyle,
          inputBorderStyle[state],
        ]"
        :style="{ width: computedInputWidth }"
        v-model="searchValue"
        :placeholder="placeholder"
        :name="name"
        :disabled="disabled"
        @focusin="hasFocus = true"
        @focusout="hasFocus = false"
        @click="openPopup = !openPopup"
        autocomplete="off"
      />
      <WizISearch :class="searchInputIconStyle" />
    </div>
    <WizPopupContainer v-model="openPopup">
      <WizPopup layer="floating" :class="searchPopupStyle">
        <div
          :class="[
            searchBlockStyle,
            searchBlockBorderRadiusStyle,
            isBorder && searchBlockBorderStyle,
          ]"
          :style="{ width: computedPopupWidth }"
        >
          <div
            v-for="(option, key) in filteredOptions"
            :key="`${option.label}_${option.value}_${key}`"
          >
            <div v-if="option.children.length" :class="searchDropdownItemStyle">
              <WizHStack
                align="center"
                justify="between"
                :class="searchDropdownLabelStyle"
                @mouseover="onMouseover(option.value)"
                @mouseout="activeItem = null"
              >
                {{ option.label }}
                <WizIcon
                  size="xl2"
                  :icon="WizIChevronRight"
                  :color="computedIconColor(option.value)"
                />
              </WizHStack>
            </div>
            <div
              v-else
              :class="searchDropdownCheckboxItemStyle"
              @mouseover="activeItem = option.value"
              @mouseout="activeItem = null"
            >
              <input
                v-model="checkValues"
                :value="option.value"
                :class="searchCheckboxInputStyle"
                type="checkbox"
                :id="`${option.label}_${option.value}`"
                :name="`${option.label}_${option.value}`"
              />
              <label
                :class="[
                  searchCheckboxLabelStyle,
                  (checkValues.includes(option.value) ||
                    activeItem === option.value) &&
                    searchCheckboxLabelCheckedStyle,
                ]"
                :for="`${option.label}_${option.value}`"
                @mouseover="
                  selectedItem = [];
                  isBorder = false;
                "
              >
                <WizICheck
                  v-if="checkValues.includes(option.value)"
                  :class="searchCheckboxIconStyle"
                />
                <span
                  :class="[
                    (checkValues.includes(option.value) ||
                      activeItem === option.value) &&
                      searchCheckboxBlockCheckedStyle,
                  ]"
                  >{{ option.label }}</span
                >
              </label>
            </div>
            <WizDivider v-if="key !== options.length - 1" color="gray.300" />
          </div>
        </div>
        <WizSearchPopup
          v-model="checkValues"
          :options="options"
          :selectedItem="selectedItem"
          :popupWidth="computedPopupWidth"
        ></WizSearchPopup>
      </WizPopup>
    </WizPopupContainer>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  searchStyle,
  searchInputStyle,
  searchInputIconStyle,
  searchInputDisabledStyle,
  searchPopupStyle,
  searchBlockStyle,
  searchBlockBorderStyle,
  searchBlockBorderRadiusStyle,
  searchDropdownItemStyle,
  searchDropdownCheckboxItemStyle,
  searchDropdownLabelStyle,
  searchCheckboxInputStyle,
  searchCheckboxLabelStyle,
  searchCheckboxLabelCheckedStyle,
  searchCheckboxIconStyle,
  searchCheckboxBlockCheckedStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, watch, PropType, onMounted } from "vue";

import {
  WizHStack,
  WizDivider,
  WizISearch,
  WizPopupContainer,
  WizPopup,
  WizSearchPopup,
  WizIcon,
} from "@/components";
import { WizIChevronRight, WizICheck } from "@/components/icons";

import { SearchInputOption } from "./types";

defineOptions({
  name: ComponentName.SearchInput,
});

const props = defineProps({
  options: {
    type: Array as PropType<SearchInputOption[]>,
    required: true,
  },
  modelValue: {
    type: Array as PropType<number[]>,
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
  inputWidth: {
    type: String,
    required: false,
    default: "10rem",
  },
  popupWidth: {
    type: String,
    required: false,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void;
  (e: "click"): void;
}>();

const checkValues = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const searchValue = ref("");
const filteredOptions = ref<SearchInputOption[]>([]);
const selectedItem = ref<number[]>([]);
const activeItem = ref<number | null>();
const hasFocus = ref(false);
const openPopup = ref(false);
const isBorder = ref(false);

const state = computed(() => {
  if (hasFocus.value) return "active";
  return "default";
});

const computedInputWidth = computed(() =>
  props.expand ? "100%" : props.inputWidth
);
const computedPopupWidth = computed(() => props.popupWidth);
const computedIconColor = computed(() => (value: number) => {
  if (activeItem.value === value) {
    return "green.800";
  }
  return "gray.500";
});

const onMouseover = (value: number) => {
  isBorder.value = true;
  activeItem.value = value;
  selectedItem.value = [];
  if (!selectedItem.value.includes(value)) {
    selectedItem.value.push(value);
  }
};

watch(searchValue, () => {
  selectedItem.value = [];
  openPopup.value = true;
  if (searchValue.value.length) {
    filteredOptions.value = props.options.filter((option) => {
      return option.label.indexOf(searchValue.value[0]) !== -1;
    });
  } else {
    filteredOptions.value = props.options;
  }
});

onMounted(() => {
  filteredOptions.value = props.options;
});
</script>
