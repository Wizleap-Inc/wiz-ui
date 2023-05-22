import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

const Portal = ({ children }: Props) => {
  const el = useRef(document.createElement("div"));
  useEffect(() => {
    const portalContainer = document.body;
    const elNode = el.current;
    portalContainer.appendChild(elNode);
    return () => {
      portalContainer.removeChild(elNode);
    };
  }, []);

  return createPortal(children, el.current);
};

export const WizPortal = Portal;
