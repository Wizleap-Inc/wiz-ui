<template>
  <WizHeader
    avatar-src="https://avatars.githubusercontent.com/u/10214025?v=4"
    gap-left="sm"
    gap-right="xl"
    sticky
  >
    <template #left>
      <TitleLogo />
    </template>
    <template #right>
      <NotificationDropdown />
      <AvatarDropdown />
    </template>
  </WizHeader>
</template>

<script setup lang="ts">
import { WizHeader } from "@wizleap-inc/wiz-ui-next";

import AvatarDropdown from "./avatar-dropdown.vue";
import NotificationDropdown from "./notification-dropdown.vue";
import TitleLogo from "./title-logo.vue";
</script>
