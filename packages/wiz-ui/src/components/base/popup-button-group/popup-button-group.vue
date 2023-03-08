<template>
  <div :class="popupButtonGroupStyle" :style="{ minWidth: computedWidth }">
    <WizVStack gap="no">
      <div v-for="item in items">
        <div v-if="item.kind === 'divider'">
          <hr :class="popupButtonGroupDividerStyle" />
        </div>
        <div v-if="item.kind === 'item'">
          <div v-if="item.item.kind === 'group'">
            <span :class="popupButtonGroupTitleStyle">
              {{ item.item.title }}</span
            >
            <WizPopupButtonGroup
              :options="item.item.items"
              :divider="divider"
            />
          </div>
          <div v-if="item.item.kind === 'button'">
            <div
              :class="[popupButtonGroupOptionStyle]"
              @mousedown="
                () => {
                  if (item.item.kind === 'button') {
                    item.item.option.onClick();
                    onHoldClick(item.item.option.value);
                  }
                }
              "
            >
              <span>
                {{ item.item.option.label }}
              </span>
              <span v-if="item.item.option.exLabel">
                {{ item.item.option.exLabel }}
              </span>
              <div v-if="item.item.option.icon">
                <WizIcon
                  :icon="
                    item.item.option.icon === 'openNew'
                      ? WizIOpenInNew
                      : WizIAddCircle
                  "
                  :color="
                    item.item.option.value === isClicking
                      ? 'white.800'
                      : 'green.800'
                  "
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WizVStack>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  popupButtonGroupStyle,
  popupButtonGroupOptionStyle,
  popupButtonGroupTitleStyle,
  popupButtonGroupDividerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/popup-button-group.css";
import { computed, ComputedRef, inject, PropType, ref } from "vue";

import { WizIcon } from "@/components";
import { WizIOpenInNew, WizIAddCircle } from "@/components/icons";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { WizVStack } from "../stack";

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
  divider: {
    type: Boolean,
    required: false,
    default: false,
  },
});

type ItemElement = { kind: "divider" } | { kind: "item"; item: Item };

const items: ComputedRef<ItemElement[]> = computed(() => {
  const d: ItemElement = { kind: "divider" };
  const t = props.options
    .map((opt) => {
      const o: ItemElement = {
        kind: "item",
        item: opt,
      };
      return props.divider ? [o, d] : [o];
      // return [o,d ]
    })
    .flat();
  if (props.divider) t.pop();
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
