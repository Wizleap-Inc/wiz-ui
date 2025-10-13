<template>
  <div
    :class="[
      cardStyle,
      fit && cardFitStyle,
      hexpand && cardHexpandStyle,
      shadow && cardShadowStyle,
      border && cardBorderStyle[borderStyle],
      px && paddingXStyle[px],
      py && paddingYStyle[py],
      !px && !py && paddingStyle[p],
      backgroundStyle[backgroundColor],
    ]"
    :style="{
      maxWidth,
      borderColor: border ? getColorCss(borderColor) : undefined,
    }"
  >
    <WizVStack :gap="gap" :align="align" :height="hexpand ? '100%' : 'auto'">
      <div
        v-if="$slots.mainHeaderArea || $slots.subHeaderArea"
        :class="cardHeaderStyle"
      >
        <div>
          <slot name="mainHeaderArea" />
        </div>
        <div>
          <slot name="subHeaderArea" />
        </div>
      </div>
      <div v-if="$slots.default" :class="cardBodyStyle">
        <slot />
      </div>
      <div v-if="$slots.footer">
        <slot name="footer" />
      </div>
    </WizVStack>
  </div>
</template>

<script setup lang="ts">
import {
  ColorKeys,
  ComponentName,
  SpacingKeys,
  getColorCss,
} from "@wizleap-inc/wiz-ui-constants";
import {
  cardBodyStyle,
  cardBorderStyle,
  cardFitStyle,
  cardHexpandStyle,
  cardHeaderStyle,
  cardShadowStyle,
  cardStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/card.css";
import {
  backgroundStyle,
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

import { WizVStack } from "@/components";

defineOptions({
  name: ComponentName.Card,
});

defineProps({
  p: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "md",
  },
  px: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  py: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  backgroundColor: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "white.800",
  },
  shadow: {
    type: Boolean,
    required: false,
  },
  border: {
    type: Boolean,
    required: false,
  },
  borderColor: {
    type: String as PropType<ColorKeys>,
    required: false,
    default: "gray.400",
  },
  borderStyle: {
    type: String as PropType<"solid" | "dashed" | "dotted">,
    required: false,
    default: "solid",
  },
  align: {
    type: String as PropType<"start" | "center" | "end" | "stretch">,
    required: false,
    default: "end",
  },
  fit: {
    type: Boolean,
    required: false,
  },
  hexpand: {
    type: Boolean,
    required: false,
  },
  maxWidth: {
    type: String,
    required: false,
  },
  gap: {
    type: String as PropType<SpacingKeys>,
    required: false,
    default: "md",
  },
});
</script>
