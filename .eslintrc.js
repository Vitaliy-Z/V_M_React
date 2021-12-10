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
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    semi: [2, "always"],
    quotes: ["error", "double"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "ignore",
        named: "ignore",
        asyncArrow: "ignore"
      }
    ]
  }
};
