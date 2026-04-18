module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  extends: [
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:storybook/recommended",
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    // Force imports to be sorted alphabetically
    // Reduces unnecessary diffs generated when imports are formatted by IDEs with different
    // settings
    "import/order": "error",
    // Allows us to use "as Type" to cast a nullable type to a non-nullable type (instead of
    // forcing the use of ! which is not allowed
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    // Force the use of curly braces for all control statements
    curly: "error",
    // Enable the unused-imports plugin rules
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    // Allow using numbers in template expressions, but nothing else (besides strings ofc)
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowNumber: true },
    ],
    // This rule prevents assigning or returning `void`, but in arrow shorthands without
    // braces, void is implicitly returned, so we disable the rule for arrow shorthands
    // See https://typescript-eslint.io/rules/no-confusing-void-expression#ignorearrowshorthand
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      { ignoreArrowShorthand: true },
    ],
    // This rule helps ensure that enum keys are sorted alphabetically
    "perfectionist/sort-enums": "error",
    // This rule checks that you're not returning a promise where it's not expected
    // https://typescript-eslint.io/rules/no-misused-promises/
    // In our case, we want to turn off checksVoidReturn, since React-Hook-Form's
    // `handleSubmit` function returns a Promise, but a <form> component's `onSubmit` expect a
    // function (e) => void, which triggers this rule.
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/prefer-nullish-coalescing": [
      "error",
      {
        ignoreConditionalTests: true,
        ignorePrimitives: { boolean: true },
      },
    ],
    "@typescript-eslint/no-deprecated": "warn",
    // Restrict certain imports which are always wrong
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            // Sometimes the IDE suggests importing the story component rather then the component
            // which is always wrong and should be prevented with ESLint
            group: ["*.stories"],
            message:
              "You've imported the component's story and not the component itself.",
          },
          {
            group: ["@mui/styles"],
            message: "Import makeStyles from @material-ui/core instead.",
          },
        ],
      },
    ],
    // FormatJS/react-intl rules
    // Require a description to be provided for all translations
    "formatjs/enforce-description": ["error", "literal"],
    // Require a default message to be provided
    "formatjs/enforce-default-message": ["error", "literal"],
    // Ensures that all messages containing placeholders are actually being passed a value
    "formatjs/enforce-placeholders": "error",
    // Ensures that all strings are translated by banning string literals in JSX
    "formatjs/no-literal-string-in-jsx": "error",
    // Warn if a message contains multiple whitespaces in a row
    "formatjs/no-multiple-whitespaces": "warn",
    // Don't allow nested plurals as they can be hard to translate
    "formatjs/no-multiple-plurals": "error",
    // Prevent the use of offsets for pluralized messages as they're too complex and can be
    // refused by some translation vendors
    "formatjs/no-offset": "error",
    // Detects invalid ICU message syntax
    "formatjs/no-invalid-icu": "error",
    // We use Babel to generate message IDs during the transpiling process, using a hash of the
    // defaultMessage and description. As such, we don't allow explicitly defining message IDs
    // This replaces the previous behavior where the ID was defined explicitly but generated
    // via eslint
    "formatjs/no-id": "error",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-misused-spread": "warn",
  },
};
// 0 = off, 1 = warn, 2 = error
