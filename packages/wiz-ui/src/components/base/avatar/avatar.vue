<template>
  <div class="wiz-avatar" @click="onClick">
    <img v-if="isImgLoadSuccess" :src="src" :alt="alt" @error="onError" />
    <div v-else class="wiz-avatar__fallback">
      {{ fallback }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { THEME } from "@/constants";
import { ColorKeys } from "@/types/styles/color";
import { SpacingKeys } from "@/types/styles/spacing";
import { getColorCss } from "@/utils/styles/color";
import { getSpacingCSS } from "@/utils/styles/spacing";

interface Props {
  size?: SpacingKeys;
  color?: ColorKeys;
  bgColor?: ColorKeys;
  src: string;
  alt?: string;
  fallback?: string;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "xl3",
  bgColor: "gray.400",
  color: "gray.900",
});

interface Emits {
  (event: "click"): void;
}

const emits = defineEmits<Emits>();

const onClick = () => props.clickable && emits("click");

const computedBackgroundColor = computed(() => getColorCss(props.bgColor));
const computedColor = computed(() => getColorCss(props.color));
const computedWidth = computed(() => getSpacingCSS(props.size));
const computedHeight = computed(() => getSpacingCSS(props.size));

const isImgLoadSuccess = ref(true);

const onError = () => {
  isImgLoadSuccess.value = false;
};
const computedCursor = computed(() =>
  props.clickable ? "pointer" : "default"
);

const fontSizeSm = THEME.fontSize.sm;
</script>

<style lang="scss" scoped>
.wiz-avatar {
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  cursor: v-bind(computedCursor);
  color: v-bind(computedColor);
  width: v-bind(computedWidth);
  height: v-bind(computedHeight);

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: v-bind(fontSizeSm);
    background: v-bind(computedBackgroundColor);
  }
}
</style>
