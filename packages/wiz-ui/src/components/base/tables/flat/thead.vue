<template>
  <thead>
    <slot />
  </thead>
</template>

<script setup lang="ts">
import { ComponentName } from "@/constants/component/name";

defineOptions({
  name: ComponentName.FlatThead,
});
</script>
