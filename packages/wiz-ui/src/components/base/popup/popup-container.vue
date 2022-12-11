<template>
  <div class="wiz-popup-container" ref="popupContainerRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { nextTick, provide, ref, watch } from "vue";

import { ComponentName } from "@/constants/component/name";
import { useClickOutside } from "@/hooks/use-click-outside";

import { POPUP_KEY, usePopupProvider } from "./provider";

defineOptions({
  name: ComponentName.PopupContainer,
});
interface Props {
  value: boolean;
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
}
</style>
