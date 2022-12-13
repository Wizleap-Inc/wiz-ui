import { createTheme } from "@vanilla-extract/css";
import { THEME } from "@wiz-ui/constants";

export const [themeClass, vars] = createTheme(THEME);
