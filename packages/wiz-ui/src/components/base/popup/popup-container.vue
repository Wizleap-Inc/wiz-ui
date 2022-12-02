<template>
  <div class="wiz-popup-container" ref="popupContainerRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";

import { POPUP_KEY, usePopupProvider } from "./provider";

const popupContainerRef = ref<HTMLElement | undefined>();
const provider = usePopupProvider(popupContainerRef);
provide(POPUP_KEY, provider);
</script>

<style lang="scss" scoped>
.wiz-popup-container {
  position: relative;
}
</style>
