<template>
  <WizVStack
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
          :group-divider="item.item.groupDivider"
          :button-divider="item.item.buttonDivider"
          :disabled="disabled"
          :depth="depth + 1"
        />
      </div>
      <div v-else-if="item.item.kind === 'button'">
        <div
          :key="`${item.item.option.label}-${item.item.option.value}`"
          :class="[
            popupButtonGroupButtonBaseStyle,
            disabled || item.item.option.disabled
              ? popupButtonGroupButtonVariantStyle['disabled']
              : popupButtonGroupButtonVariantStyle['enabled'],
            item.item.option.disabled && popupButtonGroupDisabledCursorStyle,
          ]"
          :style="{
            paddingLeft: `calc(${THEME.spacing.xs} + ${depth} * ${THEME.spacing.lg})`,
          }"
          :tabIndex="0"
          :aria-label="`search-selector-${item.item.option.label}`"
          @click="popupButtonMouseDown(item.item)"
          @mouseover="popupButtonMouseOver(item.item)"
          @mouseout="popupButtonMouseOut(item.item)"
          @mousedown="onHoldClick(item.item)"
          @keypress.enter="popupButtonKeyPressEnter(item.item)"
        >
          <span :class="popupButtonGroupInnerContainerStyle">
            <span>{{ item.item.option.label }}</span>
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
                      : (item.item.option.iconDefaultColor ?? 'gray.500')
              "
              size="md"
            />
          </span>
          <span v-if="item.item.option.exLabel">{{
            item.item.option.exLabel
          }}</span>
        </div>
      </div>
    </div>
  </WizVStack>
</template>

<script setup lang="ts" generic="T = number">
import { SpacingKeys, THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  borderRadiusStyle,
  popupButtonGroupButtonBaseStyle,
  popupButtonGroupButtonVariantStyle,
  popupButtonGroupDisabledCursorStyle,
  popupButtonGroupDividerStyle,
  popupButtonGroupInnerContainerStyle,
  popupButtonGroupStyle,
  popupButtonGroupTitleBaseStyle,
  popupButtonGroupTitleVariantStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/search-selector.css";
import { computed, ref, UnwrapRef } from "vue";

import { TIcon, WizIcon, WizPopupButtonGroup, WizVStack } from "@/components";
export interface PopupButtonOption<T> {
  label: string;
  value?: T;
  exLabel?: string;
  icon?: TIcon;
  iconDefaultColor?: "green.800" | "gray.500";
  disabled?: boolean;
  onClick: () => void;
}

export type ButtonGroupItem<T> =
  | { kind: "button"; option: PopupButtonOption<T> }
  | { kind: "divider" }
  | {
      kind: "group";
      title: string;
      items: ButtonGroupItem<T>[];
      groupDivider?: boolean;
      buttonDivider?: boolean;
    };

type Props<T> = {
  options: ButtonGroupItem<T>[];
  width?: string;
  p?: SpacingKeys;
  borderRadius?: SpacingKeys;
  disabled?: boolean;
  expand?: boolean;
  groupDivider?: boolean;
  buttonDivider?: boolean;
  depth?: number;
};

const props = withDefaults(defineProps<Props<T>>(), {
  width: "10rem",
  p: "no",
  borderRadius: "no",
  disabled: false,
  expand: false,
  groupDivider: false,
  buttonDivider: false,
  depth: 0,
});

type ItemElement =
  | { kind: "divider" }
  | { kind: "item"; item: Exclude<ButtonGroupItem<T>, { kind: "divider" }> };

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

const isClicking = ref<T | null>(null);
const isHover = ref<T | null>(null);

const onHoldClick = (item: ButtonGroupItem<T>) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    isClicking.value = item.option.value
      ? (item.option.value as UnwrapRef<T>)
      : null;
    const mouseup = () => {
      isClicking.value = null;
      document.removeEventListener("mouseup", mouseup);
    };
    document.addEventListener("mouseup", mouseup);
  }
};

const popupButtonMouseDown = (item: ButtonGroupItem<T>) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    item.option.onClick();
  }
};

const popupButtonMouseOver = (item: ButtonGroupItem<T>) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    isHover.value = item.option.value
      ? (item.option.value as UnwrapRef<T>)
      : null;
  }
};

const popupButtonMouseOut = (item: ButtonGroupItem<T>) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    isHover.value = null;
  }
};

const popupButtonKeyPressEnter = (item: ButtonGroupItem<T>) => {
  if (props.disabled) return;
  if (item.kind === "button" && !item.option.disabled) {
    item.option.onClick();
  }
};

const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>
