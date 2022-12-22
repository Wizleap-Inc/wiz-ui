<template>
  <div
    class="wiz-popup-container"
    :class="{
      'wiz-popup-container--expand': expand,
    }"
    ref="popupContainerRef"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { nextTick, provide, ref, watch } from "vue";

import { useClickOutside } from "@/hooks/use-click-outside";

import { POPUP_KEY, usePopupProvider } from "./provider";

defineOptions({
  name: ComponentName.PopupContainer,
});

interface Props {
  value: boolean;
  expand?: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (event: "input", value: boolean): void;
}

const emit = defineEmits<Emits>();

const popupContainerRef = ref<HTMLElement | undefined>();
const provider = usePopupProvider(popupContainerRef);
provide(POPUP_KEY, provider);

const { setPopupOpen, updateBodyPxInfo } = provider;

watch(props, () => {
  setPopupOpen(props.value);
  nextTick(() => {
    updateBodyPxInfo();
  });
});

useClickOutside(popupContainerRef, () => {
  emit("input", false);
});
</script>

<style lang="scss" scoped>
.wiz-popup-container {
  position: relative;
  width: fit-content;
  height: fit-content;

  &--expand {
    width: 100%;
  }
}
</style>
