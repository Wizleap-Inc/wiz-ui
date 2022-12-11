<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";

import { ComponentName } from "@/constants/component/name";
import { globalKey, useGlobalProvider } from "@/providers";

defineOptions({
  name: ComponentName.Provider,
});

provide(globalKey, useGlobalProvider());
</script>
