module.exports = {
    env: {
        es2021: true,
        node: true
    },
    ignorePatterns: ['node_modules/*', 'dist/*', 'src/models/*', '!.prettierrc.js'],
    extends: ['standard', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-use-before-define': [0],
        'no-unused-vars': [0],
        '@typescript-eslint/no-use-before-define': [1]
    }
};
