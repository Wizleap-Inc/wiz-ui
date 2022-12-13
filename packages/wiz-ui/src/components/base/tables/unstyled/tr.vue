<template>
  <tr>
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { ComponentName } from "@wiz-ui/constants/component/name";

defineOptions({
  name: ComponentName.UnstyledTr,
});
</script>
