<template>
  <WizHeader
    avatarSrc="https://avatars.githubusercontent.com/u/10214025?v=4"
    gapLeft="sm"
    gapRight="xl"
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
