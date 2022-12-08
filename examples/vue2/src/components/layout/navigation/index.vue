<template>
  <WizNavContainer sticky>
    <NavList />
    <template #footer>
      <FooterInfo />
    </template>
  </WizNavContainer>
</template>

<script setup lang="ts">
import { WizNavContainer } from "@wizleap-inc/wiz-ui";

import FooterInfo from "./footer-info.vue";
import NavList from "./nav-list.vue";
</script>
