<template>
  <WizProvider>
    <WizCustomHeader
      title="Wiz UI Playground"
      avatarSrc="https://avatars.githubusercontent.com/u/10214025?v=4"
      :tabs="notificationTabs"
      :notifications="notificationItems"
      sticky
    />
    <WizHStack>
      <WizNavContainer sticky>
        <WizNavItem
          v-for="(item, i) in navigationItems"
          :key="i"
          :icon="item.icon"
          :label="item.label"
          :to="item.to"
          :active="item.active"
        />
      </WizNavContainer>
      <router-view />
    </WizHStack>
  </WizProvider>
</template>

<script setup lang="ts">
import {
  WizNavContainer,
  WizNavItem,
  WizIDashboard,
  WizIAssignment,
  WizIBusinessCenter,
  WizIHelp,
  WizProvider,
  WizCustomHeader,
  WizHStack,
} from "@wizleap-inc/wiz-ui";
import { NotificationTabItem } from "@wizleap-inc/wiz-ui/dist/components/custom/header/types";
import { NotificationItem } from "@wizleap-inc/wiz-ui/dist/components/custom/notification/types";
import { computed } from "vue";
import { useRoute } from "vue-router/composables";

const route = useRoute();
const currentPath = computed(() => route.path);

const navigationItems = computed(() => [
  {
    icon: WizIDashboard,
    label: "Home",
    to: "/",
    active: currentPath.value === "/",
  },
  {
    icon: WizIAssignment,
    label: "About",
    to: "/about",
    active: currentPath.value === "/about",
  },
  {
    icon: WizIBusinessCenter,
    label: "Contact",
    to: "/contact",
    active: currentPath.value === "/contact",
  },
  {
    icon: WizIHelp,
    label: "Help",
    to: "/help",
    active: currentPath.value === "/help",
  },
]);

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

<style>
body {
  margin: 0;
  background-color: #f5f5f5;
}
</style>
