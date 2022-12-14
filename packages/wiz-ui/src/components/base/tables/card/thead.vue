<template>
  <thead>
    <slot />
  </thead>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";

defineOptions({
  name: ComponentName.CardThead,
});
</script>
