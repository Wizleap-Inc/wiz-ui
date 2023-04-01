import path from "path";
import { fileURLToPath } from "url";

export const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));
export const WIZ_UI_SVG_DIR = path.join(CURRENT_DIR, "../assets/");
export const WIZ_UI_CONSTANTS_DIR = path.join(CURRENT_DIR, "../../constants/");
