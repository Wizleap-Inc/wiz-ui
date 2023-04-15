<template>
  <WizPopupContainer>
    <div :class="styles.searchStyle">
      <input
        type="text"
        :class="[
          styles.searchInputStyle,
          disabled && styles.searchInputDisabledStyle,
          commonStyles.inputBorderStyle[state],
        ]"
        :style="{ width: computedInputWidth }"
        v-model="searchValue"
        :placeholder="placeholder"
        :name="name"
        :disabled="disabled"
        @focusin="hasFocus = true"
        @focusout="hasFocus = false"
        @click="
          emit('toggle', true);
          selectedItem = [];
        "
        autocomplete="off"
      />
      <WizISearch :class="styles.searchInputIconStyle" />
    </div>
    <WizPopup :isOpen="openPopup" @onClose="emit('toggle', false)">
      <WizHStack>
        <div
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
            <div
              v-if="option.children.length"
              :class="styles.searchDropdownItemStyle"
            >
              <div
                :class="styles.searchDropdownLabelStyle"
                @mouseover="onMouseover(option.value)"
                @mouseout="activeItem = null"
              >
                {{ option.label }}
                <WizIcon
                  size="xl2"
                  :icon="WizIChevronRight"
                  :color="computedIconColor(option.value)"
                />
              </div>
            </div>
            <div
              v-else
              :class="styles.searchDropdownCheckboxItemStyle"
              @mouseover="activeItem = option.value"
              @mouseout="activeItem = null"
            >
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
            <WizDivider v-if="key !== options.length - 1" color="gray.300" />
          </div>
        </div>
        <WizSearchPopup
          :values="values"
          @input="inputValues"
          :options="options"
          :selectedItem="selectedItem"
          :popupWidth="computedPopupWidth"
        />
      </WizHStack>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, watch, PropType, onMounted } from "vue";

import {
  WizHStack,
  WizDivider,
  WizISearch,
  WizPopupContainer,
  WizPopup,
  WizSearchPopup,
  WizIcon,
} from "@/components";
import { WizIChevronRight, WizICheck } from "@/components/icons";

import { SearchInputOption } from "./types";

defineOptions({
  name: ComponentName.SearchInput,
});

const props = defineProps({
  options: {
    type: Array as PropType<SearchInputOption[]>,
    required: true,
  },
  values: {
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
});

const emit = defineEmits<{
  (e: "input", value: number[]): void;
  (e: "click"): void;
  (e: "toggle", value: boolean): void;
}>();

const checkValues = computed({
  get: () => props.values,
  set: (value) => {
    emit("input", value);
  },
});

const inputValues = (value: number[]) => {
  emit("input", value);
};

const searchValue = ref("");
const filteredOptions = ref<SearchInputOption[]>([]);
const selectedItem = ref<number[]>([]);
const activeItem = ref<number | null>();
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
  selectedItem.value = [];
  if (!selectedItem.value.includes(value)) {
    selectedItem.value.push(value);
  }
};

watch(searchValue, () => {
  selectedItem.value = [];
  emit("toggle", true);
  if (searchValue.value.length) {
    filteredOptions.value = props.options.filter((option) => {
      return option.label.indexOf(searchValue.value[0]) !== -1;
    });
  } else {
    filteredOptions.value = props.options;
  }
});

onMounted(() => {
  filteredOptions.value = props.options;
});
</script>
