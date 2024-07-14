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
            <div v-if="item.children" :class="styles.searchDropdownItemStyle">
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
                  :pl="
                    !allOptionsHaveChildren(option.children) && !singleSelect
                      ? 'lg'
                      : 'no'
                  "
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
            <div
              v-else-if="singleSelect"
              :class="[styles.searchDropdownItemStyle]"
            >
              <button
                :id="`${item.label}_${item.value}`"
                type="button"
                :class="[styles.searchDropdownSingleSelectItemStyle]"
                width="100%"
                gap="xs2"
                @click="handleClickButton(item.value)"
              >
                <div :class="styles.searchInputLabelStyle">
                  {{ item.label }}
                </div>
              </button>
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
        :singleSelect="singleSelect"
        @toggle="emit('toggle', $event)"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { PropType, computed, ref, watch } from "vue";

import {
  WizCheckBoxNew,
  WizDivider,
  WizHStack,
  WizIcon,
  WizSearchPopup,
  WizTag,
} from "@/components";
import { WizIChevronRight } from "@/components/icons";

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
  emptyMessage: {
    type: String,
    required: true,
  },
  singleSelect: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "toggle", value: boolean): void;
  (e: "update:modelValue", value: number[]): void;
  (e: "mouseover", id: number, isChild: boolean): void;
}>();

const activeItem = ref<number | null>();
const activeItemIndex = ref<number | null>(null);

const ITEM_HEIGHT = 44;
const DIVIDER_HEIGHT = 0.8;
const allOptionsHaveChildren = (options: SearchInputOption[]) =>
  options.every((option) => !!option.children);

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
  scrollItems.value = props.options[parentOrder].children ?? [];
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

const onMouseover = (value: number, options?: SearchInputOption[]) => {
  scrollAmount.value = optionsRef.value?.[0].scrollTop || 0;
  activeItem.value = value;
  if (!options) return;
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

const handleClickCheckbox = (value: number) => {
  if (checkValues.value.includes(value)) {
    checkValues.value = checkValues.value.filter((v) => v !== value);
  } else {
    checkValues.value = [...checkValues.value, value];
  }
};

const handleClickButton = (value: number) => {
  checkValues.value = [value];
  emit("toggle", false);
};
</script>
