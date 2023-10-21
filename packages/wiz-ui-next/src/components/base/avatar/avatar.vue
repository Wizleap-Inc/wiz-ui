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
    <div v-else :class="[avatarFallbackStyle, backgroundStyle[bgColor]]">
      {{ fallback }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  SpacingKeys,
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
import { ref, PropType } from "vue";

defineOptions({
  name: ComponentName.Anchor,
});

const props = defineProps({
  src: {
    type: String,
    required: true,
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
    default: "gray.400",
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
</script>
