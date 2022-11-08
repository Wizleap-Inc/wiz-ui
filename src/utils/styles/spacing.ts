import { SPACING_MAP } from "@/constants/styles/spacing";
import { SpacingKeys } from "@/types/styles/spacing";

export const getSpacingCSS = (spacings: SpacingKeys) => SPACING_MAP[spacings];
