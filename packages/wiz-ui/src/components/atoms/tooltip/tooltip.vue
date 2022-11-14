<template>
  <div class="wiz-tooltip" v-show="isShow">
    <div class="wiz-tooltip__content" v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { THEME } from "@/constants";

interface Props {
  content: string;
  isShow: boolean;
}

withDefaults(defineProps<Props>(), {
  content: "",
  isShow: false,
});

const colorGray800 = THEME.color.gray["800"];
const colorWhite800 = THEME.color.white["800"];
const fontSizeXs2 = THEME.fontSize.xs2;
const spaceXs = THEME.spacing.xs;
const spaceXs2 = THEME.spacing.xs2;
</script>

<style lang="scss" scoped>
.wiz-tooltip {
  position: absolute;
  bottom: 30px;
  width: max-content;
  background-color: v-bind(colorGray800);
  border-radius: v-bind(spaceXs2);
  padding: v-bind(spaceXs);
  z-index: 10;

  &__content {
    font-size: v-bind(fontSizeXs2);
    color: v-bind(colorWhite800);
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 95%;
    border-style: solid;
    border-width: 9px 5px 0 5px;
    border-color: v-bind(colorGray800) transparent transparent transparent;
  }
}
</style>
