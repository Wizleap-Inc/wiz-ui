<template>
  <div v-show="value" class="wiz-popup" ref="popupRef">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Vue } from "vue/types/vue";

import { THEME } from "@/constants";
import { useClickOutside } from "@/hooks/use-click-outside";
import { SpacingKeys } from "@/types/styles/spacing";
import { ZIndexKeys } from "@/types/styles/z-index";
import { getZIndexCSS } from "@/utils/styles/z-index";

interface Props {
  layer: ZIndexKeys;
  vGap: SpacingKeys;
  hGap: SpacingKeys;
  value: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (event: "input", value: boolean): void;
}

const emit = defineEmits<Emits>();

const popupRef = ref<HTMLElement | Vue>();

useClickOutside(popupRef, () => emit("input", false));

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
