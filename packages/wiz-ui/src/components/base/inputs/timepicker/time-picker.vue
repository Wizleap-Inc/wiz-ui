<template>
  <WizPopupContainer>
    <div
      :class="[
        styles.timePickerStyle,
        commonStyles.inputBorderStyle[state],
        disabled && styles.timePickerDisabledStyle,
        styles.timePickerCursorStyle[timePickerCursor],
      ]"
    >
      <div
        :class="[
          styles.timePickerBoxStyle,
          styles.timePickerBoxColorStyle[timePickerBoxColor],
        ]"
        :style="{ width }"
        @click="toggleTimepicker"
      >
        <WizHStack gap="sm" align="center" height="100%">
          <WizIcon size="xl2" color="gray.500" :icon="WizISchedule" />
          <span>{{ value || placeholder }}</span>
        </WizHStack>
      </div>
      <WizPopup
        :isOpen="openTimepicker"
        @onClose="openTimepicker = false"
        gap="xs"
      >
        <div :class="styles.timePickerSelectorStyle">
          <WizHStack overflow="none" gap="xs2">
            <WizVStack
              :class="styles.timePickerScrollStyle"
              height="8rem"
              gap="xs2"
              align="center"
              overflow="auto"
              ><div
                :class="[
                  styles.timePickerSelectorOptionStyle,
                  styles.timePickerSelectorOptionTypeStyle,
                ]"
              >
                時
              </div>
              <div
                v-for="(option, key) in hourOptions"
                :key="'option' + key"
                :class="[
                  styles.timePickerSelectorOptionStyle,
                  styles.timePickerSelectorOptionItemStyle,
                  option === selectedHour &&
                    styles.timePickerSelectorOptionItemSelectedStyle,
                  styles.timePickerSelectorOptionItemColorStyle[
                    timePickerSelectorOptionItemColor(option === selectedHour)
                  ],
                ]"
                @click="onSelect(option, true)"
              >
                {{ option }}
              </div>
            </WizVStack>
            <WizVStack gap="xs2">
              <WizDivider direction="vertical" />
            </WizVStack>
            <WizVStack gap="xs2" align="center" justify="center">
              <div
                :class="[
                  styles.timePickerSelectorOptionStyle,
                  styles.timePickerSelectorOptionTypeStyle,
                ]"
              >
                分
              </div>
              <div
                v-for="(option, key) in minuteOptions"
                :key="'option' + key"
                :class="[
                  styles.timePickerSelectorOptionStyle,
                  styles.timePickerSelectorOptionItemStyle,
                  option === selectedMinute &&
                    styles.timePickerSelectorOptionItemSelectedStyle,
                  styles.timePickerSelectorOptionItemColorStyle[
                    timePickerSelectorOptionItemColor(option === selectedMinute)
                  ],
                ]"
                @click="onSelect(option)"
              >
                {{ option }}
              </div>
            </WizVStack>
          </WizHStack>
        </div>
      </WizPopup>
    </div>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/time-picker-input.css";
import * as commonStyles from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, computed, inject } from "vue";

import { WizIcon, WizDivider, WizHStack, WizVStack } from "@/components";
import { WizISchedule } from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { WizPopup, WizPopupContainer } from "../../popup";

defineOptions({
  name: ComponentName.TimePicker,
});

const props = defineProps({
  value: {
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
});

const openTimepicker = ref(false);
const selectedHour = ref("");
const selectedMinute = ref("");

const hourOptions = [...Array(24).keys()].map((val) => String(val));
const minuteOptions = ["00", "15", "30", "45"];

const toggleTimepicker = () => {
  if (props.disabled) {
    return;
  }
  openTimepicker.value = !openTimepicker.value;
};

interface Emit {
  (e: "input", value: string): void;
}
const emit = defineEmits<Emit>();

const onSelect = (inputValue: string, isHour = false) => {
  let defaultValue =
    props.value.length > 0 ? props.value.split(":") : ["0", "00"];

  // 時間の方でセットする場合
  if (isHour) {
    defaultValue[0] = inputValue;
    selectedHour.value = inputValue;
  } else {
    defaultValue[1] = inputValue;
    selectedMinute.value = inputValue;
  }
  emit("input", defaultValue.join(":"));
};

const timePickerCursor = computed(() =>
  props.disabled ? "disabled" : "default"
);

const timePickerBoxColor = computed(() =>
  props.value ? "selected" : "default"
);

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
