import { SPACING_MAP } from "@/constants/styles/spacing";
import { SpacingKeys } from "@/types/styles/spacing";

export const getSpacingCSS = (spacings: SpacingKeys | undefined) =>
  spacings && SPACING_MAP[spacings];

export const getCoupleSpacingCSS = (
  spacingX: SpacingKeys | undefined,
  spacingY: SpacingKeys | undefined
) => `${SPACING_MAP[spacingX || "no"]} ${SPACING_MAP[spacingY || "no"]}`;
