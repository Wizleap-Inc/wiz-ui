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
import { nextTick, provide, ref, watch } from "vue";

import { useClickOutside } from "@/hooks/use-click-outside";

import { POPUP_KEY, usePopupProvider } from "./provider";

defineOptions({
  name: ComponentName.PopupContainer,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  expand: {
    type: Boolean,
    required: false,
  },
});
interface Emits {
  (event: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emits>();

const popupContainerRef = ref<HTMLElement | undefined>();
const provider = usePopupProvider(popupContainerRef);
provide(POPUP_KEY, provider);

const { setPopupOpen, updateBodyPxInfo } = provider;

watch(props, () => {
  setPopupOpen(props.modelValue);
  nextTick(() => {
    updateBodyPxInfo();
  });
});

useClickOutside(popupContainerRef, () => {
  emit("update:modelValue", false);
});
</script>
