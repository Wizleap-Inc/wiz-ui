import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/information-panel.css";
import clsx from "clsx";
import { FC } from "react";

import { WizIClose, WizIconButton, WizVStack } from "@/components";
import { BaseProps } from "@/types";
type Message = {
  text: string;
  type: "default" | "error";
};

type Props = BaseProps & {
  messages: Message[];
  width?: string;
  border?: boolean;
  onClose: () => void;
};

const InformationPanel: FC<Props> = ({
  className,
  style,
  messages,
  width,
  border = false,
  onClose,
}) => {
  return (
    <div
      className={clsx(
        className,
        styles.informationPanelStyle,
        border && styles.informationPanelBorderStyle
      )}
      style={{ ...style, width }}
    >
      <WizVStack gap="xs">
        {messages.map((message, i) => (
          <div
            key={i}
            className={styles.informationPanelFontStyle[message.type]}
          >
            {message.text}
          </div>
        ))}
      </WizVStack>
      <div className={styles.informationPanelIconStyle}>
        <WizVStack align="center">
          <WizIconButton
            variant="transparent"
            icon={WizIClose}
            onClick={onClose}
          />
        </WizVStack>
      </div>
    </div>
  );
};

InformationPanel.displayName = ComponentName.InformationPanel;

export const WizInformationPanel = InformationPanel;
