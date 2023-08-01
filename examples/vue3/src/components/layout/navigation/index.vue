<template>
  <WizNavContainer sticky>
    <WizNavItem
      v-for="(item, i) in navigationItems"
      :key="i"
      :icon="item.icon"
      :label="item.label"
      :to="item.to"
      :active="item.active"
    />
    <template #footer>
      <FooterInfo />
    </template>
  </WizNavContainer>
</template>

<script setup lang="ts">
import {
  WizNavContainer,
  WizNavItem,
  WizIDashboard,
  WizIAssignment,
  WizIBusinessCenter,
  WizIHelp,
  WizIInfo,
} from "@wizleap-inc/wiz-ui-next";
import { computed } from "vue";
import { useRoute } from "vue-router";

import FooterInfo from "./footer-info.vue";

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
  {
    icon: WizIInfo,
    label: "Breakpoint",
    to: "/breakpoint",
    active: currentPath.value === "/breakpoint",
  },
]);
</script>
