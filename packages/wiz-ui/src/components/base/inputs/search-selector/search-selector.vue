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
            v-for="(item, i) in selectedItem"
            :key="`${item.label}-${item.value}`"
            :class="selectBoxInnerBoxSelectedItemStyle"
          >
            <span :class="selectBoxInnerBoxSelectedLabelStyle">
              {{ item.label }}
            </span>
            <button
              type="button"
              @click="onClear(item.value)"
              @keypress.enter="onClear(item.value)"
              @keydown="(e) => onKeydownBackspace.unselect(item.value, e)"
              :class="selectBoxInnerBoxCloseButtonStyle"
              :ref="setUnselectableRef(i)"
              :aria-label="ARIA_LABELS.SEARCH_SELECTOR.UNSELECT"
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
            :value="searchValue"
            @input="onSetSearchValue"
            :placeholder="selectedItem.length === 0 ? placeholder : ''"
            ref="inputRef"
            :disabled="disabled"
            @keydown="onKeydownBackspace.focus"
          />
        </WizHStack>
      </div>
      <button
        type="button"
        :class="selectBoxExpandIconStyle"
        @click="toggleSelectBox"
        :disabled="disabled"
        :aria-label="ARIA_LABELS.SEARCH_SELECTOR.EXPAND"
      >
        <WizIcon
          v-if="isOpen"
          :icon="WizIExpandLess"
          :class="selectBoxInnerBoxLessStyle"
          :color="!isOpen ? 'white.800' : 'green.800'"
        />

        <WizIcon
          v-else-if="!isOpen"
          :icon="WizIExpandMore"
          :class="selectBoxInnerBoxMoreStyle"
        />
      </button>
    </div>
    <WizPopup
      layer="popover"
      :isOpen="isOpen"
      :isDirectionFixed="isDirectionFixed"
      @onClose="emit('toggle', false)"
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
          <WizPopupButtonGroup
            :options="
              addButtonEnabled ? [addButton, ...selectButtons] : selectButtons
            "
          />
        </WizVStack>
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  selectBoxCursorStyle,
  selectBoxDisabledStyle,
  selectBoxExpandIconStyle,
  selectBoxInnerBoxCloseButtonStyle,
  selectBoxInnerBoxCloseStyle,
  selectBoxInnerBoxLessStyle,
  selectBoxInnerBoxMoreStyle,
  selectBoxInnerBoxSelectedItemStyle,
  selectBoxInnerBoxSelectedLabelStyle,
  selectBoxInnerBoxStyle,
  selectBoxSearchInputStyle,
  selectBoxSelectorStyle,
  selectBoxStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-selector.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { ComponentPublicInstance, PropType, computed, inject, ref } from "vue";

import {
  WizIcon,
  WizPopup,
  WizPopupButtonGroup,
  WizPopupContainer,
} from "@/components";
import {
  WizIAddCircle,
  WizIClose,
  WizIExpandLess,
  WizIExpandMore,
} from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { ButtonGroupItem } from "../../popup-button-group/types";
import { WizHStack, WizVStack } from "../../stack";

import { levenshteinDistance } from "./levenshtein-distance";
import { SelectBoxOption } from "./types";

defineOptions({
  name: ComponentName.SearchSelector,
});

interface Emit {
  (e: "input", value: number): void;
  (e: "unselect", value: number): void;
  (e: "add", label: string): void;
  (e: "toggle", value: boolean): void;
  (e: "setSearchValue", value: string): void;
}

