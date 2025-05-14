import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import _import from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    "**/node_modules",
    "**/storybook-static",
    "**/dist",
    "**/coverage",
    "packages/vuepress-plugin-wiz-ui",
  ]),

  tseslint.configs.recommended,
  pluginVue.configs["flat/recommended"],

  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      "vue/mustache-interpolation-spacing": "warn",
      "vue/no-use-computed-property-like-method": "warn",
      "vue/component-definition-name-casing": "warn",
      "vue/component-name-in-template-casing": "warn",
      "vue/custom-event-name-casing": ["warn", "camelCase"],
      "vue/no-async-in-computed-properties": "warn",
      "vue/no-computed-properties-in-data": "warn",
      "vue/no-custom-modifiers-on-v-model": "warn",
      "vue/no-dupe-v-else-if": "warn",
      "vue/no-duplicate-attributes": "warn",
      "vue/no-deprecated-slot-scope-attribute": "warn",
      "vue/no-multi-spaces": "warn",
      "vue/no-reserved-component-names": "warn",
      "vue/no-reserved-keys": "warn",
      "vue/no-reserved-props": "warn",
      "vue/no-shared-component-data": "warn",
      "vue/no-unused-refs": "warn",
      "vue/prop-name-casing": "warn",
      "vue/html-end-tags": "warn",
      "vue/multi-word-component-names": "off",
      "vue/no-dupe-keys": "warn",
      "vue/no-mutating-props": "warn",
      "vue/no-parsing-error": "error",
      "vue/no-potential-component-option-typo": "warn",
      "vue/no-side-effects-in-computed-properties": "warn",
      "vue/no-textarea-mustache": "warn",
      "vue/no-unused-components": "warn",
      "vue/no-unused-vars": "warn",
      "vue/no-use-v-if-with-v-for": "warn",
      "vue/require-default-prop": "off",
      "vue/require-prop-types": "warn",
      "vue/require-v-for-key": "off",
      "vue/return-in-computed-property": "warn",
      "vue/this-in-template": "warn",
      "vue/valid-v-else": "warn",
      "vue/valid-v-for": "warn",
      "vue/valid-v-model": "warn",
      "vue/no-unused-properties": [
        "warn",
        {
          groups: ["props", "data", "computed", "methods", "setup"],
        },
      ],
      "vue/html-button-has-type": "warn",
    },
  },
  {
    ignores: ["**/*.vue"],
    extends: compat.extends(
      "prettier",
      "plugin:@typescript-eslint/recommended"
    ),

    plugins: {
      import: fixupPluginRules(_import),
      "unused-imports": unusedImports,
      "@typescript-eslint": typescriptEslint,
      "react-hooks": reactHooks,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        defineOptions: "readonly",
      },

      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        parser: {
          js: "espree",
          ts: "@typescript-eslint/parser",
          "<template>": "espree",
        },
      },
    },

    rules: {
      camelcase: "warn",
      eqeqeq: "warn",
      "init-declarations": "warn",
      "no-nested-ternary": "warn",
      "no-await-in-loop": "warn",
      "no-cond-assign": "warn",
      "no-const-assign": "warn",
      "no-constant-condition": "warn",
      "no-dupe-keys": "warn",
      "no-else-return": "warn",
      "no-empty": "warn",
      "no-empty-function": "warn",
      "no-ex-assign": "warn",
      "no-extra-boolean-cast": "warn",
      "no-fallthrough": "warn",
      "no-func-assign": "warn",
      "no-irregular-whitespace": "warn",
      "no-param-reassign": "warn",
      "no-parsing-error": "off",
      "no-return-await": "warn",
      "no-script-url": "warn",
      "no-self-assign": "warn",
      "no-self-compare": "warn",
      "no-undef": "warn",
      "no-unreachable": "warn",
      "no-unsafe-negation": "warn",
      "no-unused-expressions": "warn",
      "no-use-before-define": "warn",
      "no-useless-concat": "warn",
      "no-useless-return": "warn",
      "no-var": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      yoda: "warn",
      "unused-imports/no-unused-imports": "warn",

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],

          pathGroups: [
            {
              pattern: "@/**",
              group: "parent",
              position: "before",
            },
          ],

          alphabetize: {
            order: "asc",
          },

          "newlines-between": "always",
        },
      ],

      "import/no-duplicates": "error",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  eslintConfigPrettier,
]);
