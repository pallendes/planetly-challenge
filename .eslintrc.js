module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app/jest',
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
