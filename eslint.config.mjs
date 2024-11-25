import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import astroParser from "astro-eslint-parser"
import eslintPluginAstro from "eslint-plugin-astro"
import eslintPluginSvelte from 'eslint-plugin-svelte'
import svelteParser from "svelte-eslint-parser"

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    ...eslintPluginSvelte.configs["flat/recommended"],
    
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: ["*.astro"],
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".astro"],
            },
        },
    },
    {
        files: ["**/*.svelte", "*.svelte"],
        languageOptions: {
            parser: svelteParser,
        },
    },
    {
        files: ["tailwind.config.cjs", "**/*.d.ts"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/triple-slash-reference": "off",
        },
    },
    {
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            indent: ['error', 4, { "SwitchCase": 1 }],
            'max-len': ['error', { code: 120 }],
            'semi': ['error', 'never'],
        },
    },
    {
        ignores: ["dist/**", ".astro"],
    },
]