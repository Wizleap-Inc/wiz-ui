<template>
  <div class="wiz-tooltip">
    <slot></slot>
    <span class="wiz-tooltip__block" v-if="content || slots.content">
      <span class="wiz-tooltip__block-content">
        {{ content }}
        <slot v-if="!content" name="content" />
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { THEME, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { useSlots } from "vue";

defineOptions({
  name: ComponentName.Tooltip,
});

interface Props {
  content?: string;
}

defineProps<Props>();

const slots = useSlots();

const colorGray800 = THEME.color.gray["800"];
const colorWhite800 = THEME.color.white["800"];
const fontSizeXs2 = THEME.fontSize.xs2;
const spaceXs = THEME.spacing.xs;
const spaceXs2 = THEME.spacing.xs2;
</script>

<style lang="scss" scoped>
.wiz-tooltip {
  position: relative;
  width: fit-content;

  &:hover > &__block {
    visibility: visible;
    opacity: 1;
  }

  &__block {
    visibility: hidden;
    opacity: 0;
    transition: opacity 100ms;
    position: absolute;
    text-align: center;
    z-index: 10;
    width: 220px;
    bottom: 140%;
    left: 50%;
    margin-left: -110px;

    &-content {
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
}
</style>
