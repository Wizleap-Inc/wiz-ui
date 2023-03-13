<template>
  <WizVStack
    gap="no"
    :class="[
      popupButtonGroupStyle,
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
          :class="popupButtonGroupTitleStyle"
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
          :depth="depth + 1"
        />
      </div>
      <div v-else-if="item.item.kind === 'button'">
        <div
          :class="popupButtonGroupButtonStyle"
          :style="{
            paddingLeft: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
          }"
          @click="popupButtonMouseDown(item.item)"
          @mousedown="onHoldClick(item.item)"
          @keypress.enter="popupButtonKeyPressEnter(item.item)"
          :tabIndex="0"
        >
          <span :class="popupButtonGroupInnerContainerStyle">
            <span>{{ item.item.option.label }}</span>

            <WizIcon
              v-if="item.item.option.icon"
              :icon="item.item.option.icon"
              :color="
                item.item.option.value === isClicking
                  ? 'white.800'
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
  popupButtonGroupButtonStyle,
  popupButtonGroupTitleStyle,
  popupButtonGroupDividerStyle,
  popupButtonGroupInnerContainerStyle,
  borderRadiusStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import { computed, inject, PropType, ref } from "vue";

import { WizIcon, WizPopupButtonGroup, WizVStack } from "@/components";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { ButtonGroupItem } from "./types";

defineOptions({
  name: ComponentName.SelectBox,
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
  // disabled: {
  //   type: Boolean,
  //   required: false,
  //   default: false,
  // },
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
  | { kind: "item"; item: ButtonGroupItem };

const items = computed(() => {
  const divider: ItemElement = { kind: "divider" };
  const items = props.options
    .map((opt, i) => {
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
      }
    })
    .flat();
  return items;
});

const isClicking = ref<number | null>(null);

const onHoldClick = (item: ButtonGroupItem) => {
  if (item.kind === "button") {
    isClicking.value = item.option.value;
    const mouseup = () => {
      isClicking.value = null;
      document.removeEventListener("mouseup", mouseup);
    };
    document.addEventListener("mouseup", mouseup);
  }
};

const popupButtonMouseDown = (item: ButtonGroupItem) => {
  if (item.kind === "button") {
    item.option.onClick();
  }
};

const popupButtonKeyPressEnter = (item: ButtonGroupItem) => {
  if (item.kind === "button") {
    item.option.onClick();
  }
};
// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));
const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>
