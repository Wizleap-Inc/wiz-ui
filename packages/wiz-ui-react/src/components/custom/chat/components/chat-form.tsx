import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { FC } from "react";

import { WizHStack, WizISend, WizIconButton, WizTextArea } from "@/components";

type Props = {
  value: string;
  disabled?: boolean;
  placeholder?: string;
  formRows?: number;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const ChatForm: FC<Props> = ({
  value,
  disabled,
  placeholder,
  formRows,
  onChange,
  onSubmit,
}) => {
  return (
    <WizHStack align="center" gap="xs" nowrap>
      <WizTextArea
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={formRows}
        expand
        onChange={onChange}
      />
      <div>
        <WizIconButton icon={WizISend} disabled={disabled} onClick={onSubmit} />
      </div>
    </WizHStack>
  );
};

ChatForm.displayName = ComponentName.ChatForm;

export const WizChatForm = ChatForm;
