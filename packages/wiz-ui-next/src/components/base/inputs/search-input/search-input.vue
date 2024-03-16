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
      <WizHStack>
        <div
          v-if="filteredOptions.length"
          :class="[
            styles.searchBlockStyle,
            styles.searchBlockBorderRadiusStyle,
            isBorder && styles.searchBlockBorderStyle,
          ]"
          :style="{ width: computedPopupWidth }"
        >
          <div
            v-for="(item, key) in filteredOptions"
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
                @mouseover="onMouseover(item.value)"
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
                  <WizHStack gap="xs" nowrap>
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
              :class="styles.searchDropdownItemStyle"
            >
              <button
                :id="`${item.label}_${item.value}`"
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
            <div v-else :class="styles.searchDropdownCheckboxItemStyle">
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
        <WizSearchPopup
          v-model="checkValues"
          :options="filteredOptions"
          :selectedItem="selectedItem"
          :popupWidth="computedPopupWidth"
          :emptyMessage="emptyMessage"
          :singleSelect="singleSelect"
        />
      </WizHStack>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, onMounted, ref, watch } from "vue";

import {
  WizCheckBoxNew,
  WizDivider,
  WizHStack,
  WizISearch,
  WizIcon,
  WizPopup,
  WizPopupContainer,
  WizSearchPopup,
  WizTag,
} from "@/components";
import { TIcon, WizIChevronRight } from "@/components/icons";

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
  singleSelect: {
    type: Boolean,
    required: false,
    default: false,
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
  openPopup: {
    type: Boolean,
    required: true,
  },
  isDirectionFixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    type: Object as PropType<TIcon>,
    required: false,
    default: WizISearch,
  },
  emptyMessage: {
    type: String,
    required: false,
    default: "選択肢がありません。",
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void;
  (e: "click"): void;
  (e: "toggle", value: boolean): void;
}>();

const checkValues = computed({
  get: () => props.modelValue,
  set: (value: number[]) => emit("update:modelValue", value),
});

const searchValue = ref("");
const filteredOptions = ref<SearchInputOption[]>([]);
const selectedItem = ref<number[]>([]);
const activeItem = ref<number | null>();
const activeItemIndex = ref<number | null>(null);
const hasFocus = ref(false);
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
  activeItemIndex.value = filteredOptions.value.findIndex(
    (option) => option.value === value
  );
  selectedItem.value = [];
  if (!selectedItem.value.includes(value)) {
    selectedItem.value.push(value);
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
  if (checkValues.value.includes(value)) {
    checkValues.value = [];
  } else {
    checkValues.value = [value];
  }
  emit("toggle", false);
};

const selectedStatus = (value: number) => {
  return checkValues.value.includes(value) ? "selected" : "default";
};

const filterOptions =
  (match: (label: string) => boolean) =>
  (options: SearchInputOption[]): SearchInputOption[] =>
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

watch(searchValue, () => {
  selectedItem.value = [];
  emit("toggle", true);
  if (searchValue.value.length) {
    filteredOptions.value = filterOptions(searchBy(searchValue.value))(
      props.options
    );
  } else {
    filteredOptions.value = props.options;
  }
});

onMounted(() => {
  filteredOptions.value = props.options;
});
</script>
