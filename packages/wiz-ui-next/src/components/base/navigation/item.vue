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
            <WizHStack nowrap gap="sm" align="center">
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
          :is-open="isOpen"
          direction="rt"
          layer="popover"
          :is-direction-fixed="true"
          @on-close="popupOnClose"
        >
          <WizPopupButtonGroup
            :options="popupButtons"
            :class="navigationPopupContainerStyle"
            p="xs"
            border-radius="xs2"
            :disabled="disabled"
          />
        </WizPopup>
      </div>
    </WizPopupContainer>
    <template v-if="tooltipText" #content>
      {{ tooltipText }}
    </template>
  </WizTooltip>
</template>

<script setup lang="ts" generic="T = number">
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

type Props<T> = {
  icon: TIcon;
  label: string;
  active: boolean;
  to: RouterLinkProps["to"];
  disabled?: boolean;
  tooltipText?: string | null;
  buttons?: ButtonGroupItem<T>[];
  isOpen?: boolean;
};

const props = withDefaults(defineProps<Props<T>>(), {
  disabled: false,
  lockingPopup: true,
  isOpen: false,
  tooltipText: null,
});

const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http")
);

const emit = defineEmits<{
  /** @deprecated このイベントは削除予定です。 */
  setLock: [isLocking: boolean];
  /** @deprecated このイベントは削除予定です。 */
  unlock: [];
  toggle: [value: boolean];
}>();

const navItemRef = ref<HTMLElement>();

const existPopup = computed(() => props.buttons && props.buttons?.length > 0);
const navItemOnClick = () => emit("toggle", !props.isOpen);

const popupOnClose = () => emit("toggle", false);

const buttonsWithClickOnClose = (
  buttons: ButtonGroupItem<T>[]
): ButtonGroupItem<T>[] => {
  return buttons.map((button) => {
    if (button.kind === "divider") return button;
    if (button.kind === "button") {
      const buttonWithClickOnClose: {
        kind: "button";
        option: PopupButtonOption<T>;
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
