<template>
  <tbody>
    <slot />
  </tbody>
</template>

<script setup lang="ts">
import { ComponentName } from "@wiz-ui/constants/component/name";

defineOptions({
  name: ComponentName.CardTbody,
});
</script>
