import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { PORTAL_ID } from "@/constants/id";

type Props = {
  children: ReactNode;
};

const _Portal = ({ children }: Props) => {
  const mount = document.getElementById(PORTAL_ID);
  const el = document.createElement("div");
  useEffect(() => {
    if (!mount) return; // TODO: throw error
    mount.appendChild(el);
    return () => {
      mount.removeChild(el);
    };
  }, [el, mount]);

  return createPortal(children, el);
};
export const WizPortal = _Portal;
