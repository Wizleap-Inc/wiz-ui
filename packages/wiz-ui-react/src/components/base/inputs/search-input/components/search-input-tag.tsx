import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { FC } from "react";

import { Tag } from "./types";

export const SearchInputTag: FC<Tag> = ({ label }) => {
  return <div className={styles.searchInputTagStyle}>{label}</div>;
};
