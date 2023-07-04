<template>
  <WizHStack p="md">
    <WizBox bg-color="green.500" width="500px">
      BREAKPOINT = {{ bp }}
      <DisplayBreakpoint />
    </WizBox>
  </WizHStack>
</template>

<script setup lang="ts">
import { provideBreakpoint, WizBox, WizHStack } from "@wizleap-inc/wiz-ui-next";

import DisplayBreakpoint from "./DisplayBreakpoint.vue";

const bp = {
  sm: 1,
  md: 1,
  lg: 1,
};

provideBreakpoint(bp);
</script>
