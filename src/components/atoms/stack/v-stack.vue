<template>
  <WizStack
    direction="vertical"
    :gap="gap"
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
  >
    <slot />
  </WizStack>
</template>

<script setup lang="ts">
import { SpacingKeys } from "@/types/styles/spacing";

import { WizStack } from ".";

export interface Props {
  gap?: SpacingKeys;
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
}

defineProps<Props>();
</script>
