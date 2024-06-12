module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react-refresh',
    'eslint-plugin-no-inline-styles',
    'filename-rules',
    'jsx-a11y',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'function',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'method',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'property',
        format: null,
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
    ],
    'filename-rules/match': [2, { '.ts': 'camelcase', '.tsx': 'pascalcase' }],
    'import/no-extraneous-dependencies': [
      'error',
      { 'devDependencies': true }
    ],
    // 'no-console': 'error',
    'no-inline-styles/no-inline-styles': 2,
    'no-param-reassign': ['error', {
      'props': true,
      'ignorePropertyModificationsFor': [
        'state' // for Redux Toolkit createSlice
      ]
    }],
    'react/display-name': 'warn',
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-max-depth': ['error', { max: 6 }],
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-props-no-spreading': ['warn', {
      "html": "enforce",       // Disallow prop spreading on HTML elements
      "custom": "ignore",      // Allow prop spreading on custom components
      "explicitSpread": "ignore" // Allow explicit prop spreading
    }],
    'react/jsx-sort-props': 'warn',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'semi': [2, 'always'],
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
}
