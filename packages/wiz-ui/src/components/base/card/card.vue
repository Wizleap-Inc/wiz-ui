<template>
  <div
    :class="[
      cardStyle,
      fit && cardFitStyle,
      shadow && cardShadowStyle,
      border && cardBorderStyle,
      px && paddingXStyle[px],
      py && paddingYStyle[py],
      !px && !py && paddingStyle[p],
      backgroundStyle[backgroundColor],
    ]"
    :style="{ maxWidth }"
  >
    <WizVStack gap="md" :align="align">
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
  ComponentName,
  ColorKeys,
  SpacingKeys,
} from "@wizleap-inc/wiz-ui-constants";
import {
  cardStyle,
  cardFitStyle,
  cardBodyStyle,
  cardShadowStyle,
  cardBorderStyle,
  cardHeaderStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/card.css";
import {
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
  backgroundStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

import { WizVStack } from "@/components";

defineOptions({
  name: ComponentName.Card,
});

defineProps({
  title: {
    type: String,
    required: false,
  },
  hint: {
    type: String,
    required: false,
  },
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
  align: {
    type: String as PropType<"start" | "center" | "end" | "stretch">,
    required: false,
    default: "end",
  },
  fit: {
    type: Boolean,
    required: false,
  },
  maxWidth: {
    type: String,
    required: false,
  },
});
</script>
