<template>
  <template v-for="(option, key) in options">
    <div
      v-if="option.children && selectedItem.includes(option.value)"
      :class="styles.searchPopupStyle"
      :key="`${option.label}_${option.value}_${key}`"
    >
      <div
        ref="optionsRef"
        @scroll="() => onScroll(key)"
        :class="[
          styles.searchPopupBlockStyle,
          isBorder(option.children) && styles.searchPopupBlockBorderRightStyle,
          !isBorder(option.children) &&
            styles.searchPopupBlockBorderRadiusStyle,
        ]"
        :style="{ width: computedPopupWidth }"
      >
        <div
          v-if="option.children.length === 0"
          :class="[styles.searchDropdownEmptyMessageStyle]"
        >
          {{ emptyMessage }}
        </div>
        <div v-else>
          <div
            v-for="(item, key) in option.children"
            :key="`${item.label}_${item.value}_${key}`"
          >
            <!-- Dropdown -->
            <div
              v-if="item.children"
              :class="styles.searchPopupDropdownItemStyle"
            >
              <WizHStack
                py="xs2"
                align="center"
                justify="between"
                :class="[
                  styles.searchDropdownLabelStyle,
                  selectedItem.includes(item.value) &&
                    styles.searchDropdownSelectingItemStyle,
                ]"
                @mouseover="onMouseover(item.value, option.children)"
                @mouseout="activeItem = null"
              >
                <WizHStack
                  width="100%"
                  justify="between"
                  align="center"
                  nowrap
                  gap="xs2"
                >
                  <div :class="styles.searchInputLabelStyle">
                    {{ item.label }}
                  </div>
                  <WizHStack gap="xs" :width="item.tag ? '70px' : '24px'">
                    <template v-if="item.tag">
                      <WizTag
                        :label="item.tag.label"
                        variant="white"
                        width="20px"
                        font-size="xs2"
                      />
                    </template>
                    <WizIcon
                      size="xl2"
                      :icon="WizIChevronRight"
                      :color="computedIconColor(item.value)"
                    />
                  </WizHStack>
                </WizHStack>
              </WizHStack>
            </div>
            <!-- Checkbox -->
            <div
              v-else
              :class="styles.searchDropdownCheckboxItemStyle"
              @mouseover="activeItem = item.value"
              @mouseout="activeItem = null"
            >
              <WizCheckBoxNew
                :style="{ width: '100%' }"
                :checked="checkValues.includes(item.value)"
                :value="item.value"
                :id="`${item.label}_${item.value}`"
                @update:checked="handleClickCheckbox(item.value)"
              >
                <WizHStack width="100%" align="center" nowrap gap="xs2">
                  <div :class="styles.searchInputLabelStyle">
                    {{ item.label }}
                  </div>
                  <template v-if="item.tag">
                    <WizTag
                      :label="item.tag.label"
                      variant="white"
                      width="20px"
                      font-size="xs2"
                    />
                  </template>
                </WizHStack>
              </WizCheckBoxNew>
            </div>
            <WizDivider color="gray.300" />
          </div>
        </div>
      </div>
      <WizSearchPopup
        v-model="checkValues"
        :options="option.children"
        :selectedItem="selectedItem"
        :popupWidth="computedPopupWidth"
        :emptyMessage="emptyMessage"
      />
    </div>
  </template>
</template>

<script setup lang="ts" generic="T extends CheckboxOption">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { UnwrapRef, computed, ref, watch } from "vue";

import {
  WizCheckBoxNew,
  WizDivider,
  WizHStack,
  WizIcon,
  WizSearchPopup,
  WizTag,
} from "@/components";
import { WizIChevronRight } from "@/components/icons";

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
const activeItemIndex = ref<number | null>(null);

const ITEM_HEIGHT = 44;
const DIVIDER_HEIGHT = 0.8;

const checkValues = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const mutableSelectedItem = computed(() => {
  return props.selectedItem;
});

const optionsRef = ref<HTMLElement[]>();
const scrollAmount = ref<number>(0);
const scrollItems = ref<SearchInputOption<T>[]>([]);
const onScroll = (parentOrder: number) => {
  scrollAmount.value = optionsRef.value?.[0].scrollTop || 0;
  // scrollItems.value = props.options[parentOrder].children ?? null;
  scrollItems.value =
    props.options[parentOrder].children !== undefined
      ? (props.options[parentOrder].children as UnwrapRef<
          SearchInputOption<T>[]
        >)
      : [];
};

watch(
  [
    scrollItems,
    () => {
      return Math.ceil(scrollAmount.value / (ITEM_HEIGHT + DIVIDER_HEIGHT));
    },
  ],
  ([scrollItems, showFrom]) => {
    const hiddenItems = (() => {
      if (showFrom === 0) return [];
      return scrollItems.slice(0, showFrom - 1);
    })();
    hiddenItems.forEach((item) => {
      if (mutableSelectedItem.value.includes(item.value as T)) {
        const index = mutableSelectedItem.value.indexOf(item.value as T);
        mutableSelectedItem.value.splice(index, 1);
      }
    });
  }
);

const isBorder = computed(() => (options: SearchInputOption<T>[]) => {
  return options.some((option) =>
    mutableSelectedItem.value.includes(option.value)
  );
});

const computedPopupWidth = computed(() => props.popupWidth);

const computedIconColor = computed(() => (value: T) => {
  return activeItem.value === value ? "green.800" : "gray.500";
});

const onMouseover = (value: T, options?: SearchInputOption<T>[]) => {
  scrollAmount.value = optionsRef.value?.[0].scrollTop || 0;
  activeItem.value = value;
  if (!options) return;
  activeItemIndex.value = options.findIndex((option) => option.value === value);
  options.forEach((option: SearchInputOption<T>) => {
    if (mutableSelectedItem.value.includes(option.value)) {
      const index = mutableSelectedItem.value.indexOf(option.value);
      mutableSelectedItem.value.splice(index, 1);
    }
  });
  if (!mutableSelectedItem.value.includes(value)) {
    mutableSelectedItem.value.push(value);
  }
};

const handleClickCheckbox = (value: T) => {
  if (checkValues.value.includes(value)) {
    checkValues.value = checkValues.value.filter((v) => v !== value);
  } else {
    checkValues.value = [...checkValues.value, value];
  }
};
</script>
