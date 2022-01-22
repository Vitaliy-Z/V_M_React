module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: [2, 2, { SwitchCase: 1 }],
    semi: [2, "always"],
    quotes: ["error", "double"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "ignore",
        named: "ignore",
        asyncArrow: "ignore"
      }
    ],
    "multiline-ternary": ["error", "never"]
  }
};
