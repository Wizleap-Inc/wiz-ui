<template>
  <WizVStack
    gap="no"
    :class="popupButtonGroupStyle"
    :style="{ minWidth: computedWidth }"
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
          :showDivider="item.item.showDivider"
          :depth="depth + 1"
        />
      </div>
      <div v-else-if="item.item.kind === 'button'">
        <div
          :class="popupButtonGroupButtonStyle"
          :style="{
            paddingLeft: `calc(${THEME.spacing.xs2} + ${depth} * ${THEME.spacing.lg})`,
          }"
          @mousedown="popupButtonMouseDown(item.item)"
        >
          <WizHStack gap="xs">
            <span>
              {{ item.item.option.label }}
            </span>
            <span v-if="item.item.option.exLabel">
              {{ item.item.option.exLabel }}
            </span>
            <div v-if="item.item.option.icon">
              <WizIcon
                :icon="item.item.option.icon"
                :color="
                  item.item.option.value === isClicking
                    ? 'white.800'
                    : item.item.option.iconDefaultColor ?? 'gray.500'
                "
                size="md"
              />
            </div>
          </WizHStack>
        </div>
      </div>
    </div>
  </WizVStack>
</template>

<script setup lang="ts">
import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  popupButtonGroupStyle,
  popupButtonGroupButtonStyle,
  popupButtonGroupTitleStyle,
  popupButtonGroupDividerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import { computed, inject, PropType, ref } from "vue";

import {
  WizIcon,
  WizPopupButtonGroup,
  WizVStack,
  WizHStack,
} from "@/components";
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
  // disabled: {
  //   type: Boolean,
  //   required: false,
  //   default: false,
  // },
  expand: {
    type: Boolean,
    required: false,
  },
  showDivider: {
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
      if (!props.showDivider || i + 1 === props.options.length) {
        return [optionItem];
      }
      return props.options[i].kind === "group"
        ? [optionItem, divider]
        : [optionItem];
    })
    .flat();
  return items;
});

const isClicking = ref<number | null>(null);

const onHoldClick = (n: number) => {
  isClicking.value = n;
  const mouseup = () => {
    isClicking.value = null;
    document.removeEventListener("mouseup", mouseup);
  };
  document.addEventListener("mouseup", mouseup);
};

const popupButtonMouseDown = (item: ButtonGroupItem) => {
  if (item.kind === "button") {
    item.option.onClick();
    onHoldClick(item.option.value);
  }
};

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));
const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>
