import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { PORTAL_ID } from "@/constants/id";

type Props = {
  children: ReactNode;
};

const _Portal = ({ children }: Props) => {
  const mount = document.getElementById(PORTAL_ID);
  const el = useRef(document.createElement("div"));
  useEffect(() => {
    const elNode = el.current;
    if (!mount || !elNode) return;
    mount.appendChild(elNode);
    return () => {
      mount.removeChild(elNode);
    };
  }, [mount]);

  return createPortal(children, el.current);
};

export const WizPortal = _Portal;
