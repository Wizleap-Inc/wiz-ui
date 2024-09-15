<template>
  <WizPopupContainer :expand="expand">
    <div
      :class="[
        styles.searchStyle,
        styles.searchInputSelectedItemStyle,
        disabled && styles.searchInputDisabledStyle,
        inputBorderStyle[state],
      ]"
      :style="{ width: computedInputWidth }"
    >
      <div :class="styles.searchInputInnerBoxStyle">
        <WizHStack align="center" gap="xs">
          <component
            :is="icon"
            :class="styles.searchInputIconStyle"
            :style="{ flexShrink: 0 }"
          />
          <WizHStack
            align="center"
            height="100%"
            width="100%"
            gap="xs"
            :wrap="true"
            overflow="hidden"
          >
            <template v-if="showSelectedItem">
              <span
                v-for="item in checkValues"
                :key="item.toString()"
                :class="styles.searchInputInnerBoxSelectedItemStyle"
              >
                <span :class="styles.searchInputInnerBoxSelectedLabelStyle">
                  {{ valueToOption.get(item)?.label }}
                </span>
                <button
                  type="button"
                  @click="onClear(item)"
                  @keypress.enter="onClear(item)"
                  @keydown="(e) => onBackspace(item, e)"
                  :class="styles.searchInputInnerBoxCloseButtonStyle"
                  :aria-label="ARIA_LABELS.SEARCH_SELECTOR.UNSELECT"
                  :disabled="disabled"
                >
                  <WizIcon
                    :icon="WizIClose"
                    :class="styles.searchInputInnerBoxCloseStyle"
                    :size="'xs'"
                    :color="'gray.700'"
                  />
                </button>
              </span>
            </template>
            <input
              type="text"
              :class="[styles.searchInputInnerInputStyle]"
              v-model="searchValue"
              :placeholder="!displayingSelectedItems ? placeholder : undefined"
              :name="name"
              :disabled="disabled"
              @focusin="hasFocus = true"
              @focusout="hasFocus = false"
              @click="emit('toggle', true)"
              autocomplete="off"
            />
          </WizHStack>
        </WizHStack>
      </div>
    </div>

    <WizPopup
      :isOpen="!disabled && openPopup"
      @onClose="emit('toggle', false)"
      :isDirectionFixed="isDirectionFixed"
    >
      <WizHStack nowrap>
        <WizSearchPopup
          v-model="checkValues"
          :options="filteredOptions"
          :popupWidth="computedPopupWidth"
          :emptyMessage="emptyMessage"
          :singleSelect="singleSelect"
          @toggle="emit('toggle', $event)"
        />
      </WizHStack>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts" generic="T extends CheckboxOption = number">
import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, ref } from "vue";

import {
  WizHStack,
  WizIcon,
  WizPopup,
  WizPopupContainer,
  WizSearchPopup,
} from "@/components";
import { TIcon, WizIClose, WizISearch } from "@/components/icons";

import { CheckboxOption, SearchInputOption } from "./types";

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
  showSelectedItem?: boolean;
  showParentLabel?: boolean;
  singleSelect?: boolean;
};

const props = withDefaults(defineProps<Props<T>>(), {
  inputWidth: "10rem",
  isDirectionFixed: false,
  icon: WizISearch,
  emptyMessage: "選択肢がありません。",
  singleSelect: false,
});

type Emits = {
  "update:modelValue": [value: T[]];
  toggle: [value: boolean];
  click: [];
};
const emit = defineEmits<Emits>();

const searchValue = ref("");

const checkValues = computed({
  get: () => props.modelValue,
  set: (value: T[]) => {
    emit("update:modelValue", value);
    searchValue.value = "";
  },
});

const hasFocus = ref(false);

const valueToOption = computed(() => {
  const map = new Map<T, SearchInputOption<T>>();

  const flatten = (options: SearchInputOption<T>[]): SearchInputOption<T>[] => {
    return options.flatMap((option) => {
      if (!option.children) return [option];

      if (!props.showParentLabel) return [option, ...flatten(option.children)];

      const children = option.children.map((child) => ({
        ...child,
        // 要件上、全角空白のため無視
        // eslint-disable-next-line no-irregular-whitespace
        label: `${option.label}　${child.label}`,
      }));
      return [option, ...flatten(children)];
    });
  };

  flatten(props.options).forEach((option) => {
    map.set(option.value, option);
  });

  return map;
});
const state = computed(() => {
  return hasFocus.value ? "active" : "default";
});

const computedInputWidth = computed(() =>
  props.expand ? "100%" : props.inputWidth
);
const computedPopupWidth = computed(() => props.popupWidth);

const displayingSelectedItems = computed(
  () => props.showSelectedItem && checkValues.value.length > 0
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

const onClear = (value: T) => {
  checkValues.value = checkValues.value.filter((v) => v !== value);
  hasFocus.value = true;
  emit("toggle", true);
};

const onBackspace = (n: T, event: KeyboardEvent) => {
  if (event.key === "Backspace") {
    onClear(n);
  }
};

const filteredOptions = computed(() => {
  if (searchValue.value.length) {
    const opts = filterOptions(searchBy(searchValue.value))(props.options);
    return opts;
  }
  return props.options;
});
</script>
