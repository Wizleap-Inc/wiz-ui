import { WizVStack } from "@wizleap-inc/wiz-ui-react";

import { SearchInputNum, SearchInputStr } from "./selects/search-input";
import {
  SearchSelectorNum,
  SearchSelectorStr,
} from "./selects/search-selector";
import { SelectBoxNum, SelectBoxStr } from "./selects/selectbox";

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <WizVStack>
        <SearchSelectorNum />
        <SearchSelectorStr />
        <SearchInputNum />
        <SearchInputStr />
        <SelectBoxNum />
        <SelectBoxStr />
      </WizVStack>
    </div>
  );
};
