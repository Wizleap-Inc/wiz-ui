import { CSSProperties } from "vue/types/jsx";

import { SPACING_MAP } from "@/constants/styles/spacing";
import { SpacingProps, SpacingKeys } from "@/types/styles/spacing";
import { Entries } from "@/types/utils/object";

export const getSpacing = (spacing: SpacingKeys) => SPACING_MAP[spacing];

export const getSpacingValue = (spacing: SpacingKeys) => {
  const value = getSpacing(spacing);
  return value ? `${value}` : value;
};

export const getSpacingCSS = (spacings: SpacingProps): CSSProperties => {
  const css: CSSProperties = {};
  for (const entries of Object.entries(spacings) as Entries<SpacingProps>) {
    if (!entries) continue;
    const [key, value] = entries;
    if (!value) continue;
    const spacingValue = getSpacingValue(value);
    if (!spacingValue) continue;
    css[key] = spacingValue;
  }
  return css;
};
