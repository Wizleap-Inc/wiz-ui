import { readdirSync, statSync } from "fs";
import { join } from "path";

export const getSidebar = (title: string, dir: string) => {
  const files = readdirSync(dir);
  const groups: string[] = [];
  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isFile()) {
      if (file === "README.md" || file === "index.md") {
        groups.push(`${title}/`);
      } else if (file.endsWith(".md")) {
        groups.push(`${title}/${file.replace(".md", "")}`);
      }
    }
  });
  return {
    title,
    collapsable: false,
    children: groups,
  };
};
