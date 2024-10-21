import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@stylistic/recommended-extends',
      'plugin:import/recommended',
      'prettier',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    ignores: ['**/dist/*', 'eslint.config.mjs'],
  },
]
