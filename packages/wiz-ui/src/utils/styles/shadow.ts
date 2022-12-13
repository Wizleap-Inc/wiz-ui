import { SHADOW_MAP } from "@wiz-ui/constants/styles/shadow";
import { ShadowKeys } from "@wiz-ui/constants/styles/shadow";

export const getShadowCss = (shadow: ShadowKeys) => SHADOW_MAP[shadow];
