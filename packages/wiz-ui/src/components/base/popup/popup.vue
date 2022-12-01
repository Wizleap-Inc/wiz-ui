<template>
  <div class="wiz-popup" ref="popupRef" @click.stop>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref } from "vue";

import { THEME } from "@/constants";
import { SpacingKeys } from "@/types/styles/spacing";
import { ZIndexKeys } from "@/types/styles/z-index";
import { getZIndexCSS } from "@/utils/styles/z-index";

interface Props {
  layer: ZIndexKeys;
  vGap: SpacingKeys;
  hGap: SpacingKeys;
}

const props = defineProps<Props>();

interface Emits {
  (event: "oof"): void;
}

const emit = defineEmits<Emits>();

const popupRef = ref<HTMLElement | null>(null);

const clickOutside = (e: MouseEvent) => {
  if (e.target instanceof Node && !popupRef.value?.contains(e.target)) {
    console.log("oof");
    emit("oof");
  }
};

onBeforeMount(() => {
  addEventListener("click", clickOutside);
});

onBeforeUnmount(() => {
  removeEventListener("click", clickOutside);
});

const computedZIndex = computed(() => getZIndexCSS(props.layer));
const shadowMd = THEME.shadow.md;
</script>

<style lang="scss" scpoed>
.wiz-popup {
  position: absolute;
  z-index: v-bind(computedZIndex);
  filter: drop-shadow(v-bind(shadowMd));
}
</style>
