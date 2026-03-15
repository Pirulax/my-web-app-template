import mantine from 'eslint-config-mantine';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  ...mantine,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
  },
  {
    extends: [eslintConfigPrettier, eslintPluginPrettierRecommended],
  },
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}', '.next/**/*.*', 'src/lib/prntr/**.*', '.storybook'] },
  {
    files: ['**/*.story.tsx'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    //ignores: ['.next/**/*.*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      'no-duplicate-imports': [
        'error',
        {
          allowSeparateTypeImports: true,
          includeExports: false,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  }
);
