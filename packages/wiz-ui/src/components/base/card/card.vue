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
        v-if="title || (!title && $slots.subHeaderArea) || hint"
        :class="cardHeaderStyle"
      >
        <div :class="cardHeaderMainStyle">
          <slot v-if="!title" name="mainHeaderArea" />
          <div :class="cardHeaderTitleStyle">{{ title }}</div>
          <WizTooltip v-if="hint" :content="hint">
            <WizIcon :icon="WizIHelp" color="gray.600" size="lg" />
          </WizTooltip>
        </div>
        <slot name="subHeaderArea" />
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
  cardHeaderMainStyle,
  cardHeaderTitleStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/card.css";
import {
  paddingStyle,
  paddingXStyle,
  paddingYStyle,
  backgroundStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { PropType } from "vue";

import { WizVStack, WizIHelp, WizIcon, WizTooltip } from "@/components";

defineOptions({
  name: ComponentName.Card,
});

/*
interface Props {
  title?: string;
  hint?: string;
  p?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  backgroundColor?: ColorKeys;
  shadow?: boolean;
  border?: boolean;
  align?: "start" | "center" | "end" | "stretch";
  fit?: boolean;
  maxWidth?: string;
}
*/

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
