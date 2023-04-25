import { RefObject, createContext } from "react";

type TPopupContext = {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  triggerRef: RefObject<HTMLElement>;
};

export const PopupContext = createContext<TPopupContext | null>(null);
