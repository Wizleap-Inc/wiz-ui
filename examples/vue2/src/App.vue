<template>
  <WizProvider>
    <WizHeader
      title="Wiz UI Playground"
      avatarSrc="https://avatars.githubusercontent.com/u/10214025?v=4"
    />
    <WizDivider />
    <WizHStack height="calc(100vh - 60px)">
      <WizNavContainer>
        <WizNavItem
          v-for="(item, i) in navigationItems"
          :key="i"
          :icon="item.icon"
          :label="item.label"
          :to="item.to"
          :active="item.active"
        />
      </WizNavContainer>
      <WizDivider direction="vertical" />
      <router-view />
    </WizHStack>
  </WizProvider>
</template>

<script setup lang="ts">
import {
  WizHeader,
  WizNavContainer,
  WizNavItem,
  WizIDashboard,
  WizIAssignment,
  WizIBusinessCenter,
  WizIHelp,
  WizProvider,
  WizHStack,
  WizDivider,
} from "@wizleap-inc/wiz-ui";
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
</script>

<style>
body {
  margin: 0;
  background-color: #f5f5f5;
}
</style>
