import { CSSProperties } from "vue/types/jsx";
export declare const SPACING_MAP: {
    readonly no: "0";
    readonly xs: "0.5rem";
    readonly sm: "0.75rem";
    readonly md: "1rem";
    readonly lg: "1.25rem";
    readonly xl: "1.5rem";
    readonly xl2: "2rem";
    readonly xl3: "2.5rem";
    readonly xl4: "3rem";
    readonly at: "auto";
};
declare type SpacingKeys = keyof typeof SPACING_MAP;
export interface SpacingPropsItems {
    m: SpacingKeys;
    mt: SpacingKeys;
    mr: SpacingKeys;
    mb: SpacingKeys;
    ml: SpacingKeys;
    mx: SpacingKeys;
    my: SpacingKeys;
    p: SpacingKeys;
    pt: SpacingKeys;
    pr: SpacingKeys;
    pb: SpacingKeys;
    pl: SpacingKeys;
    px: SpacingKeys;
    py: SpacingKeys;
    gap: SpacingKeys;
}
export declare type SpacingProps = Partial<SpacingPropsItems>;
export declare const getSpacing: (spacing: SpacingKeys) => "0" | "0.75rem" | "1rem" | "1.25rem" | "1.5rem" | "2rem" | "0.5rem" | "2.5rem" | "3rem" | "auto";
export declare const getSpacingValue: (spacing: SpacingKeys) => string;
export declare const getSpacingCSS: (spacings: SpacingProps) => CSSProperties;
export {};
