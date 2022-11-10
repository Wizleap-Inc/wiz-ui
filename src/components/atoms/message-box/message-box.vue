<template>
  <div :class="{
    'wiz-message-box': true,
    'wiz-message-box--information': type === 'Information',
    'wiz-message-box--caution': type === 'Caution',
    'wiz-message-box--warning': type === 'Warning'
  }">
    <component v-if="icon" :is="icon" class="wiz-message-box--icon" />
    <div>
      <div class="wiz-message-box--title">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Vue from "vue";

import { THEME } from "@/constants/styles";

interface Props {
  type: "Information" | "Caution" | "Warning"
  title: string;
  icon?: Vue;
}

const props = withDefaults(defineProps<Props>(), {
  type: "Information",
  title: "",
});

const colorGreen = THEME.color.green["300"];
const borderGreen = THEME.color.green["800"];
const colorYellow = THEME.color.yellow["300"];
const borderYellow = THEME.color.yellow["800"];
const colorRed = THEME.color.red["300"];
const borderRed = THEME.color.red["800"];
const colorGray = THEME.color.gray["700"]
</script>

<style lang="scss" scoped>
.wiz-message-box {
  display: flex;
  width: max-content;
  height: max-content;
  padding: 16px;

  &--information {
    background: v-bind(colorGreen);
    border: 1px solid v-bind(borderGreen);
    border-radius: 4px;
  }

  &--caution {
    background: v-bind(colorYellow);
    border: 1px solid v-bind(borderYellow);
    border-radius: 4px;
  }

  &--warning {
    background: v-bind(colorRed);
    border: 1px solid v-bind(borderRed);
    border-radius: 4px;
  }
}

.wiz-message-box--title {
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  color: v-bind(colorGray);
}

.wiz-message-box--icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>