<template>
  <WizStack
    direction="vertical"
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
import { ComponentName } from "@wiz-ui/constants/component/name";

import { SpacingKeys } from "@/types/styles/spacing";

import { WizStack } from ".";

defineOptions({
  name: ComponentName.VStack,
});

interface Props {
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: SpacingKeys;
  gx?: SpacingKeys;
  gy?: SpacingKeys;
  p?: SpacingKeys;
  pt?: SpacingKeys;
  pr?: SpacingKeys;
  pb?: SpacingKeys;
  pl?: SpacingKeys;
  px?: SpacingKeys;
  py?: SpacingKeys;
  m?: SpacingKeys;
  mt?: SpacingKeys;
  mr?: SpacingKeys;
  mb?: SpacingKeys;
  ml?: SpacingKeys;
  mx?: SpacingKeys;
  my?: SpacingKeys;
  width?: string;
  height?: string;
  overflow?: string;
  reverse?: boolean;
  position?: "absolute" | "relative" | "fixed" | "sticky" | "static";
}

defineProps<Props>();
</script>
