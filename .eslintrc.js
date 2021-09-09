module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    JSX: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    react: {
      pragma: "React",
      version: "16.12.0",
    },
  },
  plugins: ["react", "prettier"],
  rules: {
    semi: 0,
    "comma-dangle": 0,
    "new-cap": 1,
    "prettier/prettier": ["error"],
    "no-use-before-define": "off",
  },
};
