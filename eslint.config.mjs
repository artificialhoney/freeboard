import globals from "globals";
import js from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": 1,
      "no-undef": 1,
      "no-redeclare": 1,
      "no-prototype-builtins": 1,
      "no-cond-assign": 1,
      "no-empty": 1,
      "no-shadow-restricted-names": 1,
      "no-constant-binary-expression": 1,
      "no-useless-escape": 1,
      "no-unexpected-multiline": 1,
      "no-constant-condition": 1,
      "no-fallthrough": 1,
      "no-self-assign": 1,
      "no-control-regex": 1,
      "no-func-assign": 1,
      "no-misleading-character-class": 1,
      "no-useless-catch": 1,
      "no-delete-var": 1,
      "no-extra-boolean-cast": 1,
    },
  },
  { languageOptions: { globals: globals.browser } },
];
