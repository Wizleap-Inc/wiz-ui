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
        <div
          style={{
            width: "200px",
            height: "200px",
            overflow: "scroll",
          }}
        >
          <div style={{ width: "100vw", height: "100vh" }}>test2</div>
        </div>
        <div style={{ width: "100vw", height: "100vh" }}>test</div>
      </WizVStack>
    </div>
  );
};
