import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/information-panel.css";
import clsx from "clsx";
import { FC, ReactNode, ComponentPropsWithoutRef } from "react";

import { WizIClose, WizIconButton, WizVStack } from "@/components";

type TextMessage = {
  text: string;
  type: "default" | "error";
};

type Props = ComponentPropsWithoutRef<"div"> & {
  messages: (TextMessage | ReactNode)[];
  width?: string;
  border?: boolean;
  onClose?: () => void;
};

const isTextMessage = (
  message: TextMessage | ReactNode
): message is TextMessage => {
  return (
    typeof message === "object" &&
    message !== null &&
    "text" in message &&
    "type" in message &&
    (message.type === "default" || message.type === "error")
  );
};

const InformationPanel: FC<Props> = ({
  className,
  style,
  messages,
  width,
  border = false,
  onClose,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        className,
        styles.informationPanelStyle,
        border && styles.informationPanelBorderStyle
      )}
      style={{ ...style, width }}
    >
      <WizVStack gap="xs">
        {messages.map((message, i) =>
          isTextMessage(message) ? (
            <div
              key={i}
              className={styles.informationPanelFontStyle[message.type]}
            >
              {message.text}
            </div>
          ) : (
            message
          )
        )}
      </WizVStack>
      <WizVStack align="start">
        <WizIconButton
          variant="transparent"
          icon={WizIClose}
          onClick={() => onClose?.()}
        />
      </WizVStack>
    </div>
  );
};

InformationPanel.displayName = ComponentName.InformationPanel;

export const WizInformationPanel = InformationPanel;
