<template>
  <div class="wiz-header">
    <WizHStack align="center" justify="between" py="lg" height="100%">
      <WizHStack align="center" :gap="gapLeft">
        <slot name="left" />
      </WizHStack>
      <WizHStack align="center" :gap="gapRight">
        <slot name="right" />
      </WizHStack>
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import { WizHStack } from "@/components/base";
import { THEME } from "@/constants";
import { ComponentName } from "@/constants/component/name";
import { SpacingKeys } from "@/types/styles/spacing";

defineOptions({
  name: ComponentName.Header,
});

interface Props {
  gapLeft?: SpacingKeys;
  gapRight?: SpacingKeys;
}

defineProps<Props>();

const white500 = THEME.color.white[500];
const headerHeight = THEME.share.HEADER_HEIGHT;
</script>

<style lang="scss" scoped>
.wiz-header {
  background-color: v-bind(white500);
  width: 100%;
  height: v-bind(headerHeight);
  position: fixed;
  top: 0;
  left: 0;
}
</style>
