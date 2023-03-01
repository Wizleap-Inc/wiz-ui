<template>
  <WizPopupContainer>
    <WizIconButton
      :icon="WizINotification"
      size="xl"
      variant="transparent"
      color="gray.700"
      @click="toggleNotificationOpen"
    />
    <WizPopup
      :isOpen="isNotificationOpen"
      @onClose="isNotificationOpen = false"
      layer="floating"
      gap="md"
    >
      <WizBox width="300px">
        <WizNotification
          :notifications="notificationItems"
          :tabs="notificationTabs"
          height="640px"
          @click="onNotificationPanelClick"
        />
      </WizBox>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import {
  WizINotification,
  WizIconButton,
  WizPopupContainer,
  WizPopup,
  WizBox,
  WizNotification,
} from "@wizleap-inc/wiz-ui";
import {
  NotificationTabItem,
  NotificationItem,
} from "@wizleap-inc/wiz-ui/dist/components/custom/notification/types";
import { ref } from "vue";

const isNotificationOpen = ref(false);
const toggleNotificationOpen = () => {
  isNotificationOpen.value = !isNotificationOpen.value;
};

const onNotificationPanelClick = (nid: NotificationItem["id"]) =>
  console.log(nid);

const notificationTabs: NotificationTabItem[] = [
  {
    label: "タブ1",
    name: "tab1",
    notificationCount: 3,
    variant: "primary",
  },
  {
    label: "タブ2",
    name: "tab2",
    notificationCount: 0,
    variant: "secondary",
  },
];

const notificationItems: NotificationItem[] = Array.from(
  { length: 14 },
  (_, i) => ({
    id: `${i}`,
    title: "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
    timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365),
    tabName: ["tab1", "tab2"][i % 2],
    read: i % 3 === 0,
    tableInfo: [
      {
        title: "情報1",
        content: "データ1",
      },
      {
        title: "情報2",
        content: "データ2",
      },
    ],
  })
);
</script>
