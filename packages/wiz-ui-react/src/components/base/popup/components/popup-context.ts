import { createContext } from "react";

type TPopupContext = {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
};

export const PopupContext = createContext<TPopupContext | null>(null);
