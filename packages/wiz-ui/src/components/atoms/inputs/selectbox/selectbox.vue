<template>
  <div>
    <div
      class="wiz-selectbox"
      :class="{ 'wiz-selectbox--active': toggleSelectBox }"
    >
      <div
        class="wiz-selectbox__box"
        @click="toggleSelectBox = !toggleSelectBox"
      >
        <WizHStack gap="sm" align="center">
          <span>選択して下さい</span>
          <span
            v-for="(item, key) in items"
            v-show="item.id == inputValue"
            :key="'selected' + key"
          >
            {{ item.name }}
          </span>
          <WizIExpandLess v-if="toggleSelectBox" />
          <WizIExpandMore v-else-if="!toggleSelectBox" />
        </WizHStack>
      </div>
      <div class="wiz-selectbox__selector" v-show="toggleSelectBox">
        <WizVStack gap="xs2">
          <div
            class="wiz-selectbox__selector-option"
            v-for="option in items"
            :key="'optionId' + option.id"
            @click="
              toggleSelectBox = !toggleSelectBox;
              inputValue = option.id;
            "
          >
            {{ option.name }}
          </div>
        </WizVStack>
      </div>
    </div>
    <select
      class="wiz-selectbox__hidden"
      :name="'itemId'"
      :disabled="false"
      v-model="inputValue"
    >
      <option
        v-for="option in items"
        :value="option.id"
        :key="'hiddenOption' + option.id"
      />
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { WizIExpandMore } from "@/components/icons";
import { WizIExpandLess } from "@/components/icons";
import { THEME } from "@/constants/styles";

import { WizHStack } from "../../stack";
import { WizVStack } from "../../stack";

const toggleSelectBox = ref(false);
const inputValue = ref(null);
const items = [
  { id: 1, name: "調整中" },
  { id: 2, name: "面談前" },
];

const fontSizeSm = THEME.fontSize.sm;
const spacingNo = THEME.spacing.no;
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const spacingSm = THEME.spacing.sm;
const colorWhite800 = THEME.color.white["800"];
const colorGray300 = THEME.color.gray["300"];
const colorGray400 = THEME.color.gray["400"];
const colorGray500 = THEME.color.gray["500"];
const colorGray700 = THEME.color.gray["700"];
const colorGreen800 = THEME.color.green["800"];
const shadowSm = THEME.shadow.sm;
</script>

<style lang="scss" scoped>
.wiz-selectbox {
  position: relative;
  width: max-content;
  height: 40px;
  background: v-bind(colorWhite800);
  border: 1px solid v-bind(colorGray400);
  border-radius: v-bind(spacingXs2);
  box-sizing: border-box;
  cursor: pointer;

  &--active {
    border-color: v-bind(colorGreen800);
  }

  &__box {
    line-height: 38px;
    padding: v-bind(spacingNo) v-bind(spacingXs);
    font-size: v-bind(fontSizeSm);
    color: v-bind(colorGray500);
  }

  &__selector {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    padding: v-bind(spacingXs) v-bind(spacingNo);
    background: v-bind(colorWhite800);
    border-radius: v-bind(spacingXs2);
    box-sizing: border-box;
    box-shadow: v-bind(shadowSm);
    z-index: 10;
  }

  &__selector-option {
    position: relative;
    width: 100%;
    line-height: 36px;
    padding: v-bind(spacingNo) v-bind(spacingSm);
    font-size: v-bind(fontSizeSm);
    color: v-bind(colorGray700);
    box-sizing: border-box;

    &:hover {
      background: v-bind(colorGray300);
    }
  }
}
</style>
