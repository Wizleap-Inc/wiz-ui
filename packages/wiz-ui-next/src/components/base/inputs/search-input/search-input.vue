<template>
  <WizPopupContainer :expand="expand">
    <div :class="searchStyle">
      <input
        type="text"
        :class="[
          searchInputStyle,
          disabled && searchInputDisabledStyle,
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
      <component :is="icon" :class="searchInputIconStyle" />
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
            searchBlockStyle,
            searchBlockBorderRadiusStyle,
            isBorder && searchBlockBorderStyle,
          ]"
          :style="{ width: computedPopupWidth }"
        >
          <div
            v-for="(option, key) in filteredOptions"
            :key="`${option.label}_${option.value}_${key}`"
          >
            <!-- Dropdown -->
            <div v-if="option.children.length" :class="searchDropdownItemStyle">
              <WizHStack
                align="center"
                justify="between"
                :class="[
                  searchDropdownLabelStyle,

                  selectedItem.includes(option.value) &&
                    searchDropdownSelectingItemStyle,
                ]"
                @mouseover="onMouseover(option.value)"
                @mouseout="activeItem = null"
              >
                <template v-if="option.tag">
                  <WizHStack width="100%" justify="between" align="center">
                    <div style="width: calc(100% - 4.5rem)">
                      {{ option.label }}
                    </div>
                    <WizHStack gap="xs" width="70px">
                      <WizSearchInputTag :label="option.tag.label" />
                      <WizIcon
                        size="xl2"
                        :icon="WizIChevronRight"
                        :color="computedIconColor(option.value)"
                      />
                    </WizHStack>
                  </WizHStack>
                </template>
                <!-- Tagなし -->
                <template v-else>
                  {{ option.label }}
                  <WizIcon
                    size="xl2"
                    :icon="WizIChevronRight"
                    :color="computedIconColor(option.value)"
                  />
                </template>
              </WizHStack>
            </div>
            <!-- Checkbox -->
            <div
              v-else
              :class="searchDropdownCheckboxItemStyle"
              @mouseover="activeItem = option.value"
              @mouseout="activeItem = null"
            >
              <!-- Tag + Checkbox -->
              <template v-if="option.tag">
                <WizHStack width="100%" justify="between" align="center">
                  <div style="width: `calc(100% - 2.5rem) `">
                    <input
                      v-model="checkValues"
                      :value="option.value"
                      :class="searchCheckboxInputStyle"
                      type="checkbox"
                      :id="`${option.label}_${option.value}`"
                      :name="`${option.label}_${option.value}`"
                    />
                    <label
                      :class="[
                        searchCheckboxLabelStyle,
                        (checkValues.includes(option.value) ||
                          activeItem === option.value) &&
                          searchCheckboxLabelCheckedStyle,
                      ]"
                      :for="`${option.label}_${option.value}`"
                      @mouseover="
                        selectedItem = [];
                        isBorder = false;
                      "
                    >
                      <WizICheck
                        v-if="checkValues.includes(option.value)"
                        :class="searchCheckboxIconStyle"
                      />
                      <span
                        :class="[
                          (checkValues.includes(option.value) ||
                            activeItem === option.value) &&
                            searchCheckboxBlockCheckedStyle,
                        ]"
                        >{{ option.label }}</span
                      >
                    </label>
                  </div>
                  <WizSearchInputTag :label="option.tag.label" />
                </WizHStack>
              </template>
              <!-- Tagなし -->
              <template v-else>
                <input
                  v-model="checkValues"
                  :value="option.value"
                  :class="searchCheckboxInputStyle"
                  type="checkbox"
                  :id="`${option.label}_${option.value}`"
                  :name="`${option.label}_${option.value}`"
                />
                <label
                  :class="[
                    searchCheckboxLabelStyle,
                    (checkValues.includes(option.value) ||
                      activeItem === option.value) &&
                      searchCheckboxLabelCheckedStyle,
                  ]"
                  :for="`${option.label}_${option.value}`"
                  @mouseover=""
                >
                  <WizICheck
                    v-if="checkValues.includes(option.value)"
                    :class="searchCheckboxIconStyle"
                  />
                  <span
                    :class="[
                      (checkValues.includes(option.value) ||
                        activeItem === option.value) &&
                        searchCheckboxBlockCheckedStyle,
                    ]"
                    >{{ option.label }}</span
                  >
                </label>
              </template>
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
import {
  searchBlockBorderRadiusStyle,
  searchBlockBorderStyle,
  searchBlockStyle,
  searchCheckboxBlockCheckedStyle,
  searchCheckboxIconStyle,
  searchCheckboxInputStyle,
  searchCheckboxLabelCheckedStyle,
  searchCheckboxLabelStyle,
  searchDropdownCheckboxItemStyle,
  searchDropdownItemStyle,
  searchDropdownLabelStyle,
  searchDropdownSelectingItemStyle,
  searchInputDisabledStyle,
  searchInputIconStyle,
  searchInputStyle,
  searchStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, onMounted, ref, watch } from "vue";

import {
  WizDivider,
  WizHStack,
  WizISearch,
  WizIcon,
  WizPopup,
  WizPopupContainer,
  WizSearchInputTag,
  WizSearchPopup,
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
