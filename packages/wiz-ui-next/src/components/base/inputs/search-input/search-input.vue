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
            v-for="(option, key) in filteredOptions"
            :key="`${option.label}_${option.value}_${key}`"
          >
            <!-- Dropdown -->
            <div
              v-if="option.children.length"
              :class="styles.searchDropdownItemStyle"
            >
              <WizHStack
                align="center"
                justify="between"
                :class="[
                  styles.searchDropdownLabelStyle,
                  selectedItem.includes(option.value) &&
                    styles.searchDropdownSelectingItemStyle,
                ]"
                @mouseover="onMouseover(option.value)"
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
                    {{ option.label }}
                  </div>
                  <WizHStack gap="xs" nowrap>
                    <template v-if="option.tag">
                      <WizTag
                        :label="option.tag.label"
                        variant="white"
                        width="20px"
                        font-size="xs2"
                      />
                    </template>
                    <WizIcon
                      size="xl2"
                      :icon="WizIChevronRight"
                      :color="computedIconColor(option.value)"
                    />
                  </WizHStack>
                </WizHStack>
              </WizHStack>
            </div>
            <!-- Checkbox -->
            <div
              v-else
              :class="styles.searchDropdownCheckboxItemStyle"
              @mouseover="activeItem = option.value"
              @mouseout="activeItem = null"
            >
              <WizHStack width="100%" align="center" nowrap gap="xs2">
                <div :class="styles.searchInputLabelStyle" width="100%">
                  <input
                    v-model="checkValues"
                    :value="option.value"
                    :class="styles.searchCheckboxInputStyle"
                    type="checkbox"
                    :id="`${option.label}_${option.value}`"
                    :name="`${option.label}_${option.value}`"
                  />
                  <label
                    :class="[
                      styles.searchCheckboxLabelStyle,
                      (checkValues.includes(option.value) ||
                        activeItem === option.value) &&
                        styles.searchCheckboxLabelCheckedStyle,
                    ]"
                    :for="`${option.label}_${option.value}`"
                    @mouseover="
                      selectedItem = [];
                      isBorder = false;
                    "
                  >
                    <WizICheck
                      v-if="checkValues.includes(option.value)"
                      :class="styles.searchCheckboxIconStyle"
                    />
                    <span
                      :class="[
                        (checkValues.includes(option.value) ||
                          activeItem === option.value) &&
                          styles.searchCheckboxBlockCheckedStyle,
                      ]"
                      >{{ option.label }}</span
                    >
                  </label>
                </div>
                <template v-if="option.tag">
                  <WizTag
                    :label="option.tag.label"
                    variant="white"
                    width="20px"
                    font-size="xs2"
                  />
                </template>
              </WizHStack>
            </div>
            <WizDivider color="gray.300" />
          </div>
        </div>
        <WizSearchPopup
          v-model="checkValues"
          :options="filteredOptions"
          :selectedItem="selectedItem"
          :popupWidth="computedPopupWidth"
          :dy="activeItemIndex || 0"
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
  WizDivider,
  WizHStack,
  WizISearch,
  WizIcon,
  WizPopup,
  WizPopupContainer,
  WizSearchPopup,
  WizTag,
} from "@/components";
import { TIcon, WizICheck, WizIChevronRight } from "@/components/icons";

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

const filterOptions =
  (match: (label: string) => boolean) =>
  (options: SearchInputOption[]): SearchInputOption[] =>
    options.flatMap((option) => {
      if (option.children.length === 0) {
        return match(option.label) ? [option] : [];
      }
      if (match(option.label)) return [option];
      const children = filterOptions(match)(option.children);
      if (children.length === 0) return [];
      return [
        {
          ...option,
          children: children,
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
