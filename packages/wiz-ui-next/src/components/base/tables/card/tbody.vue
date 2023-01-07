<template>
  <tbody>
    <slot />
  </tbody>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";

defineOptions({
  name: ComponentName.CardTbody,
});
</script>
