import { SPACING_MAP } from "@/constants/styles/spacing";

export type SpacingKeys = keyof typeof SPACING_MAP;

export interface SpacingPropsItems {
  gap: SpacingKeys;
}

export type SpacingProps = Partial<SpacingPropsItems>;
