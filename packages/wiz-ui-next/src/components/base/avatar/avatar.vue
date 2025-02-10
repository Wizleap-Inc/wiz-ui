<template>
  <div
    :class="[
      avatarStyle,
      sizeStyle[size],

      colorStyle[fontColor],
      clickable && avatarClickableStyle,
    ]"
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <img
      :class="avatarImageStyle"
      v-if="src !== undefined && isImgLoadSuccess"
      :src="src"
      :alt="alt"
      @error="onError"
    />
    <div
      v-else
      :class="[avatarFallbackStyle, fontSizeStyle[fontSizeMap[size]]]"
      :style="{
        background: avatarBgColor,
      }"
    >
      {{ altHeader }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ColorKeys,
  ComponentName,
  fontSizeMap,
  SpacingKeys,
  THEME,
  getColorCss,
} from "@wizleap-inc/wiz-ui-constants";
import {
  avatarClickableStyle,
  avatarFallbackStyle,
  avatarImageStyle,
  avatarStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/avatar.css";
import {
  colorStyle,
  fontSizeStyle,
  sizeStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType, computed, ref } from "vue";

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
    type: String as PropType<
      Extract<SpacingKeys, "md" | "lg" | "xl" | "xl2" | "xl3" | "xl4">
    >,
    required: false,
    default: "xl3",
  },
  color: {
    type: String as PropType<ColorKeys>,
    required: false,
  },
  bgColor: {
    type: String as PropType<ColorKeys>,
    required: false,
  },
  alt: {
    type: String,
    required: false,
  },
  /**
   * @deprecated この プロパティ は削除予定です。代わりに `name` プロパティを使ってください。
   */
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
    return props.name;
  }
  if (props.fallback) return props.fallback;
  return "";
});

const avatarBgColor = computed(() => {
  if (props.bgColor) return getColorCss(props.bgColor);
  if (!props.name) return THEME.color.gray[400];
  const getNum = Array.from(props.name)
    .map((ch) => ch.charCodeAt(0))
    .reduce((a, b) => a + b);
  const extractHue = (getNum * getNum) % 360;
  return `hsl(${extractHue}, 50%, 48%)`;
});

const fontColor = computed(() => {
  if (props.color) return props.color;
  if (props.fallback && !props.name) {
    return "gray.900";
  }
  return "white.800";
});
</script>
