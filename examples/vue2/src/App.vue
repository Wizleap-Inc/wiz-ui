<template>
  <div>
    <WizTextButton variant="sub">WizButton</WizTextButton>
    <WizIconButton :icon="WizISend" @click="onClick" />
  </div>
</template>

<script setup lang="ts">
import { WizTextButton, WizISend, WizIconButton } from "@wizleap-inc/wiz-ui";

const onClick = () => {
  console.log("clicked");
};
</script>
