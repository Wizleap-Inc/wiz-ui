<template>
  <WizHeader gap-left="sm" gap-right="xl">
    <template #left>
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
    </template>
    <template #right>
      <WizPopupContainer v-model="isNotificationOpen">
        <WizIconButton
          :icon="WizINotification"
          size="lg"
          variant="transparent"
          color="gray.700"
          @click="toggleNotificationOpen"
        />
        <WizPopup layer="floating" gap="md" direction="bl">
          <WizBox width="300px">
            <WizNotification
              :notifications="notifications"
              :tabs="tabs"
              height="640px"
              @click="onClick"
            />
          </WizBox>
        </WizPopup>
      </WizPopupContainer>
      <WizAvatar :src="avatarSrc" />
    </template>
  </WizHeader>
</template>

<script setup lang="ts">
import Vue, { ref } from "vue";

import {
  WizAvatar,
  WizBox,
  WizHeading,
  WizHeader,
  WizIconButton,
  WizPopupContainer,
  WizPopup,
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

interface Emit {
  (event: "clickNotification", id: string): void;
}

const emit = defineEmits<Emit>();

const onClick = (id: string) => emit("clickNotification", id);

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
