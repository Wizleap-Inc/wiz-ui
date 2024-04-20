<template>
  <WizTooltip :expand="true">
    <WizPopupContainer :expand="true">
      <div ref="navItemRef" @click="navItemOnClick">
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
          <WizHStack justify="between" align="center" width="100%" nowrap>
            <WizHStack nowrap gap="sm">
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
            </WizHStack>
            <WizIcon
              v-if="existPopup"
              :icon="WizIChevronRight"
              :color="!disabled && active ? 'green.800' : 'gray.700'"
            />
          </WizHStack>
        </component>
      </div>
      <div v-if="existPopup">
        <WizPopup
          :isOpen="isOpen"
          @onClose="popupOnClose"
          direction="rt"
          layer="popover"
          :isDirectionFixed="true"
        >
          <WizPopupButtonGroup
            :options="popupButtons"
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
import { PropType, computed, ref } from "vue";
import { RouterLinkProps } from "vue-router";

import {
  WizHStack,
  WizIChevronRight,
  WizIcon,
  WizPopup,
  WizPopupButtonGroup,
  WizPopupContainer,
  WizTooltip,
} from "@/components";
import type { TIcon } from "@/components/icons";

import {
  ButtonGroupItem,
  PopupButtonOption,
} from "../popup-button-group/types";

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
  /**
   * @deprecated この プロパティ は削除予定です。
   */
  // eslint-disable-next-line vue/no-unused-properties
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
    required: false,
  },
});

const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http")
);

interface Emit {
  /**
   * @deprecated この イベント は削除予定です。
   */
  (e: "setLock", isLocking: boolean): void;
  /**
   * @deprecated この イベント は削除予定です。
   */
  (e: "unlock"): void;
  (e: "toggle", value: boolean): void;
}
const emit = defineEmits<Emit>();

const navItemRef = ref<HTMLElement>();

const existPopup = computed(() => props.buttons && props.buttons?.length > 0);
const navItemOnClick = () => emit("toggle", !props.isOpen);

const popupOnClose = () => emit("toggle", false);

const buttonsWithClickOnClose = (
  buttons: ButtonGroupItem[]
): ButtonGroupItem[] => {
  return buttons.map((button) => {
    if (button.kind === "divider") return button;
    if (button.kind === "button") {
      const buttonWithClickOnClose: {
        kind: "button";
        option: PopupButtonOption;
      } = {
        kind: "button",
        option: {
          ...button.option,
          onClick: () => {
            button.option.onClick();
            popupOnClose();
          },
        },
      };
      return buttonWithClickOnClose;
    }
    return {
      ...button,
      items: buttonsWithClickOnClose(button.items),
    };
  });
};

const popupButtons = computed(() => {
  return buttonsWithClickOnClose(props.buttons ?? []);
});
</script>
