<template>
  <div
    :class="[
      styles.searchBlockStyle,
      styles.searchBlockBorderRadiusStyle,
      isOpen && styles.searchBlockBorderStyle,
    ]"
    :style="{ width: computedPopupWidth }"
  >
    <template v-if="options.length > 0">
      <template
        v-for="(option, key) in options"
        :key="`${option.label}_${option.value}_${key}`"
      >
        <!-- Dropdown -->
        <div
          v-if="option.children"
          :class="styles.searchDropdownItemStyle"
          @mouseover="onMouseover(option.value, option.children)"
        >
          <div
            :class="[
              styles.searchDropdownLabelStyle,
              activeOption &&
                activeOption.value === option.value &&
                styles.searchDropdownSelectingItemStyle,
            ]"
          >
            <WizHStack
              py="xs2"
              width="100%"
              justify="between"
              align="center"
              gap="xs2"
              nowrap
            >
              <div :class="styles.searchInputLabelStyle">
                {{ option.label }}
              </div>

              <WizHStack gap="xs" nowrap>
                <WizTag
                  v-if="option.tag"
                  :label="option.tag.label"
                  variant="white"
                  width="20px"
                  font-size="xs2"
                />
                <WizIcon
                  size="xl2"
                  :icon="WizIChevronRight"
                  :color="computedIconColor(option.value)"
                />
              </WizHStack>
            </WizHStack>
          </div>
        </div>
        <!-- Checkbox -->
        <div v-else>
          <div :class="styles.searchDropdownCheckboxItemStyle">
            <WizCheckBoxNew
              :style="{ width: '100%' }"
              :checked="checkValues.includes(option.value)"
              :value="option.value"
              :id="`${option.label}_${option.value}`"
              @update:checked="handleClickCheckbox(option.value)"
            >
              <WizHStack width="100%" align="center" nowrap gap="xs2">
                <div :class="styles.searchInputLabelStyle">
                  {{ option.label }}
                </div>
                <WizTag
                  v-if="option.tag"
                  :label="option.tag.label"
                  variant="white"
                  width="20px"
                  font-size="xs2"
                />
              </WizHStack>
            </WizCheckBoxNew>
          </div>
        </div>
        <WizDivider color="gray.300" />
      </template>
    </template>
    <template v-else>
      <div :class="[styles.searchDropdownEmptyMessageStyle]">
        {{ emptyMessage }}
      </div>
    </template>
  </div>
  <WizSearchPopup
    v-if="isOpen"
    v-model="checkValues"
    :options="activeOptionChildren ?? []"
    :selectedItem="selectedItem"
    :popupWidth="computedPopupWidth"
    :emptyMessage="emptyMessage"
  />
</template>

<script setup lang="ts" generic="T extends CheckboxOption">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { computed, ref } from "vue";

import {
  WizCheckBoxNew,
  WizDivider,
  WizHStack,
  WizIChevronRight,
  WizIcon,
  WizSearchPopup,
  WizTag,
} from "@/components";

import { CheckboxOption, SearchInputOption } from "./types";

defineOptions({
  name: ComponentName.SearchPopup,
});

type Props<T extends CheckboxOption> = {
  options: SearchInputOption<T>[];
  modelValue: T[];
  selectedItem: T[];
  popupWidth?: string;
  emptyMessage: string;
};
const props = defineProps<Props<T>>();

type Emits<T extends CheckboxOption> = {
  "update:modelValue": [value: T[]];
  mouseover: [id: number, isChild: boolean];
};
const emit = defineEmits<Emits<T>>();

const activeItem = ref<T | null>();
const activeOption = computed(() => {
  return props.options.find((option) => option.value === activeItem.value);
});
const activeOptionChildren = computed(() => {
  return activeOption.value?.children;
});
const isOpen = computed(() => activeOptionChildren.value !== undefined);

const activeItemIndex = ref<number | null>(null);

const checkValues = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const computedPopupWidth = computed(() => props.popupWidth);

const computedIconColor = computed(() => (value: T) => {
  return activeItem.value === value ? "green.800" : "gray.500";
});

const onMouseover = (value: T, options?: SearchInputOption<T>[]) => {
  activeItem.value = value;
  if (!options) return;
  activeItemIndex.value = options.findIndex((option) => option.value === value);
};

const handleClickCheckbox = (value: T) => {
  if (checkValues.value.includes(value)) {
    checkValues.value = checkValues.value.filter((v) => v !== value);
  } else {
    checkValues.value = [...checkValues.value, value];
  }
};
</script>
