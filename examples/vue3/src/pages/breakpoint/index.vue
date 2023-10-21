<template>
  <BreakpointProvider :bp="bp">
    <WizHStack p="md">
      <WizBox bg-color="blue.500" width="500px" height="100px">
        BREAKPOINT = {{ bp }}
        <DisplayBreakpoint />
        <ReProvideBreakpoint />
      </WizBox>
    </WizHStack>
  </BreakpointProvider>
</template>

<script setup lang="ts">
import {
  BreakpointProvider,
  WizBox,
  WizHStack,
} from "@wizleap-inc/wiz-ui-next";

import DisplayBreakpoint from "./_components/DisplayBreakpoint.vue";
import ReProvideBreakpoint from "./_components/ReProvideBreakpoint.vue";

const bp = {
  sm: 10000,
  md: 10000,
  lg: 10000,
};
</script>
