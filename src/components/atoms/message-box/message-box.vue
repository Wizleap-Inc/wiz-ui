<template>
  <div :class="{
    'wiz-message-box': true,
    'wiz-message-box--information': type === 'information',
    'wiz-message-box--caution': type === 'caution',
    'wiz-message-box--warning': type === 'warning'
  }">
    <component v-if="icon" :is="icon" class="wiz-message-box__icon" />
    <div>
      <div class="wiz-message-box__title">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Vue from "vue";

import { THEME } from "@/constants/styles";
import { SPACING_MAP } from "@/constants/styles/spacing";

interface Props {
  type: "information" | "caution" | "warning"
  title: string;
  icon?: Vue;
}

withDefaults(defineProps<Props>(), {
  type: "information",
  title: "",
});

const colorGreen = THEME.color.green["300"];
const borderGreen = THEME.color.green["800"];
const colorYellow = THEME.color.yellow["300"];
const borderYellow = THEME.color.yellow["800"];
const colorRed = THEME.color.red["300"];
const borderRed = THEME.color.red["800"];
const colorGray = THEME.color.gray["700"]
const borderRadiusXxs = THEME.spacing.xs2;
const paddingMd = THEME.spacing.md;
const fontSize = THEME.fontSize.sm
const marginXs = THEME.spacing.xs
const marginSm = THEME.spacing.sm
</script>

<style lang="scss" scoped>
.wiz-message-box {
  display: flex;
  width: max-content;
  height: max-content;
  padding: v-bind(paddingMd);

  &--information {
    background: v-bind(colorGreen);
    border: 1px solid v-bind(borderGreen);
    border-radius: v-bind(borderRadiusXxs);
  }

  &--caution {
    background: v-bind(colorYellow);
    border: 1px solid v-bind(borderYellow);
    border-radius: v-bind(borderRadiusXxs);
  }

  &--warning {
    background: v-bind(colorRed);
    border: 1px solid v-bind(borderRed);
    border-radius: v-bind(borderRadiusXxs);
  }

  &__title {
    font-weight: 700;
    font-size: v-bind(fontSize);
    margin-bottom: v-bind(marginXs);
    color: v-bind(colorGray);
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: v-bind(marginSm);
  }
}
</style>