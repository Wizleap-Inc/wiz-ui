<template>
  <tr class="wiz-card-table__tr" @click="onClick">
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { THEME, ComponentName } from "@wizleap-inc/wiz-ui-constants";

defineOptions({
  name: ComponentName.CardTr,
});

interface Emits {
  (event: "click"): void;
}

const emits = defineEmits<Emits>();

const onClick = () => emits("click");

const colorWhite800 = THEME.color.white["800"];
const colorGreen800 = THEME.color.green["800"];
const colorGreen300 = THEME.color.green["300"];
const colorGray300 = THEME.color.gray["300"];
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
</script>

<style lang="scss" scoped>
.wiz-card-table {
  tbody > &__tr {
    position: relative;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100% + v-bind(spacingXs) * 2);
      transform: translateY(calc(-1 * v-bind(spacingXs)));
      border-radius: v-bind(spacingXs2);
      background-color: v-bind(colorWhite800);
      z-index: -1;
      box-sizing: border-box;
      border: 1px solid v-bind(colorGray300);
    }

    &:hover {
      &::after {
        border: 2px solid v-bind(colorGreen800);
      }
    }

    &:active {
      &::after {
        background-color: v-bind(colorGreen300);
      }
    }
  }
}
</style>
