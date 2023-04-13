import { RefObject, createContext } from "react";

type TPopupContext = {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  triggerRef: RefObject<HTMLDivElement>;
};

export const PopupContext = createContext<TPopupContext | null>(null);
