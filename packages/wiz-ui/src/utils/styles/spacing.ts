import { SPACING_MAP } from "@wiz-ui/constants/styles/spacing";
import { SpacingKeys } from "@wiz-ui/constants/styles/spacing";

export const getSpacingCSS = (spacings?: SpacingKeys) =>
  spacings && SPACING_MAP[spacings];

export const getCoupleSpacingCSS = (
  spacingX?: SpacingKeys,
  spacingY?: SpacingKeys
) => `${SPACING_MAP[spacingY || "no"]} ${SPACING_MAP[spacingX || "no"]}`;
