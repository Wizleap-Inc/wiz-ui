<template>
  <div class="wiz-avatar" @click="onClick">
    <img v-if="isImgLoadSuccess" :src="src" :alt="alt" @error="onError" />
    <div v-else class="wiz-avatar__fallback">
      {{ fallback }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";
import { ColorKeys } from "@wizleap-inc/wiz-ui-constants/styles/color";
import { getColorCss } from "@wizleap-inc/wiz-ui-constants/styles/color";
import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants/styles/spacing";
import { getSpacingCss } from "@wizleap-inc/wiz-ui-constants/styles/spacing";
import { computed, ref } from "vue";

defineOptions({
  name: ComponentName.Anchor,
});

interface Props {
  src: string;
  size?: SpacingKeys;
  color?: ColorKeys;
  bgColor?: ColorKeys;
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
const computedWidth = computed(() => getSpacingCss(props.size));
const computedHeight = computed(() => getSpacingCss(props.size));

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
