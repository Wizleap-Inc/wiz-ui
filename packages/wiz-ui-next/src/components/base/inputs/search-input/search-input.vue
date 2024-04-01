<template>
  <WizPopupContainer :expand="expand">
    <div :class="styles.searchStyle">
      <input
        type="text"
        :class="[
          styles.searchInputStyle,
          disabled && styles.searchInputDisabledStyle,
          inputBorderStyle[state],
        ]"
        :style="{ width: computedInputWidth }"
        v-model="searchValue"
        :placeholder="placeholder"
        :name="name"
        :disabled="disabled"
        @focusin="hasFocus = true"
        @focusout="hasFocus = false"
        @click="emit('toggle', !openPopup)"
        autocomplete="off"
      />
      <component :is="icon" :class="styles.searchInputIconStyle" />
    </div>
    <WizPopup
      :isOpen="!disabled && openPopup"
      @onClose="emit('toggle', false)"
      :isDirectionFixed="isDirectionFixed"
    >
      <WizHStack nowrap>
        <WizSearchPopup
          v-model="checkValuesUnwrapRef"
          :options="filteredOptions"
          :selectedItem="selectedItems"
          :popupWidth="computedPopupWidth"
          :emptyMessage="emptyMessage"
        />
      </WizHStack>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts" generic="T extends CheckboxOption">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { UnwrapRef, computed, ref } from "vue";

import {
  WizHStack,
  WizISearch,
  WizPopup,
  WizPopupContainer,
} from "@/components";
import { TIcon } from "@/components/icons";

import { CheckboxOption, SearchInputOption } from "./types";

import { WizSearchPopup } from ".";

defineOptions({
  name: ComponentName.SearchInput,
});

type Props<T extends CheckboxOption> = {
  options: SearchInputOption<T>[];
  modelValue: T[];
  name: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  inputWidth?: string;
  popupWidth?: string;
  openPopup: boolean;
  isDirectionFixed?: boolean;
  icon?: TIcon;
  emptyMessage?: string;
};

const props = withDefaults(defineProps<Props<T>>(), {
  inputWidth: "10rem",
  isDirectionFixed: false,
  icon: WizISearch,
  emptyMessage: "選択肢がありません。",
});

type Emits = {
  "update:modelValue": [value: T[]];
  toggle: [value: boolean];
  click: [];
};
const emit = defineEmits<Emits>();

const checkValuesUnwrapRef = computed({
  get: () => props.modelValue as UnwrapRef<T>[],
  set: (value: UnwrapRef<T>[]) => emit("update:modelValue", value as T[]),
});

const searchValue = ref("");
const selectedItem = ref<T[] | null>();
const hasFocus = ref(false);

const state = computed(() => {
  return hasFocus.value ? "active" : "default";
});

const computedInputWidth = computed(() =>
  props.expand ? "100%" : props.inputWidth
);
const computedPopupWidth = computed(() => props.popupWidth);

const selectedItems = computed(
  () => (selectedItem.value ?? []) as UnwrapRef<T>[]
);

const filterOptions =
  (match: (label: string) => boolean) =>
  (options: SearchInputOption<T>[]): SearchInputOption<T>[] =>
    options.flatMap((option) => {
      const isMatched = match(option.label);
      if (!option.children || option.children.length === 0) {
        return isMatched ? [option] : [];
      }
      if (isMatched) return [option];
      const children = filterOptions(match)(option.children);
      if (children.length === 0) return [];
      return [
        {
          ...option,
          children,
        },
      ];
    });

const searchBy = (keyword: string) => (str: string) => str.includes(keyword);

const filteredOptions = computed(() => {
  if (searchValue.value.length) {
    const opts = filterOptions(searchBy(searchValue.value))(props.options);
    return opts as UnwrapRef<SearchInputOption<T>[]>;
  }
  return props.options as UnwrapRef<SearchInputOption<T>[]>;
});
</script>
