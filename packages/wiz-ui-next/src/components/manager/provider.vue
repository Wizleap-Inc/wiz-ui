<template>
  <div>
    <slot />
    <WizSnackbarController />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { provide } from "vue";

import WizSnackbarController from "@/components/base/snackbar/snackbar-controller.vue";
import { globalKey, useGlobalProvider } from "@/hooks/use-global-provider";

defineOptions({
  name: ComponentName.Provider,
});

provide(globalKey, useGlobalProvider());
</script>
