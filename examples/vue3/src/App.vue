<template>
  <WizProvider>
    <Header />
    <WizHStack>
      <Navigation />
      <RouterView />
    </WizHStack>
  </WizProvider>
</template>

<script setup lang="ts">
import { WizHStack, WizProvider } from "@wizleap-inc/wiz-ui-next";

import Header from "./components/layout/header/index.vue";
import Navigation from "./components/layout/navigation/index.vue";
</script>
