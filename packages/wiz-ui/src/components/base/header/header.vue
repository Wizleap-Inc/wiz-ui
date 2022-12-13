<template>
  <div class="wiz-header" :style="computedStickyStyle">
    <WizHStack align="center" justify="between" py="lg" height="100%">
      <WizHStack align="center" :gap="gapLeft">
        <WizIconButton
          :icon="WizIMenu"
          size="lg"
          variant="transparent"
          @click="toggleMenuOpen"
        />
        <slot name="left" />
      </WizHStack>
      <WizHStack align="center" :gap="gapRight">
        <slot name="right" />
      </WizHStack>
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import { THEME } from "@wiz-ui/constants";
import { ComponentName } from "@wiz-ui/constants/component/name";
import { SpacingKeys } from "@wiz-ui/constants/styles/spacing";
import { computed } from "vue";
import { StyleValue } from "vue/types/jsx";

import { WizHStack, WizIconButton, WizIMenu } from "@/components";
import { globalInject, globalKey } from "@/providers";

defineOptions({
  name: ComponentName.Header,
});

interface Props {
  gapLeft?: SpacingKeys;
  gapRight?: SpacingKeys;
  sticky?: boolean;
}

const props = defineProps<Props>();
const { isMenuOpen, setIsMenuOpen } = globalInject(globalKey);
const toggleMenuOpen = () => setIsMenuOpen(!isMenuOpen.value);

const white500 = THEME.color.white[500];
const headerHeight = THEME.share.HEADER_HEIGHT;
const computedStickyStyle = computed(() => {
  const styles: StyleValue = {};
  if (props.sticky) styles.position = "sticky";
  if (props.sticky) styles.top = 0;
  if (props.sticky) styles.left = 0;
  if (props.sticky) styles.borderBottom = `1px solid ${THEME.color.gray[400]}`;
  return styles;
});
</script>

<style lang="scss" scoped>
.wiz-header {
  background-color: v-bind(white500);
  width: 100%;
  height: v-bind(headerHeight);
}
</style>
