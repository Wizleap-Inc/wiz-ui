<template>
  <WizPopupContainer v-model="openSelectBox" :expand="expand">
    <div
      :class="[
        selectBoxStyle,
        inputBorderStyle[state],
        disabled && selectBoxDisabledStyle,
        selectBoxCursorStyle[selectBoxCursor],
      ]"
      :style="{ width: computedWidth }"
    >
      <div :class="selectBoxInnerBoxStyle" @click="toggleSelectBox">
        <WizHStack align="center" justify="between" height="100%">
          <span
            v-if="selectedItem !== undefined"
            :class="selectBoxInnerBoxSelectedValueStyle"
          >
            {{ selectedItem }}
            <span @click="onClear()">
              <WizIcon
                v-if="selectedItem !== undefined"
                :icon="WizIClose"
                :class="selectBoxInnerBoxCloseStyle"
                :size="'xs'"
                :color="'gray.500'"
              />
            </span>
          </span>
          <span
            v-if="multiSelectable || !isValueMatched"
            :class="selectBoxPlaceholderStyle"
          >
            <input
              :class="selectBoxSearchInputStyle"
              v-model="searchValue"
              :placeholder="!isValueMatched ? placeholder : undefined"
            />
          </span>
          <WizIcon
            v-if="openSelectBox"
            :icon="WizIExpandLess"
            :class="selectBoxInnerBoxLessStyle"
          />

          <WizIcon
            v-else-if="!openSelectBox"
            :icon="WizIExpandMore"
            :class="selectBoxInnerBoxMoreStyle"
          />
        </WizHStack>
      </div>
    </div>
    <WizPopup layer="popover">
      <div :class="selectBoxSelectorStyle" :style="{ minWidth: width }">
        <WizVStack gap="xs2">
          <div
            :class="selectBoxSelectorOptionStyle"
            @click="() => onCreate(searchValue)"
            @mousedown="() => (addableOptionIsClicking = true)"
            @mouseup="() => (addableOptionIsClicking = false)"
            v-if="
              searchValue !== '' &&
              !filteredOptions.some((v) => v.label === searchValue)
            "
          >
            <!-- // TODO: Icon変更 -->
            <span :class="selectBoxAddStyle">
              {{ searchValue }}
              <WizIcon
                :icon="WizIAdd"
                :size="'sm'"
                :color="addableOptionIsClicking ? 'white.800' : 'green.800'"
              />
            </span>
          </div>
          <div
            :class="selectBoxSelectorOptionStyle"
            v-for="(option, key) in filteredOptions"
            :key="'option' + key"
            @click="onSelect(option.value)"
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
  selectBoxInnerBoxSelectedValueStyle,
  selectBoxInnerBoxCloseStyle,
  selectBoxInnerBoxLessStyle,
  selectBoxInnerBoxMoreStyle,
  selectBoxSelectorStyle,
  selectBoxSelectorOptionStyle,
  selectBoxPlaceholderStyle,
  selectBoxSearchInputStyle,
  selectBoxAddStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-selector.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, inject, PropType } from "vue";

import { WizPopupContainer, WizPopup, WizIcon } from "@/components";
import {
  WizIExpandLess,
  WizIExpandMore,
  WizIClose,
  WizIAdd,
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
    type: Number,
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

const deepCopy = <T>(ary: T[]): T[] => JSON.parse(JSON.stringify(ary));

const sortByLevenshtein = (options: SelectBoxOption[], target: string) => {
  const dist = options.reduce((acc, str) => {
    acc[str.label] = levenshteinDistance(str.label, target);
    return acc;
  }, {} as { [key: string]: number });
  return options.sort((a, b) => dist[a.label] - dist[b.label]);
};

const filteredOptions = computed(() =>
  searchValue.value.length === 0
    ? props.options
    : sortByLevenshtein(deepCopy(props.options), searchValue.value)
);

const selectedItem = computed(() => {
  const option = props.options.find((v) => v.value === props.modelValue);
  return option?.label;
});
const toggleSelectBox = () => {
  if (!props.disabled) openSelectBox.value = !openSelectBox.value;
};

interface Emit {
  (e: "update:modelValue", modelValue: number): void;
  (e: "clear"): void;
  (e: "selectNewLabel", label: string): void;
}
const emit = defineEmits<Emit>();

const onClear = () => {
  emit("clear");
};
const onSelect = (value: number) => {
  const option = selectedItem.value;
  if (typeof option === undefined) {
    onClear();
  } else {
    searchValue.value = "";
    toggleSelectBox();
    emit("update:modelValue", value);
  }
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
  return props.options.some((option) => option.value === props.modelValue);
});
</script>
