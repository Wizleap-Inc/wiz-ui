<template>
  <WizProvider>
    <Header />
    <WizHStack>
      <Navigation />
      <router-view />
    </WizHStack>
  </WizProvider>
</template>

<script setup lang="ts">
import { WizProvider, WizHStack } from "@wizleap-inc/wiz-ui";

import Header from "./components/header/index.vue";
import Navigation from "./components/navigation/index.vue";
</script>
