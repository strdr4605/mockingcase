module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ["jest"],
  rules: {
    "no-extend-native": 0,
    "no-console": 0,
    "max-len": ["error", { code: 120, ignoreComments: true, ignoreStrings: true }],
    quotes: 0,
    "no-use-before-define": 0,
    "no-plusplus": 0,
    "no-param-reassign": 1,
    "arrow-parens": [2, "as-needed"],
  },
};
