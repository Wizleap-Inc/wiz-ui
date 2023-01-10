<template>
  <WizStack
    direction="horizontal"
    :align="align"
    :justify="justify"
    :wrap="wrap"
    :gap="gap"
    :gx="gx"
    :gy="gy"
    :p="p"
    :pt="pt"
    :pr="pr"
    :pb="pb"
    :pl="pl"
    :px="px"
    :py="py"
    :m="m"
    :mt="mt"
    :mr="mr"
    :mb="mb"
    :ml="ml"
    :mx="mx"
    :my="my"
    :width="width"
    :height="height"
    :overflow="overflow"
    :reverse="reverse"
    :position="position"
  >
    <slot />
  </WizStack>
</template>

<script setup lang="ts">
import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { PropType } from "vue";

import { WizStack } from ".";

defineOptions({
  name: ComponentName.HStack,
});

defineProps({
  align: {
    type: String as PropType<"start" | "center" | "end" | "stretch">,
    required: false,
  },
  justify: {
    type: String as PropType<
      "start" | "center" | "end" | "between" | "around" | "evenly"
    >,
    required: false,
  },
  wrap: {
    type: Boolean,
    required: false,
  },
  gap: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  gx: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  gy: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
  p: { type: String as PropType<SpacingKeys>, required: false },
  pt: { type: String as PropType<SpacingKeys>, required: false },
  pr: { type: String as PropType<SpacingKeys>, required: false },
  pb: { type: String as PropType<SpacingKeys>, required: false },
  pl: { type: String as PropType<SpacingKeys>, required: false },
  px: { type: String as PropType<SpacingKeys>, required: false },
  py: { type: String as PropType<SpacingKeys>, required: false },
  m: { type: String as PropType<SpacingKeys>, required: false },
  mt: { type: String as PropType<SpacingKeys>, required: false },
  mr: { type: String as PropType<SpacingKeys>, required: false },
  mb: { type: String as PropType<SpacingKeys>, required: false },
  ml: { type: String as PropType<SpacingKeys>, required: false },
  mx: { type: String as PropType<SpacingKeys>, required: false },
  my: { type: String as PropType<SpacingKeys>, required: false },
  width: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
  overflow: {
    type: String,
    required: false,
  },
  reverse: {
    type: Boolean,
    required: false,
  },
  position: {
    type: String as PropType<
      "relative" | "absolute" | "fixed" | "sticky" | "static"
    >,
    required: false,
  },
});
</script>
