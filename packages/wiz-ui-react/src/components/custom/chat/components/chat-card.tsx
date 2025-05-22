import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/customs/chat-card.css";
import { formatDateToMonthDayWeek } from "@wizleap-inc/wiz-ui-utils";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  WizBox,
  WizCard,
  WizDivider,
  WizHStack,
  WizIExpandLess,
  WizIExpandMore,
  WizIcon,
  WizSelectBox,
  WizTag,
  WizText,
  WizVStack,
} from "@/components";

import { DisplayMessage, Message } from "./types";

import { WizChatForm, WizChatItem } from ".";

const TOGGLE_ANIMATION_DURATION = 300;

type Props<T> = Omit<ComponentPropsWithoutRef<"div">, "onSubmit"> & {
  textValue: string;
  username: string;
  isOpen: boolean;
  placeholder?: string;
  messages: Message[];
  haveNewMessage?: boolean;
  formRows?: number;
  typingUsername?: string;
  status?: T | null;
  statusOptions?: ComponentProps<typeof WizSelectBox<T>>["options"];
  statusPlaceholder?: string;
  onChangeStatus?: (status: T | null) => void;
  onChangeTextValue?: (value: string) => void;
  onSubmit?: () => void;
  onToggle?: () => void;
};

const ChatCard = <T,>({
  isOpen,
  textValue,
  username,
  placeholder,
  messages,
  haveNewMessage,
  formRows,
  typingUsername,
  status,
  statusOptions,
  statusPlaceholder,
  onChangeStatus,
  onChangeTextValue,
  onSubmit,
  onToggle,
  ...props
}: Props<T>) => {
  const wrapperBoxRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLDivElement>(null);
  const [closedWrapperBottom, setClosedWrapperBottom] = useState(0);

  const displayMessages = useMemo(() => {
    const displayMessages: DisplayMessage[] = [];
    messages.forEach((message) => {
      const date = new Date(message.time);
      const displayMessage = displayMessages.find(
        (displayMessage) =>
          displayMessage.date.getFullYear() === date.getFullYear() &&
          displayMessage.date.getMonth() === date.getMonth() &&
          displayMessage.date.getDate() === date.getDate()
      );
      if (displayMessage) {
        displayMessage.contents.push(message);
      } else {
        displayMessages.push({
          date,
          contents: [message],
        });
      }
    });
    return displayMessages;
  }, [messages]);

  const [isToggleAnimating, setIsToggleAnimating] = useState(false);
  const handleClickToggleButton = useCallback(() => {
    onToggle?.();
    setIsToggleAnimating(true);
    setTimeout(() => {
      setIsToggleAnimating(false);
    }, TOGGLE_ANIMATION_DURATION);
  }, [onToggle]);

  useLayoutEffect(() => {
    const wrapperBox = wrapperBoxRef.current;
    const divider = dividerRef.current;
    if (!wrapperBox || !divider) {
      return;
    }
    const updateClosedWrapperBottom = () => {
      const wrapperRect = wrapperBox.getBoundingClientRect();
      const dividerRect = divider.getBoundingClientRect();
      setClosedWrapperBottom(
        dividerRect.top - wrapperRect.top - wrapperRect.height
      );
    };
    // ちらつき防止の為最初に一回計算する
    updateClosedWrapperBottom();
    const wrapperObserver = new ResizeObserver(() => {
      updateClosedWrapperBottom();
    });
    wrapperObserver.observe(wrapperBox);
    return () => {
      wrapperObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // リスト下部までスクロール
    const listBox = listBoxRef.current;
    if (listBox && isOpen) {
      listBox.scrollTo(0, listBox.scrollHeight);
    }
  }, [isOpen, messages]);

  return (
    <WizBox
      {...props}
      ref={wrapperBoxRef}
      position="fixed"
      right="1.5rem"
      bottom={isOpen ? "0" : `${closedWrapperBottom}px`}
      transition={
        isToggleAnimating
          ? `bottom ${TOGGLE_ANIMATION_DURATION}ms ease-in-out`
          : undefined
      }
      width="20rem"
      zIndex="floating"
    >
      <WizCard
        shadow
        align="stretch"
        mainHeaderArea={
          <WizHStack align="center" gap="xs2" nowrap>
            <WizText color="gray.700" as="span" bold>
              {username}
            </WizText>
            {haveNewMessage && (
              <WizBox
                width={THEME.fontSize.md}
                height={THEME.fontSize.md}
                bgColor="red.800"
                round="max"
              />
            )}
          </WizHStack>
        }
        subHeaderArea={
          <WizIcon
            size="xl2"
            color="gray.500"
            icon={isOpen ? WizIExpandMore : WizIExpandLess}
          />
        }
        footerArea={
          <WizVStack width="100%" justify="end" gap="xs">
            <WizChatForm
              value={textValue}
              onChange={onChangeTextValue}
              onSubmit={onSubmit}
              placeholder={placeholder}
              formRows={formRows}
            />
            {status !== undefined && statusOptions !== undefined && (
              <WizHStack nowrap>
                <WizSelectBox
                  options={statusOptions}
                  value={status}
                  onChange={(selectedValue) => onChangeStatus?.(selectedValue)}
                  placeholder={statusPlaceholder}
                  expand
                />
                <div
                  style={{
                    width: THEME.spacing.xl4,
                    flexShrink: 0,
                  }}
                />
              </WizHStack>
            )}
            {typingUsername && (
              <WizText color="gray.600" as="p" fontSize="xs2">
                <WizText as="span" bold fontSize="xs2" color="gray.700">
                  {typingUsername}
                </WizText>
                &nbsp;さんが入力しています...
              </WizText>
            )}
          </WizVStack>
        }
      >
        <div ref={dividerRef}>
          <WizDivider />
        </div>
        <WizBox overflowY="scroll" ref={listBoxRef}>
          <WizVStack gap="xs" py="xs" height="320px" nowrap>
            {displayMessages.map(({ date, contents }, i) => {
              const messagesKey = `${date.toDateString()}-${i}`;
              return (
                <Fragment key={messagesKey}>
                  <WizHStack justify="center">
                    <WizTag
                      label={formatDateToMonthDayWeek(date)}
                      variant="mono"
                      fontSize="xs2"
                    />
                  </WizHStack>
                  {contents.map((content, j) => (
                    <WizChatItem
                      key={`${messagesKey}-${i}-${j}`}
                      content={content}
                      maxChatItemWidth="192px"
                    />
                  ))}
                </Fragment>
              );
            })}
          </WizVStack>
        </WizBox>
      </WizCard>
      <button
        type="button"
        className={styles.chatCardOpenButtonStyle}
        onClick={handleClickToggleButton}
      />
    </WizBox>
  );
};

ChatCard.displayName = ComponentName.ChatCard;

export const WizChatCard = ChatCard;
