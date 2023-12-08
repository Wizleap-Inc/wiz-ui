<template>
  <div
    :class="[
      avatarStyle,
      sizeStyle[size],
      colorStyle[color],
      clickable && avatarClickableStyle,
    ]"
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <img
      :class="avatarImageStyle"
      v-if="isImgLoadSuccess"
      :src="src"
      :alt="alt"
      @error="onError"
    />
    <div
      v-else
      :class="[avatarFallbackStyle, bgColor && backgroundStyle[bgColor]]"
      :style="{
        backgroundColor: defaultBgColor,
      }"
    >
      {{ altHeader }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  SpacingKeys,
  THEME,
} from "@wizleap-inc/wiz-ui-constants";
import {
  avatarStyle,
  avatarImageStyle,
  avatarFallbackStyle,
  avatarClickableStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/avatar.css";
import {
  backgroundStyle,
  sizeStyle,
  colorStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { ref, PropType, computed } from "vue";

defineOptions({
  name: ComponentName.Anchor,
});

const props = defineProps({
  name: {
    type: String,
    required: false,
  },
  src: {
    type: String,
    required: false,
  },
  ariaLabel: {
    type: String,
    required: true,
  },
  size: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "xl3",
  },
  color: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "gray.900",
  },
  bgColor: {
    type: String as PropType<ColorKeys>,
    required: false,
  },
  alt: {
    type: String,
    required: false,
  },
  fallback: {
    type: String,
    required: false,
  },
  clickable: {
    type: Boolean,
    required: false,
  },
});

interface Emits {
  (event: "click"): void;
}

const emits = defineEmits<Emits>();

const onClick = () => props.clickable && emits("click");

const isImgLoadSuccess = ref(true);

const onError = () => {
  isImgLoadSuccess.value = false;
};

const altHeader = computed(() => {
  if (props.name) {
    const InitialWords = props.name.split(/ |　/);
    if (InitialWords.length > 1) {
      return (
        InitialWords[0][0].toUpperCase() + InitialWords[1][0].toUpperCase()
      );
    }
    return InitialWords[0][0].toUpperCase();
  }
  if (props.fallback) return props.fallback;
  "";
});

const defaultBgColor = computed(() => {
  if (!props.name) return THEME.color.gray[400];
  const getNum = Array.from(props.name)
    .map((ch) => ch.charCodeAt(0))
    .reduce((a, b) => a + b);
  const extractHue = (getNum * getNum) % 360;
  return `hsl(${extractHue}, 80%, 64%)`;
});
</script>
