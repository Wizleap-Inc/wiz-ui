<template>
  <WizBox bg-color="white.500" width="100%" height="60px">
    <WizHStack align="center" justify="between" py="lg" height="100%">
      <WizHStack align="center" gap="sm">
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
      <WizHStack align="center" gap="xl">
        <WizBox position="relative">
          <WizIconButton
            :icon="WizINotification"
            size="lg"
            variant="transparent"
            color="gray.700"
            @click="toggleNotificationOpen"
          />
          <WizBox
            position="absolute"
            right="0"
            top="calc(50% + 30px)"
            width="300px"
            dropShadow="md"
          >
            <WizNotification
              v-if="isNotificationOpen"
              :notifications="notifications"
              :tabs="tabs"
              height="640px"
            />
          </WizBox>
        </WizBox>
        <WizAvatar :src="avatarSrc" />
      </WizHStack>
    </WizHStack>
  </WizBox>
</template>

<script setup lang="ts">
import Vue, { ref } from "vue";

import {
  WizAvatar,
  WizBox,
  WizHeading,
  WizHStack,
  WizIconButton,
} from "@/components/base";
import type { TabItem } from "@/components/base/tab/types";
import { WizNotification } from "@/components/custom/notification";
import type { NotificationItem } from "@/components/custom/notification/types";
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
  tabs: (TabItem & {
    variant: "primary" | "secondary";
  })[];
  notifications: NotificationItem[];
}

defineProps<Props>();

const { isMenuOpen, setIsMenuOpen } = globalInject(globalKey);
const isNotificationOpen = ref(false);

const toggleMenuOpen = () => {
  setIsMenuOpen(!isMenuOpen.value);
};

const toggleNotificationOpen = () => {
  isNotificationOpen.value = !isNotificationOpen.value;
};
</script>

<style lang="scss" scoped></style>
