<template>
  <div
    ref="popupContainerRef"
    :class="popupContainerStyle"
    :style="{ width: (expand && '100%') || width }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { popupContainerStyle } from "@wizleap-inc/wiz-ui-styles/bases/popup.css";
import { provide, ref } from "vue";

import { POPUP_KEY, usePopupProvider } from "./provider";

defineOptions({
  name: ComponentName.PopupContainer,
});

defineProps({
  expand: {
    type: Boolean,
    required: false,
  },
  width: {
    type: String,
    required: false,
    default: "fit-content",
  },
});

const popupContainerRef = ref<HTMLElement | undefined>();
const provider = usePopupProvider(popupContainerRef);
provide(POPUP_KEY, provider);
</script>
