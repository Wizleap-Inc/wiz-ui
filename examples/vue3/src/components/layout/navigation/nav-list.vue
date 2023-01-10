<template>
  <div>
    <WizNavItem
      v-for="(item, i) in navigationItems"
      :key="i"
      :icon="item.icon"
      :label="item.label"
      :to="item.to"
      :active="item.active"
    />
  </div>
</template>

<script setup lang="ts">
import {
  WizNavItem,
  WizIDashboard,
  WizIAssignment,
  WizIBusinessCenter,
  WizIHelp,
} from "@wizleap-inc/wiz-ui-next";
import { computed } from "vue";
import { useRoute } from "vue-router";

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
