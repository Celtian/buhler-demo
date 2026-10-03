// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const boundaries = /** @type {import('eslint').ESLint.Plugin} */ (
  require('eslint-plugin-boundaries')
);

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: { boundaries },
    settings: {
      'import/resolver': { typescript: { project: `${__dirname}/tsconfig.json` } },
      'boundaries/root-path': __dirname,
      'boundaries/elements': [
        { type: 'portal', pattern: 'projects/portal/src/**' },
        { type: 'ui', pattern: ['projects/ui/src/**', '@/ui'] },
        { type: 'generated', pattern: ['generated/**', '@/generated/*'] },
      ],
    },
    rules: {
      'max-lines': ['error', 750],
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { types: 'portal' } },
              allow: [
                { to: { element: { types: 'portal' } } },
                { to: { element: { types: 'ui' } } },
                { to: { element: { types: 'generated' } } },
              ],
            },
            {
              from: { element: { types: 'ui' } },
              allow: [{ to: { element: { types: 'ui' } } }],
            },
            {
              from: { element: { types: 'generated' } },
              allow: [{ to: { element: { types: 'generated' } } }],
            },
          ],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/sort-keys-in-type-decorator': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-service-decorator': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/prefer-signal-model': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-at-else': 'error',
      '@angular-eslint/template/prefer-at-empty': 'error',
      '@angular-eslint/template/button-has-type': 'error',
      '@angular-eslint/template/attributes-order': 'error',
      '@angular-eslint/template/no-any': 'error',
      'max-lines': ['error', 750],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Call[args.length > 0]:not(BoundEvent Call)',
          message:
            'Avoid calling functions with arguments in templates. Use signals or properties instead.',
        },
        {
          selector: 'Element[name=/^style$/i]',
          message:
            'Do not use <style> elements in templates. Use the component stylesheet instead.',
        },
      ],
    },
  },
]);
