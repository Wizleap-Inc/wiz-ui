<template>
  <WizPopupContainer
    :style="{ width: '100%' }"
    @click="navItemOnClick"
    @mouseenter="navItemMouseEnter"
    @mouseleave="navItemMouseLeave"
  >
    <component
      :is="isExternalLink ? 'a' : 'router-link'"
      :to="!isExternalLink ? to : undefined"
      :href="isExternalLink ? to : undefined"
      :target="isExternalLink ? '_blank' : undefined"
      :class="[navigationItemStyle, active && navigationItemActiveStyle]"
      ref="navItemRef"
    >
      <component
        :is="icon"
        :class="[
          navigationItemIconStyle,
          active && navigationItemIconActiveStyle,
        ]"
      />
      <div
        :class="[
          navigationItemTextStyle,
          active && navigationItemTextActiveStyle,
        ]"
      >
        {{ label }}
      </div>
    </component>
    <div v-if="existPopup">
      <WizPopup
        :isOpen="isOpenDropdown"
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
        />
      </WizPopup>
    </div>
  </WizPopupContainer>
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
  navigationPopupContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { computed, PropType, ref } from "vue";
import { RouterLinkProps } from "vue-router/types/router";

import { WizPopupContainer, WizPopup, WizPopupButtonGroup } from "@/components";
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
  lockingPopup: {
    type: Boolean,
    required: false,
    default: true,
  },
  buttons: {
    type: Array as PropType<ButtonGroupItem[]>,
    required: false,
  },
});
const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http")
);

interface Emit {
  (e: "setLock", isLocking: boolean): void;
  (e: "unlock"): void;
}
const emit = defineEmits<Emit>();

const isOpenDropdown = ref(false);
const navItemRef = ref<HTMLElement>();

const existPopup = computed(() => props.buttons && props.buttons?.length > 0);
const navItemOnClick = () => {
  isOpenDropdown.value = true;
  if (existPopup) emit("setLock", true);
};
const navItemMouseEnter = () => {
  if (!props.lockingPopup) isOpenDropdown.value = true;
};

const navItemMouseLeave = (event: MouseEvent) => {
  const [cx, cy] = [event.clientX, event.clientY];
  const right = navItemRef.value?.getBoundingClientRect().right ?? 0;
  const top = navItemRef.value?.getBoundingClientRect().top ?? 0;
  const bottom = navItemRef.value?.getBoundingClientRect().bottom ?? 0;
  if (right <= cx && top < cy && cy < bottom) return;
  if (!props.lockingPopup) isOpenDropdown.value = false;
};
const popupOnClose = () => {
  isOpenDropdown.value = false;
  emit("setLock", false);
};
const popupMouseLeave = (event: MouseEvent) => {
  const [cx, cy] = [event.clientX, event.clientY];
  const right = navItemRef.value?.getBoundingClientRect().right ?? 0;
  const top = navItemRef.value?.getBoundingClientRect().top ?? 0;
  const bottom = navItemRef.value?.getBoundingClientRect().bottom ?? 0;
  if (cx <= right && top < cy && cy < bottom) return;
  if (!props.lockingPopup) isOpenDropdown.value = false;
};
</script>
