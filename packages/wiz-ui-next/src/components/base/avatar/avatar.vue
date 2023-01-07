<template>
  <div
    :class="[
      avatarStyle,
      sizeStyle[size],
      colorStyle[color],
      clickable && avatarClickableStyle,
    ]"
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
import { ref } from "vue";

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

const isImgLoadSuccess = ref(true);

const onError = () => {
  isImgLoadSuccess.value = false;
};
</script>
