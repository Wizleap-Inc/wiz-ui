<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";
import { provide } from "vue";

import { globalKey, useGlobalProvider } from "@/hooks/use-global-provider";

defineOptions({
  name: ComponentName.Provider,
});

provide(globalKey, useGlobalProvider());
</script>
