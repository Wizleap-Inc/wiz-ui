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
    <div v-for="(item, index) in items">
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
            !item.item.option.disabled &&
              currentSelectOptionIndex === index &&
              popupButtonGroupSelectOptionStyle,
          ]"
          :style="{
            paddingLeft: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
          }"
          @click="popupButtonMouseDown(item.item)"
          @mouseover="popupButtonMouseOver(item.item)"
          @mouseout="popupButtonMouseOut(item.item)"
          @mousedown="onHoldClick(item.item)"
          @keypress.enter="popupButtonKeyPressEnter(item.item)"
          @keydown.up="popupButtonKeyUp"
          @keydown.down="popupButtonKeyDown"
          :tabIndex="0"
          :key="`${item.item.option.label}-${item.item.option.value}`"
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
                  : item.item.option.iconDefaultColor ?? 'gray.500'
              "
              size="md"
            />
          </span>
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
  popupButtonGroupSelectOptionStyle,
  borderRadiusStyle,
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

const currentSelectOptionIndex = ref<number>(-1);
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

  // 移動操作で option を選択した場合
  if (currentSelectOptionIndex.value > -1) {
    const selectValue = items.value[currentSelectOptionIndex.value];
    if (selectValue.kind === "item") {
      const selectItem = selectValue.item;
      if (selectItem.kind === "button" && !selectItem.option.disabled) {
        selectItem.option.onClick();
        currentSelectOptionIndex.value = -1;
        return;
      }
    }
  }

  // タブ操作で option を選択した場合
  if (item.kind === "button" && !item.option.disabled) {
    item.option.onClick();
  }
};

const popupButtonKeyUp = () => {
  if (props.disabled) return;
  if (currentSelectOptionIndex.value <= 0) return;
  currentSelectOptionIndex.value--;
};
const popupButtonKeyDown = () => {
  if (props.disabled) return;
  if (currentSelectOptionIndex.value >= items.value.length - 1) return;
  currentSelectOptionIndex.value++;
};

const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>
