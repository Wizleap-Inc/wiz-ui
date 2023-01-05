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

interface Props {
  to: RouterLinkProps["to"];
  color: ColorKeys;
  fontSize: FontSizeKeys;
  fontWeight: FontWeightKeys;
  icon: TIcon;
  iconPosition: "left" | "right";
  openInNewTab: boolean;
  nowrap: boolean;
}

defineOptions({
  name: ComponentName.Anchor,
});

const props = defineProps({
  to: {
    type: String as PropType<Props["to"]>,
    required: true,
  },
  color: {
    type: String as PropType<Props["color"]>,
    required: false,
    default: "blue.800",
  },
  fontSize: {
    type: String as PropType<Props["fontSize"]>,
    required: false,
    default: "md",
  },
  fontWeight: {
    type: String as PropType<Props["fontWeight"]>,
    required: false,
    default: "normal",
  },
  icon: {
    type: Object as PropType<Props["icon"]>,
    required: false,
  },
  iconPosition: {
    type: String as PropType<Props["iconPosition"]>,
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
  // propsのtoがobjectだった時点でLocation遷移なので、RouterLinkを使う
  if (typeof props.to === "object") return true;
  // propsのtoがhttpから始まってる時点で外部リンクなので、aタグを使う
  if (props.to.startsWith("http")) return false;
  // propsのtargetが_blankだったら新規タブで読み込まないといけないので、aタグ
  return props.openInNewTab === false;
});
</script>
