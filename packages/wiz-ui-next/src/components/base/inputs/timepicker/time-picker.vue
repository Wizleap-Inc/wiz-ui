<template>
  <WizPopupContainer :width="width">
    <div
      :class="[
        timePickerStyle,
        inputBorderStyle[state],
        disabled && timePickerDisabledStyle,
        timePickerCursorStyle[timePickerCursor],
        timePickerBoxColorStyle[timePickerBoxColor],
      ]"
      @click="onClickTrigger"
    >
      <WizHStack gap="sm" align="center" height="100%" :nowrap="allowInput">
        <WizIcon size="xl2" color="gray.500" :icon="WizISchedule" />
        <input
          v-if="allowInput"
          ref="inputRef"
          type="text"
          :class="timePickerTextInputStyle"
          :value="inputText"
          :placeholder="placeholder"
          :disabled="disabled"
          :aria-label="ARIA_LABELS.TIME_PICKER_INPUT"
          @focus="onFocusInput"
          @input="onInput"
          @blur="onBlurInput"
          @keydown.enter="onKeydownEnterInput"
        />
        <span v-else>{{ modelValue || placeholder }}</span>
      </WizHStack>
      <WizPopup
        :is-open="openTimepicker"
        gap="xs"
        :is-direction-fixed="isDirectionFixed"
        @on-close="openTimepicker = false"
      >
        <div :class="timePickerSelectorStyle">
          <WizHStack overflow="none" gap="xs2">
            <WizVStack height="8rem" align="center">
              <div
                :class="[
                  timePickerSelectorOptionStyle,
                  timePickerSelectorOptionTitleStyle,
                  timePickerSelectorOptionTypeStyle,
                ]"
              >
                時
              </div>
              <WizVStack
                gap="xs2"
                overflow="auto"
                :class="timePickerScrollStyle"
              >
                <div
                  v-for="(option, key) in hourOptions"
                  :key="'option' + key"
                  :class="[
                    timePickerSelectorOptionStyle,
                    timePickerSelectorOptionItemStyle,
                    timePickerCursorStyle[timePickerCursor],
                    option === selectedHour &&
                      timePickerSelectorOptionItemSelectedStyle,
                    timePickerSelectorOptionItemColorStyle[
                      timePickerSelectorOptionItemColor(option === selectedHour)
                    ],
                  ]"
                  @click="onSelect(option, true)"
                >
                  {{ option }}
                </div>
              </WizVStack>
            </WizVStack>
            <WizVStack gap="xs2">
              <WizDivider direction="vertical" />
            </WizVStack>
            <WizVStack height="8rem" align="center">
              <div
                :class="[
                  timePickerSelectorOptionStyle,
                  timePickerSelectorOptionTitleStyle,
                  timePickerSelectorOptionTypeStyle,
                ]"
              >
                分
              </div>
              <WizVStack
                gap="xs2"
                overflow="auto"
                :class="timePickerScrollStyle"
              >
                <div
                  v-for="(option, key) in minuteOptions"
                  :key="'option' + key"
                  :class="[
                    timePickerSelectorOptionStyle,
                    timePickerSelectorOptionItemStyle,
                    timePickerCursorStyle[timePickerCursor],
                    option === selectedMinute &&
                      timePickerSelectorOptionItemSelectedStyle,
                    timePickerSelectorOptionItemColorStyle[
                      timePickerSelectorOptionItemColor(
                        option === selectedMinute
                      )
                    ],
                  ]"
                  @click="onSelect(option)"
                >
                  {{ option }}
                </div>
              </WizVStack>
            </WizVStack>
          </WizHStack>
        </div>
      </WizPopup>
    </div>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  timePickerBoxColorStyle,
  timePickerCursorStyle,
  timePickerDisabledStyle,
  timePickerScrollStyle,
  timePickerSelectorOptionItemColorStyle,
  timePickerSelectorOptionItemSelectedStyle,
  timePickerSelectorOptionItemStyle,
  timePickerSelectorOptionStyle,
  timePickerSelectorOptionTitleStyle,
  timePickerSelectorOptionTypeStyle,
  timePickerSelectorStyle,
  timePickerStyle,
  timePickerTextInputStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/time-picker-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { parseTimeInput } from "@wizleap-inc/wiz-ui-utils";
