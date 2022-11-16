<template>
  <Transition>
    <span class="wiz-tooltip" v-show="isShow">
      <span class="wiz-tooltip__content" v-html="content"> </span>
    </span>
  </Transition>
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
  text-align: center;
  z-index: 10;
  width: 220px;
  bottom: 180%;
  left: 50%;
  margin-left: -110px;

  &__content {
    background-color: v-bind(colorGray800);
    color: v-bind(colorWhite800);
    font-size: v-bind(fontSizeXs2);
    border-radius: v-bind(spaceXs2);
    padding: v-bind(spaceXs);
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 95%;
      margin-left: -5px;
      border-style: solid;
      border-width: 9px 5px 0 5px;
      border-color: v-bind(colorGray800) transparent transparent transparent;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
