<template>
  <div
    :class="[headerStyle, sticky && headerStickyStyle]"
    :style="{ zIndex: currentZIndex }"
  >
    <WizHStack align="center" justify="between" height="100%">
      <WizHStack align="center" :gap="gapLeft" pl="lg">
        <WizIconButton
          :icon="WizIMenu"
          size="lg"
          variant="transparent"
          @click="toggleMenuOpen"
        />
        <slot name="left" />
      </WizHStack>
      <WizHStack align="center" :gap="gapRight" pr="lg">
        <slot name="right" />
      </WizHStack>
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import {
  ComponentName,
  SpacingKeys,
  THEME,
} from "@wizleap-inc/wiz-ui-constants";
import {
  headerStyle,
  headerStickyStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/header.css";
import { PropType } from "vue";

import { WizHStack, WizIconButton, WizIMenu } from "@/components";
import { useZIndex } from "@/hooks";

defineOptions({
  name: ComponentName.Header,
});

defineProps({
  gapLeft: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  gapRight: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  sticky: {
    type: Boolean,
    required: false,
  },
});

interface Emit {
  (e: "onToggle"): void;
}

const emits = defineEmits<Emit>();

const toggleMenuOpen = () => emits("onToggle");
const { currentZIndex } = useZIndex(THEME.zIndex.floating);
</script>
