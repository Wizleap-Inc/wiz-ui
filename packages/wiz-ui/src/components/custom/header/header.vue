<template>
  <WizBox bg-color="white.500" width="100%" height="60px">
    <WizHStack align="center" justify="between" py="lg" height="100%">
      <WizHStack align="center">
        <WizIconButton
          :icon="WizIMenu"
          size="lg"
          variant="transparent"
          @click="toggleMenuOpen"
        />
        <component :is="logo" />
        <WizHeading fontSize="sm" color="gray.900" padding="0 1rem">
          {{ title }}
        </WizHeading>
      </WizHStack>
      <WizHStack align="center">
        <WizIconButton
          :icon="WizINotification"
          size="md"
          variant="transparent"
          @click="toggleNotificationOpen"
        />
        <WizAvatar :src="avatarSrc" />
      </WizHStack>
    </WizHStack>
  </WizBox>
</template>

<script setup lang="ts">
import Vue from "vue";

import {
  WizAvatar,
  WizBox,
  WizHeading,
  WizHStack,
  WizIconButton,
} from "@/components/base";
import { WizIMenu, WizINotification } from "@/components/icons";
import { ComponentName } from "@/constants/component/name";
import { globalInject, globalKey } from "@/providers";

defineOptions({
  name: ComponentName.Header,
});

interface Props {
  title: string;
  logo?: Vue;
  avatarSrc: string;
}

defineProps<Props>();

const { isMenuOpen, setIsMenuOpen } = globalInject(globalKey);

const toggleMenuOpen = () => {
  setIsMenuOpen(!isMenuOpen.value);
};
</script>

<style lang="scss" scoped></style>
