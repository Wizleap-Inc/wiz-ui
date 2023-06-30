import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/information-panel.css";
import clsx from "clsx";
import { FC } from "react";

import { WizIClose, WizIconButton, WizVStack } from "@/components";

type Message = {
  text: string;
  type: "default" | "error";
};

type Props = {
  messages: Message[];
  width?: string;
  border?: boolean;
  onClose: () => void;
};

const InformationPanel: FC<Props> = ({
  messages,
  width,
  border = false,
  onClose,
}) => {
  return (
    <div
      className={clsx(
        styles.informationPanelStyle,
        border && styles.informationPanelBorderStyle
      )}
      style={{ width }}
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
