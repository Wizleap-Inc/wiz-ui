import { createTheme } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

export const [themeClass, vars] = createTheme(THEME);
