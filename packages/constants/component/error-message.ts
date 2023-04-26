export const ERROR_MESSAGES = {
  POPUP: {
    INVALID_POPUP_TRIGGER_USAGE:
      "WizPopupTriggerはWizPopupの中で使用してください。",
    INVALID_POPUP_CONTENT_USAGE:
      "WizPopupContentはWizPopupの中で使用してください。",
    INVALID_POPUP_CLOSE_BUTTON_USAGE:
      "WizPopupCloseButtonはWizPopupの中で使用してください。",
  },
  USE_GLOBAL: {
    INVALID_USAGE:
      "Global Providerはエントリーポイントファイルでprovideしてください。",
  },
} as const;
