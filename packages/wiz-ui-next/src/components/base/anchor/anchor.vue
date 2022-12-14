<template>
  <component
    :class="[
      anchorStyle,
      colorStyle[color],
      fontSizeStyle[fontSize],
      fontWeightStyle[fontWeight],
      nowrap && anchorNoWrapStyle,
    ]"
    :is="isRouterLink ? 'router-link' : 'a'"
    :to="isRouterLink ? to : undefined"
    :href="isRouterLink ? undefined : to"
    :target="openInNewTab ? '_blank' : undefined"
    :rel="openInNewTab ? 'noopener noreferrer' : undefined"
  >
    <WizIcon
      :icon="icon"
      v-if="icon && iconPosition === 'left'"
      :size="getRelativeFontSize(fontSize, 3)"
      :color="color"
    />
    <slot />
    <WizIcon
      :icon="icon"
      v-if="icon && iconPosition === 'right'"
      :size="getRelativeFontSize(fontSize, 3)"
      :color="color"
    />
  </component>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  FontSizeKeys,
  getRelativeFontSize,
  FontWeightKeys,
} from "@wizleap-inc/wiz-ui-constants";
import {
  anchorStyle,
  anchorNoWrapStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/anchor.css";
import {
  colorStyle,
  fontSizeStyle,
  fontWeightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, PropType } from "vue";
import { RouterLinkProps } from "vue-router/types/router";

import { WizIcon, TIcon } from "@/components";

defineOptions({
  name: ComponentName.Anchor,
});

const props = defineProps({
  to: {
    type: String as PropType<RouterLinkProps["to"]>,
    required: true,
  },
  color: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "blue.800",
  },
  fontSize: {
    type: String as PropType<FontSizeKeys>,
    required: false,
    default: "md",
  },
  fontWeight: {
    type: String as PropType<FontWeightKeys>,
    required: false,
    default: "normal",
  },
  icon: {
    type: Object as PropType<TIcon>,
    required: false,
  },
  iconPosition: {
    type: String as PropType<"left" | "right">,
    required: false,
    default: "left",
  },
  openInNewTab: {
    type: Boolean,
    required: false,
    default: false,
  },
  nowrap: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isRouterLink = computed(() => {
  if (props.to === undefined) return false;
  // props???to???object??????????????????Location??????????????????RouterLink?????????
  if (typeof props.to === "object") return true;
  // props???to???http?????????????????????????????????????????????????????????a???????????????
  if (props.to.startsWith("http")) return false;
  // props???target???_blank?????????????????????????????????????????????????????????????????????a??????
  return props.openInNewTab === false;
});
</script>
