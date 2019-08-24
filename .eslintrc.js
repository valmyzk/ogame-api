module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
      'plugin:@typescript-eslint/recommended'  // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
    ecmaFeatures:  {
      jsx:  true,  // Allows for the parsing of JSX
    },
    },
    rules:  {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
      "newline-before-return": "warn",
      "eqeqeq": "error",
      "block-spacing": ["warn", "always"],
      "brace-style": ["warn", "stroustrup", { "allowSingleLine": false }],
      "newline-per-chained-call": ["warn", { "ignoreChainWithDepth": 1 }],
      "camelcase": "off",
      "no-unneeded-ternary": "warn",
      "padded-blocks": ["warn", "always", { "allowSingleLineBlocks": true }],
      "no-const-assign": "error",
      "no-var": "error",
      "prefer-arrow-callback": ["warn", { "allowNamedFunctions": false, "allowUnboundThis": true }],
      "prefer-const": "warn",
      "semi": ["warn", "always", { "omitLastInOneLineBlock": false }],
      "rest-spread-spacing": ["error", "never"],
      "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": true }],
      "semi-spacing": ["warn", { "before": false, "after": true }],
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-use-before-define": ["error", { "functions": false, "classes": false, "variables": true }],
      "@typescript-eslint/no-parameter-properties": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-interface": "off"
    },
    settings:  {
      react:  {
        version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
  };