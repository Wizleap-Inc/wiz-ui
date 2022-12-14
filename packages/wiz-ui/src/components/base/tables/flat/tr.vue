<template>
  <tr>
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";

defineOptions({
  name: ComponentName.FlatTr,
});
</script>
