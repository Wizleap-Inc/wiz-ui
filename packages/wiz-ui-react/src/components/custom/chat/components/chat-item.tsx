import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { formatDateToTime, linkify } from "@wizleap-inc/wiz-ui-utils";
import { FC } from "react";

import {
  WizAnchor,
  WizCard,
  WizHStack,
  WizText,
  WizTooltip,
  WizVStack,
} from "@/components";

import { Message } from "./types";

function getReadLabel(count: number) {
  if (count < 1) return "未読";
  if (count === 1) return "既読";
  return `既読${count}`;
}

type Props = {
  content: Message;
  maxChatItemWidth?: string;
};

const ChatItem: FC<Props> = ({ content, maxChatItemWidth }) => {
  const messageParts = linkify(content.message);
  const isMyMessage = content.sender === "me";

  return (
    <WizVStack align={isMyMessage ? "end" : "start"}>
      {content.username && (
        <WizText as="span" fontSize="xs2" color="gray.600">
          {content.username}
        </WizText>
      )}
      <WizHStack align="end" gap="xs2" reverse={isMyMessage}>
        <WizCard border fit px="md" py="xs" maxWidth={maxChatItemWidth}>
          {messageParts.map((part, i) =>
            part.type === "link" ? (
              <WizAnchor
                key={`anchor-${i}`}
                href={part.content}
                openInNewTab
                fontSize="xs"
              >
                {part.content}
              </WizAnchor>
            ) : (
              <WizText
                key={`text-${i}`}
                as="span"
                fontSize="xs"
                color="gray.700"
                whiteSpace="preLine"
                breakAll
              >
                {part.content}
              </WizText>
            )
          )}
        </WizCard>
        <WizVStack align={isMyMessage ? "end" : "start"}>
          {content.readers && (
            <WizTooltip content={content.readers.join("\n")}>
              <WizText as="span" fontSize="xs2" color="gray.500">
                {getReadLabel(content.readers.length)}
              </WizText>
            </WizTooltip>
          )}
          <WizText as="span" fontSize="xs2" color="gray.500">
            {formatDateToTime(content.time)}
          </WizText>
        </WizVStack>
      </WizHStack>
    </WizVStack>
  );
};

ChatItem.displayName = ComponentName.ChatItem;

export const WizChatItem = ChatItem;
