<template>
  <RouterLink v-if="isRouterLink" class="wiz-anchor" :to="to">
    <span class="wiz-anchor__icon">
      <component v-if="icon" :is="icon" />
    </span>
    <slot />
  </RouterLink>
  <a
    v-else
    class="wiz-anchor"
    :href="typeof to === 'string' ? to : to.path"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="wiz-anchor__icon">
      <component v-if="icon" :is="icon" />
    </span>
    <slot />
  </a>
</template>

<script setup lang="ts">
import Vue, { computed, withDefaults } from "vue";
import { RouterLinkProps } from "vue-router/types/router";

import { ColorKeys } from "@/types/styles/color";
import { FontSizeKeys } from "@/types/styles/fontSize";
import { getColorCss } from "@/utils/styles/color";
import { getFontSizeCss } from "@/utils/styles/fontSize";

interface Props {
  to: RouterLinkProps["to"];
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
  fontWeight?: "normal" | "bold";
  target?: "_blank" | "_self";
  icon?: Vue;
}

const props = withDefaults(defineProps<Props>(), {
  to: "#",
  color: "blue.800",
  fontSize: "md",
  fontWeight: "normal",
  target: "_self",
});

const isRouterLink = computed(() => {
  // propsのtoがobjectだった時点でLocation遷移なので、RouterLinkを使う
  if (typeof props.to === "object") return true;
  // propsのtoがhttpから始まってる時点で外部リンクなので、aタグを使う
  if (props.to.startsWith("http")) return false;
  // propsのtargetが_blankだったら新規タブで読み込まないといけないので、aタグ
  return props.target !== "_blank";
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
