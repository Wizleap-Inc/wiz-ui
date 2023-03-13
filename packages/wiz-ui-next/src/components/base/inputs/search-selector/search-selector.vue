<template>
  <WizPopupContainer :expand="expand">
    <div
      :class="[
        selectBoxStyle,
        inputBorderStyle[state],
        disabled && selectBoxDisabledStyle,
        selectBoxCursorStyle[selectBoxCursor],
      ]"
      :style="{ width: computedWidth }"
    >
      <div :class="selectBoxInnerBoxStyle" @click="toggleDropdown">
        <WizHStack align="center" height="100%" gap="xs" pr="xl" :wrap="true">
          <span
            v-for="item in selectedItem"
            :key="`${item.label}-${item.value}`"
            :class="selectBoxInnerBoxSelectedItemStyle"
          >
            <span :class="selectBoxInnerBoxSelectedLabelStyle">
              {{ item.label }}
            </span>

            <button
              @click="onClear(item.value)"
              @keypress.enter="onClear(item.value)"
              :class="selectBoxInnerBoxCloseButtonStyle"
            >
              <WizIcon
                :icon="WizIClose"
                :class="selectBoxInnerBoxCloseStyle"
                :size="'xs'"
                :color="'gray.500'"
              />
            </button>
          </span>
          <input
            v-if="multiSelectable || !isValueMatched"
            :class="selectBoxSearchInputStyle"
            v-model="searchValue"
            :placeholder="selectedItem.length === 0 ? placeholder : ''"
            ref="inputRef"
            :disabled="disabled"
          />
        </WizHStack>
      </div>
      <button
        :class="selectBoxExpandIconStyle"
        @click="toggleSelectBox"
        :disabled="disabled"
      >
        <WizIcon
          v-if="isOpenDropdown"
          :icon="WizIExpandLess"
          :class="selectBoxInnerBoxLessStyle"
          :color="!isOpenDropdown ? 'white.800' : 'green.800'"
        />

        <WizIcon
          v-else-if="!isOpenDropdown"
          :icon="WizIExpandMore"
          :class="selectBoxInnerBoxMoreStyle"
        />
      </button>
    </div>
    <WizPopup
      layer="popover"
      :isOpen="isOpenDropdown"
      @onClose="isOpenDropdown = false"
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
          <WizPopupButtonGroup v-if="addButtonEnabled" :options="[addButton]" />
          <div
            v-for="option in filteredOptions"
            :key="`${option.label}-${option.value}`"
            :class="selectBoxSelectorOptionStyle"
            @click="onSelect(option.value)"
            @keypress.enter="onSelect(option.value)"
            :tabindex="0"
          >
            <span :class="selectBoxSelectorOptionLabelStyle">
              {{ option.label }}
            </span>
            <span
              :class="selectBoxSelectorOptionLabelStyle"
              v-if="option.exLabel"
            >
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
  selectBoxSelectorOptionLabelStyle,
  selectBoxSearchInputStyle,
  selectBoxExpandIconStyle,
  selectBoxInnerBoxSelectedItemStyle,
  selectBoxInnerBoxSelectedLabelStyle,
  selectBoxInnerBoxCloseButtonStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-selector.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, inject, PropType } from "vue";

import {
  WizPopupContainer,
  WizPopup,
  WizIcon,
  WizPopupButtonGroup,
} from "@/components";
import {
  WizIExpandLess,
  WizIExpandMore,
  WizIClose,
  WizIAddCircle,
} from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { ButtonGroupItem } from "../../popup-button-group/types";
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
  addable: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isOpenDropdown = ref(false);
const searchValue = ref("");
const addableOptionIsClicking = ref(false);

const onHoldClick = () => {
  addableOptionIsClicking.value = true;
  const mouseup = () => {
    addableOptionIsClicking.value = false;
    document.removeEventListener("mouseup", mouseup);
  };
  document.addEventListener("mouseup", mouseup);
};

const inputRef = ref<HTMLElement | undefined>();
const toggleDropdown = () => {
  if (props.disabled) return;
  if (
    !props.multiSelectable &&
    props.modelValue.length > 0 &&
    isOpenDropdown.value
  ) {
    return (isOpenDropdown.value = false);
  }
  isOpenDropdown.value = true;
  inputRef.value?.focus();
};

const deepCopy = <T>(ary: T): T => JSON.parse(JSON.stringify(ary));

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

const filteredOptions = computed(() => {
  const sortedOptions =
    searchValue.value.length !== 0
      ? sortByLevenshtein(deepCopy(props.options), searchValue.value)
      : props.options;
  const removeSelectedOptions = (options: SelectBoxOption[]) => {
    return options.filter((v) => {
      return !selectedItem.value.some((item) => item.value === v.value);
    });
  };
  return removeSelectedOptions(sortedOptions);
});

const toggleSelectBox = () => {
  if (!props.disabled) isOpenDropdown.value = !isOpenDropdown.value;
};

interface Emit {
  (e: "update:modelValue", modelValue: number): void;
  (e: "unselect", value: number): void;
  (e: "add", label: string): void;
}
const emit = defineEmits<Emit>();

const onClear = (n: number) => {
  emit("unselect", n);
};
const onSelect = (value: number) => {
  if (!props.multiSelectable) {
    toggleSelectBox();
    props.modelValue.forEach((v) => {
      onClear(v);
    });
  }
  searchValue.value = "";
  emit("update:modelValue", value);
  toggleDropdown();
};
const onCreate = (label: string) => {
  emit("add", label);
  searchValue.value = "";
};

const selectBoxCursor = computed(() => {
  if (props.disabled) return "disabled";
  if (!props.multiSelectable && props.modelValue.length > 0)
    return "singleSelected";
  return "default";
});

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const computedWidth = computed(() => (props.expand ? "100%" : props.width));

const state = computed(() => {
  if (isError.value) return "error";
  if (isOpenDropdown.value) return "active";
  return "default";
});

const isValueMatched = computed(() => {
  return props.modelValue.length > 0;
});

const addButtonEnabled = computed(
  () =>
    props.addable &&
    searchValue.value !== "" &&
    !props.options.some((v) => v.label === searchValue.value)
);

const addButton = computed(() => {
  const option: ButtonGroupItem = {
    kind: "button",
    option: {
      label: searchValue.value,
      icon: addButtonEnabled.value ? WizIAddCircle : undefined,
      iconDefaultColor: "green.800",
      value: -1,
      onClick: () => {
        onCreate(searchValue.value);
      },
    },
  };
  return option;
});
</script>
