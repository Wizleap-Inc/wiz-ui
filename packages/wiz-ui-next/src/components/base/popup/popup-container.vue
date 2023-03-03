<template>
  <div
    :class="popupContainerStyle[expand ? 'expanded' : 'default']"
    ref="popupContainerRef"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { popupContainerStyle } from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { provide, ref } from "vue";

import { useScroll } from "@/hooks/use-scroll";

import { POPUP_KEY, usePopupProvider } from "./provider";

defineOptions({
  name: ComponentName.PopupContainer,
});

defineProps({
  expand: {
    type: Boolean,
    required: false,
  },
});

const popupContainerRef = ref<HTMLElement | undefined>();
const provider = usePopupProvider(popupContainerRef);
provide(POPUP_KEY, provider);

const { updateBodyPxInfo } = provider;
useScroll(updateBodyPxInfo);
</script>
