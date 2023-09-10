<template>
  <template v-for="(option, key) in options">
    <div
      v-if="option.children.length && selectedItem.includes(option.value)"
      :class="searchPopupStyle"
      :key="`${option.label}_${option.value}_${key}`"
    >
      <div
        ref="optionsRef"
        @scroll="() => onScroll(key)"
        :class="[
          searchPopupBlockStyle,
          isBorder(option.children) && searchPopupBlockBorderRightStyle,
          !isBorder(option.children) && searchPopupBlockBorderRadiusStyle,
        ]"
        :style="{ width: computedPopupWidth }"
      >
        <div
          v-for="(item, key) in option.children"
          :key="`${item.label}_${item.value}_${key}`"
        >
          <!-- Dropdown -->
          <div
            v-if="item.children.length"
            :class="searchPopupDropdownItemStyle"
          >
            <WizHStack
              align="center"
              justify="between"
              :class="[
                searchDropdownLabelStyle,
                selectedItem.includes(item.value) &&
                  searchDropdownSelectingItemStyle,
              ]"
              @mouseover="onMouseover(item.value, option.children)"
              @mouseout="activeItem = null"
            >
              <WizHStack width="100%" justify="between" align="center">
                <div :style="{ width: item.tag && 'calc(100% - 4.5rem)' }">
                  {{ item.label }}
                </div>
                <WizHStack gap="xs" :width="item.tag ? '70px' : '24px'">
                  <template v-if="item.tag">
                    <span :style="{ lineHeight: THEME.fontSize.sm }">
                      <WizTag
                        :label="item.tag.label"
                        variant="white"
                        width="20px"
                        font-size="xs2"
                      />
                    </span>
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
            :class="searchDropdownCheckboxItemStyle"
            @mouseover="activeItem = item.value"
            @mouseout="activeItem = null"
          >
            <WizHStack width="100%" justify="between" align="center">
              <div :style="{ width: item.tag && 'calc(100% - 2.5rem)' }">
                <input
                  v-model="checkValues"
                  :value="item.value"
                  :class="searchCheckboxInputStyle"
                  type="checkbox"
                  :id="`${item.label}_${item.value}`"
                  :name="`${item.label}_${item.value}`"
                />
                <label
                  :class="[
                    searchCheckboxLabelStyle,
                    (checkValues.includes(item.value) ||
                      activeItem === item.value) &&
                      searchCheckboxLabelCheckedStyle,
                  ]"
                  :for="`${item.label}_${item.value}`"
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
              <template v-if="item.tag">
                <span :style="{ lineHeight: THEME.fontSize.sm }">
                  <WizTag
                    :label="item.tag.label"
                    variant="white"
                    width="20px"
                    font-size="xs2"
                  />
                </span>
              </template>
            </WizHStack>
          </div>
          <WizDivider color="gray.300" />
        </div>
      </div>
      <WizSearchPopup
        v-model="checkValues"
        :options="option.children"
        :selectedItem="selectedItem"
        :popupWidth="computedPopupWidth"
        :dy="activeItemIndex || 0"
        :parentScrollAmount="scrollAmount"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  searchCheckboxBlockCheckedStyle,
  searchCheckboxIconStyle,
  searchCheckboxInputStyle,
  searchCheckboxLabelCheckedStyle,
  searchCheckboxLabelStyle,
  searchDropdownCheckboxItemStyle,
  searchDropdownLabelStyle,
  searchDropdownSelectingItemStyle,
  searchPopupBlockBorderRadiusStyle,
  searchPopupBlockBorderRightStyle,
  searchPopupBlockStyle,
  searchPopupDropdownItemStyle,
  searchPopupStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { PropType, computed, ref, watch } from "vue";

import {
  WizDivider,
  WizHStack,
  WizIcon,
  WizSearchPopup,
  WizTag,
} from "@/components";
import { WizICheck, WizIChevronRight } from "@/components/icons";

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
const scrollItems = ref<SearchInputOption[]>([]);
const onScroll = (parentOrder: number) => {
  scrollAmount.value = optionsRef.value?.[0].scrollTop || 0;
  scrollItems.value = props.options[parentOrder].children;
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
      if (mutableSelectedItem.value.includes(item.value)) {
        const index = mutableSelectedItem.value.indexOf(item.value);
        mutableSelectedItem.value.splice(index, 1);
      }
    });
  }
);

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
  scrollAmount.value = optionsRef.value?.[0].scrollTop || 0;
  activeItem.value = value;
  activeItemIndex.value = options.findIndex((option) => option.value === value);
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
