import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default {
  ignores: ['dist'], // dist 폴더 무시
  files: ['**/*.{ts,tsx,js,jsx}'], // 파일 확장자 설정
  languageOptions: {
    parser: tsParser, // TypeScript 파서 설정
    ecmaVersion: 2020,
    sourceType: 'module',
    globals: globals.browser,
  },
  plugins: {
    '@typescript-eslint': tseslint,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier: 'eslint-plugin-prettier',
  },
  extends: [
    js.configs.recommended,
    'plugin:react/recommended', // React 권장 설정
    'plugin:@typescript-eslint/recommended', // TypeScript 권장 설정
    'plugin:prettier/recommended', // Prettier와 연동
  ],
  rules: {
    // React Hooks 규칙
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // TypeScript 규칙
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시 비활성화
    '@typescript-eslint/no-explicit-any': 'warn', // any 사용 경고

    // Prettier 규칙
    'prettier/prettier': 'warn',

    // 기타 규칙
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      },
    ],
  },
};
 