import { computed, inject, ref } from "vue";

import { WizDivider, WizHStack, WizIcon, WizVStack } from "@/components";
import { WizISchedule } from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { WizPopup, WizPopupContainer } from "../../popup";

defineOptions({
  name: ComponentName.TimePicker,
});

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "時間を選択",
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
  isDirectionFixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  minuteInterval: {
    type: Number,
    required: false,
    default: 5,
  },
  /**
   * @description 入力欄に時刻を直接入力できるようにします。`H:mm`・`H時m分`・区切りなし（`930`）を受け付け、Enter またはフォーカスが外れたときに確定します。解釈できない値・存在しない時刻・`minuteInterval` の刻みに合わない時刻は元の値に戻ります。
   */
  allowInput: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const openTimepicker = ref(false);
const selectedHour = ref("");
const selectedMinute = ref("");

const hourOptions = [...Array(24).keys()].map((val) => String(val));
const minuteOptions = computed(() =>
  [...Array(Math.ceil(60 / props.minuteInterval))].map((_, index) =>
    String(index * props.minuteInterval).padStart(2, "0")
  )
);

const toggleTimepicker = () => {
  if (props.disabled) {
    return;
  }
  openTimepicker.value = !openTimepicker.value;
};

interface Emit {
  (e: "update:modelValue", value: string): void;
}
const emit = defineEmits<Emit>();

const onSelect = (inputValue: string, isHour = false) => {
  let defaultValue =
    props.modelValue.length > 0 ? props.modelValue.split(":") : ["0", "00"];

  // 時間の方でセットする場合
  if (isHour) {
    defaultValue[0] = inputValue;
    selectedHour.value = inputValue;
  } else {
    defaultValue[1] = inputValue;
    selectedMinute.value = inputValue;
  }
  const value = defaultValue.join(":");
  editingText.value = value;
  emit("update:modelValue", value);
};

// Input
const inputRef = ref<HTMLInputElement>();
const isInputFocused = ref(false);
const editingText = ref("");
const inputText = computed(() =>
  isInputFocused.value ? editingText.value : props.modelValue
);

const onClickTrigger = () => {
  if (!props.allowInput) return toggleTimepicker();
  if (props.disabled) return;
  inputRef.value?.focus();
  openTimepicker.value = true;
};

const onFocusInput = () => {
  editingText.value = props.modelValue;
  isInputFocused.value = true;
};

const onInput = (e: Event) => {
  editingText.value = (e.target as HTMLInputElement).value;
};

const commitInput = () => {
  if (editingText.value === props.modelValue) return;
  if (editingText.value.trim() === "") {
    emit("update:modelValue", "");
    return;
  }
  const parsed = parseTimeInput(editingText.value);
  if (!parsed || parsed.minute % props.minuteInterval !== 0) {
    editingText.value = props.modelValue;
    return;
  }
  const hour = String(parsed.hour);
  const minute = String(parsed.minute).padStart(2, "0");
  const value = `${hour}:${minute}`;
  selectedHour.value = hour;
  selectedMinute.value = minute;
  editingText.value = value;
  if (value !== props.modelValue) emit("update:modelValue", value);
};

const onBlurInput = () => {
  commitInput();
  isInputFocused.value = false;
};

const onKeydownEnterInput = (e: KeyboardEvent) => {
  if (e.isComposing) return;
  e.preventDefault();
  commitInput();
  openTimepicker.value = false;
};

const timePickerCursor = computed(() =>
  props.disabled ? "disabled" : "default"
);

const timePickerBoxColor = computed(() => {
  if (props.disabled) return "disabled";
  return props.modelValue ? "selected" : "default";
});

const timePickerSelectorOptionItemColor = (isSelected: boolean) =>
  isSelected ? "selected" : "default";

const width = computed(() => props.width);

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));

const state = computed(() => {
  if (isError.value) return "error";
  if (openTimepicker.value) return "active";
  return "default";
});
</script>