const props = defineProps({
  options: {
    type: Array as PropType<SelectBoxOption[]>,
    required: true,
  },
  value: {
    type: Array as PropType<number[]>,
    required: true,
  },
  searchValue: {
    type: String,
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
  isOpen: {
    type: Boolean,
    required: true,
  },
  isDirectionFixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits<Emit>();

const inputRef = ref<HTMLElement | undefined>();
const backspaceUnselectableRef = ref();

const toggleDropdown = () => {
  if (props.disabled) return;
  if (!props.multiSelectable && props.value.length > 0 && props.isOpen) {
    return emit("toggle", false);
  }
  emit("toggle", true);
  inputRef.value?.focus();
};

const deepCopy = <T>(ary: T): T => JSON.parse(JSON.stringify(ary));

const selectByLevenshteinAndPartialMatch = (
  options: SelectBoxOption[],
  target: string
) => {
  const dist = options.reduce((acc, str) => {
    acc[str.label] = levenshteinDistance(str.label, target);
    return acc;
  }, {} as { [key: string]: number });
  const minLength = Math.min(...Object.values(dist));
  const closestWords = options.filter(
    (option) => dist[option.label] === minLength
  );

  const exactMatch = options.filter((option) => {
    const isIncluded = option.label.indexOf(target) !== -1;
    return isIncluded && !closestWords.includes(option);
  });
  return closestWords.concat(exactMatch);
};

const valueToOption = computed(() =>
  props.options.reduce((acc, item) => {
    acc[item.value] = item;
    return acc;
  }, {} as { [value: number]: SelectBoxOption })
);

const selectedItem = computed(() => {
  return props.value.map((v) => valueToOption.value[v]);
});

const setUnselectableRef =
  (index: number) => (el: ComponentPublicInstance | Element | null) => {
    if (el && index === selectedItem.value.length - 1)
      backspaceUnselectableRef.value = el;
  };

const filteredOptions = computed(() => {
  const sortedOptions =
    props.searchValue.length !== 0
      ? selectByLevenshteinAndPartialMatch(
          deepCopy(props.options),
          props.searchValue
        )
      : props.options;
  const removeSelectedOptions = (options: SelectBoxOption[]) => {
    return options.filter((v) => {
      return !selectedItem.value.some((item) => item.value === v.value);
    });
  };
  return removeSelectedOptions(sortedOptions);
});

const toggleSelectBox = () => {
  if (!props.disabled) emit("toggle", !props.isOpen);
};

const onClear = (n: number) => {
  emit("unselect", n);
  inputRef.value?.focus();
};

const onSetSearchValue = (e: Event) => {
  const text = (e.target as HTMLInputElement).value;
  emit("setSearchValue", text);
};

const onKeydownBackspace = {
  focus: (event: KeyboardEvent) => {
    if (
      event.key === "Backspace" &&
      props.searchValue === "" &&
      props.value.length > 0
    ) {
      backspaceUnselectableRef.value?.focus();
    }
  },
  unselect: (n: number, event: KeyboardEvent) => {
    if (event.key === "Backspace") {
      onClear(n);
    }
  },
};

const onSelect = (value: number) => {
  if (!props.multiSelectable) {
    toggleSelectBox();
    props.value.forEach((v) => {
      onClear(v);
    });
  }
  emit("setSearchValue", "");
  emit("input", value);
  toggleDropdown();
};
const onCreate = (label: string) => {
  emit("add", label);
  emit("setSearchValue", "");
};

const selectBoxCursor = computed(() => {
  if (props.disabled) return "disabled";
  if (!props.multiSelectable && props.value.length > 0) return "singleSelected";
  return "default";
});

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const computedWidth = computed(() => (props.expand ? "100%" : props.width));

const state = computed(() => {
  if (isError.value) return "error";
  if (props.isOpen) return "active";
  return "default";
});

const isValueMatched = computed(() => {
  return props.value.length > 0;
});

const addButtonEnabled = computed(
  () =>
    props.addable &&
    props.searchValue !== "" &&
    !props.options.some((v) => v.label === props.searchValue)
);

const addButton = computed(() => {
  const option: ButtonGroupItem = {
    kind: "button",
    option: {
      label: props.searchValue,
      icon: addButtonEnabled.value ? WizIAddCircle : undefined,
      iconDefaultColor: "green.800",
      value: -1,
      onClick: () => {
        onCreate(props.searchValue);
      },
    },
  };
  return option;
});

const selectButtons = computed(() => {
  return filteredOptions.value.map((opt) => {
    const option: ButtonGroupItem = {
      kind: "button",
      option: {
        label: opt.label,
        value: opt.value,
        exLabel: opt.exLabel,
        onClick: () => onSelect(opt.value),
      },
    };
    return option;
  });
});
</script>
