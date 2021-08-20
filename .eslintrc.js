module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
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
  plugins: ["react"],
  rules: {
    semi: 0,
    "comma-dangle": 0,
    "new-cap": 1,
  },
};
