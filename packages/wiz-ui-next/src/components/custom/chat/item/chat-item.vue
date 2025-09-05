<template>
  <WizVStack :align="content.sender === 'me' ? 'end' : 'start'">
    <WizText
      v-if="content.username"
      as="span"
      font-size="xs2"
      color="gray.600"
      >{{ content.username }}</WizText
    >
    <WizHStack align="end" :reverse="content.sender === 'me'" gap="xs2">
      <WizCard
        border
        fit
        px="md"
        py="xs"
        border-color="gray.300"
        :max-width="maxChatItemWidth"
      >
        <template v-for="(part, i) in linkify(content.message)">
          <WizAnchor
            v-if="part.type === 'link'"
            :key="'anchor' + i"
            :to="part.content"
            target="_blank"
            font-size="xs"
          >
            {{ part.content }}
          </WizAnchor>
          <WizText
            v-else
            :key="'text' + i"
            as="span"
            font-size="xs"
            color="gray.700"
            white-space="preLine"
            break-all
          >
            {{ part.content }}
          </WizText>
        </template>
      </WizCard>
      <WizVStack :align="content.sender === 'me' ? 'end' : 'start'">
        <WizTooltip>
          <WizText
            v-if="content.readers !== undefined"
            as="span"
            font-size="xs2"
            color="gray.500"
          >
            {{ displayReadStatus }}
          </WizText>
          <template v-if="content.readers?.length" #content>
            {{ content.readers?.join("\n") }}
          </template>
        </WizTooltip>
        <WizText as="span" font-size="xs2" color="gray.500">{{
          formatDateToTime(content.time)
        }}</WizText>
      </WizVStack>
    </WizHStack>
  </WizVStack>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { formatDateToTime, linkify } from "@wizleap-inc/wiz-ui-utils";
import { computed, PropType } from "vue";

import {
  WizHStack,
  WizText,
  WizVStack,
  WizCard,
  WizTooltip,
  WizAnchor,
} from "@/components";

import { Message } from "..";

defineOptions({
  name: ComponentName.ChatItem,
});

const props = defineProps({
  content: {
    type: Object as PropType<Message>,
    required: true,
  },
  maxChatItemWidth: {
    type: String,
    required: false,
  },
});

const displayReadStatus = computed(() => {
  const cnt = props.content.readers?.length ?? -1;
  if (cnt < 1) return "未読";
  if (cnt === 1) return "既読";
  return `既読${cnt}`;
});
</script>
