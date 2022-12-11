const container = require("markdown-it-container");
const { getAttributes } = require("./util");
const { ComponentName } = require("@wizleap-inc/wiz-ui");

const components = Object.values(ComponentName);

module.exports = function tabsPlugin(md, options = {}) {
  options = options || {};

  const registerCtn = (mark) => {
    md.use(container, mark, {
      render(tokens, idx) {
        const token = tokens[idx];
        const attributes = getAttributes(token.info, mark);
        if (token.nesting === 1) {
          return `<${mark} ${attributes}>\n`;
        } else {
          return `</${mark}>\n`;
        }
      },
    });
  };

  components.forEach((mark) => registerCtn(mark));
};
