<template>
  <WizVStack>
    <WizAnchor
      to="https://wizleap.co.jp"
      :icon="WizIOpenInNew"
      iconPosition="right"
      color="gray.700"
      fontSize="sm"
      openInNewTab
      nowrap
    >
      会社概要
    </WizAnchor>
    <WizAnchor
      to="https://wizleap.co.jp/services/"
      :icon="WizIOpenInNew"
      iconPosition="right"
      color="gray.700"
      fontSize="sm"
      openInNewTab
      nowrap
    >
      サービス
    </WizAnchor>
    <WizAnchor
      to="https://wizleap.co.jp/news/"
      :icon="WizIOpenInNew"
      iconPosition="right"
      color="gray.700"
      fontSize="sm"
      openInNewTab
      nowrap
    >
      ニュース
    </WizAnchor>
  </WizVStack>
</template>

<script setup lang="ts">
import { WizAnchor, WizVStack, WizIOpenInNew } from "@wizleap-inc/wiz-ui-next";
</script>
