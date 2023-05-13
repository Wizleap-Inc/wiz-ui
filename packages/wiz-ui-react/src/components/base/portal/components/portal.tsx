import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

const Portal = ({ children }: Props) => {
  const mount = document.body;
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

export const WizPortal = Portal;
