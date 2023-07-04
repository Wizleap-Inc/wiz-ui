<template>
  <BreakpointProvider :bp="bp">
    <WizHStack p="md">
      <WizBox bg-color="green.500" width="500px">
        BREAKPOINT = {{ bp }}
        <DisplayBreakpoint />
      </WizBox>
    </WizHStack>
  </BreakpointProvider>
</template>

<script setup lang="ts">
import { BreakpointProvider, WizBox, WizHStack } from "@wizleap-inc/wiz-ui";

import DisplayBreakpoint from "./DisplayBreakpoint.vue";

const bp = {
  sm: 1,
  md: 1,
  lg: 1,
};
</script>
