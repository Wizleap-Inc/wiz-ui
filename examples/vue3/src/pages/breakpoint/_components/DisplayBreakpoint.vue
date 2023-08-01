<template>
  <div>
    {{ bp }}
  </div>
</template>

<script setup lang="ts">
import { useBreakpoint } from "@wizleap-inc/wiz-ui-next";

const bp = useBreakpoint();
</script>
