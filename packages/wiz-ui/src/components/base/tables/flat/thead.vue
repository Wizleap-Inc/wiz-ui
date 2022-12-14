<template>
  <thead>
    <slot />
  </thead>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";

defineOptions({
  name: ComponentName.FlatThead,
});
</script>
