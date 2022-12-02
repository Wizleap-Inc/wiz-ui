<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";

import { globalKey, useGlobalProvider } from "@/providers";

provide(globalKey, useGlobalProvider());
</script>
