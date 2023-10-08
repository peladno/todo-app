module.exports = {
  root: true,
  extends: ['@react-native', 'eslint-config-prettier'],
  plugins: ['prettier', 'react-native'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    jsx: true,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {},
};
