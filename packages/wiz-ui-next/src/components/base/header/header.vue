<template>
  <div
    :class="[headerStyle, sticky && headerStickyStyle]"
    :style="{ zIndex: headerZIndex }"
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
import { globalInject, globalKey } from "@/hooks/use-global-provider";

defineOptions({
  name: ComponentName.Header,
});

/*
interface Props {
  gapLeft?: SpacingKeys;
  gapRight?: SpacingKeys;
  sticky?: boolean;
}
*/

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

const { isMenuOpen, setIsMenuOpen } = globalInject(globalKey);
const toggleMenuOpen = () => setIsMenuOpen(!isMenuOpen.value);
const { nextZIndex } = useZIndex(THEME.zIndex.base);
const headerZIndex = nextZIndex();
</script>
