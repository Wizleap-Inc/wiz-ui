import { Z_INDEX_MAP } from "@wiz-ui/constants/styles/z-index";

import { ZIndexKeys } from "@/types/styles/z-index";

export const getZIndexCSS = (zIndex: ZIndexKeys) => Z_INDEX_MAP[zIndex];
