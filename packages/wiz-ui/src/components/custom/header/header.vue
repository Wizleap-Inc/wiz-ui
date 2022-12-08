<template>
  <WizHeader gapLeft="sm" gapRight="xl" :sticky="sticky">
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
          size="xl"
          variant="transparent"
          color="gray.700"
          @click="toggleNotificationOpen"
        />
        <WizPopup layer="floating" gap="md">
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
      <WizDropdown v-model="isAvatarDropdownOpen" gap="sm" skeleton>
        <WizAvatar
          :src="avatarSrc"
          :fallback="avatarFallback"
          @click="toggleAvatarDropdownOpen"
          clickable
        />
        <template #options>
          <WizDropdownItem>選択肢１</WizDropdownItem>
          <WizDropdownItem>選択肢２</WizDropdownItem>
          <WizDropdownItem>選択肢３</WizDropdownItem>
          <WizDropdownItem>ログアウト</WizDropdownItem>
        </template>
      </WizDropdown>
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
import { WizDropdown, WizDropdownItem } from "@/components/base/dropdown";
import { NotificationTabItem } from "@/components/custom/header/types";
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
  avatarFallback?: string;
  tabs: NotificationTabItem[];
  notifications: NotificationItem[];
  sticky?: boolean;
}

defineProps<Props>();

interface Emit {
  (event: "clickNotification", id: string): void;
}

const emit = defineEmits<Emit>();

const onClick = (id: string) => emit("clickNotification", id);

const { isMenuOpen, setIsMenuOpen } = globalInject(globalKey);
const isNotificationOpen = ref(false);
const isAvatarDropdownOpen = ref(false);

const toggleMenuOpen = () => {
  setIsMenuOpen(!isMenuOpen.value);
};

const toggleNotificationOpen = () => {
  isNotificationOpen.value = !isNotificationOpen.value;
};

const toggleAvatarDropdownOpen = () => {
  isAvatarDropdownOpen.value = !isAvatarDropdownOpen.value;
};
</script>

<style lang="scss" scoped></style>
