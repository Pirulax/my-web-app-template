import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  ...mantine,
  {
    extends: [
      eslintConfigPrettier,
      eslintPluginPrettierRecommended
    ]
  },
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'] },
  {
    files: ['**/*.story.tsx'],
    rules: { 
      'no-console': 'off',
    },
  },
  {
    ignores: [".next/**/*.*"],
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", {
        "fixStyle": "separate-type-imports",
        "prefer": "type-imports"
      }],
      "@typescript-eslint/no-unused-vars": "off",
      "no-duplicate-imports": ["error", {
        "allowSeparateTypeImports": true,
        "includeExports": false
      }],
    }
  },
);
