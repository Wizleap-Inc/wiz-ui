<template>
  <WizTooltip :expand="true">
    <WizPopupContainer :expand="true">
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
          :aria-label="label"
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
      <div v-if="existPopup">
        <WizPopup
          :isOpen="isOpen"
          @onClose="popupOnClose"
          @mouseLeave="popupMouseLeave"
          direction="rt"
          layer="popover"
          :isDirectionFixed="true"
        >
          <div @mouseenter="popupMouseEnter">
            <WizPopupButtonGroup
              :options="buttons ?? []"
              :class="navigationPopupContainerStyle"
              p="xs"
              borderRadius="xs2"
              :disabled="disabled"
            />
          </div>
        </WizPopup>
      </div>
    </WizPopupContainer>
    <template #content v-if="tooltipText">
      {{ tooltipText }}
    </template>
  </WizTooltip>
</template>

<script setup lang="ts" generic="T">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationItemActiveStyle,
  navigationItemDisabledStyle,
  navigationItemIconActiveStyle,
  navigationItemIconDisabledStyle,
  navigationItemIconStyle,
  navigationItemStyle,
  navigationItemTextActiveStyle,
  navigationItemTextStyle,
  navigationPopupContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { computed, ref } from "vue";
import { RouterLinkProps } from "vue-router";

import {
  WizPopup,
  WizPopupButtonGroup,
  WizPopupContainer,
  WizTooltip,
} from "@/components";
import type { TIcon } from "@/components/icons";

import { ButtonGroupItem } from "../popup-button-group/types";

defineOptions({
  name: ComponentName.NavigationItem,
});

type Props<T> = {
  icon: TIcon;
  label: string;
  active: boolean;
  to: RouterLinkProps["to"];
  disabled?: boolean;
  tooltipText?: string;
  lockingPopup?: boolean;
  buttons?: ButtonGroupItem<T>[];
  isOpen?: boolean;
};

const props = withDefaults(defineProps<Props<T>>(), {
  disabled: false,
  lockingPopup: true,
  isOpen: false,
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

const navItemMouseLeave = () => {
  if (!props.lockingPopup) emit("toggle", false);
};

const popupOnClose = () => {
  emit("toggle", false);
  emit("setLock", false);
};

const popupMouseEnter = () => {
  if (!props.lockingPopup) emit("toggle", true);
};

const popupMouseLeave = () => {
  if (!props.lockingPopup) emit("toggle", false);
};
</script>
