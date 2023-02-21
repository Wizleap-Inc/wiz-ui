<template>
  <template v-for="(option, key) in options" :key="key">
    <div v-if="option.children.length" :class="searchPopupStyle">
      <div
        v-if="selectedItem.includes(option.value)"
        :class="[
          searchPopupBlockStyle,
          isBorder(option.children) && searchPopupBlockBorderRightStyle,
          !isBorder(option.children) && searchPopupBlockBorderRadiusStyle,
        ]"
        :style="{ width: computedPopupWidth }"
      >
        <div v-for="(item, key) in option.children" :key="key">
          <div
            v-if="item.children.length"
            :class="searchPopupDropdownItemStyle"
          >
            <WizHStack
              align="center"
              justify="between"
              :class="searchDropdownLabelStyle"
              @mouseover="onMouseover(item.value, option.children)"
              @mouseout="activeItem = null"
            >
              {{ item.label }}
              <WizIcon
                size="xl2"
                :icon="WizIChevronRight"
                :color="computedIconColor(item.value)"
              />
            </WizHStack>
          </div>
          <div
            v-else
            :class="searchDropdownCheckboxItemStyle"
            @mouseover="activeItem = item.value"
            @mouseout="activeItem = null"
          >
            <input
              v-model="checkValues"
              :value="item.value"
              :class="searchCheckboxInputStyle"
              type="checkbox"
              :id="`checkbox${item.value}`"
              :name="`checkbox${item.value}`"
            />
            <label
              :class="[
                searchCheckboxLabelStyle,
                (checkValues.includes(item.value) ||
                  activeItem === item.value) &&
                  searchCheckboxLabelCheckedStyle,
              ]"
              :for="`checkbox${item.value}`"
            >
              <WizICheck
                v-if="checkValues.includes(item.value)"
                :class="searchCheckboxIconStyle"
              />
              <span
                :class="[
                  (checkValues.includes(item.value) ||
                    activeItem === item.value) &&
                    searchCheckboxBlockCheckedStyle,
                ]"
                >{{ item.label }}</span
              >
            </label>
          </div>
          <WizDivider
            v-if="key !== option.children.length - 1"
            color="gray.300"
          />
        </div>
      </div>
      <WizSearchPopup
        v-model="checkValues"
        :options="option.children"
        :selectedItem="selectedItem"
        :popupWidth="computedPopupWidth"
      ></WizSearchPopup>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  searchPopupStyle,
  searchPopupBlockStyle,
  searchPopupBlockBorderRightStyle,
  searchPopupBlockBorderRadiusStyle,
  searchPopupDropdownItemStyle,
  searchDropdownCheckboxItemStyle,
  searchDropdownLabelStyle,
  searchCheckboxInputStyle,
  searchCheckboxLabelStyle,
  searchCheckboxLabelCheckedStyle,
  searchCheckboxIconStyle,
  searchCheckboxBlockCheckedStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { ref, computed, PropType } from "vue";

import { WizHStack, WizDivider, WizIcon, WizSearchPopup } from "@/components";
import { WizIChevronRight, WizICheck } from "@/components/icons";

import { SearchInputOption } from "./types";

defineOptions({
  name: ComponentName.SearchPopup,
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
  selectedItem: {
    type: Array as PropType<number[]>,
    required: true,
  },
  popupWidth: {
    type: String,
    required: false,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void;
  (e: "mouseover", id: number, isChild: boolean): void;
}>();

const activeItem = ref<number | null>();

const checkValues = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const mutableSelectedItem = computed(() => {
  return props.selectedItem;
});

const isBorder = computed(() => (options: SearchInputOption[]) => {
  return options.some((option) =>
    mutableSelectedItem.value.includes(option.value)
  );
});

const computedPopupWidth = computed(() => props.popupWidth);

const computedIconColor = computed(() => (value: number) => {
  if (activeItem.value === value) {
    return "green.800";
  }
  return "gray.500";
});

const onMouseover = (value: number, options: SearchInputOption[]) => {
  activeItem.value = value;
  options.forEach((option: SearchInputOption) => {
    if (mutableSelectedItem.value.includes(option.value)) {
      const index = mutableSelectedItem.value.indexOf(option.value);
      mutableSelectedItem.value.splice(index, 1);
    }
  });
  if (!mutableSelectedItem.value.includes(value)) {
    mutableSelectedItem.value.push(value);
  }
};
</script>
