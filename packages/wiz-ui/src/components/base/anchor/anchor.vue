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
    />
    <slot />
    <WizIcon
      :icon="icon"
      v-if="icon && iconPosition === 'right'"
      :size="getRelativeFontSize(fontSize, 3)"
    />
  </component>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  FontSizeKeys,
  getRelativeFontSize,
} from "@wizleap-inc/wiz-ui-constants";
import {
  anchorStyle,
  anchorNoWrapStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/anchor.css";
import {
  fontSizeStyle,
  colorStyle,
  fontWeightStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, withDefaults } from "vue";
import { RouterLinkProps } from "vue-router/types/router";

import { WizIcon, TIcon } from "@/components";

interface Props {
  to: RouterLinkProps["to"];
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: "normal" | "bold";
  icon?: TIcon;
  iconPosition?: "left" | "right";
  openInNewTab?: boolean;
  nowrap?: boolean;
}

defineOptions({
  name: ComponentName.Anchor,
});

const props = withDefaults(defineProps<Props>(), {
  color: "blue.800",
  fontSize: "md",
  fontWeight: "normal",
  iconPosition: "left",
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
