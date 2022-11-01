import { ObjectKeysWithSeparator } from "../../types/utils/object";
export declare const COLOR_MAP: {
    readonly brand: {
        readonly "900": "#3db783";
        readonly "800": "#51CB97";
        readonly "700": "#66DFAB";
        readonly "600": "#70E9C0";
        readonly "500": "#7BF2D4";
        readonly "400": "#86FCE8";
        readonly "300": "#9BFCF3";
        readonly "200": "#AFFCF3";
        readonly "100": "#C4FBF4";
        readonly "50": "#D9FBF4";
        readonly "0": "#E4FBF4";
    };
    readonly blue: {
        readonly "900": "#1d68a7";
        readonly "400": "#66b1ff";
    };
    readonly gradient: {
        readonly "900": "linear-gradient(90deg, #3db783 0%, #099ec3 100%)";
    };
    readonly error: {
        readonly "900": "#da0076";
        readonly "600": "#FCAFCF";
        readonly "300": "#FBE4EF";
    };
    readonly mono: {
        readonly "900": "#000000";
        readonly "800": "#1A1A1A";
        readonly "700": "#333333";
        readonly "600": "#4D4D4D";
        readonly "500": "#666666";
        readonly "400": "#808080";
        readonly "300": "#999999";
        readonly "200": "#B3B3B3";
        readonly "100": "#CCCCCC";
        readonly "50": "#E6E6E6";
        readonly "0": "#FFFFFF";
    };
    readonly transparent: "transparent";
};
export declare type ColorKeys = ObjectKeysWithSeparator<typeof COLOR_MAP>;
interface ColorPropsItems {
    color: ColorKeys;
    bgColor: ColorKeys;
}
export declare type ColorProps = Partial<ColorPropsItems>;
export declare const getColors: (color: ColorKeys) => "#3db783" | "#51CB97" | "#66DFAB" | "#70E9C0" | "#7BF2D4" | "#86FCE8" | "#9BFCF3" | "#AFFCF3" | "#C4FBF4" | "#D9FBF4" | "#E4FBF4" | "#1d68a7" | "#66b1ff" | "linear-gradient(90deg, #3db783 0%, #099ec3 100%)" | "#da0076" | "#FCAFCF" | "#FBE4EF" | "#000000" | "#1A1A1A" | "#333333" | "#4D4D4D" | "#666666" | "#808080" | "#999999" | "#B3B3B3" | "#CCCCCC" | "#E6E6E6" | "#FFFFFF" | "transparent";
export {};
