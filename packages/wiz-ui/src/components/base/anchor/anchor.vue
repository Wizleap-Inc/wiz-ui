<template>
  <component
    :is="isRouterLink ? 'router-link' : 'a'"
    class="wiz-anchor"
    :to="isRouterLink ? to : undefined"
    :href="isRouterLink ? undefined : to"
    :target="openInNewTab ? '_blank' : undefined"
    :rel="openInNewTab ? 'noopener noreferrer' : undefined"
  >
    <span class="wiz-anchor__icon" v-if="iconPosition === 'left'">
      <component v-if="icon" :is="icon" />
    </span>
    <slot />
    <span class="wiz-anchor__icon" v-if="iconPosition === 'right'">
      <component v-if="icon" :is="icon" />
    </span>
  </component>
</template>

<script setup lang="ts">
import Vue, { computed, withDefaults } from "vue";
import { RouterLinkProps } from "vue-router/types/router";

import { ColorKeys } from "@/types/styles/color";
import { FontSizeKeys } from "@/types/styles/font-size";
import { getColorCss } from "@/utils/styles/color";
import { getFontSizeCss } from "@/utils/styles/font-size";

interface Props {
  to: RouterLinkProps["to"];
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: "normal" | "bold";
  icon?: Vue;
  iconPosition?: "left" | "right";
  openInNewTab?: boolean;
}

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

const computedColor = computed(() => {
  return getColorCss(props.color);
});

const computedFontSize = computed(() => {
  return getFontSizeCss(props.fontSize);
});

const computedFontWeight = computed(() => props.fontWeight);
</script>

<style lang="scss" scoped>
.wiz-anchor {
  line-height: 1.5;
  margin: 0;
  color: v-bind(computedColor);
  font-size: v-bind(computedFontSize);
  font-weight: v-bind(computedFontWeight);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &__icon {
    vertical-align: middle;
    font-size: 1.5em;
    & > svg {
      fill: v-bind(computedColor);
    }
  }
}
</style>
