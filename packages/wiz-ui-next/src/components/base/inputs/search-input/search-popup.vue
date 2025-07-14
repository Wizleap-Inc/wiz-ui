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
        <!-- 親要素 -->
        <div v-if="option.children" :class="styles.searchDropdownItemStyle">
          <div
            v-if="!singleSelect"
            @mouseover="onMouseover(option.value, option.children)"
          >
            <!-- MARK: Checkbox + Dropdown -->
            <!-- Checkboxの状態（On/Off）は、すべての子要素が選択されているかどうかで決定される。 -->
            <!-- ex. ある子要素のCheckboxをOffにした時、その親にあたる要素のCheckboxは全てOffでなければならない。 -->
            <div
              :class="[
                styles.searchDropdownLabelStyle,
                activeItem === option.value &&
                  styles.searchDropdownSelectingItemStyle,
              ]"
            >
              <WizHStack
                py="xs2"
                width="100%"
                align="center"
                justify="between"
                gap="xs2"
                nowrap
              >
                <WizHStack align="center" gap="xs2" nowrap>
                  <!-- Checkboxが押下された場合、すべての子要素は親要素の状態に従う。（再帰的に状態を更新する） -->
                  <WizCheckBoxNew
                    :value="option.value"
                    :id="`parent-${option.label}-${option.value}`"
                    :checked="
                      optionSelectionStateMap.get(option.value) || false
                    "
                    :aria-label="`${option.label}の全選択`"
                    @update:checked="handleParentCheckboxChange(option, $event)"
                  />
                  <div :class="styles.searchInputLabelStyle">
                    {{ option.label }}
                  </div>
                </WizHStack>
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
          <div v-else @mouseover="onMouseover(option.value, option.children)">
            <!-- MARK: Dropdown -->
            <div
              :class="[
                styles.searchDropdownLabelStyle,
                activeItem === option.value &&
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
        </div>
        <!-- 子要素(No checkbox) -->
        <template v-else>
          <div v-if="singleSelect" :class="[styles.searchDropdownItemStyle]">
            <!-- MARK: No checkbox -->
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
              <WizTag
                v-if="option.tag"
                :label="option.tag.label"
                variant="white"
                width="20px"
                font-size="xs2"
              />
              <div v-else style="width: 1.5rem" />
            </button>
          </div>
          <div v-else :class="styles.searchDropdownItemStyle">
            <!-- MARK: Checkbox -->
            <div
              :class="[
                styles.searchDropdownLabelStyle,
                checkValues.includes(option.value) &&
                  styles.searchDropdownSelectingItemStyle,
              ]"
            >
              <WizHStack py="xs2" width="100%" align="center" gap="xs2" nowrap>
                <WizHStack align="center" gap="xs2" nowrap>
                  <WizCheckBoxNew
                    :value="option.value"
                    :id="`${option.label}_${option.value}`"
                    :checked="checkValues.includes(option.value)"
                    :aria-label="`${option.label}_${option.value}`"
                    @update:checked="handleClickCheckbox(option.value, $event)"
                  />
                  <div :class="styles.searchInputLabelStyle">
                    {{ option.label }}
                  </div>
                </WizHStack>
                <WizTag
                  v-if="option.tag"
                  :label="option.tag.label"
                  variant="white"
                  width="20px"
                  font-size="xs2"
                />
              </WizHStack>
            </div>
          </div>
        </template>
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
import { computed, ref, watch } from "vue";

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

// ヘルパー関数
const getAllChildrenValues = <T extends CheckboxOption>(
  option: SearchInputOption<T>
): T[] => {
  if (!option.children) return [];

  const collectValues = (options: SearchInputOption<T>[]): T[] => {
    return options.reduce<T[]>((acc, opt) => {
      if (opt.children) {
        return [...acc, ...collectValues(opt.children)];
      }
      return [...acc, opt.value];
    }, []);
  };

  return collectValues(option.children);
};

const isAllChildrenSelected = <T extends CheckboxOption>(
  childrenValues: T[],
  selectedValues: T[]
): boolean => {
  return (
    childrenValues.length > 0 &&
    childrenValues.every((value) => selectedValues.includes(value))
  );
};

const getArrayDifference = <T,>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter((item) => !arr2.includes(item));
};

const mergeUniqueArrays = <T,>(...arrays: T[][]): T[] => {
  return Array.from(new Set(arrays.flat()));
};

const activeItem = ref<T | null>();
const activeOption = computed(() => {
  return props.options.find((option) => option.value === activeItem.value);
});
const activeOptionChildren = computed(() => {
  return activeOption.value?.children;
});
const isOpen = computed(() => activeOptionChildren.value !== undefined);
const activeItemIndex = ref<number | null>(null);

const optionChildrenValuesMap = computed(() => {
  const map = new Map<T, T[]>();
  props.options.forEach((option) => {
    if (option.children) {
      map.set(option.value, getAllChildrenValues(option));
    }
  });
  return map;
});

const optionSelectionStateMap = computed(() => {
  const map = new Map<T, boolean>();
  optionChildrenValuesMap.value.forEach((childrenValues, optionValue) => {
    // 子要素を持たない親要素の場合は常にtrueを返す
    if (childrenValues.length === 0) {
      map.set(optionValue, true);
    } else {
      map.set(
        optionValue,
        isAllChildrenSelected(childrenValues, checkValues.value)
      );
    }
  });
  return map;
});

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

const handleClickCheckbox = (value: T, isChecked: boolean) => {
  const newValues = isChecked
    ? mergeUniqueArrays(checkValues.value, [value])
    : checkValues.value.filter((v) => v !== value);

  checkValues.value = newValues;
};

const handleParentCheckboxChange = (
  option: SearchInputOption<T>,
  isChecked: boolean
) => {
  const childrenValues = optionChildrenValuesMap.value.get(option.value) || [];

  const newValues = isChecked
    ? mergeUniqueArrays(checkValues.value, childrenValues)
    : getArrayDifference(checkValues.value, childrenValues);

  checkValues.value = newValues;
};

const handleClickButton = (value: T) => {
  checkValues.value = [value];
  emit("toggle", false);
};

// optionsが変更されたときにactiveItemをリセット
watch(
  () => props.options,
  () => {
    activeItem.value = null;
  }
);
</script>
