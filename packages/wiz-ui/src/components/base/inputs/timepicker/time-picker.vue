<template>
  <WizPopupContainer v-model="opentimepicker">
    <div
      class="wiz-timepicker"
      :class="{
        'wiz-timepicker--active': opentimepicker,
        'wiz-timepicker--disabled': disabled,
      }"
    >
      <div
        class="wiz-timepicker__box"
        :class="{ 'wiz-timepicker__box--selected': !!value }"
        @click="toggletimepicker"
      >
        <WizHStack gap="sm" align="center" height="100%">
          <WizSchedule class="wiz-timepicker__box-icon" />
          <span v-if="!value">{{ placeholder }}</span>
          <span v-else>
            {{ value }}
          </span>
        </WizHStack>
      </div>
      <WizPopup layer="base" gap="xs">
        <div class="wiz-timepicker__selector">
          <WizHStack overflow="none">
            <WizVStack
              class="wiz-timepicker__selector-list"
              gap="xs2"
              align="center"
            >
              <div
                class="wiz-timepicker__selector-option"
                v-for="(option, key) in hourOptions"
                :key="'option' + key"
                @click="onSelect(option, true)"
              >
                {{ option }}
              </div>
            </WizVStack>
            <WizVStack
              class="wiz-timepicker__selector-list"
              gap="xs2"
              align="center"
              justify="center"
            >
              <div
                class="wiz-timepicker__selector-option"
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
import { ref, computed } from "vue";

import { WizSchedule } from "@/components/icons";
import { THEME } from "@/constants/styles";

import { WizPopup, WizPopupContainer } from "../../popup";
import { WizHStack } from "../../stack";
import { WizVStack } from "../../stack";

interface Props {
  value: string;
  placeholder: string;
  width?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  placeholder: "時間を選択",
  width: "8rem",
  disabled: false,
});

const opentimepicker = ref(false);
const hourOptions = ref([...Array(24).keys()].map((val) => String(val)));
const minuteOptions = ref(["00", "15", "30", "45"]);

const toggletimepicker = () => {
  if (props.disabled) {
    return;
  }
  opentimepicker.value = !opentimepicker.value;
};

interface Emit {
  (e: "input", value: string): void;
}
const emit = defineEmits<Emit>();

const onSelect = (inputValue: string, isHour = false) => {
  let defaultValue = props.value.split(":");

  // 時間の方でセットする場合
  if (isHour) {
    defaultValue[0] = inputValue;
  } else {
    defaultValue[1] = inputValue;
  }
  emit("input", defaultValue.join(":"));
};

const width = computed(() => props.width);
const fontSizeSm = THEME.fontSize.sm;
const fontSizeMd = THEME.fontSize.md;
const spacingNo = THEME.spacing.no;
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingXl3 = THEME.spacing.xl3;
const colorWhite800 = THEME.color.white["800"];
const colorGray300 = THEME.color.gray["300"];
const colorGray400 = THEME.color.gray["400"];
const colorGray500 = THEME.color.gray["500"];
const colorGray700 = THEME.color.gray["700"];
const colorGreen300 = THEME.color.green["300"];
const colorGreen800 = THEME.color.green["800"];

const shadowSm = THEME.shadow.sm;
const zIndexPopup = THEME.zIndex.popup;
</script>

<style lang="scss" scoped>
$border-width: 1px;

.wiz-timepicker {
  position: relative;
  width: max-content;
  padding-left: 0.25em;
  padding-right: 0.25em;
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

    &-icon {
      fill: v-bind(colorGray500);
      font-size: v-bind(fontSizeMd);
    }

    &--selected {
      color: v-bind(colorGray700);
    }
  }

  &__selector {
    position: absolute;
    top: calc(100% + $border-width * 2);
    left: 0;
    padding: v-bind(spacingXs);
    background: v-bind(colorWhite800);
    border-radius: v-bind(spacingXs2);
    box-sizing: border-box;
    box-shadow: v-bind(shadowSm);
    z-index: v-bind(zIndexPopup);
    width: 8em;
  }
  &__selector-list {
    width: 50%;
    height: 12em;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__selector-option {
    width: 2em;
    position: relative;
    padding: v-bind(spacingXs2) v-bind(spacingXs2);
    font-size: v-bind(fontSizeMd);
    text-align: center;
    color: v-bind(colorGray700);
    box-sizing: border-box;

    &:hover {
      color: v-bind(colorGreen800);
      background: v-bind(colorGreen300);
      border-radius: 0.25em;
    }

    &:active {
      color: v-bind(colorWhite800);
      background: v-bind(colorGreen800);
    }
  }
}
</style>
