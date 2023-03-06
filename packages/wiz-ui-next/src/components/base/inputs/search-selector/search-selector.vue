<template>
  <WizPopupContainer v-model="openSelectBox" :expand="expand">
    <div
      :class="[
        selectBoxStyle,
        inputBorderStyle[state],
        disabled && selectBoxDisabledStyle,
        selectBoxCursorStyle[selectBoxCursor],
      ]"
      :style="{ width: computedWidth, height: 'auto' }"
    >
      <div :class="selectBoxInnerBoxStyle" @click="focusInput">
        <WizHStack align="center" height="100%" gap="xs" pr="xl" :wrap="true">
          <span
            v-for="item in selectedItem"
            :key="`${item.label}-${item.value}`"
            :class="selectBoxInnerBoxSelectedItemStyle"
          >
            <span :class="selectBoxInnerBoxSelectedLabelStyle">
              {{ item.label }}
            </span>

            <span
              @click="onClear(item.value)"
              :tabindex="0"
              @keypress.enter="onClear(item.value)"
            >
              <WizIcon
                :icon="WizIClose"
                :class="selectBoxInnerBoxCloseStyle"
                :size="'xs'"
                :color="'gray.500'"
              />
            </span>
          </span>
          <input
            v-if="multiSelectable || !isValueMatched"
            :class="selectBoxSearchInputStyle"
            v-model="searchValue"
            :placeholder="selectedItem.length === 0 ? placeholder : ''"
            ref="inputRef"
          />
          <span
            :class="selectBoxExpandIconStyle"
            @click="toggleSelectBox"
            :tabindex="0"
          >
            <WizIcon
              v-if="openSelectBox"
              :icon="WizIExpandLess"
              :class="selectBoxInnerBoxLessStyle"
              :color="!openSelectBox ? 'white.800' : 'green.800'"
            />

            <WizIcon
              v-else-if="!openSelectBox"
              :icon="WizIExpandMore"
              :class="selectBoxInnerBoxMoreStyle"
            />
          </span>
        </WizHStack>
      </div>
    </div>
    <WizPopup
      layer="popover"
      :isOpen="openSelectBox"
      @onClose="openSelectBox = false"
    >
      <div
        :class="selectBoxSelectorStyle"
        :style="{ minWidth: width }"
        v-if="
          filteredOptions.length > 0 ||
          (searchValue !== '' && !options.some((v) => v.label === searchValue))
        "
      >
        <WizVStack gap="xs2">
          <div
            :class="selectBoxSelectorOptionStyle"
            @click="onCreate(searchValue)"
            @mousedown="addableOptionIsClicking = true"
            @mouseup="addableOptionIsClicking = false"
            v-if="
              searchValue !== '' &&
              !options.some((v) => v.label === searchValue)
            "
            @keypress.enter="onCreate(searchValue)"
            :tabindex="0"
          >
            <span :class="selectBoxAddStyle">
              {{ searchValue }}
              <WizIcon
                :icon="WizIAddCircle"
                size="md"
                :color="addableOptionIsClicking ? 'white.800' : 'green.800'"
              />
            </span>
          </div>
          <div
            v-for="option in filteredOptions"
            :key="`${option.label}-${option.value}`"
            :class="selectBoxSelectorOptionStyle"
            @click="onSelect(option.value)"
            @keypress.enter="onSelect(option.value)"
            :tabindex="0"
          >
            <span>
              {{ option.label }}
            </span>
            <span v-if="option.exLabel">
              {{ option.exLabel }}
            </span>
          </div>
        </WizVStack>
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  selectBoxStyle,
  selectBoxDisabledStyle,
  selectBoxCursorStyle,
  selectBoxInnerBoxStyle,
  selectBoxInnerBoxCloseStyle,
  selectBoxInnerBoxLessStyle,
  selectBoxInnerBoxMoreStyle,
  selectBoxSelectorStyle,
  selectBoxSelectorOptionStyle,
  selectBoxSearchInputStyle,
  selectBoxAddStyle,
  selectBoxExpandIconStyle,
  selectBoxInnerBoxSelectedItemStyle,
  selectBoxInnerBoxSelectedLabelStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-selector.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, inject, PropType } from "vue";

import { WizPopupContainer, WizPopup, WizIcon } from "@/components";
import {
  WizIExpandLess,
  WizIExpandMore,
  WizIClose,
  WizIAddCircle,
} from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { WizHStack, WizVStack } from "../../stack";

import { levenshteinDistance } from "./levenshtein-distance";
import { SelectBoxOption } from "./types";

defineOptions({
  name: ComponentName.SelectBox,
});

const props = defineProps({
  options: {
    type: Array as PropType<SelectBoxOption[]>,
    required: true,
  },
  modelValue: {
    type: Array as PropType<number[]>,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "選択してください",
  },
  width: {
    type: String,
    required: false,
    default: "10rem",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  expand: {
    type: Boolean,
    required: false,
  },
  multiSelectable: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const openSelectBox = ref(false);
const searchValue = ref("");
const addableOptionIsClicking = ref(false);

const inputRef = ref<HTMLElement | undefined>();
const focusInput = () => {
  openSelectBox.value = true;
  inputRef.value?.focus();
};

const deepCopy = <T>(ary: T[]): T[] => JSON.parse(JSON.stringify(ary));

const sortByLevenshtein = (options: SelectBoxOption[], target: string) => {
  const dist = options.reduce((acc, str) => {
    acc[str.label] = levenshteinDistance(str.label, target);
    return acc;
  }, {} as { [key: string]: number });
  return options.sort((a, b) => dist[a.label] - dist[b.label]);
};

const valueToOption = computed(() =>
  props.options.reduce((acc, item) => {
    acc[item.value] = item;
    return acc;
  }, {} as { [value: number]: SelectBoxOption })
);

const selectedItem = computed(() => {
  return props.modelValue.map((v) => valueToOption.value[v]);
});

const filteredOptions = computed(() =>
  (searchValue.value.length === 0
    ? props.options
    : sortByLevenshtein(deepCopy(props.options), searchValue.value)
  ).filter((v) => !selectedItem.value.some((opt) => opt.value === v.value))
);
const toggleSelectBox = () => {
  if (!props.disabled) openSelectBox.value = !openSelectBox.value;
};

interface Emit {
  (e: "update:modelValue", modelValue: number): void;
  (e: "clear", value: number): void;
  (e: "selectNewLabel", label: string): void;
}
const emit = defineEmits<Emit>();

const onClear = (n: number) => {
  emit("clear", n);
};
const onSelect = (value: number) => {
  if (!props.multiSelectable) {
    toggleSelectBox();
    props.modelValue.forEach((v, _) => {
      onClear(v);
    });
  }
  searchValue.value = "";
  emit("update:modelValue", value);
  focusInput();
};
const onCreate = (label: string) => {
  emit("selectNewLabel", label);
  searchValue.value = "";
};

const selectBoxCursor = computed(() =>
  props.disabled ? "disabled" : "default"
);

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const computedWidth = computed(() => (props.expand ? "100%" : props.width));

const state = computed(() => {
  if (isError.value) return "error";
  if (openSelectBox.value) return "active";
  return "default";
});

const isValueMatched = computed(() => {
  return props.modelValue.length > 0;
});
</script>
