<template>
  <WizHStack p="md">
    <WizBox bg-color="blue.500" width="500px" height="100px">
      BREAKPOINT = {{ bp }}
      <DisplayBreakpoint />
      <ReProvideBreakpoint />
    </WizBox>
  </WizHStack>
</template>

<script setup lang="ts">
import { provideBreakpoint, WizBox, WizHStack } from "@wizleap-inc/wiz-ui";

import DisplayBreakpoint from "./_components/DisplayBreakpoint.vue";
import ReProvideBreakpoint from "./_components/ReProvideBreakpoint.vue";

const bp = {
  sm: 10000,
  md: 10000,
  lg: 10000,
};

provideBreakpoint(bp);
</script>
