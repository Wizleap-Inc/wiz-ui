const path = require("path");
const mdPlugin = require("./mdPlugin");

module.exports = (options, context) => ({
  enhanceAppFiles: [path.resolve(__dirname, "enhanceAppFiles.js")],
  chainMarkdown(config) {
    if (!mdPlugin) return;
    config
      .plugin("@wizleap-inc/vuepress-plugin-wiz-ui")
      .use(require("./mdPlugin"), [options])
      .end();
  },
});
