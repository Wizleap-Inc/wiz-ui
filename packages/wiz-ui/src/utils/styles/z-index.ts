import { ZIndexKeys } from "@/types/styles/z-index";

import { Z_INDEX_MAP } from "./../../constants/styles/z-index";

export const getZIndexCSS = (zIndex: ZIndexKeys) => Z_INDEX_MAP[zIndex];
