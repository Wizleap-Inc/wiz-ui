import { WizAnchor, WizIOpenInNew, WizVStack } from "@wizleap-inc/wiz-ui-react";

export const Navigation = () => {
  return (
    <WizVStack>
      <WizAnchor
        href="https://wizleap.co.jp"
        icon={WizIOpenInNew}
        iconPosition="right"
        color="gray.700"
        fontSize="sm"
        openInNewTab
        nowrap
      >
        会社概要
      </WizAnchor>
      <WizAnchor
        href="https://wizleap.co.jp/services/"
        icon={WizIOpenInNew}
        iconPosition="right"
        color="gray.700"
        fontSize="sm"
        openInNewTab
        nowrap
      >
        サービス
      </WizAnchor>
      <WizAnchor
        href="https://wizleap.co.jp/news/"
        icon={WizIOpenInNew}
        iconPosition="right"
        color="gray.700"
        fontSize="sm"
        openInNewTab
        nowrap
      >
        ニュース
      </WizAnchor>
    </WizVStack>
  );
};
