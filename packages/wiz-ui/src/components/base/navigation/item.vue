<template>
  <WizTooltip>
    <WizPopupContainer :style="{ width: '100%' }">
      <div
        ref="navItemRef"
        @click="navItemOnClick"
        @mouseenter="navItemMouseEnter"
        @mouseleave="navItemMouseLeave"
      >
        <component
          :is="disabled || isExternalLink ? 'a' : 'router-link'"
          :to="!disabled && !isExternalLink ? to : undefined"
          :href="!disabled && isExternalLink ? to : undefined"
          :target="!disabled && isExternalLink ? '_blank' : undefined"
          :class="[
            navigationItemStyle,
            disabled
              ? navigationItemDisabledStyle
              : active && navigationItemActiveStyle,
          ]"
        >
          <component
            :is="icon"
            :class="[
              navigationItemIconStyle,
              disabled
                ? navigationItemIconDisabledStyle
                : active && navigationItemIconActiveStyle,
            ]"
          />
          <div
            :class="[
              navigationItemTextStyle,
              !disabled && active && navigationItemTextActiveStyle,
            ]"
          >
            {{ label }}
          </div>
        </component>
      </div>
      <div v-if="existPopup" @mouseleave="popupMouseLeave">
        <WizPopup
          :isOpen="isOpen"
          @onClose="popupOnClose"
          @mouseLeave="popupMouseLeave"
          direction="rt"
          layer="popover"
          transparentBorderLeftWidth="1px"
        >
          <WizPopupButtonGroup
            :options="buttons ?? []"
            :class="navigationPopupContainerStyle"
            p="xs"
            borderRadius="xs2"
            :disabled="disabled"
          />
        </WizPopup>
      </div>
    </WizPopupContainer>
    <template #content v-if="tooltipText">
      {{ tooltipText }}
    </template>
  </WizTooltip>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationItemStyle,
  navigationItemActiveStyle,
  navigationItemIconStyle,
  navigationItemIconActiveStyle,
  navigationItemTextStyle,
  navigationItemTextActiveStyle,
  navigationItemDisabledStyle,
  navigationItemIconDisabledStyle,
  navigationPopupContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { computed, PropType, ref } from "vue";
import { RouterLinkProps } from "vue-router/types/router";

import {
  WizPopupContainer,
  WizPopup,
  WizPopupButtonGroup,
  WizTooltip,
} from "@/components";
import type { TIcon } from "@/components/icons";

import { ButtonGroupItem } from "../popup-button-group/types";
defineOptions({
  name: ComponentName.NavigationItem,
});

const props = defineProps({
  icon: {
    type: Object as PropType<TIcon>,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  to: {
    type: [Object, String] as PropType<RouterLinkProps["to"]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  tooltipText: {
    type: String,
    required: false,
    default: null,
  },
  lockingPopup: {
    type: Boolean,
    required: false,
    default: true,
  },
  buttons: {
    type: Array as PropType<ButtonGroupItem[]>,
    required: false,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http")
);

interface Emit {
  (e: "setLock", isLocking: boolean): void;
  (e: "unlock"): void;
  (e: "toggle", value: boolean): void;
}
const emit = defineEmits<Emit>();

const navItemRef = ref<HTMLElement>();

const existPopup = computed(() => props.buttons && props.buttons?.length > 0);
const navItemOnClick = () => {
  emit("toggle", true);
  if (existPopup) emit("setLock", true);
};
const navItemMouseEnter = () => {
  if (!props.lockingPopup) emit("toggle", true);
};
const navItemMouseLeave = (event: MouseEvent) => {
  const [cx, cy] = [event.clientX, event.clientY];
  const right = navItemRef.value?.getBoundingClientRect().right ?? 0;
  const top = navItemRef.value?.getBoundingClientRect().top ?? 0;
  const bottom = navItemRef.value?.getBoundingClientRect().bottom ?? 0;
  if (right <= cx && top < cy && cy < bottom) return;
  if (!props.lockingPopup) emit("toggle", false);
};
const popupOnClose = () => {
  emit("toggle", false);
  emit("setLock", false);
};
const popupMouseLeave = (event: MouseEvent) => {
  const [cx, cy] = [event.clientX, event.clientY];
  const right = navItemRef.value?.getBoundingClientRect().right ?? 0;
  const top = navItemRef.value?.getBoundingClientRect().top ?? 0;
  const bottom = navItemRef.value?.getBoundingClientRect().bottom ?? 0;
  if (cx <= right && top < cy && cy < bottom) return;
  if (!props.lockingPopup) emit("toggle", false);
};
</script>
