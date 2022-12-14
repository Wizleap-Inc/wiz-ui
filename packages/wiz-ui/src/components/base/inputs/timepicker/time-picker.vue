<template>
  <WizPopupContainer v-model="openTimepicker">
    <div
      class="wiz-timepicker"
      :class="{
        'wiz-timepicker--active': openTimepicker,
        'wiz-timepicker--disabled': disabled,
      }"
    >
      <div
        class="wiz-timepicker__box"
        :class="{ 'wiz-timepicker__box--selected': !!value }"
        @click="toggleTimepicker"
      >
        <WizHStack gap="sm" align="center" height="100%">
          <WizIcon size="xl2" color="gray.500" :icon="WizISchedule" />
          <span>{{ value || placeholder }}</span>
        </WizHStack>
      </div>
      <WizPopup layer="popover" gap="xs">
        <div class="wiz-timepicker__selector">
          <WizHStack overflow="none" gap="xs2">
            <WizVStack
              class="wiz-timepicker__scroll"
              height="8rem"
              gap="xs2"
              align="center"
              overflow="auto"
            >
              <div
                class="wiz-timepicker__selector-option"
                :class="{
                  'wiz-timepicker__selector-option-selected':
                    option === selectedHour,
                }"
                v-for="(option, key) in hourOptions"
                :key="'option' + key"
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
                class="wiz-timepicker__selector-option"
                :class="{
                  'wiz-timepicker__selector-option-selected':
                    option === selectedMinute,
                }"
                v-for="(option, key) in minuteOptions"
                :key="'option' + key"
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
import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import { ref, computed } from "vue";

import { WizIcon, WizDivider, WizHStack, WizVStack } from "@/components";
import { WizISchedule } from "@/components/icons";

import { WizPopup, WizPopupContainer } from "../../popup";

defineOptions({
  name: ComponentName.TimePicker,
});

interface Props {
  value: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  placeholder: "時間を選択",
  width: "10rem",
  disabled: false,
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

const width = computed(() => props.width);
const fontSizeSm = THEME.fontSize.sm;
const fontSizeXs2 = THEME.fontSize.xs2;
const spacingNo = THEME.spacing.no;
const spacingXs = THEME.spacing.xs;
const spacingXs2 = THEME.spacing.xs2;
const spacingXl3 = THEME.spacing.xl3;
const colorWhite800 = THEME.color.white["800"];
const colorGray300 = THEME.color.gray["300"];
const colorGray400 = THEME.color.gray["400"];
const colorGray500 = THEME.color.gray["500"];
const colorGray700 = THEME.color.gray["700"];
const colorGreen300 = THEME.color.green["300"];
const colorGreen800 = THEME.color.green["800"];
</script>

<style lang="scss" scoped>
$border-width: 1px;

.wiz-timepicker {
  width: max-content;
  padding: 0 v-bind(spacingXs2);
  height: v-bind(spacingXl3);
  background: v-bind(colorWhite800);
  border: $border-width solid v-bind(colorGray400);
  border-radius: v-bind(spacingXs2);
  box-sizing: border-box;
  cursor: pointer;

  &--active {
    border-color: v-bind(colorGreen800);
  }

  &--disabled {
    color: v-bind(colorGray700);
    background-color: v-bind(colorGray300);
    cursor: not-allowed;
  }

  &__box {
    height: 100%;
    padding: v-bind(spacingNo) v-bind(spacingXs);
    font-size: v-bind(fontSizeSm);
    color: v-bind(colorGray500);
    width: v-bind(width);

    &--selected {
      color: v-bind(colorGray700);
    }
  }

  &__selector {
    position: absolute;
    top: calc(100% + $border-width * 2);
    left: 0;
    width: auto;
    padding: v-bind(spacingXs);
    background: v-bind(colorWhite800);
    border-radius: v-bind(spacingXs2);
    box-sizing: border-box;
  }

  &__scroll {
    margin: v-bind(spacingXs2) 0;

    // FireFox 用
    scrollbar-width: thin;
    scrollbar-color: v-bind(colorGray400) transparent;

    &::-webkit-scrollbar {
      width: v-bind(spacingXs2);
    }
    &::-webkit-scrollbar-thumb {
      background-color: v-bind(colorGray400);
      border-radius: v-bind(spacingXs2);
    }
  }

  &__selector-option {
    width: 2em;
    position: relative;
    margin: 0 v-bind(spacingXs);
    padding: v-bind(spacingXs2);
    font-size: v-bind(fontSizeXs2);
    text-align: center;
    color: v-bind(colorGray700);
    box-sizing: border-box;
    border-radius: v-bind(spacingXs2);

    &:hover {
      color: v-bind(colorGreen800);
      background: v-bind(colorGreen300);
      border-radius: v-bind(spacingXs2);
    }

    &:active {
      color: v-bind(colorWhite800);
      background: v-bind(colorGreen800);
    }

    &-selected {
      color: v-bind(colorWhite800);
      background: v-bind(colorGreen800);
    }
  }
}
</style>
