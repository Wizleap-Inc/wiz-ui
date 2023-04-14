import { ReactNode } from "react";

import { PORTAL_ID } from "@/constants/id";
import { GlobalContext } from "@/hooks/use-global-provider";

type Props = {
  children?: ReactNode;
};

const _Provider = ({ ...props }: Props) => {
  return (
    <GlobalContext.Provider value={{ state: undefined }}>
      {props.children}
      <div id={PORTAL_ID} />
    </GlobalContext.Provider>
  );
};

export const WizProvider = _Provider;
