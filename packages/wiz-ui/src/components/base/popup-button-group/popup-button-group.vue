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
        <span :class="popupButtonGroupTitleStyle"> {{ item.item.title }}</span>
        <WizPopupButtonGroup
          :options="item.item.items"
          :class="popupButtonGroupNestedStyle"
          :showDivider="item.item.showDivider"
        />
      </div>
      <div v-else-if="item.item.kind === 'button'">
        <div
          :class="popupButtonGroupButtonStyle"
          @mousedown="
            () => {
              if (item.item.kind === 'button') {
                item.item.option.onClick();
                onHoldClick(item.item.option.value);
              }
            }
          "
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
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  popupButtonGroupStyle,
  popupButtonGroupButtonStyle,
  popupButtonGroupTitleStyle,
  popupButtonGroupDividerStyle,
  popupButtonGroupNestedStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import { computed, ComputedRef, inject, PropType, ref } from "vue";

import { WizIcon } from "@/components";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { WizVStack, WizHStack } from "../stack";

import { Item } from "./types";

import { WizPopupButtonGroup } from ".";

defineOptions({
  name: ComponentName.SelectBox,
});

const props = defineProps({
  options: {
    type: Array as PropType<Item[]>,
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
});

type ItemElement = { kind: "divider" } | { kind: "item"; item: Item };

const items: ComputedRef<ItemElement[]> = computed(() => {
  const d: ItemElement = { kind: "divider" };
  const t = props.options
    .map((opt, i) => {
      const o: ItemElement = {
        kind: "item",
        item: opt,
      };
      if (!props.showDivider || i + 1 === props.options.length) return [o];
      return props.options[i + 1].kind !== "group" ? [o, d] : [o];
    })
    .flat();
  return t;
});

const isClicking = ref<number | undefined>(undefined);

const onHoldClick = (n: number) => {
  isClicking.value = n;
  const mouseup = () => {
    isClicking.value = undefined;
    document.removeEventListener("mouseup", mouseup);
  };
  document.addEventListener("mouseup", mouseup);
};

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));
const computedWidth = computed(() => (props.expand ? "100%" : props.width));
</script>
