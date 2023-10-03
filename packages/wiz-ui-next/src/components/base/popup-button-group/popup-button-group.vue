<template>
  <WizVStack
    gap="xs2"
    :class="[
      popupButtonGroupStyle,
      disabled && popupButtonGroupDisabledCursorStyle,
      depth === 0 && borderRadiusStyle[borderRadius],
    ]"
    :style="{ minWidth: computedWidth }"
    :p="depth === 0 ? p : 'no'"
  >
    <div v-for="item in items">
      <hr
        v-if="item.kind === 'divider'"
        :class="popupButtonGroupDividerStyle"
      />
      <div v-else-if="item.item.kind === 'group'">
        <span
          :class="[
            popupButtonGroupTitleBaseStyle,
            disabled
              ? popupButtonGroupTitleVariantStyle['disabled']
              : popupButtonGroupTitleVariantStyle['enabled'],
          ]"
          :style="{
            paddingLeft: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
          }"
        >
          {{ item.item.title }}</span
        >
        <WizPopupButtonGroup
          :options="item.item.items"
          :groupDivider="item.item.groupDivider"
          :buttonDivider="item.item.buttonDivider"
          :disabled="disabled"
          :depth="depth + 1"
        />
      </div>
      <div v-else-if="item.item.kind === 'button'">
        <div
          :class="[
            popupButtonGroupButtonBaseStyle,
            disabled || item.item.option.disabled
              ? popupButtonGroupButtonVariantStyle['disabled']
              : popupButtonGroupButtonVariantStyle['enabled'],
            item.item.option.disabled && popupButtonGroupDisabledCursorStyle,
          ]"
          :style="{
            paddingLeft: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
            paddingRight: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
          }"
          @click="popupButtonMouseDown(item.item)"
          @mouseover="popupButtonMouseOver(item.item)"
          @mouseout="popupButtonMouseOut(item.item)"
          @mousedown="onHoldClick(item.item)"
          @keypress.enter="popupButtonKeyPressEnter(item.item)"
          :tabIndex="0"
          :key="`${item.item.option.label}-${item.item.option.value}`"
        >
          <span :class="popupButtonGroupInnerContainerStyle">
            <span
              :class="[showExLabel && popupButtonGroupInnerContainerLabel]"
              >{{ item.item.option.label }}</span
            >

            <WizIcon
              v-if="item.item.option.icon"
              :icon="item.item.option.icon"
              :color="
                item.item.option.value === isClicking
                  ? 'white.800'
                  : disabled || item.item.option.disabled
                  ? 'gray.400'
                  : item.item.option.value === isHover
                  ? 'green.800'
                  : item.item.option.iconDefaultColor ?? 'gray.500'
              "
              size="md"
            />
          </span>
          <span v-if="showExLabel && item.item.option.exLabel">{{
            item.item.option.exLabel
          }}</span>
        </div>
      </div>
    </div>
  </WizVStack>
</template>

<script setup lang="ts">
import {
  ComponentName,
  SpacingKeys,
  THEME,
} from "@wizleap-inc/wiz-ui-constants";
import {
  popupButtonGroupStyle,
  popupButtonGroupDisabledCursorStyle,
  popupButtonGroupButtonBaseStyle,
  popupButtonGroupTitleBaseStyle,
  popupButtonGroupDividerStyle,
  popupButtonGroupInnerContainerStyle,
  popupButtonGroupTitleVariantStyle,
  popupButtonGroupButtonVariantStyle,
  borderRadiusStyle,
  popupButtonGroupInnerContainerLabel,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import { computed, PropType, ref } from "vue";

import { WizIcon, WizPopupButtonGroup, WizVStack } from "@/components";

import { ButtonGroupItem } from "./types";

defineOptions({
  name: ComponentName.PopupButtonGroup,
});

const props = defineProps({
  options: {
    type: Array as PropType<ButtonGroupItem[]>,
    required: true,
  },
  width: {
    type: String,
    required: false,
    default: "10rem",
  },
  p: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "no",
  },
  borderRadius: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "no",
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
  groupDivider: {
    type: Boolean,
    required: false,
    default: false,
  },
  buttonDivider: {
    type: Boolean,
    required: false,
    default: false,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
  showExLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
});

type ItemElement =
  | { kind: "divider" }
  | { kind: "item"; item: Exclude<ButtonGroupItem, { kind: "divider" }> };

const items = computed(() => {
  const divider: ItemElement = { kind: "divider" };
  const items = props.options
    .map((opt, i) => {
      if (opt.kind === "divider") {
        return [divider];
      }
      const optionItem: ItemElement = {
        kind: "item",
        item: opt,
      };
      if (i + 1 === props.options.length) return [optionItem];
      switch (props.options[i].kind) {
        case "group": {
          return props.groupDivider ? [optionItem, divider] : [optionItem];
        }
        case "button": {
          return props.buttonDivider && props.options[i + 1].kind === "button"
            ? [optionItem, divider]
            : [optionItem];
        }
        case "divider": {
          return [];
        }
      }
    })
    .flat();
  return items;
});

const isClicking = ref<number | null>(null);
const isHover = ref<number | null>(null);

const onHoldClick = (item: ButtonGroupItem) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    isClicking.value = item.option.value;
    const mouseup = () => {
      isClicking.value = null;
      document.removeEventListener("mouseup", mouseup);
    };
    document.addEventListener("mouseup", mouseup);
  }
};

const popupButtonMouseDown = (item: ButtonGroupItem) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    item.option.onClick();
  }
};

const popupButtonMouseOver = (item: ButtonGroupItem) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    isHover.value = item.option.value;
  }
};

const popupButtonMouseOut = (item: ButtonGroupItem) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    isHover.value = null;
  }
};

const popupButtonKeyPressEnter = (item: ButtonGroupItem) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    item.option.onClick();
  }
};

const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>
