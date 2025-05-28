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
      <div
        v-for="(option, key) in options"
        :key="`${option.label}_${option.value}_${key}`"
      >
        <!-- Dropdown -->
        <div v-if="option.children" :class="styles.searchDropdownItemStyle">
          <WizHStack
            py="xs2"
            align="center"
            justify="between"
            :class="[
              styles.searchDropdownLabelStyle,
              activeItem === option.value &&
                styles.searchDropdownSelectingItemStyle,
            ]"
            @mouseover="onMouseover(option.value, option.children)"
          >
            <WizHStack
              width="100%"
              justify="between"
              align="center"
              nowrap
              gap="xs2"
              :pl="
                !allOptionsHaveChildren(options) && !singleSelect ? 'lg' : 'no'
              "
            >
              <div :class="styles.searchInputLabelStyle">
                {{ option.label }}
              </div>
              <WizHStack gap="xs" :width="option.tag ? '70px' : '24px'">
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
          </WizHStack>
        </div>
        <!-- Single Select -->
        <div v-else-if="singleSelect" :class="[styles.searchDropdownItemStyle]">
          <button
            :id="`${option.label}_${option.value}`"
            type="button"
            :class="[styles.searchDropdownSingleSelectItemStyle]"
            width="100%"
            gap="xs2"
            :aria-label="`${option.label}_${option.value}`"
            @click="handleClickButton(option.value)"
          >
            <div :class="styles.searchInputLabelStyle">
              {{ option.label }}
            </div>
          </button>
        </div>
        <!-- Checkbox -->
        <div v-else :class="styles.searchDropdownCheckboxItemStyle">
          <WizCheckBoxNew
            :style="{ width: '100%' }"
            :checked="checkValues.includes(option.value)"
            :value="option.value"
            :id="`${option.label}_${option.value}`"
            :aria-label="`${option.label}_${option.value}`"
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
        <WizDivider color="gray.300" />
      </div>
    </template>
    <div v-else :class="[styles.searchDropdownEmptyMessageStyle]">
      {{ emptyMessage }}
    </div>
  </div>
  <WizSearchPopup
    v-if="isOpen"
    v-model="checkValues"
    :options="activeOptionChildren ?? []"
    :popupWidth="computedPopupWidth"
    :emptyMessage="emptyMessage"
    :singleSelect="singleSelect"
    @toggle="emit('toggle', $event)"
  />
</template>

<script setup lang="ts" generic="T extends CheckboxOption = number">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { computed, ref } from "vue";

import {
  WizCheckBoxNew,
  WizDivider,
  WizHStack,
  WizIChevronRight,
  WizIcon,
  WizTag,
} from "@/components";

import { CheckboxOption, SearchInputOption } from "./types";

defineOptions({
  name: ComponentName.SearchPopup,
});

type Props<T extends CheckboxOption> = {
  options: SearchInputOption<T>[];
  modelValue: T[];
  // selectedItem: T[];
  popupWidth?: string;
  emptyMessage: string;
  singleSelect: boolean;
};
const props = defineProps<Props<T>>();

type Emits<T extends CheckboxOption> = {
  toggle: [value: boolean];
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

const allOptionsHaveChildren = (options: SearchInputOption<T>[]) =>
  options.every((option) => !!option.children);

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

const handleClickButton = (value: T) => {
  checkValues.value = [value];
  emit("toggle", false);
};
</script>
