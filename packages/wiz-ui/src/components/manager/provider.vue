<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";
import { provide } from "vue";

import { globalKey, useGlobalProvider } from "@/providers";

defineOptions({
  name: ComponentName.Provider,
});

provide(globalKey, useGlobalProvider());
</script>
